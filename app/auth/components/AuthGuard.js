'use client';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function AuthGuard({ children, requireAuth = true }) {
  const { user, loading, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return <div>در حال بررسی احراز هویت...</div>;
  }

  if (requireAuth && !user) {
    window.location.href = '/auth/login';
    return null;
  }

  if (!requireAuth && user) {
    window.location.href = '/profile';
    return null;
  }

  return children;
}