"use client";
import { Briefcase, ArrowLeft, Save, User, Code, Projector, Cog, Plus, X } from 'lucide-react';
import React, { useState, useRef } from 'react';

// ===== データ設計（案1: シンプル分離型） =====

// 基本情報の型定義
interface BasicInfo {
  name: string;
  university: string;
  grade: string;
  birthDate: string;
  email: string;
  selfIntroduction: string;
}

// スキル・技術の型定義
interface Skills {
  skillTags: string[];
  certifications: string;
}

// プロジェクト・実績の型定義
interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
}

// 経験・活動の型定義
interface Experience {
  internship: string;
  extracurricular: string;
  awards: string;
}

// その他（自由記述欄）の型定義
interface Other {
  customQuestions: string;
  additionalInfo: string;
}

// 公開設定の型定義
interface PublicationSettings {
  isPublic: boolean;
  autoDeleteAfterOneYear: boolean;
}

// ポートフォリオ全体の型定義
interface Portfolio {
  id: string;
  userId: string;
  basicInfo: BasicInfo;
  skills: Skills;
  projects: Project[];
  experience: Experience;
  other: Other;
  publicationSettings: PublicationSettings;
  createdAt: string;
  updatedAt: string;
}

// フォーム状態の型定義
interface PortfolioFormState {
  basicInfo: BasicInfo;
  skills: Skills;
  projects: Project[];
  experience: Experience;
  other: Other;
  publicationSettings: PublicationSettings;
  isDirty: boolean;
  isSubmitting: boolean;
}

const initialForm: PortfolioFormState = {
  basicInfo: {
    name: '田中 太郎',
    university: '東京大学 情報科学科',
    grade: '4年生',
    birthDate: '2000-01-01',
    email: 'tanaka@example.com',
    selfIntroduction: 'Web開発とAI技術に興味があり、複数のプロジェクトを手がけています。',
  },
  skills: {
    skillTags: ['JavaScript', 'React', 'Python'],
    certifications: 'TOEIC 900点',
  },
  projects: [
    {
      id: 'proj_001',
      name: 'AIチャットボット開発',
      description: '社内向けAIチャットボットを開発。PythonとReactを使用し、業務効率化に貢献。',
      url: 'https://github.com/tanaka/ai-chatbot',
    },
    {
      id: 'proj_002',
      name: 'Webポートフォリオサイト',
      description: '自身の実績をまとめたWebポートフォリオサイトを作成。Next.jsとTailwind CSSを活用。',
      url: 'https://tanaka-portfolio.com',
    },
  ],
  experience: {
    internship: '株式会社サンプルでAI開発インターンを経験。実務での開発フローを学びました。',
    extracurricular: 'プログラミングサークル所属。ハッカソン参加経験あり。',
    awards: '2024年 学生ハッカソン最優秀賞',
  },
  other: {
    customQuestions: '当社のサービスについて知っていることを教えてください。また、あなたの強みを活かせる職種は何だと思いますか？',
    additionalInfo: 'プログラミングコンテストでの受賞経験があり、チーム開発でのリーダーシップを発揮した経験があります。',
  },
  publicationSettings: {
    isPublic: true,
    autoDeleteAfterOneYear: false,
  },
  isDirty: false,
  isSubmitting: false,
};

// ===== コンポーネント =====

const PortfolioEditPage = () => {
  const [form, setForm] = useState<PortfolioFormState>(initialForm);
  const [skillInput, setSkillInput] = useState("");
  const skillInputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // 基本情報ハンドラ
  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        [name]: value,
      },
      isDirty: true,
    }));
  };

  // スキルタグ追加
  const handleSkillInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillInput(e.target.value);
  };
  const handleSkillInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!form.skills.skillTags.includes(skillInput.trim())) {
        setForm((prev) => ({
          ...prev,
          skills: {
            ...prev.skills,
            skillTags: [...prev.skills.skillTags, skillInput.trim()],
          },
          isDirty: true,
        }));
      }
      setSkillInput("");
    }
  };
  // スキルタグ削除
  const handleRemoveSkillTag = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        skillTags: prev.skills.skillTags.filter((_, i) => i !== idx),
      },
      isDirty: true,
    }));
    // フォーカスを戻す
    setTimeout(() => skillInputRef.current?.focus(), 0);
  };

  // 資格・検定
  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [name]: value,
      },
      isDirty: true,
    }));
  };

  // プロジェクト
  const handleProjectChange = (idx: number, field: string, value: string) => {
    setForm((prev) => {
      const newProjects = prev.projects.map((p, i) =>
        i === idx ? { ...p, [field]: value } : p
      );
      return { ...prev, projects: newProjects, isDirty: true };
    });
  };

  // 経験・活動
  const handleExperienceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      experience: {
        ...prev.experience,
        [name]: value,
      },
      isDirty: true,
    }));
  };

  // その他（自由記述欄）
  const handleOtherChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      other: {
        ...prev.other,
        [name]: value,
      },
      isDirty: true,
    }));
  };

  // 公開設定
  const handlePublicationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      publicationSettings: {
        ...prev.publicationSettings,
        [name]: checked,
      },
      isDirty: true,
    }));
  };

  // 保存処理
  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");
    try {
      const res = await fetch("/api/portfolio/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSaveMessage("保存しました");
        setForm((prev) => ({ ...prev, isDirty: false }));
      } else {
        setSaveMessage("保存に失敗しました");
      }
    } catch (e) {
      setSaveMessage("保存時にエラーが発生しました");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <a href="/dashboard" className="flex items-center">
                <Briefcase className="w-7 h-7 text-indigo-600 mr-2" />
                <h1 className="text-2xl font-bold text-gray-800">Y-folio</h1>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/dashboard" className="text-gray-600 hover:text-indigo-600 transition flex items-center">
                <ArrowLeft className="w-5 h-5 mr-1" />ダッシュボードへ戻る
              </a>
              <button
                className={`px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center ${isSaving || !form.isDirty ? 'opacity-60 cursor-not-allowed' : ''}`}
                onClick={handleSave}
                disabled={isSaving || !form.isDirty}
              >
                <Save className="w-5 h-5 mr-1" />
                {isSaving ? "保存中..." : "保存"}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="py-10">
        <div className="flex min-h-[70vh] gap-8 px-4">
          {/* Left: Form */}
          <div className="w-1/2">
            <div className="form-section bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">ポートフォリオ編集</h2>
              {saveMessage && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                  {saveMessage}
                </div>
              )}
              {/* 基本情報 */}
              <div className="section-card active p-6 rounded-lg mb-6 border-l-4 border-indigo-600 bg-slate-50">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-indigo-600" />基本情報
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">お名前</label>
                    <input type="text" name="name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="山田 太郎" value={form.basicInfo.name} onChange={handleBasicInfoChange} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">大学・学部</label>
                    <input type="text" name="university" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="東京大学 工学部" value={form.basicInfo.university} onChange={handleBasicInfoChange} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">学年</label>
                    <select name="grade" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" value={form.basicInfo.grade} onChange={handleBasicInfoChange}>
                      <option value="">選択してください</option>
                      <option value="1年生">1年生</option>
                      <option value="2年生">2年生</option>
                      <option value="3年生">3年生</option>
                      <option value="4年生">4年生</option>
                      <option value="修士1年">修士1年</option>
                      <option value="修士2年">修士2年</option>
                      <option value="博士課程">博士課程</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">生年月日</label>
                    <input type="date" name="birthDate" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" value={form.basicInfo.birthDate} onChange={handleBasicInfoChange} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">メールアドレス</label>
                    <input type="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="yamada@example.com" value={form.basicInfo.email} onChange={handleBasicInfoChange} />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">自己紹介</label>
                  <textarea name="selfIntroduction" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="あなたの強みや興味のある分野について教えてください" value={form.basicInfo.selfIntroduction} onChange={handleBasicInfoChange}></textarea>
                </div>
              </div>

              {/* スキル・技術 */}
              <div className="section-card p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Code className="w-5 h-5 mr-2 text-indigo-600" />スキル・技術
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">スキルタグ</label>
                  <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg min-h-[42px]">
                    {form.skills.skillTags.map((tag, idx) => (
                      <span key={idx} className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm flex items-center">
                        {tag}
                        <button type="button" className="ml-1 hover:bg-indigo-800 rounded-full p-0.5" onClick={() => handleRemoveSkillTag(idx)} aria-label="タグ削除">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      ref={skillInputRef}
                      value={skillInput}
                      onChange={handleSkillInputChange}
                      onKeyDown={handleSkillInputKeyDown}
                      placeholder="スキルを追加"
                      className="flex-1 outline-none bg-transparent min-w-32"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">例：JavaScript, React, Python, デザイン思考</p>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">資格・検定</label>
                  <textarea name="certifications" rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="例：TOEIC 850点、基本情報技術者試験 合格" value={form.skills.certifications} onChange={handleSkillsChange}></textarea>
                </div>
              </div>

              {/* プロジェクト・実績 */}
              <div className="section-card p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Projector className="w-5 h-5 mr-2 text-indigo-600" />プロジェクト・実績
                </h3>
                <div className="space-y-4">
                  {form.projects.map((project, idx) => (
                    <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                      <input type="text" placeholder="プロジェクト名" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-2" value={project.name} onChange={e => handleProjectChange(idx, 'name', e.target.value)} />
                      <textarea placeholder="プロジェクトの説明、使用技術、成果など" rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-2" value={project.description} onChange={e => handleProjectChange(idx, 'description', e.target.value)}></textarea>
                      <input type="url" placeholder="プロジェクトURL（任意）" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" value={project.url || ''} onChange={e => handleProjectChange(idx, 'url', e.target.value)} />
                    </div>
                  ))}
                  <button type="button" className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 mt-2 cursor-not-allowed flex items-center justify-center" disabled>
                    <Plus className="w-5 h-5 mr-2" />プロジェクトを追加（未実装）
                  </button>
                </div>
              </div>

              {/* 経験・活動 */}
              <div className="section-card p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-indigo-600" />経験・活動
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">インターンシップ経験</label>
                    <textarea name="internship" rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="インターンシップでの経験や学んだことを記載してください" value={form.experience.internship} onChange={handleExperienceChange}></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">課外活動・サークル</label>
                    <textarea name="extracurricular" rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="サークル活動、ボランティア、アルバイトなど" value={form.experience.extracurricular} onChange={handleExperienceChange}></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">受賞歴・表彰</label>
                    <textarea name="awards" rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="コンテスト受賞、学術表彰など" value={form.experience.awards} onChange={handleExperienceChange}></textarea>
                  </div>
                </div>
              </div>

              {/* その他（自由記述欄） */}
              <div className="section-card p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Plus className="w-5 h-5 mr-2 text-indigo-600" />その他（自由記述欄）
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">企業のオリジナル設問</label>
                    <textarea 
                      name="customQuestions" 
                      rows={4} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                      placeholder="企業が設定したオリジナル設問があれば、ここに回答を記載してください。例：「当社のサービスについて知っていることを教えてください」「あなたの強みを活かせる職種は何だと思いますか？」" 
                      value={form.other.customQuestions} 
                      onChange={handleOtherChange}
                    ></textarea>
                    <p className="text-sm text-gray-500 mt-1">企業が設定したオリジナル設問への回答を記載してください</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">その他の追加情報</label>
                    <textarea 
                      name="additionalInfo" 
                      rows={3} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                      placeholder="その他、アピールしたい情報や企業に伝えたいことがあれば記載してください" 
                      value={form.other.additionalInfo} 
                      onChange={handleOtherChange}
                    ></textarea>
                    <p className="text-sm text-gray-500 mt-1">その他、アピールしたい情報や企業に伝えたいことがあれば記載してください</p>
                  </div>
                </div>
              </div>

              {/* 公開設定 */}
              <div className="section-card p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Cog className="w-5 h-5 mr-2 text-indigo-600" />公開設定
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" name="isPublic" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" checked={form.publicationSettings.isPublic} onChange={handlePublicationChange} />
                      <span className="ml-2 text-sm text-gray-700">ポートフォリオを公開する</span>
                    </label>
                    <p className="text-sm text-gray-500 mt-1">公開すると他のユーザーがあなたのポートフォリオを閲覧できます</p>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" name="autoDeleteAfterOneYear" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" checked={form.publicationSettings.autoDeleteAfterOneYear} onChange={handlePublicationChange} />
                      <span className="ml-2 text-sm text-gray-700">1年後に自動削除する</span>
                    </label>
                    <p className="text-sm text-gray-500 mt-1">チェックを外すと、手動で削除するまでポートフォリオが保持されます</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  className={`px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center ${isSaving || !form.isDirty ? 'opacity-60 cursor-not-allowed' : ''}`}
                  onClick={handleSave}
                  disabled={isSaving || !form.isDirty}
                >
                  <Save className="w-5 h-5 mr-2" />{isSaving ? "保存中..." : "保存"}
                </button>
              </div>
            </div>
          </div>
          {/* Right: Preview */}
          <div className="w-1/2 bg-gray-50">
            <div className="preview-section p-6">
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-8" style={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
                {/* Preview Header */}
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white p-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{form.basicInfo.name || 'お名前を入力してください'}</h2>
                    <p className="text-lg opacity-90">{form.basicInfo.university || '大学・学部を入力してください'}</p>
                    <p className="text-sm opacity-75">{form.basicInfo.grade}</p>
                  </div>
                </div>
                {/* Preview Content */}
                <div className="p-6">
                  {/* Introduction */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <User className="w-5 h-5 mr-2 text-indigo-600" />自己紹介
                    </h3>
                    <p className="text-gray-700">{form.basicInfo.selfIntroduction || '自己紹介を入力してください'}</p>
                  </div>
                  {/* Skills */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <Code className="w-5 h-5 mr-2 text-indigo-600" />スキル
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {form.skills.skillTags.length === 0 ? (
                        <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm">スキルを追加してください</span>
                      ) : (
                        form.skills.skillTags.map((tag, idx) => (
                          <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">{tag}</span>
                        ))
                      )}
                    </div>
                  </div>
                  {/* Certifications */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <Code className="w-5 h-5 mr-2 text-indigo-600" />資格・検定
                    </h3>
                    <p className="text-gray-700">{form.skills.certifications}</p>
                  </div>
                  {/* Projects */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <Projector className="w-5 h-5 mr-2 text-indigo-600" />プロジェクト
                    </h3>
                    <div>
                      {form.projects.length === 0 ? (
                        <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm">プロジェクトを追加してください</span>
                      ) : (
                        form.projects.map((project, idx) => (
                          <div key={project.id} className="mb-2">
                            <div className="font-semibold text-indigo-700">{project.name}</div>
                            <div className="text-gray-700 text-sm">{project.description}</div>
                            {project.url && <a href={project.url} className="text-indigo-500 text-xs underline" target="_blank" rel="noopener noreferrer">{project.url}</a>}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  {/* Experience & Activities */}
                  {(form.experience.internship || form.experience.extracurricular || form.experience.awards) && (
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
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <User className="w-5 h-5 mr-2 text-indigo-600" />連絡先
                    </h3>
                    <p className="text-gray-700">{form.basicInfo.email || 'メールアドレスを入力してください'}</p>
                  </div>
                  {/* Other Information */}
                  {(form.other.customQuestions || form.other.additionalInfo) && (
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
      </main>
    </div>
  );
};

export default PortfolioEditPage; 