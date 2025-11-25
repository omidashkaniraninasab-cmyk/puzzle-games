import { DataTypes } from 'sequelize';
import sequelize from '../lib/database.js';

const CrosswordGame = sequelize.define('CrosswordGame', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  currentGrid: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  score: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'crossword_games'
});

export default CrosswordGame;