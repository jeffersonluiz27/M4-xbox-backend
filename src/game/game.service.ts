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

  create(dto: CreateGameDto) {
    const data: Game = { ...dto };
    return this.prisma.game.create({ data });
  }
}
