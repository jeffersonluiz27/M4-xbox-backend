import { Injectable, NotFoundException } from '@nestjs/common';
import { handleError } from 'src/utils/handle-error.util';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Profile[]> {
    return this.prisma.profile.findMany({
      include: {
        user: true,
        games: true,
      },
    });
  }

  async findById(id: string): Promise<Profile> {
    const record = await this.prisma.profile.findUnique({
      where: {
        id: id,
      },
      include: { games: true },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string): Promise<Profile> {
    return this.findById(id);
  }

  async create(dto: CreateProfileDto): Promise<Profile> {
    if (dto.gameId) {
      return await this.prisma.profile
        .create({
          data: {
            title: dto.title,
            imageUrl: dto.imageUrl,
            userId: dto.userId,
            games: {
              connect: {
                id: dto.gameId,
              },
            },
          },
          include: { games: true, user: true },
        })
        .catch(handleError);
    } else {
      return await this.prisma.profile
        .create({
          data: {
            title: dto.title,
            imageUrl: dto.imageUrl,
            userId: dto.userId,
          },
          include: { games: true },
        })
        .catch(handleError);
    }
  }

  async update(id: string, dto: UpdateProfileDto) {
    await this.findById(id);
    if (dto.gameId) {
      return this.prisma.profile
        .update({
          where: { id },
          data: {
            title: dto.title,
            imageUrl: dto.imageUrl,
            userId: dto.userId,
            games: {
              connect: {
                id: dto.gameId,
              },
            },
          },
          include: { games: true },
        })
        .catch(handleError);
    } else {
      return this.prisma.profile
        .update({
          where: { id },
          data: {
            title: dto.title,
            imageUrl: dto.imageUrl,
            userId: dto.userId,
          },
          include: { games: true },
        })
        .catch(handleError);
    }
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.profile.delete({ where: { id } });
  }
}
