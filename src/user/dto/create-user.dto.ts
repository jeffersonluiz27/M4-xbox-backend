import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do usuário. Apenas para exibição',
    example: 'Administrador',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    description: 'Email do usuário.',
    example: 'admin@email.com',
  })
  email: string;

  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  @ApiProperty({
    description: 'Senha do usuário para login',
    example: 'Abc@123',
  })
  password: string;

  @ApiProperty({
    description: 'A confirmação da senha deve ser igual a senha',
    example: 'Abc@123',
  })
  confirmPassword: string;

  @IsString()
  @ApiProperty({
    description: 'CPF do usuário.',
    example: '67894608025',
  })
  cpf: string;

  @ApiProperty({
    description: 'Usuario é administrador?.',
    example: true,
  })
  isAdmin: boolean;
}
