# カスタムメールアドレス指定機能

## 概要

リマインダー作成時に、送信先のメールアドレスを自由に指定できる機能が追加されました。

## 使い方

### ダッシュボードから

1. ダッシュボードの「リマインダー」セクションに移動
2. 「リマインダーを追加」で以下を設定：
   - 種別: 任意
   - 通知チャネル: **メール** を選択
   - **送信先メールアドレス**: カスタムメールアドレスを入力（任意）
   - 通知日時: 送信日時を指定
3. 「リマインダーを登録」をクリック

### 動作

- **カスタムメールアドレスが入力されている場合**: そのアドレスに送信
- **カスタムメールアドレスが空欄の場合**: ユーザーのアカウントに登録されているメールアドレスに送信

## 使用例

### 例1: 自分のサブメールアドレスに送信
```
送信先メールアドレス: my-sub-email@example.com
```

### 例2: チームメンバーに送信
```
送信先メールアドレス: team-member@company.com
```

### 例3: テスト用アドレスに送信
```
送信先メールアドレス: test@example.com
```

### 例4: デフォルト（アカウントのメールアドレス）
```
送信先メールアドレス: （空欄）
```

## 技術仕様

### データベース

カスタムメールアドレスは `ReviewReminder.payload` に保存されます：

```json
{
  "customEmail": "custom@example.com",
  "note": "その他のメモ"
}
```

### API仕様

#### リマインダー作成時

```json
POST /api/ai/resume-review/reminders
{
  "userId": "user_123",
  "type": "follow_up_review",
  "channel": "email",
  "scheduledAt": "2026-01-24T10:00:00Z",
  "payload": {
    "customEmail": "custom@example.com"
  }
}
```

#### メール送信時の優先順位

1. `payload.customEmail` が存在する場合 → そのアドレスに送信
2. `payload.customEmail` が存在しない場合 → `User.email` に送信
3. どちらも存在しない場合 → エラー

### コード例

```typescript
// リマインダー作成時にカスタムメールを指定
const payload: Record<string, unknown> = {
  customEmail: "custom@example.com",
  note: "追加メモ"
};

// 送信APIでの処理
const payloadData = reminder.payload as Record<string, unknown> | null;
const customEmail = payloadData?.customEmail as string | undefined;
const recipientEmail = customEmail?.trim() || user.email;
```

## セキュリティ考慮事項

### メールアドレスの検証

- 入力されたメールアドレスは基本的な形式チェックが行われます
- 不正なメールアドレスの場合は送信エラーとなります

### スパム対策

カスタムメールアドレス機能を悪用したスパム送信を防ぐため、以下の対策を推奨します：

1. **レート制限**: 同一ユーザーからの短時間での大量送信を制限
2. **ドメイン制限**: 特定のドメインのみを許可（オプション）
3. **確認メール**: 初回送信時に確認メールを送る（オプション）

### 実装例（レート制限）

```typescript
// レート制限の実装例
const recentReminders = await prisma.reviewReminder.count({
  where: {
    userId: userId,
    createdAt: {
      gte: new Date(Date.now() - 60 * 60 * 1000) // 過去1時間
    }
  }
});

if (recentReminders > 10) {
  return NextResponse.json(
    { error: 'レート制限に達しました。しばらく待ってから再度お試しください。' },
    { status: 429 }
  );
}
```

## トラブルシューティング

### メールが届かない

**確認事項:**
1. カスタムメールアドレスが正しく入力されているか
2. スパムフォルダに入っていないか
3. メールアドレスが有効か（存在するドメインか）
4. SMTPサーバーのログにエラーがないか

### リマインダー一覧での表示

カスタムメールアドレスは、リマインダー詳細の「送信先メールアドレス」項目に表示されます：

```
種別: 再添削フォロー
通知: メール
送信先メールアドレス: custom@example.com
```

## テスト方法

### 1. 基本テスト

```bash
# カスタムメールアドレスありのリマインダー作成
curl -X POST http://localhost:3000/api/ai/resume-review/reminders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test_user_id",
    "type": "follow_up_review",
    "channel": "email",
    "scheduledAt": "2026-01-24T10:00:00Z",
    "payload": {
      "customEmail": "test@example.com"
    }
  }'
```

### 2. デフォルトメールテスト

```bash
# カスタムメールアドレスなし（デフォルト）
curl -X POST http://localhost:3000/api/ai/resume-review/reminders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test_user_id",
    "type": "follow_up_review",
    "channel": "email",
    "scheduledAt": "2026-01-24T10:00:00Z",
    "payload": null
  }'
```

### 3. 送信テスト

```bash
# リマインダーを即座に送信
curl -X POST "http://localhost:3000/api/ai/resume-review/reminders/send?id=REMINDER_ID"
```

## FAQ

**Q: カスタムメールアドレスを変更できますか？**
A: 一度作成したリマインダーのメールアドレスは変更できません。新しいリマインダーを作成してください。

**Q: 複数のメールアドレスに同時送信できますか？**
A: 現在は1つのメールアドレスのみ指定可能です。複数に送信したい場合は、それぞれ別のリマインダーを作成してください。

**Q: カスタムメールアドレスを指定しても、自分にもメールが届きますか？**
A: いいえ、指定したメールアドレスのみに送信されます。自分にも送信したい場合は、別途リマインダーを作成してください。

**Q: メールアドレスのバリデーションはありますか？**
A: 基本的な形式チェック（`@`の存在など）は行われますが、実際にそのアドレスが存在するかの確認は行われません。

---

**最終更新**: 2026年1月23日
