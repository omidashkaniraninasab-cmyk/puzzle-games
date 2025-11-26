import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

// مستقیماً connection ایجاد کن
const sequelize = new Sequelize(
  'postgresql://neondb_owner:npg_0NXRe1TUCfKS@ep-noisy-dust-agilz74v-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  {
    dialect: 'postgres',
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false }
    },
    logging: console.log
  }
);

// تعریف مدل User مستقیماً
const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(255), allowNull: false },
  displayName: { type: DataTypes.STRING(100), allowNull: false },
  totalScore: { type: DataTypes.BIGINT, defaultValue: 0 },
  rank: { type: DataTypes.INTEGER, defaultValue: 0 }
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
});

async function sync() {
  try {
    console.log('🔄 Starting database sync...');
    
    await sequelize.authenticate();
    console.log('✅ Database connected');
    
    await sequelize.sync({ force: false });
    console.log('✅ Users table synchronized!');
    
    console.log('🎉 Authentication system is ready!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

sync();