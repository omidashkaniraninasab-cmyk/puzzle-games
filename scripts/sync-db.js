import sequelize, { testConnection, syncDatabase } from '../lib/database.js';

async function main() {
  console.log('🔄 Starting database synchronization...');
  
  const connected = await testConnection();
  if (!connected) {
    console.log('❌ Database connection failed!');
    process.exit(1);
  }
  
  await syncDatabase();
  console.log('✅ Database sync completed!');
  process.exit(0);
}

main().catch(error => {
  console.error('❌ Sync failed:', error);
  process.exit(1);
});