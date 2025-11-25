import { DataTypes } from 'sequelize';
import sequelize from '../lib/database.js';

const Leaderboard = sequelize.define('Leaderboard', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  gameType: {
    type: DataTypes.ENUM('crossword', 'challenge', 'memorycard', 'total'),
    allowNull: false
  },
  score: {
    type: DataTypes.BIGINT,
    defaultValue: 0
  },
  rank: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'leaderboards'
});

export default Leaderboard;