import { DataTypes } from 'sequelize';
import sequelize from '../lib/database';

const ChallengeGame = sequelize.define('ChallengeGame', {
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
  level: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  currentQuestion: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  questions: {
    type: DataTypes.JSON,
    allowNull: false
  },
  answers: {
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
  score: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  correctAnswers: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'challenge_games'
});

export default ChallengeGame;