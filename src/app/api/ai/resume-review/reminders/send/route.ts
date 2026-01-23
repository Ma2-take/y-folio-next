import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email/mailer';
import { generateEmailTemplate } from '@/lib/email/templates';
import type { ReminderType } from '@/types/AiReview';

/**
 * リマインダーを手動で送信するAPIエンドポイント
 * POST /api/ai/resume-review/reminders/send?id=<reminderId>
 */
export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const reminderId = searchParams.get('id')?.trim();

    if (!reminderId) {
      return NextResponse.json(
        { error: 'リマインダーIDが必要です' },
        { status: 400 }
      );
    }

    // リマインダー情報を取得
    const reminder = await prisma.reviewReminder.findUnique({
      where: { id: reminderId },
    });

    if (!reminder) {
      return NextResponse.json(
        { error: 'リマインダーが見つかりません' },
        { status: 404 }
      );
    }

    // メール送信チャネルの確認
    if (reminder.channel !== 'email') {
      return NextResponse.json(
        { error: 'このリマインダーはメール送信用ではありません' },
        { status: 400 }
      );
    }

    // ユーザー情報を取得
    const user = await prisma.user.findFirst({
      where: { id: reminder.userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'ユーザーが見つかりません' },
        { status: 404 }
      );
    }

    if (!user.email) {
      return NextResponse.json(
        { error: 'ユーザーのメールアドレスが登録されていません' },
        { status: 400 }
      );
    }

    // メールテンプレートを生成
    const emailTemplate = generateEmailTemplate({
      userName: user.name || undefined,
      userEmail: user.email,
      reminderType: reminder.type as ReminderType,
      scheduledAt: reminder.scheduledAt.toISOString(),
      payload: reminder.payload as Record<string, unknown> | null,
    });

    // メールを送信
    const result = await sendEmail({
      to: user.email,
      subject: emailTemplate.subject,
      text: emailTemplate.text,
      html: emailTemplate.html,
    });

    if (!result.success) {
      console.error('メール送信失敗:', result.error);
      return NextResponse.json(
        { error: result.error || 'メールの送信に失敗しました' },
        { status: 500 }
      );
    }

    // リマインダーのステータスを更新
    await prisma.reviewReminder.update({
      where: { id: reminderId },
      data: { status: 'sent' },
    });

    return NextResponse.json({
      success: true,
      message: 'メールを送信しました',
      messageId: result.messageId,
    });
  } catch (error) {
    console.error('リマインダー送信エラー:', error);
    return NextResponse.json(
      { error: 'リマインダーの送信に失敗しました' },
      { status: 500 }
    );
  }
}

/**
 * スケジュールされたリマインダーをバッチ送信
 * GET /api/ai/resume-review/reminders/send?batch=true
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isBatch = searchParams.get('batch') === 'true';

    if (!isBatch) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      );
    }

    // 送信対象のリマインダーを取得
    // scheduledAtが現在時刻より前、statusがpending、channelがemail
    const now = new Date();
    const reminders = await prisma.reviewReminder.findMany({
      where: {
        status: 'pending',
        channel: 'email',
        scheduledAt: {
          lte: now,
        },
      },
      take: 50, // 一度に最大50件
    });

    if (reminders.length === 0) {
      return NextResponse.json({
        success: true,
        message: '送信対象のリマインダーはありません',
        sent: 0,
      });
    }

    // 各リマインダーを処理
    const results = [];
    let successCount = 0;
    let failCount = 0;

    for (const reminder of reminders) {
      try {
        // ユーザー情報を取得
        const user = await prisma.user.findFirst({
          where: { id: reminder.userId },
        });

        if (!user || !user.email) {
          console.error(`ユーザー情報が不完全: reminderId=${reminder.id}`);
          failCount++;
          continue;
        }

        // メールテンプレートを生成
        const emailTemplate = generateEmailTemplate({
          userName: user.name || undefined,
          userEmail: user.email,
          reminderType: reminder.type as ReminderType,
          scheduledAt: reminder.scheduledAt.toISOString(),
          payload: reminder.payload as Record<string, unknown> | null,
        });

        // メールを送信
        const result = await sendEmail({
          to: user.email,
          subject: emailTemplate.subject,
          text: emailTemplate.text,
          html: emailTemplate.html,
        });

        if (result.success) {
          // ステータスを更新
          await prisma.reviewReminder.update({
            where: { id: reminder.id },
            data: { status: 'sent' },
          });
          successCount++;
          results.push({
            reminderId: reminder.id,
            status: 'success',
            messageId: result.messageId,
          });
        } else {
          failCount++;
          results.push({
            reminderId: reminder.id,
            status: 'failed',
            error: result.error,
          });
        }

        // レート制限のため待機
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`リマインダー送信エラー: reminderId=${reminder.id}`, error);
        failCount++;
        results.push({
          reminderId: reminder.id,
          status: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `バッチ送信完了: 成功=${successCount}, 失敗=${failCount}`,
      sent: successCount,
      failed: failCount,
      results,
    });
  } catch (error) {
    console.error('バッチ送信エラー:', error);
    return NextResponse.json(
      { error: 'バッチ送信に失敗しました' },
      { status: 500 }
    );
  }
}
