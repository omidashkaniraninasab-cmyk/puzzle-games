import { DataTypes } from 'sequelize';
import sequelize from '../lib/database';

const MemoryCardScore = sequelize.define('MemoryCardScore', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  time: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  moves: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  difficulty: {
    type: DataTypes.ENUM('easy', 'medium', 'hard'),
    defaultValue: 'medium'
  },
  pairs: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'memory_card_scores'
});

export default MemoryCardScore;