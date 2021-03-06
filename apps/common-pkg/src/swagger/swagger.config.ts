import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const AUTH_BEARER_DEFAULT = 'BearerAuth';

const options = {
  swaggerOptions: {
    authAction: {
      defaultBearerAuth: {
        name: AUTH_BEARER_DEFAULT,
        schema: {
          description: 'Default',
          type: 'http',
          in: 'header',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
};

export const initSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Clients app')
    .setDescription('API desc')
    .setVersion('1.0')
    .addBearerAuth(undefined, AUTH_BEARER_DEFAULT)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, options);
};
