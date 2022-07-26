import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email da conta',
    example: 'admin@email.com',
  })
  email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'senha da conta',
    example: 'Abc@123',
  })
  password: string;
}
