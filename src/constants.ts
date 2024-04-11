export const MONGODB_URI = `mongodb://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@mongo:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`
