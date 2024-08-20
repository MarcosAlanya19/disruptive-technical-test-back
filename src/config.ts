import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,
  jwt: {
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'default_secret_key',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  },
}
