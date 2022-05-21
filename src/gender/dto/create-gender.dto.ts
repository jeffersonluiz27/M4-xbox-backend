import { ApiProperty } from '@nestjs/swagger';

export class CreateGenderDto {
  @ApiProperty({
    description: 'O nome do genero',
    example: 'Ação',
  })
  name: string;
}
