import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("hello_world", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
});

