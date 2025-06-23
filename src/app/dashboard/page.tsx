import {
  Briefcase,
  LayoutDashboard,
  Edit,
  Eye,
  Share2,
  UserCog,
  LogOut,
  HelpCircle,
  Bell,
  Plus,
  Heart,
  CheckCircle,
  Calendar,
  FileText,
  LineChart,
} from "lucide-react";

const DashboardPage = () => {
  return (
    <div className="flex bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 flex flex-col">
        <div className="flex items-center justify-center h-16 border-b border-gray-200 shrink-0">
          <div className="flex items-center">
            <Briefcase className="w-7 h-7 text-indigo-600" />
            <h1 className="text-xl font-bold text-gray-800 ml-2">Y-folio</h1>
          </div>
        </div>

        <nav className="mt-6 flex-1">
          <div className="px-4 mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                田
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">田中 太郎</p>
                <p className="text-xs text-gray-500">東京大学</p>
              </div>
            </div>
          </div>

          <div className="px-4 mt-6 mb-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              メニュー
            </p>
          </div>

          <div className="px-4 space-y-2">
            <a href="#" className="flex items-center px-4 py-3 rounded-lg text-white bg-indigo-600">
              <LayoutDashboard className="w-5 h-5 mr-3" />
              <span>ダッシュボード</span>
            </a>
            <a href="/dashboard/portfolio-edit" className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
              <Edit className="w-5 h-5 mr-3" />
              <span>ポートフォリオ編集</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
              <Eye className="w-5 h-5 mr-3" />
              <span>公開ページ表示</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
              <Share2 className="w-5 h-5 mr-3" />
              <span>共有</span>
            </a>
          </div>

          <div className="px-4 mt-8 mb-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              アカウント
            </p>
          </div>

          <div className="px-4 space-y-2">
            <a href="/dashboard/account-settings" className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
              <UserCog className="w-5 h-5 mr-3" />
              <span>アカウント設定</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
              <LogOut className="w-5 h-5 mr-3" />
              <span>ログアウト</span>
            </a>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200 shrink-0">
          <a href="#" className="flex items-center text-sm text-gray-600 hover:text-indigo-600 transition">
            <HelpCircle className="w-5 h-5 mr-2" />
            ヘルプ & サポート
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64 flex-1">
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                こんにちは、田中さん！
              </h2>
              <p className="text-gray-600">あなたのポートフォリオの状況です</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                <Bell className="w-6 h-6" />
              </button>
              <a href="#" className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                <Plus className="w-5 h-5 mr-2" />
                ポートフォリオ作成
              </a>
            </div>
          </div>
        </header>

        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"><Eye className="text-blue-600 w-6 h-6" /></div>
                      <div className="ml-4"><p className="text-sm font-medium text-gray-600">総閲覧数</p><p className="text-2xl font-bold text-gray-800">1,234</p></div>
                  </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center"><Heart className="text-red-600 w-6 h-6" /></div>
                      <div className="ml-4"><p className="text-sm font-medium text-gray-600">いいね数</p><p className="text-2xl font-bold text-gray-800">45</p></div>
                  </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"><CheckCircle className="text-green-600 w-6 h-6" /></div>
                      <div className="ml-4"><p className="text-sm font-medium text-gray-600">公開ステータス</p><p className="text-xl font-bold text-gray-800">公開中</p></div>
                  </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center"><Calendar className="text-purple-600 w-6 h-6" /></div>
                      <div className="ml-4"><p className="text-sm font-medium text-gray-600">最終更新日</p><p className="text-xl font-bold text-gray-800">2日前</p></div>
                  </div>
              </div>
          </div>

          {/* Quick Actions & Portfolio Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">クイックアクション</h3>
              <div className="space-y-3">
                  <a href="/dashboard/portfolio-edit" className="flex items-center p-4 border-2 border-transparent rounded-lg hover:bg-gray-50 hover:border-indigo-500"><Edit className="text-blue-600 w-6 h-6 mr-4" /><div><p className="font-medium text-gray-800">ポートフォリオを編集</p><p className="text-sm text-gray-500">基本情報や実績を更新</p></div></a>
                  <a href="#" className="flex items-center p-4 border-2 border-transparent rounded-lg hover:bg-gray-50 hover:border-indigo-500"><Eye className="text-green-600 w-6 h-6 mr-4" /><div><p className="font-medium text-gray-800">プレビュー</p><p className="text-sm text-gray-500">公開ページを確認</p></div></a>
                  <a href="#" className="flex items-center p-4 border-2 border-transparent rounded-lg hover:bg-gray-50 hover:border-indigo-500"><Share2 className="text-purple-600 w-6 h-6 mr-4" /><div><p className="font-medium text-gray-800">共有</p><p className="text-sm text-gray-500">URLをコピーして共有</p></div></a>
                  <a href="#" className="flex items-center p-4 border-2 border-transparent rounded-lg hover:bg-gray-50 hover:border-indigo-500"><FileText className="text-red-600 w-6 h-6 mr-4" /><div><p className="font-medium text-gray-800">PDFで出力</p><p className="text-sm text-gray-500">印刷用のPDFをダウンロード</p></div></a>
              </div>
            </div>
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">ポートフォリオプレビュー</h3>
              <div className="bg-gray-100 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-4 flex items-center justify-center text-white text-2xl font-semibold">田</div>
                  <div><h4 className="text-xl font-bold text-gray-800">田中 太郎</h4><p className="text-gray-600">東京大学・情報科学科</p></div>
                </div>
                <p className="text-gray-700 mb-4">Web開発とAI技術に興味があり、複数のプロジェクトを手がけています。React、Node.js、Pythonを使用した開発経験があります。</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">JavaScript</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">React</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">Python</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">閲覧数アナリティクス (過去30日間)</h3>
            <div className="h-72 flex items-center justify-center text-gray-500 bg-gray-50 rounded-lg">
                <div className="text-center">
                    <LineChart className="w-10 h-10 mx-auto mb-2 text-gray-400" />
                    <p>チャート表示エリア</p>
                    <p className="text-sm">実装予定</p>
                </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;