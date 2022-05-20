import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JogoModule } from './jogo/jogo.module';

@Module({
  imports: [JogoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
