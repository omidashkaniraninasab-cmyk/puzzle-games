import { NextResponse } from 'next/server';
import { CrosswordGame } from '@/models';

export async function POST(request) {
  try {
    const { gameId, row, col, letter } = await request.json();
    const userId = request.headers.get('x-user-id');

    const game = await CrosswordGame.findByPk(gameId);
    
    if (!game || game.userId !== userId) {
      return NextResponse.json(
        { success: false, message: 'بازی یافت نشد' },
        { status: 404 }
      );
    }

    if (game.isCompleted) {
      return NextResponse.json(
        { success: false, message: 'بازی تمام شده است' },
        { status: 400 }
      );
    }

    // آپدیت شبکه
    const newGrid = [...game.currentGrid];
    newGrid[row][col] = letter;
    
    // ذخیره حرکت
    const moves = [...game.moves, { row, col, letter, timestamp: new Date() }];

    // بررسی کامل شدن بازی
    const isCompleted = checkCompletion(newGrid, game.correctGrid);
    const score = isCompleted ? calculateScore(game.startTime, moves.length) : game.score;

    await game.update({
      currentGrid: newGrid,
      moves,
      isCompleted,
      score,
      ...(isCompleted && { 
        endTime: new Date(),
        timeSpent: Math.floor((new Date() - game.startTime) / 1000)
      })
    });

    return NextResponse.json({
      success: true,
      grid: newGrid,
      isCompleted,
      score,
      correct: game.correctGrid.grid[row][col] === letter
    });

  } catch (error) {
    console.error('Error making move:', error);
    return NextResponse.json(
      { success: false, message: 'خطا در ثبت حرکت' },
      { status: 500 }
    );
  }
}

function checkCompletion(currentGrid, correctGrid) {
  return JSON.stringify(currentGrid) === JSON.stringify(correctGrid.grid);
}

function calculateScore(startTime, moves) {
  const timeSpent = Math.floor((new Date() - startTime) / 1000);
  return Math.max(1000 - timeSpent - moves * 5, 100);
}