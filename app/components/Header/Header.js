'use client';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  const handleLogin = () => {
    window.location.href = '/auth/login';
  };

  const handleRegister = () => {
    window.location.href = '/auth/register';
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <span>پازل گیمز</span>
        </div>
        
        <nav className="nav">
          {loading ? (
            <div>در حال بارگذاری...</div>
          ) : user ? (
            <div className="user-menu">
              <span>خوش آمدید، {user.displayName}</span>
              <button onClick={handleLogout}>خروج</button>
            </div>
          ) : (
            <div className="auth-links">
              <button className="auth-link" onClick={handleLogin}>
                ورود
              </button>
              <button className="auth-link" onClick={handleRegister}>
                ثبت‌نام
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}