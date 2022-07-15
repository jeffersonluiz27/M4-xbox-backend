import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from './entities/game.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateGameDto } from './dto/update-game.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';

@ApiTags('Games')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  @ApiOperation({
    summary: 'Cria um novo jogo',
  })
  create(@LoggedUser() user: User, @Body() createGameDto: CreateGameDto) {
    return this.gameService.create(createGameDto, user);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os jogos',
  })
  findAll() {
    return this.gameService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um jogo',
  })
  findOne(@Param('id') id: string) {
    return this.gameService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um jogo pelo ID',
  })
  update(
    @LoggedUser() user: User,
    @Param('id') id: string,
    @Body() dto: UpdateGameDto,
  ) {
    return this.gameService.update(id, dto, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover uma jogo pelo ID',
  })
  delete(@LoggedUser() user: User, @Param('id') id: string) {
    this.gameService.delete(id, user);
  }
}
