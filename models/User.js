import { DataTypes } from 'sequelize';
import sequelize from '../lib/database.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  displayName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  totalScore: {
    type: DataTypes.BIGINT,
    defaultValue: 0
  },
  rank: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'users'
});

export default User;