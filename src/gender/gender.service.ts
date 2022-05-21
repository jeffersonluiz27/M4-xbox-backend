import { Injectable } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { Gender } from './entities/gender.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GenderService {
  genders: Gender[] = [];

  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.gender.findMany();
  }

  create(dto: CreateGenderDto): Gender {
    const gender: Gender = { id: 'id_aleatorio', ...dto, name: undefined };
    this.genders.push(gender);
    return gender;
  }
}
