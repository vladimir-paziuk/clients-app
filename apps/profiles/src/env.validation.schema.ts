import * as Joi from 'joi';

export const getValidationSchema = () =>
  Joi.object({
    AUTH_SECRET_KEY: Joi.string().required(),

    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().required(),
    DATABASE_USERNAME: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),

    KAFKA_BROKER: Joi.string().required(),
    PROFILES_SERVICE_PORT: Joi.number().required(),
  });
