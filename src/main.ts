import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
const cors = require("cors");

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const options = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
  };

  require('dotenv').config();
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(options);
  app.setGlobalPrefix(`${process.env.API_PREFIX}`);

  app.useStaticAssets(join(__dirname, 'public/assets'));
  app.setBaseViewsDir(join(__dirname, 'public/views'));
  app.setViewEngine('hbs');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  });
  await app.listen(3000);
}
bootstrap();