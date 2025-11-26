import { DataTypes } from 'sequelize';
import sequelize from '../lib/database.js';
import bcrypt from 'bcryptjs';

// اگر sequelize null است، مدل تعریف نکن
const User = sequelize ? sequelize.define('User', {
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
  tableName: 'users',
  hooks: {
    beforeSave: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
}) : null;

// فقط اگر مدل وجود دارد متدها را اضافه کن
if (User) {
  User.prototype.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };
}

export default User;