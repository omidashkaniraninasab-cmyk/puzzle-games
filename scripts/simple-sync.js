import { Sequelize } from 'sequelize';

// مستقیماً URL را قرار دهید
const sequelize = new Sequelize(
  'postgresql://neondb_owner:npg_0NXRe1TUCfKS@ep-noisy-dust-agilz74v-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  {
    dialect: 'postgres',
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false }
    },
    logging: console.log
  }
);

async function sync() {
  try {
    console.log('🔄 Starting database sync...');
    
    await sequelize.authenticate();
    console.log('✅ Database connected');
    
    // import مدل‌ها
    await import('../models/index.js');
    
    await sequelize.sync({ force: false });
    console.log('✅ All tables created!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

sync();