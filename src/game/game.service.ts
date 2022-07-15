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
        genres: true,
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
          connect: {
            id: dto.genres,
          },
        },
      };
      return await this.prisma.game
        .create({
          data,
          include: {
            genres: true,
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
          disconnect: {
            id: gameAtual.genres[0].id,
          },
          connect: {
            id: dto.genres,
          },
        },
      };
      return await this.prisma.game
        .update({
          where: { id },
          data,
          include: {
            genres: true,
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
      await this.prisma.game.delete({ where: { id } });
    } else {
      throw new UnauthorizedException('Usuário não tem permissão para deletar');
    }
  }
}
