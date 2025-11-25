export function generateChallenge() {
  return {
    question: "سوال نمونه چلنج",
    options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
    correctAnswer: 0
  };
}

export function calculateScore(time, correctAnswers) {
  return correctAnswers * 100 - time;
}