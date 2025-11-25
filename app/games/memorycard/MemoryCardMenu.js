export default function MemoryCardMenu({ onStart }) {
  return (
    <div className="menu-container">
      <h2>بازی مموری کارت</h2>
      <p>تمرین حافظه با کارت‌های جفت</p>
      <button onClick={onStart}>شروع بازی</button>
    </div>
  );
}