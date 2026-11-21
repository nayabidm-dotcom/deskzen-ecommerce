import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { orderNumber: string } }) {
  return NextResponse.json({
    orderNumber: params.orderNumber,
    note: 'In demo mode, order details are stored in the browser. Enable Supabase to persist orders server-side.',
  });
}