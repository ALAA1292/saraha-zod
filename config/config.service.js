import dotenv from "dotenv";
import { existsSync } from "node:fs";

const NODE_ENV = process.env.NODE_ENV ?? "development";
const envFile = `.env.${NODE_ENV}`;

if (!existsSync(envFile)) {
  throw new Error(`Env file not found: ${envFile} (NODE_ENV="${NODE_ENV}")`);
}

dotenv.config({ path: [envFile, ".env"] });

const required = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

const envConfig = {
  nodeEnv: NODE_ENV,
  port: Number(process.env.PORT) || 3000,
  database: {
    uri: process.env.DB_URI_LOCAL ?? "mongodb://localhost/test_db",
  },
  encryption: {
    key: process.env.ENCRYPTION_KEY,
    iv: parseInt(process.env.IV_LENGTH) || 16,
  },
};

export default envConfig;