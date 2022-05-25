import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGenderDto {
  @IsString()
  @ApiProperty({
    description: 'O nome do genero',
    example: 'Ação',
  })
  name: string;
}
