import { testConnection } from '../lib/database.js';

async function test() {
  console.log('🧪 Testing database connection...');
  const connected = await testConnection();
  if (connected) {
    console.log('✅ Database connection successful!');
  } else {
    console.log('❌ Database connection failed!');
  }
  process.exit(connected ? 0 : 1);
}

test();