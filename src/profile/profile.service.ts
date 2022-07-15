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

  async findById(id: string) {
    const record = await this.prisma.profile.findUnique({
      where: {
        id: id,
      },
      include: {
        games: true,
        favorites: {
          select: {
            games: true,
            id: true,
          },
        },
      },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string) {
    return this.findById(id);
  }

  async create(dto: CreateProfileDto): Promise<Profile> {
    if (dto.games) {
      return await this.prisma.profile
        .create({
          data: {
            title: dto.title,
            imageUrl: dto.imageUrl,
            userId: dto.userId,
            games: {
              connect: {
                id: dto.games,
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
    const user = await this.findById(id);

    if (dto.games) {
      let GameExist = false;
      user.games.map((game) => {
        if (game.id == dto.games) {
          GameExist = true;
        }
      });
      if (GameExist) {
        return this.prisma.profile
          .update({
            where: { id: id },
            data: {
              title: dto.title,
              imageUrl: dto.imageUrl,
              userId: dto.userId,
              games: {
                disconnect: {
                  id: dto.games,
                },
              },
            },
            include: { games: true },
          })
          .catch(handleError);
      } else {
        return this.prisma.profile
          .update({
            where: { id: id },
            data: {
              title: dto.title,
              imageUrl: dto.imageUrl,
              userId: dto.userId,
              games: {
                connect: {
                  id: dto.games,
                },
              },
            },
            include: { games: true },
          })
          .catch(handleError);
      }
    } else {
      return this.prisma.profile
        .update({
          where: { id: id },
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

  async addOrRemoveFavoriteGame(profileId: string, gameId: string) {
    const user = await this.findById(profileId);
    let favoritedGame = false;
    if (user.favorites != null) {
      user.favorites.games.map((game) => {
        if (gameId === game.id) {
          favoritedGame = true;
        }
      });
    } else {
      return this.prisma.favorites.create({
        data: {
          profile: {
            connect: {
              id: profileId,
            },
          },
          games: {
            connect: {
              id: gameId,
            },
          },
        },
      });
    }
    if (favoritedGame) {
      return await this.prisma.favorites.update({
        where: {
          id: user.favorites.id,
        },
        data: {
          games: {
            disconnect: {
              id: gameId,
            },
          },
        },
      });
    } else {
      return await this.prisma.favorites.update({
        where: {
          id: user.favorites.id,
        },
        data: {
          games: {
            connect: {
              id: gameId,
            },
          },
        },
      });
    }
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.profile.delete({ where: { id } });
  }
}
