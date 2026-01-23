# メールリマインド機能 セットアップガイド

このドキュメントでは、Y-folioダッシュボードのリマインダー機能にメール送信機能を追加する設定方法を説明します。

## 📋 目次

1. [機能概要](#機能概要)
2. [環境設定](#環境設定)
3. [使い方](#使い方)
4. [自動送信の設定](#自動送信の設定)
5. [トラブルシューティング](#トラブルシューティング)

## 🎯 機能概要

### 実装された機能

- ✅ メール送信ライブラリ (nodemailer)
- ✅ リマインダータイプ別のメールテンプレート
  - 再添削フォローアップ
  - 面接前リマインド
  - 面接後フォローアップ
  - カスタムメッセージ
- ✅ 手動メール送信API
- ✅ バッチ送信API（自動送信用）
- ✅ ダッシュボードUI（メール送信ボタン）
- ✅ Cronジョブエンドポイント

## ⚙️ 環境設定

### 1. 環境変数の設定

`.env.local` ファイルを作成し、以下の環境変数を設定してください：

```env
# メール送信設定（SMTP）
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
SMTP_FROM="noreply@y-folio.com"

# Cronジョブ認証（オプション）
CRON_SECRET="your-secret-token"

# アプリケーションURL（本番環境用）
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

### 2. Gmailを使用する場合

Gmailでアプリパスワードを生成する手順：

1. Googleアカウントにログイン
2. [アカウント設定](https://myaccount.google.com/) → セキュリティ
3. 2段階認証プロセスを有効化
4. 「アプリパスワード」を検索して生成
5. 生成された16桁のパスワードを `SMTP_PASSWORD` に設定

**注意**: 通常のGmailパスワードではなく、アプリパスワードを使用してください。

### 3. その他のSMTPサービス

以下のサービスも利用可能です：

#### SendGrid
```env
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASSWORD="your-sendgrid-api-key"
```

#### AWS SES
```env
SMTP_HOST="email-smtp.us-east-1.amazonaws.com"
SMTP_PORT="587"
SMTP_USER="your-ses-smtp-username"
SMTP_PASSWORD="your-ses-smtp-password"
```

#### Mailgun
```env
SMTP_HOST="smtp.mailgun.org"
SMTP_PORT="587"
SMTP_USER="postmaster@your-domain.mailgun.org"
SMTP_PASSWORD="your-mailgun-smtp-password"
```

## 📖 使い方

### ダッシュボードから手動送信

1. ダッシュボードにアクセス
2. 「リマインダー」セクションを確認
3. チャネルが「メール」のリマインダーに「メール送信」ボタンが表示されます
4. ボタンをクリックして送信確認
5. 送信完了後、リマインダーは自動的に削除されます

### リマインダーの作成

1. 「リマインダーを追加」セクションで以下を入力：
   - **種別**: 再添削フォロー/面接前リマインド/面接後フォロー/カスタム
   - **通知チャネル**: **メール** を選択
   - **通知日時**: 送信したい日時を指定
2. 「リマインダーを登録」ボタンをクリック

### APIから送信（開発者向け）

#### 単一リマインダーの送信
```bash
curl -X POST "http://localhost:3000/api/ai/resume-review/reminders/send?id=REMINDER_ID"
```

#### バッチ送信（対象となるすべてのリマインダー）
```bash
curl -X GET "http://localhost:3000/api/ai/resume-review/reminders/send?batch=true"
```

## 🤖 自動送信の設定

### Vercel Cron Jobsを使用する場合

プロジェクトルートに `vercel.json` を作成：

```json
{
  "crons": [
    {
      "path": "/api/cron/send-reminders",
      "schedule": "0 * * * *"
    }
  ]
}
```

上記の例では1時間ごとに実行されます。

**Cron式の例:**
- `*/15 * * * *` - 15分ごと
- `0 * * * *` - 1時間ごと（毎時0分）
- `0 */6 * * *` - 6時間ごと
- `0 9 * * *` - 毎日午前9時

### 外部Cronサービスを使用する場合

[cron-job.org](https://cron-job.org/) や [EasyCron](https://www.easycron.com/) などのサービスを利用：

1. サービスにサインアップ
2. 新しいCronジョブを作成
3. URL: `https://your-domain.com/api/cron/send-reminders`
4. メソッド: GET
5. ヘッダー: `Authorization: Bearer YOUR_CRON_SECRET`
6. スケジュール: 15分〜1時間ごと

## 🔧 トラブルシューティング

### メールが送信されない

#### SMTP接続エラー
```
Error: connect ECONNREFUSED
```

**解決策:**
- `SMTP_HOST` と `SMTP_PORT` を確認
- ファイアウォールやセキュリティグループの設定を確認
- SMTPサーバーが稼働しているか確認

#### 認証エラー
```
Error: Invalid login: 535 Authentication failed
```

**解決策:**
- `SMTP_USER` と `SMTP_PASSWORD` が正しいか確認
- Gmailの場合、アプリパスワードを使用しているか確認
- 2段階認証が有効になっているか確認

#### メールアドレスが無効
```
Error: 無効なメールアドレスです
```

**解決策:**
- ユーザーのメールアドレスがデータベースに登録されているか確認
- メールアドレスの形式が正しいか確認

### リマインダーが送信されない

**チェックリスト:**
1. リマインダーの `channel` が `"email"` に設定されているか
2. リマインダーの `status` が `"pending"` になっているか
3. `scheduledAt` が現在時刻より前になっているか
4. 環境変数が正しく設定されているか

### メールがスパム判定される

**対策:**
1. SPFレコードを設定
2. DKIMを有効化
3. 送信元ドメインを認証
4. 信頼性の高いSMTPサービスを使用（SendGrid、AWS SES等）

### テスト送信

SMTP接続をテストする方法：

```typescript
// テストスクリプト (test-email.ts)
import { testConnection, sendEmail } from '@/lib/email/mailer';

async function test() {
  // 接続テスト
  const connected = await testConnection();
  console.log('SMTP接続:', connected ? '成功' : '失敗');

  // テストメール送信
  const result = await sendEmail({
    to: 'test@example.com',
    subject: 'テストメール',
    text: 'これはテストメールです。',
    html: '<p>これはテストメールです。</p>',
  });

  console.log('送信結果:', result);
}

test();
```

## 📊 ログとモニタリング

### サーバーログの確認

メール送信のログは以下の場所で確認できます：

- **開発環境**: ターミナルのコンソール出力
- **本番環境（Vercel）**: Vercel Dashboard → Logs

### エラーログの例

```
メール送信エラー: Error: connect ETIMEDOUT
リマインダー送信エラー: reminderId=xxx
```

## 🔒 セキュリティのベストプラクティス

1. **環境変数の保護**
   - `.env.local` をGitにコミットしない
   - 本番環境では環境変数を安全に管理

2. **Cronジョブの保護**
   - `CRON_SECRET` を設定して不正アクセスを防ぐ
   - IPホワイトリストの使用を検討

3. **レート制限**
   - 短時間での大量送信を防ぐ
   - バッチ送信では最大50件に制限

4. **個人情報の保護**
   - メールアドレスを適切に管理
   - ログに機密情報を含めない

## 📚 関連ドキュメント

- [Nodemailer公式ドキュメント](https://nodemailer.com/)
- [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs)
- [Gmail SMTP設定](https://support.google.com/mail/answer/7126229)

## 🆘 サポート

問題が解決しない場合は、以下の情報を含めてサポートにお問い合わせください：

- エラーメッセージの全文
- 使用しているSMTPサービス
- 環境（開発/本番）
- 試した解決策

---

**最終更新**: 2026年1月23日
