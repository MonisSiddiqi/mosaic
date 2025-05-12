import { Config, NodeEnv } from './config.type';

export default (): Config => ({
  nodeEnv: process.env.NODE_ENV as NodeEnv,

  port: parseInt(process.env.PORT as string, 10) || 3000,

  jwt: {
    secret: process.env.JWT_SECRET as string,
    expiresIn: process.env.JWT_EXPIRES_IN as string,
  },

  s3: {
    bucketName: process.env.S3_BUCKET_NAME as string,
    region: process.env.S3_BUCKET_REGION as string,
    accessKeyId: process.env.S3_BUCKET_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.S3_BUCKET_SECRET_ACCESS_KEY as string,
  },

  cookie: {
    signingKey: process.env.COOKIE_SIGNING_KEY as string,
  },

  smtp: {
    host: process.env.SMTP_HOST as string,
    port: parseInt(process.env.SMTP_PORT as string),
    user: process.env.SMTP_USER as string,
    password: process.env.SMTP_PASSWORD as string,
  },

  payments: {
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
      frontendUrl: process.env.STRIPE_FRONTEND_URL,
    },
  },
});
