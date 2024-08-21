
export const config = () => ({
  port: process.env.PORT || 3000,
  env: process.env.ENV || 'dev',
  jwt: {
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'default_secret_key',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
  },
  cors: {
    CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  },
  mongoDB: {
    URL_MONGO: process.env.URL_MONGO || ''
  }
})
