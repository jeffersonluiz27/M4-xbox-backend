import { Injectable } from '@nestjs/common';
import { Game } from 'src/game/entities/game.entity';
import { Genre } from 'src/genre/entities/genre.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HomepageService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(id: string) {
    const profileData = await this.prisma.profile.findUnique({
      where: {
        id: id,
      },
      select: {
        title: true,
        imageUrl: true,
        games: {
          include: {
            genres: true,
          },
        },
        favorites: {
          include: {
            games: true,
          },
        },
      },
    });
    const listGames = profileData.games;
    const favorites = profileData.favorites;
    const orderedGames = [];
    const allGenres = await this.prisma.genre.findMany();
    allGenres.map((genre) => {
      const gamesperGenre = [];
      listGames.map((game) => {
        if (game.genres[0].name == genre.name) {
          gamesperGenre.push(game.title);
        }
      });
      const genderObj = {
        genre: genre.name,
        title: gamesperGenre,
      };
      if (gamesperGenre.length !== 0) {
        orderedGames.push(genderObj);
      }
    });
    return {
      games: orderedGames,
      favorites: favorites,
    };
  }
}
