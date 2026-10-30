import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { json, urlencoded } from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));
  
  // 👇 Esto permite que @Type convierta strings a números
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  
  app.enableCors();
  
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();