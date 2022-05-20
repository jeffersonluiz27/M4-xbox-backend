import { ApiProperty } from '@nestjs/swagger';

export class CreateJogoDto {
  @ApiProperty({
    description: 'O nome do jogo',
    example: 'GTA San Andreas',
  })
  nome: string;
}
