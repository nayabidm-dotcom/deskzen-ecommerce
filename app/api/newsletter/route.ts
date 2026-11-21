import { NextResponse } from 'next/server';
import { isValidEmail } from '@/lib/validation';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!isValidEmail(email || '')) {
      return NextResponse.json({ message: 'Please enter a valid email address.' }, { status: 400 });
    }
    console.log('[newsletter] subscribe:', email);
    return NextResponse.json({ message: 'Thanks for subscribing! (Demo — no email is actually sent.)' });
  } catch {
    return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 });
  }
}