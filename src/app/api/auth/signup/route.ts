import { NextRequest, NextResponse } from 'next/server';

// データベース接続（実際の実装では適切なDBライブラリを使用）
let mockUsers = [
  {
    id: 'user_001',
    email: 'tanaka@example.com',
    password_hash: '$2y$10$example_hash',
    name: '田中 太郎',
    university: '東京大学 情報科学科',
    grade: '4年生',
    birth_date: '2000-01-01',
    self_introduction: 'Web開発とAI技術に興味があり、複数のプロジェクトを手がけています。'
  }
];

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, university, grade, birthDate, selfIntroduction } = await request.json();

    // バリデーション
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: '必須項目を入力してください' },
        { status: 400 }
      );
    }

    // メールアドレスの重複チェック
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'このメールアドレスは既に登録されています' },
        { status: 409 }
      );
    }

    // パスワード強度チェック
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'パスワードは8文字以上で入力してください' },
        { status: 400 }
      );
    }

    // 新しいユーザー作成
    const newUser = {
      id: `user_${Date.now()}`,
      email,
      password_hash: `$2y$10$hashed_${password}`, // 実際の実装ではbcrypt.hashSyncを使用
      name,
      university: university || '',
      grade: grade || '',
      birth_date: birthDate || null,
      self_introduction: selfIntroduction || ''
    };

    // ユーザーを保存（実際の実装ではデータベースに保存）
    mockUsers.push(newUser);

    // レスポンス用のユーザー情報（パスワードは除外）
    const { password_hash, ...userInfo } = newUser;

    return NextResponse.json({
      success: true,
      user: userInfo,
      message: 'アカウントが正常に作成されました'
    }, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: '新規登録処理中にエラーが発生しました' },
      { status: 500 }
    );
  }
} 