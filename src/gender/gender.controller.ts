import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GenderService } from './gender.service';
import { Gender } from './entities/gender.entity';
import { CreateGenderDto } from './dto/create-gender.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Genders')
@Controller('Genders')
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
}
