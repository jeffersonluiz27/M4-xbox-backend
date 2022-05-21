import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class CreateGameDto {
  @ApiProperty({
    description: 'O nome do jogo',
    example: 'GTA San Andreas',
  })
  title: string;

  @ApiProperty({
    description: 'Url da imagem do jogo',
  })
  coverImageUrl: string;

  @ApiProperty({
    description: 'Descrição do jogo',
  })
  description: string;

  @ApiProperty({
    description: 'Ano de lançamento do jogo',
  })
  year: Date;

  @IsPositive()
  @IsNumber()
  @ApiProperty({
    description: 'Classificação no IMDB (0 a 5)',
  })
  imdbScore: number;

  @ApiProperty({
    description: 'Url do trailer do jogo',
  })
  trailerYouTubeUrl: string;

  @ApiProperty({
    description: 'Url da gameplay do jogo',
  })
  gameplayYouTubeUrl: string;
}
