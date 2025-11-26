'use client';
import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import LoginModal from './components/Auth/LoginModal';
import RegisterModal from './components/Auth/RegisterModal';

export default function Home() {
  const [activeGame, setActiveGame] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const games = [
    { id: 'crossword', name: 'کراس‌ورد' },
    { id: 'challenge', name: 'چلنج' },
    { id: 'memorycard', name: 'مموری‌کارت' }
  ];

  //全局 functions برای modalها
  useEffect(() => {
    window.showAuthModal = (type) => {
      if (type === 'login') setShowLoginModal(true);
      if (type === 'register') setShowRegisterModal(true);
    };
  }, []);

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
              {/* محتوای بازی اینجا لود می‌شود */}
              <h2>بازی {games.find(g => g.id === activeGame)?.name}</h2>
              <p>این بازی به زودی اضافه خواهد شد</p>
            </div>
          </div>
        )}
      </main>

      {/* Modalهای احراز هویت */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
      {showRegisterModal && (
        <RegisterModal onClose={() => setShowRegisterModal(false)} />
      )}
    </div>
  );
}