import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import { ValidationPipe } from '@nestjs/common';
import { initSwagger } from 'common/swagger/swagger.config';
import { TransformInterceptor } from 'common/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  initSwagger(app);

  await app.listen(3000);
}
bootstrap();
