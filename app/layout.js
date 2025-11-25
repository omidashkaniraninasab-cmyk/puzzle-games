import './globals.css'
import { AuthProvider } from './hooks/useAuth'

export const metadata = {
  title: 'بازی‌های پازل',
  description: 'سایت بازی‌های کراس‌ورد، چلنج و مموری‌کارت',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}