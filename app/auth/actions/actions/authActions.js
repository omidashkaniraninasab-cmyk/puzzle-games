'use server';
import { User, UserSession } from '../../../../models';
import { generateToken, verifyToken } from '../../../../lib/auth/jwt';
import { Op } from 'sequelize';

export async function login(credentials) {
  try {
    const { email, password } = credentials;

    // پیدا کردن کاربر
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return { success: false, message: 'ایمیل یا رمز عبور اشتباه است' };
    }

    // بررسی قفل بودن حساب
    if (user.isLocked()) {
      return { success: false, message: 'حساب شما موقتاً قفل شده است' };
    }

    // بررسی رمز عبور
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      // افزایش تعداد تلاش‌های ناموفق
      user.loginAttempts += 1;
      
      // قفل کردن حساب پس از 5 تلاش ناموفق
      if (user.loginAttempts >= 5) {
        user.lockUntil = new Date(Date.now() + 30 * 60 * 1000); // 30 دقیقه
      }
      
      await user.save();
      return { success: false, message: 'ایمیل یا رمز عبور اشتباه است' };
    }

    // بازنشانی تلاش‌های ناموفق
    user.loginAttempts = 0;
    user.lockUntil = null;
    user.lastLogin = new Date();
    await user.save();

    // ایجاد توکن
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });

    // ایجاد سشن
    await UserSession.create({
      userId: user.id,
      token,
      ipAddress: 'unknown', // در production از request می‌آید
      userAgent: 'unknown',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 روز
    });

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        avatar: user.avatar
      },
      token
    };

  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'خطا در سرور' };
  }
}

export async function register(userData) {
  try {
    // بررسی وجود کاربر
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { email: userData.email },
          { username: userData.username }
        ]
      }
    });

    if (existingUser) {
      return { 
        success: false, 
        message: 'ایمیل یا نام کاربری قبلاً استفاده شده است' 
      };
    }

    // ایجاد کاربر جدید
    const user = await User.create(userData);

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    };

  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'خطا در ایجاد حساب کاربری' };
  }
}