import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import envConfig from './app/envConfig';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: { origin: envConfig().FRONTEND_URL, credentials: true },
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(helmet());

  if (envConfig().NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('F-BauCua Server')
      .setDescription('API F-BauCua Server')
      .setVersion('0.0.1')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(envConfig().API_PORT);
}
bootstrap();
