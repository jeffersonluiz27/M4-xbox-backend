import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.set('trust proxy', 1);

  //Validation decorators
  app.useGlobalPipes(new ValidationPipe());

  //Swagger tags
  const config = new DocumentBuilder()
    .setTitle('Xbox')
    .setDescription('Aplicação para loja de jogos tipo Xbox')
    .setVersion('1.0.0')
    .addTag('Status')
    .addTag('Games')
    .addTag('Genres')
    .addTag('Profiles')
    .addTag('Users')
    .addTag('Auth')
    .addTag('Homepage')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //Sever Port or Local Port
  await app.listen(process.env.PORT || 3333);
}
bootstrap();
