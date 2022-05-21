import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  games: Game[] = [];

  create(createGameDto: CreateGameDto): Game {
    const game: Game = {
      id: 'id_aleatorio',
      ...createGameDto,
      Nome: undefined,
    };
    this.games.push(game);
    return game;
  }
}
