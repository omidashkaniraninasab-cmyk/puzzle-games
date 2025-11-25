export default function ChallengeMenu({ onStart }) {
  return (
    <div className="menu-container">
      <h2>بازی چلنج</h2>
      <p>یک بازی چالش‌برانگیز و سرگرم‌کننده</p>
      <button onClick={onStart}>شروع بازی</button>
    </div>
  );
}