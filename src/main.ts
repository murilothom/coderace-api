import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvService } from './env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const swaggerOptions = new DocumentBuilder()
    .setTitle('EMP Soluções')
    .setDescription('API EMP Soluções')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('swagger', app, document);

  const envService = app.get(EnvService);
  const port = envService.get('PORT');

  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PATCH,PUT,DELETE',
    allowedHeaders: '*',
    credentials: true,
  });

  await app.listen(port);
  console.log('******************************');
  console.log(`        SERVER RUNNING        `);
  console.log(`    Listening on port ${port} `);
  console.log('******************************');
}
bootstrap();
