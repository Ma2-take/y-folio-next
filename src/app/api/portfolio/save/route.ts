import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // 受け取ったデータは何もせず、成功レスポンスのみ返す
  return NextResponse.json({ success: true });
} 