import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

// SMTP設定
const smtpConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_PORT === '465', // 465はsecure、587はSTARTTLS
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASSWORD || '',
  },
};

// トランスポーターのシングルトンインスタンス
let transporter: Transporter | null = null;

/**
 * メールトランスポーターを取得
 */
export function getTransporter(): Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport(smtpConfig);
  }
  return transporter;
}

/**
 * メール送信オプション
 */
export interface SendEmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  from?: string;
}

/**
 * メール送信結果
 */
export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * メールを送信する
 */
export async function sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
  try {
    // SMTP設定の検証
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      return {
        success: false,
        error: 'SMTP設定が不完全です。環境変数を確認してください。',
      };
    }

    // メールアドレスの簡易検証
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(options.to)) {
      return {
        success: false,
        error: '無効なメールアドレスです。',
      };
    }

    const transporter = getTransporter();

    // メール送信
    const info = await transporter.sendMail({
      from: options.from || process.env.SMTP_FROM || process.env.SMTP_USER,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('メール送信エラー:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'メール送信に失敗しました',
    };
  }
}

/**
 * SMTP接続をテストする
 */
export async function testConnection(): Promise<boolean> {
  try {
    const transporter = getTransporter();
    await transporter.verify();
    return true;
  } catch (error) {
    console.error('SMTP接続テスト失敗:', error);
    return false;
  }
}

/**
 * 複数のメールを送信する（バッチ処理用）
 */
export async function sendBatchEmails(
  emails: SendEmailOptions[]
): Promise<SendEmailResult[]> {
  const results: SendEmailResult[] = [];

  for (const emailOptions of emails) {
    const result = await sendEmail(emailOptions);
    results.push(result);

    // レート制限のため、各送信間に少し待機
    if (emails.length > 1) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  return results;
}
