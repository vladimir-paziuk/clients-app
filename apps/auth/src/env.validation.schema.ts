import * as Joi from 'joi';

export const getValidationSchema = () =>
  Joi.object({
    AUTH_SECRET_KEY: Joi.string().required(),
    AUTH_TOKEN_EXPIRE_TIME: Joi.number().required(),

    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().required(),
    DATABASE_USERNAME: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),

    KAFKA_BROKER: Joi.string().required(),

    AUTH_SERVICE_PORT: Joi.number().required(),

    PROFILES_SERVICE_HOST: Joi.string().required(),
    PROFILES_SERVICE_PORT: Joi.number().required(),

    CLINIC_SERVICE_HOST: Joi.string().required(),
    CLINIC_SERVICE_PORT: Joi.number().required(),
  });
