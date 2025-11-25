'use client';
import { useAuth } from '../../hooks/useAuth';
import Link from 'next/link';

export default function Header() {
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link href="/">پازل گیمز</Link>
        </div>
        
        <nav className="nav">
          {loading ? (
            <div>در حال بارگذاری...</div>
          ) : user ? (
            <div className="user-menu">
              <span>خوش آمدید، {user.firstName}</span>
              <Link href="/profile">پروفایل</Link>
              <button onClick={handleLogout}>خروج</button>
            </div>
          ) : (
            <div className="auth-links">
              <Link href="/auth/login">ورود</Link>
              <Link href="/auth/register">ثبت‌نام</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}