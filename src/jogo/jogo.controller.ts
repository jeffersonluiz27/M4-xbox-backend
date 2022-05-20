import { Body, Controller, Get, Post } from '@nestjs/common';
import { JogoService } from './jogo.service';
import { Jogo } from './entities/jogo.entity';
import { CreateJogoDto } from './dto/create-jogo.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('jogo')
@Controller('jogo')
export class JogoController {
  constructor(private jogoService: JogoService) {}

  @Post()
  create(@Body() createJogoDto: CreateJogoDto): Jogo {
    return this.jogoService.create(createJogoDto);
  }
}
