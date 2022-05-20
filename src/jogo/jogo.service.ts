import { Injectable } from '@nestjs/common';
import { CreateJogoDto } from './dto/create-jogo.dto';
import { Jogo } from './entities/jogo.entity';

@Injectable()
export class JogoService {
  jogos: Jogo[] = [];

  create(createJogoDto: CreateJogoDto): Jogo {
    const jogo: Jogo = {
      id: 'id_aleatorio',
      ...createJogoDto,
      Nome: undefined,
    };
    this.jogos.push(jogo);
    return jogo;
  }
}
