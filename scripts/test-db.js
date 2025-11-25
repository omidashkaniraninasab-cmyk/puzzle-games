import { testConnection } from '../lib/database.js';

async function main() {
  console.log('🔗 Testing database connection...');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Set' : '❌ Not set');
  
  const connected = await testConnection();
  if (connected) {
    console.log('🎉 Database is ready!');
  } else {
    console.log('❌ Database connection failed');
  }
  process.exit(connected ? 0 : 1);
}

main().catch(console.error);