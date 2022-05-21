import { Injectable } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { Gender } from './entities/gender.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GenderService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Gender[]> {
    return this.prisma.gender.findMany();
  }

  findOne(id: string): Promise<Gender> {
    return this.prisma.gender.findUnique({ where: { id } });
  }

  create(dto: CreateGenderDto): Promise<Gender> {
    const data: Gender = { ...dto };
    return this.prisma.gender.create({ data });
  }
}
