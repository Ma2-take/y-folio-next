import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// DB接続設定（XAMPPのデフォルト）
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'y_folio_db',
  charset: 'utf8mb4',
};

export async function POST(request: NextRequest) {
  const data = await request.json();
  const conn = await mysql.createConnection(dbConfig);
  try {
    // 1. ユーザー情報保存（users）
    const user = data.basicInfo;
    await conn.execute(
      `INSERT INTO users (id, email, name, university, grade, birth_date, self_introduction, password_hash)
       VALUES (?, ?, ?, ?, ?, ?, ?, '')
       ON DUPLICATE KEY UPDATE name=VALUES(name), university=VALUES(university), grade=VALUES(grade), birth_date=VALUES(birth_date), self_introduction=VALUES(self_introduction)`,
      [data.userId, user.email, user.name, user.university, user.grade, user.birthDate, user.selfIntroduction]
    );

    // 2. ポートフォリオ基本（portfolios）
    await conn.execute(
      `INSERT INTO portfolios (id, user_id, is_public, auto_delete_after_one_year)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE is_public=VALUES(is_public), auto_delete_after_one_year=VALUES(auto_delete_after_one_year)`,
      [data.id, data.userId, data.publicationSettings.isPublic, data.publicationSettings.autoDeleteAfterOneYear]
    );

    // 3. 基本情報（portfolio_basic_info）
    await conn.execute(
      `INSERT INTO portfolio_basic_info (portfolio_id, name, university, grade, birth_date, email, self_introduction)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE name=VALUES(name), university=VALUES(university), grade=VALUES(grade), birth_date=VALUES(birth_date), email=VALUES(email), self_introduction=VALUES(self_introduction)`,
      [data.id, user.name, user.university, user.grade, user.birthDate, user.email, user.selfIntroduction]
    );

    // 4. スキル・技術（portfolio_skills）
    await conn.execute(
      `INSERT INTO portfolio_skills (portfolio_id, skill_tags, certifications)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE skill_tags=VALUES(skill_tags), certifications=VALUES(certifications)`,
      [data.id, JSON.stringify(data.skills.skillTags), data.skills.certifications]
    );

    // 5. プロジェクト（portfolio_projects）
    // 既存削除→全件INSERT（簡易実装）
    await conn.execute('DELETE FROM portfolio_projects WHERE portfolio_id = ?', [data.id]);
    for (const [i, p] of data.projects.entries()) {
      await conn.execute(
        `INSERT INTO portfolio_projects (id, portfolio_id, name, description, url, sort_order)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [p.id, data.id, p.name, p.description, p.url || '', i]
      );
    }

    // 6. 経験・活動（portfolio_experience）
    await conn.execute(
      `INSERT INTO portfolio_experience (portfolio_id, internship, extracurricular, awards)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE internship=VALUES(internship), extracurricular=VALUES(extracurricular), awards=VALUES(awards)`,
      [data.id, data.experience.internship, data.experience.extracurricular, data.experience.awards]
    );

    await conn.end();
    return NextResponse.json({ success: true });
  } catch (e) {
    await conn.end();
    return NextResponse.json({ success: false, error: String(e) }, { status: 500 });
  }
} 