export type S3Config = {
  bucketName: string;
  region: string;
  accessKeyId?: string;
  secretAccessKey?: string;
};

export type NodeEnv = 'development' | 'production';

export type Config = {
  nodeEnv: NodeEnv;

  port: number;

  jwt: {
    secret: string;
    expiresIn: string;
  };

  s3: S3Config;

  cookie: {
    signingKey: string;
  };

  smtp: {
    host: string;
    port: number;
    user: string;
    password: string;
  };
};
