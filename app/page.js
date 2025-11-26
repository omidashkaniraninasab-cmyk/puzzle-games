'use client';
import { useState } from 'react';
import Header from './components/Header/Header';

export default function Home() {
  const [activeGame, setActiveGame] = useState(null);

  const games = [
    { id: 'crossword', name: 'کراس‌ورد' },
    { id: 'challenge', name: 'چلنج' },
    { id: 'memorycard', name: 'مموری‌کارت' }
  ];

  return (
    <div className="container">
      <Header />
      
      <main>
        {!activeGame ? (
          <div className="games-menu">
            <h1>به بازی‌های ما خوش آمدید!</h1>
            <div className="games-grid">
              {games.map(game => (
                <button
                  key={game.id}
                  className="game-card"
                  onClick={() => setActiveGame(game.id)}
                >
                  {game.name}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="game-container">
            <button 
              className="back-button"
              onClick={() => setActiveGame(null)}
            >
              بازگشت به منوی اصلی
            </button>
            <div className="game-content">
              <h2>بازی {games.find(g => g.id === activeGame)?.name}</h2>
              <p>این بازی به زودی اضافه خواهد شد</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}