'use client';
import { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
// import Footer from './components/Footer/Footer'; // موقتاً کامنت کنید
import CrosswordGame from './games/crossword/CrosswordGame';
import ChallengeGame from './games/challenge/ChallengeGame';
import MemoryCardGame from './games/memorycard/MemoryCardGame';

export default function Home() {
  const [activeGame, setActiveGame] = useState(null);

  const games = [
    { id: 'crossword', name: 'کراس‌ورد', component: CrosswordGame },
    { id: 'challenge', name: 'چلنج', component: ChallengeGame },
    { id: 'memorycard', name: 'مموری‌کارت', component: MemoryCardGame }
  ];

  const renderGame = () => {
    const GameComponent = games.find(game => game.id === activeGame)?.component;
    return GameComponent ? <GameComponent /> : null;
  };

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
            {renderGame()}
          </div>
        )}
      </main>

        <Footer />
    </div>
  );
}