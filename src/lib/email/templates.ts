import type { ReminderType } from '@/types/AiReview';

/**
 * メールテンプレートのパラメータ
 */
export interface EmailTemplateParams {
  userName?: string;
  userEmail: string;
  reminderType: ReminderType;
  scheduledAt: string;
  payload?: Record<string, unknown> | null;
}

/**
 * メールテンプレートの生成結果
 */
export interface EmailTemplate {
  subject: string;
  text: string;
  html: string;
}

/**
 * 日時を読みやすい形式にフォーマット
 */
function formatDateTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  } catch {
    return isoString;
  }
}

/**
 * 再添削フォローアップメールテンプレート
 */
function getFollowUpReviewTemplate(params: EmailTemplateParams): EmailTemplate {
  const userName = params.userName || 'ユーザー';
  const formattedDate = formatDateTime(params.scheduledAt);

  return {
    subject: '【Y-folio】添削レビューのフォローアップ',
    text: `
${userName}様

Y-folioをご利用いただきありがとうございます。

以前ご依頼いただいた添削レビューについて、フォローアップのお知らせです。

レビュー日時: ${formattedDate}

添削結果を確認し、改善点を反映されましたか？
ダッシュボードから最新の添削履歴を確認できます。

さらなる改善のため、再度レビューを受けることをお勧めします。

▼ ダッシュボードへアクセス
https://y-folio.com/dashboard

ご不明な点がございましたら、お気軽にお問い合わせください。

---
Y-folio運営チーム
    `.trim(),
    html: `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>添削レビューのフォローアップ</title>
</head>
<body style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
    <h1 style="margin: 0; font-size: 24px;">Y-folio</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">添削レビューのフォローアップ</p>
  </div>
  
  <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
    <p style="margin-top: 0;">こんにちは、${userName}様</p>
    
    <p>Y-folioをご利用いただきありがとうございます。</p>
    
    <p>以前ご依頼いただいた添削レビューについて、フォローアップのお知らせです。</p>
    
    <div style="background: white; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0; color: #667eea; font-weight: bold;">レビュー日時</p>
      <p style="margin: 5px 0 0 0; font-size: 16px;">${formattedDate}</p>
    </div>
    
    <p>添削結果を確認し、改善点を反映されましたか？<br>
    ダッシュボードから最新の添削履歴を確認できます。</p>
    
    <p>さらなる改善のため、再度レビューを受けることをお勧めします。</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://y-folio.com/dashboard" style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">ダッシュボードへアクセス</a>
    </div>
    
    <p style="font-size: 14px; color: #666;">ご不明な点がございましたら、お気軽にお問い合わせください。</p>
    
    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
    
    <p style="font-size: 12px; color: #999; text-align: center;">Y-folio運営チーム</p>
  </div>
</body>
</html>
    `.trim(),
  };
}

/**
 * 面接前リマインドメールテンプレート
 */
function getInterviewPreparationTemplate(params: EmailTemplateParams): EmailTemplate {
  const userName = params.userName || 'ユーザー';
  const formattedDate = formatDateTime(params.scheduledAt);
  const company = (params.payload?.company as string) || '企業';
  const position = (params.payload?.position as string) || 'ポジション';

  return {
    subject: `【Y-folio】面接前のリマインド - ${company}`,
    text: `
${userName}様

Y-folioをご利用いただきありがとうございます。

明日の面接についてリマインドいたします。

企業名: ${company}
ポジション: ${position}
面接日時: ${formattedDate}

◆ 面接前の確認事項
- ポートフォリオの内容を再確認しましょう
- 自己PRと志望動機を整理しておきましょう
- 企業研究をもう一度見直しましょう
- 質問事項をいくつか用意しておきましょう

▼ ポートフォリオを確認
https://y-folio.com/dashboard

面接の成功をお祈りしております！

---
Y-folio運営チーム
    `.trim(),
    html: `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>面接前のリマインド</title>
</head>
<body style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
    <h1 style="margin: 0; font-size: 24px;">Y-folio</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">面接前のリマインド</p>
  </div>
  
  <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
    <p style="margin-top: 0;">こんにちは、${userName}様</p>
    
    <p>Y-folioをご利用いただきありがとうございます。</p>
    
    <p style="font-size: 18px; font-weight: bold; color: #667eea;">明日の面接についてリマインドいたします。</p>
    
    <div style="background: white; padding: 20px; margin: 20px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <div style="margin-bottom: 15px;">
        <p style="margin: 0; color: #666; font-size: 14px;">企業名</p>
        <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: bold;">${company}</p>
      </div>
      <div style="margin-bottom: 15px;">
        <p style="margin: 0; color: #666; font-size: 14px;">ポジション</p>
        <p style="margin: 5px 0 0 0; font-size: 16px;">${position}</p>
      </div>
      <div>
        <p style="margin: 0; color: #666; font-size: 14px;">面接日時</p>
        <p style="margin: 5px 0 0 0; font-size: 16px; color: #667eea; font-weight: bold;">${formattedDate}</p>
      </div>
    </div>
    
    <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0 0 10px 0; font-weight: bold; color: #856404;">◆ 面接前の確認事項</p>
      <ul style="margin: 0; padding-left: 20px; color: #856404;">
        <li>ポートフォリオの内容を再確認しましょう</li>
        <li>自己PRと志望動機を整理しておきましょう</li>
        <li>企業研究をもう一度見直しましょう</li>
        <li>質問事項をいくつか用意しておきましょう</li>
      </ul>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://y-folio.com/dashboard" style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">ポートフォリオを確認</a>
    </div>
    
    <p style="text-align: center; font-size: 18px; color: #667eea; font-weight: bold;">面接の成功をお祈りしております！</p>
    
    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
    
    <p style="font-size: 12px; color: #999; text-align: center;">Y-folio運営チーム</p>
  </div>
</body>
</html>
    `.trim(),
  };
}

/**
 * 面接後フォローアップメールテンプレート
 */
function getInterviewFollowupTemplate(params: EmailTemplateParams): EmailTemplate {
  const userName = params.userName || 'ユーザー';
  const company = (params.payload?.company as string) || '企業';

  return {
    subject: `【Y-folio】面接後のフォローアップ - ${company}`,
    text: `
${userName}様

Y-folioをご利用いただきありがとうございます。

${company}での面接、お疲れ様でした。

◆ 面接後にやっておくべきこと
- 面接の振り返りメモを作成しましょう
- 質問された内容をポートフォリオに反映しましょう
- お礼のメールを送ることを検討しましょう
- 次の面接や選考に備えて準備を始めましょう

Y-folioでは面接練習機能もご利用いただけます。
次の機会に向けて、さらなるスキルアップを目指しましょう。

▼ ダッシュボードへアクセス
https://y-folio.com/dashboard

引き続きY-folioをよろしくお願いいたします。

---
Y-folio運営チーム
    `.trim(),
    html: `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>面接後のフォローアップ</title>
</head>
<body style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
    <h1 style="margin: 0; font-size: 24px;">Y-folio</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">面接後のフォローアップ</p>
  </div>
  
  <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
    <p style="margin-top: 0;">こんにちは、${userName}様</p>
    
    <p>Y-folioをご利用いただきありがとうございます。</p>
    
    <p style="font-size: 18px; font-weight: bold; color: #667eea;">${company}での面接、お疲れ様でした。</p>
    
    <div style="background: #d1fae5; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0 0 10px 0; font-weight: bold; color: #065f46;">◆ 面接後にやっておくべきこと</p>
      <ul style="margin: 0; padding-left: 20px; color: #065f46;">
        <li>面接の振り返りメモを作成しましょう</li>
        <li>質問された内容をポートフォリオに反映しましょう</li>
        <li>お礼のメールを送ることを検討しましょう</li>
        <li>次の面接や選考に備えて準備を始めましょう</li>
      </ul>
    </div>
    
    <p>Y-folioでは面接練習機能もご利用いただけます。<br>
    次の機会に向けて、さらなるスキルアップを目指しましょう。</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://y-folio.com/dashboard" style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">ダッシュボードへアクセス</a>
    </div>
    
    <p style="font-size: 14px; color: #666;">引き続きY-folioをよろしくお願いいたします。</p>
    
    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
    
    <p style="font-size: 12px; color: #999; text-align: center;">Y-folio運営チーム</p>
  </div>
</body>
</html>
    `.trim(),
  };
}

/**
 * カスタムメールテンプレート
 */
function getCustomTemplate(params: EmailTemplateParams): EmailTemplate {
  const userName = params.userName || 'ユーザー';
  const message = (params.payload?.message as string) || 'リマインドのお知らせです。';
  const note = (params.payload?.note as string) || '';

  return {
    subject: '【Y-folio】リマインドのお知らせ',
    text: `
${userName}様

Y-folioをご利用いただきありがとうございます。

${message}

${note ? `\n${note}\n` : ''}

▼ ダッシュボードへアクセス
https://y-folio.com/dashboard

ご不明な点がございましたら、お気軽にお問い合わせください。

---
Y-folio運営チーム
    `.trim(),
    html: `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>リマインドのお知らせ</title>
</head>
<body style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
    <h1 style="margin: 0; font-size: 24px;">Y-folio</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">リマインドのお知らせ</p>
  </div>
  
  <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
    <p style="margin-top: 0;">こんにちは、${userName}様</p>
    
    <p>Y-folioをご利用いただきありがとうございます。</p>
    
    <div style="background: white; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0; font-size: 16px;">${message}</p>
    </div>
    
    ${note ? `<div style="background: #fff; padding: 15px; margin: 20px 0; border-radius: 4px; border: 1px solid #ddd;">
      <p style="margin: 0; white-space: pre-wrap;">${note}</p>
    </div>` : ''}
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://y-folio.com/dashboard" style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">ダッシュボードへアクセス</a>
    </div>
    
    <p style="font-size: 14px; color: #666;">ご不明な点がございましたら、お気軽にお問い合わせください。</p>
    
    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
    
    <p style="font-size: 12px; color: #999; text-align: center;">Y-folio運営チーム</p>
  </div>
</body>
</html>
    `.trim(),
  };
}

/**
 * リマインダータイプに応じたメールテンプレートを生成
 */
export function generateEmailTemplate(params: EmailTemplateParams): EmailTemplate {
  switch (params.reminderType) {
    case 'follow_up_review':
      return getFollowUpReviewTemplate(params);
    case 'interview_preparation':
      return getInterviewPreparationTemplate(params);
    case 'interview_followup':
      return getInterviewFollowupTemplate(params);
    case 'custom':
      return getCustomTemplate(params);
    default:
      return getCustomTemplate(params);
  }
}
