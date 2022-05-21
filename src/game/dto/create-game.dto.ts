import { ApiProperty } from '@nestjs/swagger';

export class CreateGameDto {
  @ApiProperty({
    description: 'O nome do jogo',
    example: 'GTA San Andreas',
  })
  nome: string;
}
