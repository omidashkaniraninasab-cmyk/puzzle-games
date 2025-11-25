export default function CrosswordMenu({ onStart }) {
  return (
    <div className="menu-container">
      <h2>بازی کراس‌ورد</h2>
      <p>جدول کلمات متقاطع فارسی</p>
      <button onClick={onStart}>شروع بازی</button>
    </div>
  );
}