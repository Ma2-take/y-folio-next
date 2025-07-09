import React, { useState } from 'react';
import { User, Code, Projector, Briefcase, Plus } from 'lucide-react';

const sampleForm = {
  name: '山田 太郎',
  university: '東京大学 工学部',
  grade: '4年生',
  email: 'yamada@example.com',
  phone: '090-1234-5678',
  address: '東京都新宿区',
  selfIntroduction: 'Web開発とAI技術に興味があります。React/Next.jsでの開発経験あり。',
  skillTags: ['JavaScript', 'React', 'Python'],
  certifications: 'TOEIC 850点、基本情報技術者試験 合格',
  projects: [
    { name: 'AIチャットボット開発', description: 'PythonとReactで社内向けAIチャットボットを開発。', url: 'https://github.com/yamada/ai-bot' },
    { name: 'Webポートフォリオ', description: 'Next.jsとTailwind CSSで自身のポートフォリオを作成。', url: '' },
  ],
  experience: {
    internship: '株式会社サンプルでAI開発インターンを経験。',
    extracurricular: 'プログラミングサークル所属。ハッカソン参加経験あり。',
    awards: '2024年 学生ハッカソン最優秀賞',
  },
  other: {
    customQuestions: '当社のサービスについて知っていることを教えてください。',
    additionalInfo: 'チーム開発でのリーダー経験あり。',
  },
  visibilitySettings: {
    basicInfo: true,
    phone: true,
    address: true,
    skills: true,
    projects: true,
    experience: true,
    other: true,
  },
};

export default function LandingPage() {
  const [form] = useState(sampleForm);
  return (
    <div className="flex min-h-screen">
      {/* 左: ランディング */}
      <div className="w-1/2">
        <section className="gradient-bg text-white pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <div className="fade-in">
              <h2 className="text-5xl font-bold mb-6">
                あなたの就活を<br />次のレベルへ
              </h2>
              <p className="text-xl mb-8 opacity-90">
                簡単にポートフォリオを作成・共有し、企業にアピールしよう
              </p>
              <div className="flex justify-center space-x-4">
                <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition pulse-animation">
                  <i className="fas fa-plus mr-2"></i>ポートフォリオを作成
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition">
                  <i className="fas fa-search mr-2"></i>ポートフォリオを探す
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* Features Section */}
        <section id="features" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">なぜY-folioを選ぶのか</h3>
              <p className="text-gray-600 text-lg">就活から転職まで、長く使えるポートフォリオサービス</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center card-hover bg-gray-50 p-8 rounded-lg">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-edit text-2xl text-indigo-600"></i>
                </div>
                <h4 className="text-xl font-semibold mb-3 text-gray-800">簡単作成</h4>
                <p className="text-gray-600">直感的なエディターで、誰でも簡単にプロフェッショナルなポートフォリオを作成できます</p>
              </div>
              <div className="text-center card-hover bg-gray-50 p-8 rounded-lg">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-share-alt text-2xl text-green-600"></i>
                </div>
                <h4 className="text-xl font-semibold mb-3 text-gray-800">簡単共有</h4>
                <p className="text-gray-600">URLひとつで企業や採用担当者に簡単にポートフォリオを共有できます</p>
              </div>
              <div className="text-center card-hover bg-gray-50 p-8 rounded-lg">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-file-pdf text-2xl text-purple-600"></i>
                </div>
                <h4 className="text-xl font-semibold mb-3 text-gray-800">PDF出力</h4>
                <p className="text-gray-600">作成したポートフォリオをPDFとして出力し、印刷して持参することも可能です</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* 右: プレビュー */}
      <div className="w-1/2 bg-gray-50 flex items-start">
        <div className="preview-section p-6 w-full max-h-[calc(100vh-40px)] overflow-y-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Preview Header */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">{form.name || 'お名前を入力してください'}</h2>
                <p className="text-lg opacity-90">{form.university || '大学・学部を入力してください'}</p>
                <p className="text-sm opacity-75">{form.grade}</p>
              </div>
            </div>
            {/* Preview Content */}
            <div className="p-6">
              {/* Introduction */}
              {form.visibilitySettings.basicInfo && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <User className="w-5 h-5 mr-2 text-indigo-600" />自己紹介
                  </h3>
                  <p className="text-gray-700">{form.selfIntroduction || '自己紹介を入力してください'}</p>
                </div>
              )}
              {form.visibilitySettings.phone && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <User className="w-5 h-5 mr-2 text-indigo-600" />電話番号
                  </h3>
                  <p className="text-gray-700">{form.phone || '電話番号を入力してください'}</p>
                </div>
              )}
              {form.visibilitySettings.address && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <User className="w-5 h-5 mr-2 text-indigo-600" />所在地
                  </h3>
                  <p className="text-gray-700">{form.address || '所在地を入力してください'}</p>
                </div>
              )}
              {/* Skills */}
              {form.visibilitySettings.skills && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <Code className="w-5 h-5 mr-2 text-indigo-600" />スキル
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {form.skillTags.length === 0 ? (
                      <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm">スキルを追加してください</span>
                    ) : (
                      form.skillTags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">{tag}</span>
                      ))
                    )}
                  </div>
                </div>
              )}
              {/* Certifications */}
              {form.visibilitySettings.skills && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <Code className="w-5 h-5 mr-2 text-indigo-600" />資格・検定
                  </h3>
                  <p className="text-gray-700">{form.certifications}</p>
                </div>
              )}
              {/* Projects */}
              {form.visibilitySettings.projects && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <Projector className="w-5 h-5 mr-2 text-indigo-600" />プロジェクト
                  </h3>
                  <div>
                    {form.projects.length === 0 ? (
                      <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm">プロジェクトを追加してください</span>
                    ) : (
                      form.projects.map((project, idx) => (
                        <div key={idx} className="mb-2">
                          <div className="font-semibold text-indigo-700">{project.name}</div>
                          <div className="text-gray-700 text-sm">{project.description}</div>
                          {project.url && <a href={project.url} className="text-indigo-500 text-xs underline" target="_blank" rel="noopener noreferrer">{project.url}</a>}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
              {/* Experience & Activities */}
              {form.visibilitySettings.experience && (form.experience.internship || form.experience.extracurricular || form.experience.awards) && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-indigo-600" />経験・活動
                  </h3>
                  {form.experience.internship && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 mb-2">インターンシップ経験</h4>
                      <p className="text-gray-700 whitespace-pre-wrap">{form.experience.internship}</p>
                    </div>
                  )}
                  {form.experience.extracurricular && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 mb-2">課外活動・サークル</h4>
                      <p className="text-gray-700 whitespace-pre-wrap">{form.experience.extracurricular}</p>
                    </div>
                  )}
                  {form.experience.awards && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 mb-2">受賞歴・表彰</h4>
                      <p className="text-gray-700 whitespace-pre-wrap">{form.experience.awards}</p>
                    </div>
                  )}
                </div>
              )}
              {/* Contact */}
              {form.visibilitySettings.basicInfo && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <User className="w-5 h-5 mr-2 text-indigo-600" />連絡先
                  </h3>
                  <p className="text-gray-700">{form.email || 'メールアドレスを入力してください'}</p>
                </div>
              )}
              {/* Other Information */}
              {form.visibilitySettings.other && (form.other.customQuestions || form.other.additionalInfo) && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <Plus className="w-5 h-5 mr-2 text-indigo-600" />その他
                  </h3>
                  {form.other.customQuestions && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 mb-2">企業のオリジナル設問</h4>
                      <p className="text-gray-700 whitespace-pre-wrap">{form.other.customQuestions}</p>
                    </div>
                  )}
                  {form.other.additionalInfo && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 mb-2">その他の追加情報</h4>
                      <p className="text-gray-700 whitespace-pre-wrap">{form.other.additionalInfo}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}