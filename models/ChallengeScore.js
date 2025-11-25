import { DataTypes } from 'sequelize';
import sequelize from '../lib/database';

const ChallengeScore = sequelize.define('ChallengeScore', {
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
  level: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  challengesCompleted: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'challenge_scores'
});

export default ChallengeScore;