import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from './entities/game.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateGameDto } from './dto/update-game.dto';
import { handleError } from 'src/utils/handle-error.util';
import { Prisma } from '@prisma/client';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Game[]> {
    return this.prisma.game.findMany({
      include: {
        genres: true,
      },
    });
  }

  async findById(id: string): Promise<Game> {
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

  async findOne(id: string): Promise<Game> {
    return this.findById(id);
  }

  async create(dto: CreateGameDto): Promise<Game> {
    const data: Prisma.GameCreateInput = {
      title: dto.title,
      coverImageUrl: dto.coverImageUrl,
      description: dto.description,
      year: dto.year,
      imdbScore: dto.imdbScore,
      trailerYouTubeUrl: dto.trailerYouTubeUrl,
      gameplayYouTubeUrl: dto.gameplayYouTubeUrl,
    };
    return await this.prisma.game
      .create({
        data,
      })
      .catch(handleError);
  }

  async update(id: string, dto: UpdateGameDto): Promise<Game> {
    await this.findById(id);
    const data: Prisma.GameUpdateInput = {
      title: dto.title,
      description: dto.description,
      coverImageUrl: dto.coverImageUrl,
      year: dto.year,
      imdbScore: dto.imdbScore,
      trailerYouTubeUrl: dto.trailerYouTubeUrl,
      gameplayYouTubeUrl: dto.gameplayYouTubeUrl,
    };
    return await this.prisma.game
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.game.delete({ where: { id } });
  }
}
