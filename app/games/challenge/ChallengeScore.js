export default function ChallengeScore({ score }) {
  return (
    <div className="score-container">
      <h2>امتیاز شما</h2>
      <div className="score">{score}</div>
      <button onClick={() => window.location.reload()}>بازی مجدد</button>
    </div>
  );
}