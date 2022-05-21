import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from './entities/game.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateGameDto } from './dto/update-game.dto';

@ApiTags('Games')
@Controller('Games')
export class GameController {
  constructor(private gameService: GameService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todos os jogos',
  })
  findAll(): Promise<Game[]> {
    return this.gameService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um jogo',
  })
  findOne(@Param('id') id: string): Promise<Game> {
    return this.gameService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Cria um novo jogo',
  })
  create(@Body() createGameDto: CreateGameDto): Promise<Game> {
    return this.gameService.create(createGameDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um jogo pelo ID',
  })
  update(@Param('id') id: string, @Body() dto: UpdateGameDto): Promise<Game> {
    return this.gameService.update(id, dto);
  }
}
