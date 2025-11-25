import { NextResponse } from 'next/server';
import { register } from '../../../../app/auth/actions/authActions';

export async function POST(request) {
  try {
    const userData = await request.json();
    const result = await register(userData);
    
    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'خطای سرور' },
      { status: 500 }
    );
  }
}