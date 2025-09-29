import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const data = await request.json();

  console.log('Received data:', data);
  try {
    console.log('user', data.user);

    // 1. ユーザー情報 upsert
    const user = await prisma.user.upsert({
      where: { id: data.user.id },
      update: {
        email: data.user.email,     // 最新のメールで更新
        name: data.user.name,
      },
      create: {
        id: data.user.uid,          // 主キーとして保存
        email: data.user.email,
        name: data.user.name,
      },
    });

    // 2. ポートフォリオ基本設定
    // const portfolio = await prisma.portfolio.upsert({
    //   where: { id: data.id },
    //   update: {
    //     isPublic: data.publicationSettings.isPublic,
    //     autoDeleteAfterOneYear: data.publicationSettings.autoDeleteAfterOneYear,
    //   },
    //   create: {
    //     id: data.id,
    //     userId: data.userId,
    //     isPublic: data.publicationSettings.isPublic,
    //     autoDeleteAfterOneYear: data.publicationSettings.autoDeleteAfterOneYear,
    //   },
    // });

    // // 3. 基本情報（別テーブルで分けてないならスキップ）

    // // 4. スキル・技術
    // await prisma.portfolioSkills.upsert({
    //   where: { portfolioId: data.id },
    //   update: {
    //     skillTags: data.skills.skillTags,
    //     certifications: data.skills.certifications,
    //   },
    //   create: {
    //     portfolioId: data.id,
    //     skillTags: data.skills.skillTags,
    //     certifications: data.skills.certifications,
    //   },
    // });

    // // 5. プロジェクト（全削除→再挿入）
    // await prisma.portfolioProject.deleteMany({
    //   where: { portfolioId: data.id },
    // });

    // await prisma.portfolioProject.createMany({
    //   data: data.projects.map((p: any, index: number) => ({
    //     id: p.id,
    //     portfolioId: data.id,
    //     name: p.name,
    //     description: p.description,
    //     url: p.url || '',
    //     sortOrder: index,
    //   })),
    // });

    // // 6. 経験・活動
    // await prisma.portfolioExperience.upsert({
    //   where: { portfolioId: data.id },
    //   update: {
    //     internship: data.experience.internship,
    //     extracurricular: data.experience.extracurricular,
    //     awards: data.experience.awards,
    //   },
    //   create: {
    //     portfolioId: data.id,
    //     internship: data.experience.internship,
    //     extracurricular: data.experience.extracurricular,
    //     awards: data.experience.awards,
    //   },
    // });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('保存エラー:', e);
    return NextResponse.json({ success: false, error: String(e) }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
