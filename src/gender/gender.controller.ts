import { Body, Controller, Get, Post } from '@nestjs/common';
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
  findAll() {
    return this.genderService.findAll();
  }

  @Post()
  create(@Body() createGenderDto: CreateGenderDto): Gender {
    return this.genderService.create(createGenderDto);
  }
}
