import { Briefcase, Save, Eye, User, Code, Projector, Cog, Plus, ArrowLeft, X } from 'lucide-react';

const PortfolioCreatePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <a href="#" className="flex items-center">
                <Briefcase className="w-7 h-7 text-indigo-600 mr-2" />
                <h1 className="text-2xl font-bold text-gray-800">Y-folio</h1>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-indigo-600 transition flex items-center">
                <Save className="w-5 h-5 mr-1" />下書き保存
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center">
                <Eye className="w-5 h-5 mr-1" />プレビュー
              </button>
              <a href="#" className="text-gray-600 hover:text-gray-800 transition">
                <X className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex min-h-screen">
        {/* Left Sidebar - Form */}
        <div className="w-1/2 bg-white border-r border-gray-200">
          <div className="form-section p-6 max-h-[calc(100vh-120px)] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">ポートフォリオを作成</h2>
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center space-x-4">
                <div className="step-item active flex items-center">
                  <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                  <span className="ml-2 text-sm font-medium text-indigo-600">基本情報</span>
                </div>
                <div className="flex-1 h-px bg-gray-300"></div>
                <div className="step-item flex items-center">
                  <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                  <span className="ml-2 text-sm font-medium text-gray-600">経歴・実績</span>
                </div>
                <div className="flex-1 h-px bg-gray-300"></div>
                <div className="step-item flex items-center">
                  <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                  <span className="ml-2 text-sm font-medium text-gray-600">公開設定</span>
                </div>
              </div>
            </div>
            {/* Form Sections */}
            <form>
              {/* 基本情報 */}
              <div className="section-card active p-6 rounded-lg mb-6 border-l-4 border-indigo-600 bg-slate-50">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-indigo-600" />基本情報
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">お名前</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="山田 太郎" disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">大学・学部</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="東京大学 工学部" disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">学年</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" disabled>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">メールアドレス</label>
                    <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="yamada@example.com" disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">自己紹介</label>
                    <textarea rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="あなたの強みや興味のある分野について教えてください" disabled></textarea>
                  </div>
                </div>
              </div>
              {/* スキル・技術 */}
              <div className="section-card p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Code className="w-5 h-5 mr-2 text-indigo-600" />スキル・技術
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">スキルタグ</label>
                    <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg min-h-[42px]">
                      <input type="text" placeholder="スキルを入力してEnterキーを押してください" className="flex-1 outline-none bg-transparent min-w-32" disabled />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">例：JavaScript, React, Python, デザイン思考</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">資格・検定</label>
                    <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="例：TOEIC 850点、基本情報技術者試験 合格" disabled></textarea>
                  </div>
                </div>
              </div>
              {/* プロジェクト・実績 */}
              <div className="section-card p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Projector className="w-5 h-5 mr-2 text-indigo-600" />プロジェクト・実績
                </h3>
                <div className="space-y-4">
                  <div className="project-item border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-gray-800">プロジェクト #1</h4>
                      <button type="button" className="text-red-500 hover:text-red-700" disabled>
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <input type="text" placeholder="プロジェクト名" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" disabled />
                      <textarea placeholder="プロジェクトの説明、使用技術、成果など" rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" disabled></textarea>
                      <input type="url" placeholder="プロジェクトURL（任意）" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" disabled />
                    </div>
                  </div>
                  <button type="button" className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 flex items-center justify-center mt-2 cursor-not-allowed" disabled>
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
                    <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="インターンシップでの経験や学んだことを記載してください" disabled></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">課外活動・サークル</label>
                    <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="サークル活動、ボランティア、アルバイトなど" disabled></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">受賞歴・表彰</label>
                    <textarea rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="コンテスト受賞、学術表彰など" disabled></textarea>
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
                      <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" disabled />
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
            </form>
          </div>
        </div>
        {/* Right Side - Preview */}
        <div className="w-1/2 bg-gray-50">
          <div className="preview-section p-6 max-h-[calc(100vh-120px)] overflow-y-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Preview Header */}
              <div className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white p-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">お名前を入力してください</h2>
                  <p className="text-lg opacity-90">大学・学部を入力してください</p>
                  <p className="text-sm opacity-75"></p>
                </div>
              </div>
              {/* Preview Content */}
              <div className="p-6">
                {/* Introduction */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <User className="w-5 h-5 mr-2 text-indigo-600" />自己紹介
                  </h3>
                  <p className="text-gray-700">自己紹介を入力してください</p>
                </div>
                {/* Skills */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <Code className="w-5 h-5 mr-2 text-indigo-600" />スキル
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm">スキルを追加してください</span>
                  </div>
                </div>
                {/* Certifications */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <Code className="w-5 h-5 mr-2 text-indigo-600" />資格・検定
                  </h3>
                  <p className="text-gray-700"></p>
                </div>
                {/* Projects */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <Projector className="w-5 h-5 mr-2 text-indigo-600" />プロジェクト
                  </h3>
                  <div>
                    <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm">プロジェクトを追加してください</span>
                  </div>
                </div>
                {/* Contact */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <User className="w-5 h-5 mr-2 text-indigo-600" />連絡先
                  </h3>
                  <p className="text-gray-700">メールアドレスを入力してください</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Floating Action Button */}
      <div className="fixed bottom-5 right-5 z-50">
        <button className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition hover:scale-105 flex items-center" disabled>
          <Save className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default PortfolioCreatePage; 