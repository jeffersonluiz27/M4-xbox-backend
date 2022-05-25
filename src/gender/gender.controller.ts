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
} from '@nestjs/common';
import { GenderService } from './gender.service';
import { Gender } from './entities/gender.entity';
import { CreateGenderDto } from './dto/create-gender.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateGenderDto } from './dto/update-gender.dto';

@ApiTags('Genders')
@Controller('gender')
export class GenderController {
  constructor(private genderService: GenderService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todos os generos',
  })
  findAll(): Promise<Gender[]> {
    return this.genderService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um genero',
  })
  findOne(@Param('id') id: string): Promise<Gender> {
    return this.genderService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Cria um novo genero',
  })
  create(@Body() dto: CreateGenderDto): Promise<Gender> {
    return this.genderService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um genero pelo ID',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateGenderDto,
  ): Promise<Gender> {
    return this.genderService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover uma genero pelo ID',
  })
  delete(@Param('id') id: string) {
    this.genderService.delete(id);
  }
}
