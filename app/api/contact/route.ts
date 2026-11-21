import { NextResponse } from 'next/server';
import { isNonEmpty, isValidEmail } from '@/lib/validation';

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();
    const errors: Record<string, string> = {};
    if (!isNonEmpty(name || '')) errors.name = 'Name is required.';
    if (!isValidEmail(email || '')) errors.email = 'Valid email required.';
    if (!isNonEmpty(subject || '')) errors.subject = 'Subject is required.';
    if (!isNonEmpty(message || '')) errors.message = 'Message is required.';
    if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 400 });

    console.log('[contact]', { name, email, subject, message });
    return NextResponse.json({ message: 'Message received. (Demo — no email is actually sent.)' });
  } catch {
    return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 });
  }
}