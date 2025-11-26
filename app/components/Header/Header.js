'use client';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.reload(); // فقط صفحه را رفرش کن
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <span>پازل گیمز</span> {/* لینک به / حذف شد */}
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
              <span 
                className="auth-link" 
                onClick={() => window.showAuthModal('login')}
                style={{cursor: 'pointer'}}
              >
                ورود
              </span>
              <span 
                className="auth-link" 
                onClick={() => window.showAuthModal('register')}
                style={{cursor: 'pointer'}}
              >
                ثبت‌نام
              </span>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}