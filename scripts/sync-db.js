import { testConnection } from '../lib/database.js';
import '../models/index.js';

async function syncDatabase() {
  try {
    console.log('🔄 Starting database sync...');
    
    const connected = await testConnection();
    if (!connected) {
      console.log('❌ Database connection failed');
      process.exit(1);
    }

    // اینجا مدل‌ها را import کردیم، حالا sync می‌کنیم
    const { sequelize } = await import('../models/index.js');
    
    await sequelize.sync({ force: false });
    console.log('✅ All tables created successfully!');
    
    console.log('🎉 Database is ready for use!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database sync failed:', error);
    process.exit(1);
  }
}

syncDatabase();