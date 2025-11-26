import { Sequelize } from 'sequelize';

// مستقیماً از URL استفاده کن
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

// import مدل‌ها
import User from '../models/User.js';
import UserSession from '../models/UserSession.js';
import Leaderboard from '../models/Leaderboard.js';
import CrosswordGame from '../models/CrosswordGame.js';

async function sync() {
  try {
    console.log('🔄 Starting database sync...');
    
    await sequelize.authenticate();
    console.log('✅ Database connected');
    
    // تعریف ارتباط‌ها
    User.hasMany(UserSession, { foreignKey: 'userId', as: 'sessions' });
    UserSession.belongsTo(User, { foreignKey: 'userId', as: 'user' });

    User.hasMany(Leaderboard, { foreignKey: 'userId', as: 'leaderboards' });
    Leaderboard.belongsTo(User, { foreignKey: 'userId', as: 'user' });

    User.hasMany(CrosswordGame, { foreignKey: 'userId', as: 'crosswordGames' });
    CrosswordGame.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    
    await sequelize.sync({ force: false });
    console.log('✅ All tables synchronized!');
    
    console.log('🎉 Authentication system is ready!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

sync();