import { User } from "@/types/User";

export const testUser: User = {
    id: '00000000-0000-0000-0000-000000000001',
    email: 'testuser@example.com',
    password_hash: '$2b$10$exampleexampleexampleexampleexamp',
    name: 'テスト 太郎',
    university: '東京大学',
    department: '情報科学科',
    grade: '3',
    birthDate: new Date('2002-05-15'),
    selfIntroduction: 'ポートフォリオ用のテストユーザーです。',
    is_active: true,
    email_verified: true,
    verification_token: null,
    reset_token: null,
    reset_token_expires: null,
    created_at: new Date('2025-01-01T00:00:00Z'),
    updated_at: new Date('2025-01-01T00:00:00Z'),
}
