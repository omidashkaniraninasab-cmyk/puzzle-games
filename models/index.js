import sequelize from '../lib/database.js';
import User from './User.js';
import Leaderboard from './Leaderboard.js';
import CrosswordGame from './CrosswordGame.js';

// ارتباط‌های ساده
User.hasMany(Leaderboard, { foreignKey: 'userId' });
Leaderboard.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(CrosswordGame, { foreignKey: 'userId' });
CrosswordGame.belongsTo(User, { foreignKey: 'userId' });

export {
  sequelize,
  User,
  Leaderboard,
  CrosswordGame
};