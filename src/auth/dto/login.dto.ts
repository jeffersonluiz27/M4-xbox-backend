import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email da conta',
    example: 'jeffluiz@email.com',
  })
  email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'senha da conta',
    example: 'Abcd@1234',
  })
  password: string;
}
