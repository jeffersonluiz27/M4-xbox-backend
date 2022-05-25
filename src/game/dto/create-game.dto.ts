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
    example:
      'https://warpzone.me/wp-content/uploads/2019/09/MV5BMTdkZDFkMjMtYmM2My00MDljLWI1M2UtZjMwM2RjYWFhYmQyXkEyXkFqcGdeQXVyNjgzMTIxNzE@._V1_.jpg',
  })
  coverImageUrl: string;

  @ApiProperty({
    description: 'Descrição do jogo',
    example:
      'O mundo aberto permite que os jogadores naveguem livremente pelas áreas rurais e urbanas de San Andreas.',
  })
  description: string;

  @ApiProperty({
    description: 'Ano de lançamento do jogo',
    example: 2004,
  })
  year: number;

  @IsPositive()
  @IsNumber()
  @ApiProperty({
    description: 'Classificação no IMDB (0 a 5)',
    example: 4,
  })
  imdbScore: number;

  @ApiProperty({
    description: 'Url do trailer do jogo',
    example: 'https://www.youtube.com/watch?v=u_CbHrBbHNQ',
  })
  trailerYouTubeUrl: string;

  @ApiProperty({
    description: 'Url da gameplay do jogo',
    example: 'https://www.youtube.com/watch?v=ZaqpcybxUqs',
  })
  gameplayYouTubeUrl: string;
}
