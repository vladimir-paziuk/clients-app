import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { initSwagger } from '@vp-clients-app/common-pkg';
import { TransformInterceptor } from '@vp-clients-app/common-pkg';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  initSwagger(app);

  // TODO: Move to .env
  // Should port be different for each microservice
  await app.listen(3000);
}
bootstrap();
