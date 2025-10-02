import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "postgres",
    schema: process.env.DB_SCHEMA,
    logging: false,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL successfully.");
  } catch (error) {
    console.error(" Unable to connect:", error);
  }
})();

export default sequelize;
