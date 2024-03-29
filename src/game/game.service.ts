import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from './entities/game.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateGameDto } from './dto/update-game.dto';
import { handleError } from 'src/utils/handle-error.util';
import { Prisma } from '@prisma/client';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.game.findMany({
      include: {
        genres: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findById(id: string) {
    const record = await this.prisma.game.findUnique({
      where: {
        id: id,
      },
      include: {
        genres: true,
      },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string) {
    return this.findById(id);
  }

  async create(dto: CreateGameDto, user: User) {
    if (user.isAdmin) {
      const data: Prisma.GameCreateInput = {
        title: dto.title,
        coverImageUrl: dto.coverImageUrl,
        description: dto.description,
        year: dto.year,
        imdbScore: dto.imdbScore,
        trailerYouTubeUrl: dto.trailerYouTubeUrl,
        gameplayYouTubeUrl: dto.gameplayYouTubeUrl,
        genres: {
          connect: dto.genres?.map((genresID) => ({
            id: genresID,
          })),
        },
      };
      return await this.prisma.game
        .create({
          data,
          include: {
            genres: {
              select: {
                name: true,
              },
            },
          },
        })
        .catch(handleError);
    } else {
      throw new UnauthorizedException('Usuário não tem permissão para criar');
    }
  }

  async update(id: string, dto: UpdateGameDto, user: User) {
    if (user.isAdmin) {
      const gameAtual = await this.findById(id);
      const data: Prisma.GameUpdateInput = {
        title: dto.title,
        description: dto.description,
        coverImageUrl: dto.coverImageUrl,
        year: dto.year,
        imdbScore: dto.imdbScore,
        trailerYouTubeUrl: dto.trailerYouTubeUrl,
        gameplayYouTubeUrl: dto.gameplayYouTubeUrl,
        genres: {
          disconnect: gameAtual.genres?.map((genreID) => ({
            id: genreID.id,
          })),
          connect: dto.genres?.map((genresID) => ({
            id: genresID,
          })),
        },
      };
      return await this.prisma.game
        .update({
          where: { id },
          data,
          include: {
            genres: {
              select: {
                name: true,
              },
            },
          },
        })
        .catch(handleError);
    } else {
      throw new UnauthorizedException('Usuário não tem permissão para alterar');
    }
  }

  async delete(id: string, user: User) {
    if (user.isAdmin) {
      await this.findById(id);
      try {
        await this.prisma.game.delete({ where: { id } });
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === 'P2025') {
            console.log('Record to delete does not exist.');
          }
        }
      }
    } else {
      throw new UnauthorizedException('Usuário não tem permissão para deletar');
    }
  }
}
