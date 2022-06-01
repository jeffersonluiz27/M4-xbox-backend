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
    example: '4a00b7c6-525f-4645-99e7-1b9b59e0d602',
  })
  userId: string;

  @ApiProperty({
    description: 'id do game',
    example:
      '["04f66779-bcfa-4c5c-a140-f234138890f3", "adb96fd7-cdcf-43dc-9e1b-0c0a262111f9"]',
  })
  games?: string[];
}
