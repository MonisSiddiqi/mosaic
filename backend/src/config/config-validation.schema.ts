import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development')
    .required(),

  PORT: Joi.number().required(),

  DATABASE_URL: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),

  S3_BUCKET_NAME: Joi.string().required(),
  S3_BUCKET_REGION: Joi.string().required(),
  S3_BUCKET_ACCESS_KEY_ID: Joi.string().optional(),
  S3_BUCKET_SECRET_ACCESS_KEY: Joi.string().optional(),

  COOKIE_SIGNING_KEY: Joi.string().required(),

  SMTP_HOST: Joi.string().required(),
  SMTP_PORT: Joi.number().required(),
  SMTP_USER: Joi.string().required().email(),
  SMTP_PASSWORD: Joi.string().required(),

  STRIPE_SECRET_KEY: Joi.string().required(),
  STRIPE_WEBHOOK_SECRET: Joi.string().required(),
  STRIPE_FRONTEND_URL: Joi.string().required(),
});
