
## インストール
### Gemini API ライブラリ

```bash
npm install @google/genai
```

.env に追加
```env
GEMINI_API_KEY="Google AI Studioのキー"
```


### Prisam インストール
```bash
npm install prisma --save-dev
npm install @prisma/client
```

### Prisma 初期化
```bash
npx prisma init
```

### .env
.env にデータベース接続情報を記述

```env
DATABASE_URL="mysql://root@localhost:3306/y-folio"
```

## DB初期化
1. prisma/migrations を削除

2. マイグレーションリセット
```bash
npx prisma migrate reset
```

3. マイグレーション実行
```bash
npx prisma migrate dev --name init
```

4. Prisma Client の再生成
```bash
npx prisma generate
```

## インストール
### Gemini API ライブラリ

```bash
npm install @google/genai
```

.env に追加
```env
GEMINI_API_KEY="Google AI Studioのキー"
```


### Prisam インストール
```bash
npm install prisma --save-dev
npm install @prisma/client
```

### Prisma 初期化
```bash
npx prisma init
```

### .env
.env にデータベース接続情報を記述

```env
DATABASE_URL="mysql://root@localhost:3306/y-folio"
```

## DB初期化
1. prisma/migrations を削除

2. マイグレーションリセット
```bash
npx prisma migrate reset
```

3. マイグレーション実行
```bash
npx prisma migrate dev --name init
```

4. Prisma Client の再生成
```bash
npx prisma generate
```

---

## Firebase 認証のPrismaへの反映（同期）
このプロジェクトでは、Firebaseでログイン成功後にIDトークンをサーバーへ送信し、PrismaのUserテーブルへユーザー情報（firebaseUid, email, name, photoURL, email_verifiedなど）を同期します。

### 追加インストール
```bash
npm install firebase-admin
```

### 追加の環境変数
以下のどちらかの方法で Firebase Admin の認証情報を設定してください。

1) サービスアカウントJSONを1つの環境変数で設定
```env
# 文字列化したサービスアカウントJSON（改行は \n にエスケープ）
FIREBASE_SERVICE_ACCOUNT='{"project_id":"...","client_email":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"}'
```

2) 個別の環境変数で設定
```env
FIREBASE_PROJECT_ID="your-project-id"
FIREBASE_CLIENT_EMAIL="firebase-admin-sdk@your-project-id.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### Prisma スキーマの変更
User モデルに以下のフィールドが追加されています。
- firebaseUid: String? @unique @map("firebase_uid")
- photoURL: String? @map("photo_url")

スキーマを反映するにはマイグレーションを実行してください。
```bash
npx prisma migrate dev --name add_firebase_uid
npx prisma generate
```

### 挙動
- クライアント側（/login）で Firebase へのサインインが成功すると、IDトークンを `/api/auth/sync` に POST します。
- サーバー側でトークンを検証し、User を email で upsert して firebaseUid や email_verified を更新（なければ作成）します。

これにより、Firebaseのログイン情報がPrismaのUserテーブルに反映されます。
