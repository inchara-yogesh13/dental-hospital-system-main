import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import compression from 'compression';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Global Prefix
  app.setGlobalPrefix('api/v1');

  // Security and Performance Middleware
  app.use(helmet());
  app.use(compression());

  // Input Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger Configuration
  const options = new DocumentBuilder()
    .setTitle('Dental Clinic SaaS API')
    .setDescription('Multi-tenant API for Clinic Management')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  // Start Server
  const port = configService.get<number>('port') || 3001;
  await app.listen(port);
  console.log(`Server running on: http://localhost:${port}/api/v1`);
  console.log(`Swagger available at: http://localhost:${port}/api/docs`);
}
bootstrap();
