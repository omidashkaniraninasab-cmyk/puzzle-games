// ابتدا مدل‌ها را import کنیم بدون database
import User from './User.js';
import UserSession from './UserSession.js';
import Leaderboard from './Leaderboard.js';
import CrosswordGame from './CrosswordGame.js';

// سپس ارتباط‌ها را تعریف کنیم
User.hasMany(UserSession, { foreignKey: 'userId', as: 'sessions' });
UserSession.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Leaderboard, { foreignKey: 'userId', as: 'leaderboards' });
Leaderboard.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(CrosswordGame, { foreignKey: 'userId', as: 'crosswordGames' });
CrosswordGame.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export {
  User,
  UserSession,
  Leaderboard,
  CrosswordGame
};