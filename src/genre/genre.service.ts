import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { Genre } from './entities/genre.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { handleError } from 'src/utils/handle-error.util';
import { User } from 'src/user/entities/user.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Genre[]> {
    return this.prisma.genre.findMany();
  }

  async findById(id: string): Promise<Genre> {
    const record = await this.prisma.genre.findUnique({
      where: {
        id,
      },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string): Promise<Genre> {
    return this.findById(id);
  }

  create(dto: CreateGenreDto, user: User): Promise<Genre> {
    if (user.isAdmin) {
      const data: Genre = { ...dto };
      return this.prisma.genre.create({ data }).catch(handleError);
    } else {
      throw new UnauthorizedException(
        'Usuário não tem permissão, porque não é ADMIN',
      );
    }
  }

  async update(id: string, dto: UpdateGenreDto, user: User): Promise<Genre> {
    if (user.isAdmin) {
      await this.findById(id);
      const data: Partial<Genre> = { ...dto };
      return this.prisma.genre
        .update({
          where: { id },
          data,
        })
        .catch(handleError);
    } else {
      throw new UnauthorizedException(
        'Usuário não tem permissão, porque não é ADMIN!',
      );
    }
  }

  async delete(id: string, user: User) {
    if (user.isAdmin) {
      await this.findById(id);
      try {
        await this.prisma.genre.delete({ where: { id } });
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === 'P2025') {
            console.log('Record to delete does not exist.');
          }
        }
      }
    } else {
      throw new UnauthorizedException(
        'Usuário não tem permissão, porque não é ADMIN!',
      );
    }
  }
}
