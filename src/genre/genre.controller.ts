import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { Genre } from './entities/genre.entity';
import { CreateGenreDto } from './dto/create-genre.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';

@ApiTags('Genres')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('genre')
export class GenreController {
  constructor(private genreService: GenreService) {}

  @Post()
  @ApiOperation({
    summary: 'Cria um novo genero',
  })
  create(
    @LoggedUser() user: User,
    @Body() dto: CreateGenreDto,
  ): Promise<Genre> {
    return this.genreService.create(dto, user);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os generos',
  })
  findAll(): Promise<Genre[]> {
    return this.genreService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um genero',
  })
  findOne(@Param('id') id: string): Promise<Genre> {
    return this.genreService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um genero pelo ID',
  })
  update(
    @LoggedUser() user: User,
    @Param('id') id: string,
    @Body() dto: UpdateGenreDto,
  ): Promise<Genre> {
    return this.genreService.update(id, dto, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover uma genero pelo ID',
  })
  delete(@LoggedUser() user: User, @Param('id') id: string) {
    this.genreService.delete(id, user);
  }
}
