import { Sequelize } from 'sequelize';
const sequelize = new Sequelize('product', 'postgres', '123', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  schema: 'public',
  logging: false
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to PostgreSQL successfully.');
  } catch (error) {
    console.error(' Unable to connect:', error);
  }
})()

export default sequelize;