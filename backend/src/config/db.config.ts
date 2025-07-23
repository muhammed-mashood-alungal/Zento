import { Sequelize } from "sequelize";
import { env } from "@/config"; 

export const sequelize = new Sequelize(
  env.DATABASE_NAME,
  env.DATABASE_USER,
  env.DATABASE_PASSWORD,
  {
    host: env.DATABASE_HOST,
    dialect: "mysql",
  }
);
