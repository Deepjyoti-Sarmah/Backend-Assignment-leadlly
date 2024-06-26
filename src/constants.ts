const {
  DB_ADMIN, DB_PASSWORD, DB_PORT, DB_NAME
} = process.env;

export const MONGODB_URI = `mongodb://${DB_ADMIN}:${DB_PASSWORD}@localhost:${DB_PORT}/${DB_NAME}?authSource=admin`

