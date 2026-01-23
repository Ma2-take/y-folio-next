import { NextResponse } from 'next/server';

/**
 * スケジュールされたリマインダーを自動送信するCronジョブエンドポイント
 * 
 * Vercel Cron Jobsまたは外部cronサービスから定期的に呼び出されます
 * 推奨実行頻度: 15分〜1時間ごと
 * 
 * Vercel設定例 (vercel.json):
 * {
 *   "crons": [{
 *     "path": "/api/cron/send-reminders",
 *     "schedule": "0 * * * *"
 *   }]
 * }
 * 
 * セキュリティ: 本番環境では認証トークンの追加を推奨
 */
export async function GET(request: Request) {
  try {
    // セキュリティチェック（オプション）
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // バッチ送信APIを呼び出す
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const sendUrl = `${baseUrl}/api/ai/resume-review/reminders/send?batch=true`;

    const response = await fetch(sendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'バッチ送信APIの呼び出しに失敗しました');
    }

    const result = await response.json();

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      ...result,
    });
  } catch (error) {
    console.error('Cron job エラー:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Cron jobの実行に失敗しました',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// POSTメソッドでも対応（一部のcronサービス向け）
export async function POST(request: Request) {
  return GET(request);
}
