import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const data = await request.json();

  console.log('Received data:', data);
  try {
    // 1. ユーザー情報 upsert
    const user = await prisma.user.upsert({
      where: { email: data.user.email },
      update: {
        email: data.user.email,
        name: data.user.name,
      },
      create: {
        email: data.user.email,
        name: data.user.name,
      },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('保存エラー:', e);
    return NextResponse.json({ success: false, error: String(e) }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
