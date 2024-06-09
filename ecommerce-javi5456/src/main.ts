import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  loggerMiddlewareGlobal,
  loggerGlobal,
} from './middleware/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new loggerGlobal().use);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ecommerce API Documentation')
    .setDescription('Esta es una API construida con nest para un ecommerce')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  await app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
