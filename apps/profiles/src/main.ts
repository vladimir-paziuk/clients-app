import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

import { AppModule } from 'src/app.module';

import { initSwagger } from '@vp-clients-app/common-pkg';
import { TransformInterceptor } from '@vp-clients-app/common-pkg';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const appPort = config.get('PROFILES_SERVICE_PORT');

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: 'CLIENTS_APP_CONSUMER-1',
      },
    },
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  initSwagger(app);

  await app.startAllMicroservices();
  await app.listen(appPort);
}
bootstrap();
