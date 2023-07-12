import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request } from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors<Request>());
  app.use(cookieParser());
  await app.listen(3001);
}
bootstrap();
