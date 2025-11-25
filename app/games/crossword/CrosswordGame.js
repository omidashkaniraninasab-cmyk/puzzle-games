'use client';
import { useState } from 'react';
import CrosswordMenu from './CrosswordMenu';
import CrosswordScore from './CrosswordScore';
import styles from './Crossword.module.css';

export default function CrosswordGame() {
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
      {gameState === 'menu' && <CrosswordMenu onStart={startGame} />}
      {gameState === 'playing' && (
        <div className={styles.gameBoard}>
          <h2>بازی کراس‌ورد</h2>
          <p>این قسمت بازی کراس‌ورد خواهد بود</p>
          <button onClick={() => endGame(100)}>پایان بازی</button>
        </div>
      )}
      {gameState === 'score' && <CrosswordScore score={score} />}
    </div>
  );
}