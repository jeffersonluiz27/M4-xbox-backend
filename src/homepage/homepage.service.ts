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
        favorites: {
          include: {
            games: true,
          },
        },
      },
    });
    const gameData = await this.prisma.game.findMany({
      include: {
        genres: true,
      },
    });
    const listGames = gameData;
    const favorites = profileData.favorites;
    const orderedGames = [];
    const allGenres = await this.prisma.genre.findMany();
    allGenres.map((genre) => {
      const gamesperGenre = [];
      listGames.map((game) => {
        if (game.genres[0].name == genre.name) {
          console.log(game.title);
          gamesperGenre.push({
            id: game.id,
            title: game.title,
            coverImageUrl: game.coverImageUrl,
            imdbScore: game.imdbScore,
          });
        }
      });
      const genderObj = {
        genre: genre.name,
        title: gamesperGenre,
      };
      if (gamesperGenre.length !== 0) {
        console.log(genderObj);
        orderedGames.push(genderObj);
      }
    });
    return {
      games: orderedGames,
      favorites: favorites,
    };
  }
}
