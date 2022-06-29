import * as Joi from 'joi';

export const getValidationSchema = () =>
  Joi.object({
    AUTH_SECRET_KEY: Joi.string(),

    DATABASE_HOST: Joi.string(),
    DATABASE_PORT: Joi.number(),
    DATABASE_USERNAME: Joi.string(),
    DATABASE_PASSWORD: Joi.string(),
    DATABASE_NAME: Joi.string(),

    APP_PORT: Joi.number(),
  });
