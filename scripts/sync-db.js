import sequelize from '../lib/database.js';
import '../models/index.js';

async function syncDatabase() {
  try {
    console.log('🔄 Starting database sync...');
    
    // تست اتصال
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');
    
    // sync مدل‌ها
    await sequelize.sync({ force: false });
    console.log('✅ All tables synchronized successfully!');
    
    console.log('🎉 Database is ready for authentication system!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database sync failed:', error);
    process.exit(1);
  }
}

syncDatabase();