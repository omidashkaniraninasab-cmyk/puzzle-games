import { Sequelize } from 'sequelize';

// ایجاد اتصال به دیتابیس نئون
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: console.log, // برای دیدن کوئری‌ها
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// تست اتصال
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection to Neon PostgreSQL has been established successfully.');
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    return false;
  }
}

// همگام‌سازی مدل‌ها
async function syncDatabase() {
  try {
    await sequelize.sync({ force: false }); // force: true داده‌ها را پاک می‌کند!
    console.log('✅ Database synchronized successfully.');
  } catch (error) {
    console.error('❌ Database synchronization failed:', error);
  }
}

export default sequelize;
export { testConnection, syncDatabase };