import { Briefcase, ArrowLeft, Save, User, Code, Projector, Cog, Plus } from 'lucide-react';

const PortfolioEditPage = () => {
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
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center" disabled>
                <Save className="w-5 h-5 mr-1" />保存（未実装）
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="py-10">
        <div className="form-section bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">ポートフォリオ編集</h2>

          {/* 基本情報 */}
          <div className="section-card active p-6 rounded-lg mb-6 border-l-4 border-indigo-600 bg-slate-50">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-indigo-600" />基本情報
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">お名前</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="山田 太郎" value="田中 太郎" disabled />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">大学・学部</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="東京大学 工学部" value="東京大学 情報科学科" disabled />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">学年</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" disabled>
                  <option value="">選択してください</option>
                  <option value="1年生">1年生</option>
                  <option value="2年生">2年生</option>
                  <option value="3年生">3年生</option>
                  <option value="4年生" selected>4年生</option>
                  <option value="修士1年">修士1年</option>
                  <option value="修士2年">修士2年</option>
                  <option value="博士課程">博士課程</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">メールアドレス</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="yamada@example.com" value="tanaka@example.com" disabled />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">自己紹介</label>
              <textarea rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="あなたの強みや興味のある分野について教えてください" disabled>Web開発とAI技術に興味があり、複数のプロジェクトを手がけています。</textarea>
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
                <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm flex items-center">JavaScript</span>
                <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm flex items-center">React</span>
                <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm flex items-center">Python</span>
                <input type="text" placeholder="スキルを追加 (未実装)" className="flex-1 outline-none bg-transparent min-w-32" disabled />
              </div>
              <p className="text-sm text-gray-500 mt-1">例：JavaScript, React, Python, デザイン思考</p>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">資格・検定</label>
              <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="例：TOEIC 850点、基本情報技術者試験 合格" disabled>TOEIC 900点</textarea>
            </div>
          </div>

          {/* プロジェクト・実績 */}
          <div className="section-card p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Projector className="w-5 h-5 mr-2 text-indigo-600" />プロジェクト・実績
            </h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <input type="text" placeholder="プロジェクト名" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-2" value="AIチャットボット開発" disabled />
                <textarea placeholder="プロジェクトの説明、使用技術、成果など" rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-2" disabled>社内向けAIチャットボットを開発。PythonとReactを使用し、業務効率化に貢献。</textarea>
                <input type="url" placeholder="プロジェクトURL（任意）" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" value="https://github.com/tanaka/ai-chatbot" disabled />
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <input type="text" placeholder="プロジェクト名" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-2" value="Webポートフォリオサイト" disabled />
                <textarea placeholder="プロジェクトの説明、使用技術、成果など" rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-2" disabled>自身の実績をまとめたWebポートフォリオサイトを作成。Next.jsとTailwind CSSを活用。</textarea>
                <input type="url" placeholder="プロジェクトURL（任意）" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" value="https://tanaka-portfolio.com" disabled />
              </div>
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
                <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="インターンシップでの経験や学んだことを記載してください" disabled>株式会社サンプルでAI開発インターンを経験。実務での開発フローを学びました。</textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">課外活動・サークル</label>
                <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="サークル活動、ボランティア、アルバイトなど" disabled>プログラミングサークル所属。ハッカソン参加経験あり。</textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">受賞歴・表彰</label>
                <textarea rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="コンテスト受賞、学術表彰など" disabled>2024年 学生ハッカソン最優秀賞</textarea>
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
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" checked disabled />
                  <span className="ml-2 text-sm text-gray-700">ポートフォリオを公開する</span>
                </label>
                <p className="text-sm text-gray-500 mt-1">公開すると他のユーザーがあなたのポートフォリオを閲覧できます</p>
              </div>
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" disabled />
                  <span className="ml-2 text-sm text-gray-700">1年後に自動削除する</span>
                </label>
                <p className="text-sm text-gray-500 mt-1">チェックを外すと、手動で削除するまでポートフォリオが保持されます</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center" disabled>
              <Save className="w-5 h-5 mr-2" />保存（未実装）
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PortfolioEditPage; 