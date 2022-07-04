import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from 'src/app.module';

import { initSwagger } from '@vp-clients-app/common-pkg';
import { TransformInterceptor } from '@vp-clients-app/common-pkg';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  initSwagger(app);

  await app.listen(config.get('CLINIC_SERVICE_PORT'));
}
bootstrap();
