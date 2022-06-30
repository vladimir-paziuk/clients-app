import * as Joi from 'joi';

export const getValidationSchema = () =>
  Joi.object({
    AUTH_SECRET_KEY: Joi.string(),
    AUTH_TOKEN_EXPIRE_TIME: Joi.number(),

    DATABASE_HOST: Joi.string(),
    DATABASE_PORT: Joi.number(),
    DATABASE_USERNAME: Joi.string(),
    DATABASE_PASSWORD: Joi.string(),
    DATABASE_NAME: Joi.string(),

    APP_PORT: Joi.number(),

    PROFILES_APP_PORT: Joi.number(),
    CLINIC_APP_PORT: Joi.number(),
  });
