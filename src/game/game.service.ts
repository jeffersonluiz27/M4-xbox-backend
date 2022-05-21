import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from './entities/game.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GameService {
  games: Game[] = [];

  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.game.findMany();
  }

  create(dto: CreateGameDto): Game {
    const game: Game = { id: 'id_aleatorio', ...dto, title: undefined };
    this.games.push(game);
    return game;
  }
}
