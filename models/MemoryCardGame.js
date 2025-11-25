import { DataTypes } from 'sequelize';
import sequelize from '../lib/database';

const MemoryCardGame = sequelize.define('MemoryCardGame', {
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
  cardLayout: {
    type: DataTypes.JSON,
    allowNull: false
  },
  revealedCards: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  matchedPairs: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  moves: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  startTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  timeSpent: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  totalMoves: {
    type: DataTypes.INTEGER,
    defaultValue: 0
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
  tableName: 'memory_card_games'
});

export default MemoryCardGame;