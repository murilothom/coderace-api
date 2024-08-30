import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EnvService } from './env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const envService = app.get(EnvService);
  const port = envService.get('PORT');

  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PATCH,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  await app.listen(port);
  console.log(`✅ Servidor rodando na porta ${port} ✅`);
}
bootstrap();
