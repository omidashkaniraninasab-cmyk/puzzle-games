'use client';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    displayName: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('📝 Form submitted:', formData);

    try {
      const result = await register(formData);
      console.log('🔔 Register result:', result);
      
      if (result.success) {
        console.log('✅ Redirecting to HOME...');
        router.push('/'); // به صفحه اصلی برو، نه profile
        router.refresh(); // صفحه را refresh کن
      } else {
        setError(result.message || 'خطای ناشناخته');
      }
    } catch (err) {
      console.error('❌ Register error:', err);
      setError('خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
      console.log('🏁 Loading finished');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>ثبت‌نام در پازل گیمز</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>نام کاربری:</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
              autoComplete="username" // اضافه شد
            />
          </div>

          <div className="form-group">
            <label>نام نمایشی:</label>
            <input
              type="text"
              value={formData.displayName}
              onChange={(e) => setFormData({...formData, displayName: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>ایمیل:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              autoComplete="email" // اضافه شد
            />
          </div>

          <div className="form-group">
            <label>رمز عبور:</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              minLength="8"
              autoComplete="new-password"
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'در حال ثبت‌نام...' : 'ثبت‌نام'}
          </button>
        </form>

        <p className="auth-link">
          قبلاً حساب دارید؟ <Link href="/auth/login">ورود</Link>
        </p>
      </div>
    </div>
  );
}