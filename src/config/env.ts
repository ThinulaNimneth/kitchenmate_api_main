import dotenv from "dotenv"

dotenv.config({quiet:true})


const required = (key: string): string => {
    const value = process.env[key]
    if (!value){
        throw new Error(`environment variable missing: ${key}`)
    }
    return value
}


export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: Number(process.env.PORT ?? 5000),
  MONGO_URI: required("MONGO_URI"),
  JWT_SECRET: required("JWT_SECRET"),
  JWT_REFRESH_SECRET: required("JWT_REFRESH_SECRET"),
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN ?? "15m",
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN ?? "7d",
  CLIENT_URLS: (process.env.CLIENT_URL ?? "http://localhost:5173")
    .split(",")
    .map((url) => url.trim().replace(/\/$/, ""))
    .filter(Boolean),
  EXPIRING_SOON_DAYS: Number(process.env.EXPIRING_SOON_DAYS ?? 3),


  SEED_ADMIN_EMAIL: process.env.SEED_ADMIN_EMAIL ?? "admin@pantrypal.com",
  SEED_ADMIN_PASSWORD: process.env.SEED_ADMIN_PASSWORD ?? "Admin@12345"
}

//add gem model..


export const isProduction = env.NODE_ENV === "production"