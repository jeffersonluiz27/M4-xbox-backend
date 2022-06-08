import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @ApiProperty({
    description: 'O nome do perfil',
    example: 'Brian',
  })
  title: string;

  @IsUrl()
  @ApiProperty({
    description: 'Url da imagem do perfil',
    example: 'https://avatars.githubusercontent.com/u/7906171',
  })
  imageUrl: string;

  @IsString()
  @ApiProperty({
    description: 'id do usuário',
    example: 'Id do usuario Aqui',
  })
  userId: string;

  @ApiProperty({
    description: 'id do game (opcional)',
    example: '1d565ff0-d675-401a-98ae-52fbb2268f10',
  })
  games?: string;

  @ApiProperty({
    description: 'id do game para adicionar ou remover favoritos (opcional)',
    example: '1d565ff0-d675-401a-98ae-52fbb2268f10',
  })
  favoriteGameId?: string;
}
