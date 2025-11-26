import { Sequelize } from 'sequelize';

// برای production مستقیماً از process.env استفاده کن
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ DATABASE_URL is not defined in environment variables');
  // در production خطا نده، فقط log کن
}

const sequelize = databaseUrl ? new Sequelize(databaseUrl, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}) : null;

export default sequelize;