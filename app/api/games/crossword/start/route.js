import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { CrosswordGame } from '@/models';

export async function POST(request) {
  try {
    const { puzzleId } = await request.json();
    
    // در آینده از next-auth استفاده می‌کنیم
    const userId = request.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'لطفاً وارد شوید' },
        { status: 401 }
      );
    }

    // ایجاد بازی جدید
    const game = await CrosswordGame.create({
      userId,
      puzzleId,
      currentGrid: generateEmptyGrid(),
      correctGrid: await getPuzzleData(puzzleId)
    });

    return NextResponse.json({
      success: true,
      gameId: game.id,
      grid: game.currentGrid,
      puzzle: game.correctGrid
    });

  } catch (error) {
    console.error('Error starting crossword game:', error);
    return NextResponse.json(
      { success: false, message: 'خطا در شروع بازی' },
      { status: 500 }
    );
  }
}

function generateEmptyGrid() {
  // تولید جدول خالی
  return Array(10).fill().map(() => Array(10).fill(''));
}

async function getPuzzleData(puzzleId) {
  // در آینده از دیتابیس پازل‌ها می‌خوانیم
  return {
    grid: Array(10).fill().map(() => Array(10).fill('')),
    words: []
  };
}