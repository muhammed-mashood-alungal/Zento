import { sequelize } from "../config";
import '@/models/associations'

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database Connected succesfully");

    await sequelize.sync()
    console.log("Database synced!");
  } catch (error: unknown) {
    console.log("Failed to Connect DB ", error);
  }
};

export {connectDB}
