import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export enum SWAGGER_TAGS {
  auth = 'Auth',
}

export const initSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Clients app')
    .setDescription('API desc')
    .setVersion('1.0')
    .addTag(SWAGGER_TAGS.auth)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
