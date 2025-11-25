'use client';
import { useState } from 'react';
import MemoryCardMenu from './MemoryCardMenu';
import MemoryCardScore from './MemoryCardScore';
import styles from './MemoryCard.module.css';

export default function MemoryCardGame() {
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
      {gameState === 'menu' && <MemoryCardMenu onStart={startGame} />}
      {gameState === 'playing' && (
        <div className={styles.gameBoard}>
          <h2>بازی مموری کارت</h2>
          <p>این قسمت بازی مموری کارت خواهد بود</p>
          <button onClick={() => endGame(200)}>پایان بازی</button>
        </div>
      )}
      {gameState === 'score' && <MemoryCardScore score={score} />}
    </div>
  );
}