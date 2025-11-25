import LoginForm from './LoginForm'

export const metadata = {
  title: 'ورود به حساب کاربری',
  description: 'صفحه ورود به بازی‌های پازل',
}

export default function LoginPage() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>ورود به حساب کاربری</h1>
        <LoginForm />
      </div>
    </div>
  )
}