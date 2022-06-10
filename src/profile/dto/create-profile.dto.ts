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
    description: 'Id do usuário',
    example: 'ID',
  })
  userId: string;

  @ApiProperty({
    description: 'Id do game (opcional)',
    example: 'ID',
  })
  games?: string;

  @ApiProperty({
    description: 'Id do game para adicionar ou remover favoritos (opcional)',
    example: 'ID',
  })
  favoriteGameId?: string;
}
