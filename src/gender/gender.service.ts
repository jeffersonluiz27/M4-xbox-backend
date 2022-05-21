import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { Gender } from './entities/gender.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class GenderService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Gender[]> {
    return this.prisma.gender.findMany();
  }

  async findById(id: string): Promise<Gender> {
    const record = await this.prisma.gender.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com o '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string): Promise<Gender> {
    return this.findById(id);
  }

  create(dto: CreateGenderDto): Promise<Gender> {
    const data: Gender = { ...dto };
    return this.prisma.gender.create({ data }).catch(this.handleError);
  }

  async update(id: string, dto: UpdateGenderDto): Promise<Gender> {
    await this.findById(id);
    const data: Partial<Gender> = { ...dto };
    return this.prisma.gender.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    try {
      await this.prisma.gender.delete({ where: { id } });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          console.log('Record to delete does not exist.');
        }
      }
    }
  }

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();

    throw new UnprocessableEntityException(
      lastErrorLine || 'Algum erro ocorreu ao executar a operação',
    );
  }
}
