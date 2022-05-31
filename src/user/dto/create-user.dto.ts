import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do usuário. Apenas para exibição',
    example: 'Nick Pollo',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    description: 'Email do usuário.',
    example: 'nick@email.com',
  })
  email: string;

  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  @ApiProperty({
    description: 'Senha do usuário para login',
    example: 'Abcd@1234',
  })
  password: string;

  @ApiProperty({
    description: 'A confirmação da senha deve ser igual a senha',
    example: 'Abcd@1234',
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
    example: false,
  })
  isAdmin: boolean;
}
