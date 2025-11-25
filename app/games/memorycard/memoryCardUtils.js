export function generateCards() {
  const symbols = ['🍎', '🍌', '🍒', '🍇', '🍊', '🍋', '🍉', '🍓'];
  const cards = [...symbols, ...symbols];
  return shuffleArray(cards);
}

export function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function calculateMemoryScore(pairs, time, moves) {
  return (pairs * 50) - (time / 10) - (moves / 2);
}