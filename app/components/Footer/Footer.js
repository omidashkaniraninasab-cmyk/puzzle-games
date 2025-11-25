import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>پازل گیمز</h3>
            <p>سایت بازی‌های سرگرم‌کننده و آموزشی</p>
          </div>
          <div className="footer-section">
            <h4>بازی‌ها</h4>
            <ul>
              <li><Link href="/">کراس‌ورد</Link></li>
              <li><Link href="/">چلنج</Link></li>
              <li><Link href="/">مموری‌کارت</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>لینک‌های مفید</h4>
            <ul>
              <li><Link href="/auth/login">ورود</Link></li>
              <li><Link href="/auth/register">ثبت‌نام</Link></li>
              <li><Link href="/profile">پروفایل</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} پازل گیمز. تمام حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}