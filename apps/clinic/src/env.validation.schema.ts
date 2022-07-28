import * as Joi from 'joi';

export const getValidationSchema = () =>
  Joi.object({
    AUTH_SECRET_KEY: Joi.string().required(),

    CLINIC_SERVICE_PORT: Joi.number().required(),

    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().required(),
    DATABASE_USERNAME: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),

    KAFKA_BROKERS: Joi.string().required(),
    KAFKA_CLIENT: Joi.string().required(),
    KAFKA_GROUP_PUBLISHER: Joi.string().required(),
    KAFKA_GROUP_CONSUMER: Joi.string().required(),
  });
