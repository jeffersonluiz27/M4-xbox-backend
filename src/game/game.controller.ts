import { Body, Controller, Get, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from './entities/game.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Games')
@Controller('Games')
export class GameController {
  constructor(private gameService: GameService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto): Game {
    return this.gameService.create(createGameDto);
  }
}
