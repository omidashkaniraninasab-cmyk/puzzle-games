import { DataTypes } from 'sequelize';
import sequelize from '../lib/database.js';

const UserSession = sequelize.define('UserSession', {
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
  token: {
    type: DataTypes.STRING(500),
    allowNull: false,
    unique: true
  },
  ipAddress: {
    type: DataTypes.STRING(45), // برای IPv6
    allowNull: false
  },
  userAgent: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'user_sessions',
  indexes: [
    { fields: ['token'] },
    { fields: ['userId'] },
    { fields: ['expiresAt'] }
  ]
});

export default UserSession;