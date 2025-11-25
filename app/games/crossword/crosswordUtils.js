export function generateCrossword() {
  return {
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]
    ],
    words: [
      { word: "TEST", clue: "یک کلمه تستی" }
    ]
  };
}

export function calculateCrosswordScore(completedWords, time) {
  return completedWords * 50 - time;
}