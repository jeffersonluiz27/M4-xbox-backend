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
    description: 'id do game',
    example:
      '["Id do jogo aqui", "Id do jogo aqui"]',
  })
  games?: string[];
}
