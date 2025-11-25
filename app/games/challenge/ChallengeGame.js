'use client';
import { useState } from 'react';
import ChallengeMenu from './ChallengeMenu';
import ChallengeScore from './ChallengeScore';
import styles from './Challenge.module.css';

export default function ChallengeGame() {
  const [gameState, setGameState] = useState('menu');
  const [score, setScore] = useState(0);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
  };

  const endGame = (finalScore) => {
    setGameState('score');
    setScore(finalScore);
  };

  return (
    <div className={styles.container}>
      {gameState === 'menu' && <ChallengeMenu onStart={startGame} />}
      {gameState === 'playing' && (
        <div className={styles.gameBoard}>
          <h2>بازی چلنج</h2>
          <p>این قسمت بازی چلنج خواهد بود</p>
          <button onClick={() => endGame(150)}>پایان بازی</button>
        </div>
      )}
      {gameState === 'score' && <ChallengeScore score={score} />}
    </div>
  );
}