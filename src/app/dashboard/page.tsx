'use client';

import { useState } from 'react';
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
  X,
  Download,
  Printer,
  Copy,
  Mail,
  Twitter,
  Facebook,
  Linkedin,
  Link,
  ExternalLink,
} from "lucide-react";

const DashboardPage = () => {
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pdfFormat, setPdfFormat] = useState<'standard' | 'table' | 'resume'>('standard');

  const handlePdfPreview = () => {
    setShowPdfPreview(true);
  };

  const closePdfPreview = () => {
    setShowPdfPreview(false);
  };

  const handleShareClick = () => {
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
    setCopied(false);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText('https://y-folio.com/portfolio/tanaka-taro');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      name: 'URLをコピー',
      icon: Copy,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      hoverBg: 'hover:bg-blue-100',
      action: handleCopyUrl
    },
    {
      name: 'メールで共有',
      icon: Mail,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      hoverBg: 'hover:bg-green-100',
      action: () => {}
    },
    {
      name: 'QRコード',
      icon: Link,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      hoverBg: 'hover:bg-purple-100',
      action: () => {}
    }
  ];

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
            <a href="/portfolio/edit" className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
              <Edit className="w-5 h-5 mr-3" />
              <span>ポートフォリオ編集</span>
            </a>
            <a href="/portfolio/preview" className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
              <Eye className="w-5 h-5 mr-3" />
              <span>プレビュー</span>
            </a>
            <a onClick={handleShareClick} className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
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
            <a href="/account" className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
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
              <a href="/portfolio/create" className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
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
                  <a href="/portfolio/edit" className="flex items-center p-4 border-2 border-transparent rounded-lg hover:bg-gray-50 hover:border-indigo-500"><Edit className="text-blue-600 w-6 h-6 mr-4" /><div><p className="font-medium text-gray-800">ポートフォリオを編集</p><p className="text-sm text-gray-500">基本情報や実績を更新</p></div></a>
                  <a href="/portfolio/preview" className="flex items-center p-4 border-2 border-transparent rounded-lg hover:bg-gray-50 hover:border-indigo-500"><Eye className="text-green-600 w-6 h-6 mr-4" /><div><p className="font-medium text-gray-800">プレビュー</p><p className="text-sm text-gray-500">公開ページを確認</p></div></a>
                  <button onClick={handleShareClick} className="flex items-center p-4 border-2 border-transparent rounded-lg hover:bg-gray-50 hover:border-indigo-500 text-left w-full">
                    <Share2 className="text-purple-600 w-6 h-6 mr-4" />
                    <div>
                      <p className="font-medium text-gray-800">共有</p>
                      <p className="text-sm text-gray-500">URLをコピーして共有</p>
                    </div>
                  </button>
                  <button onClick={handlePdfPreview} className="w-full flex items-center p-4 border-2 border-transparent rounded-lg hover:bg-gray-50 hover:border-indigo-500 text-left"><FileText className="text-red-600 w-6 h-6 mr-4" /><div><p className="font-medium text-gray-800">PDFで出力</p><p className="text-sm text-gray-500">印刷用のPDFをダウンロード</p></div></button>
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

      {/* PDF Preview Modal */}
      {showPdfPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">PDFプレビュー</h3>
                <p className="text-sm text-gray-600">印刷用ポートフォリオのプレビュー</p>
              </div>
              <div className="flex items-center space-x-3">
                {/* Format Selection */}
                <div className="flex items-center space-x-2 mr-4">
                  <label className="text-sm font-medium text-gray-700">形式:</label>
                  <select 
                    value={pdfFormat} 
                    onChange={(e) => setPdfFormat(e.target.value as 'standard' | 'table' | 'resume')}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="standard">標準形式</option>
                    <option value="table">表形式</option>
                    <option value="resume">履歴書形式</option>
                  </select>
                </div>
                <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                  <Printer className="w-4 h-4 mr-2" />
                  印刷
                </button>
                <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                  <Download className="w-4 h-4 mr-2" />
                  ダウンロード
                </button>
                <button 
                  onClick={closePdfPreview}
                  className="p-2 text-gray-400 hover:text-gray-600 transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content - PDF Preview */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {pdfFormat === 'standard' ? (
                <>
                  {/* Standard Format */}
                  {/* PDF Header */}
                  <div className="text-center mb-8 pb-6 border-b-2 border-gray-200">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">田中 太郎</h1>
                    <p className="text-lg text-gray-600 mb-2">東京大学・情報科学科</p>
                    <p className="text-sm text-gray-500">Web開発者 / フルスタックエンジニア</p>
                  </div>

                  {/* Contact Information */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">連絡先</h2>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">メール:</span> tanaka@example.com
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">電話:</span> 090-1234-5678
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">住所:</span> 東京都渋谷区
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">GitHub:</span> github.com/tanaka-taro
                      </div>
                    </div>
                  </div>

                  {/* Profile */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">プロフィール</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Web開発とAI技術に強い関心を持つ情報科学科の学生です。React、Node.js、Pythonを使用した
                      フルスタック開発の経験があり、複数のプロジェクトでリーダーシップを発揮してきました。
                      新しい技術の習得に積極的で、チーム開発でのコミュニケーション能力も高く評価されています。
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">スキル</h2>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium text-gray-800 mb-2">プログラミング言語</h3>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">JavaScript</span>
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Python</span>
                          <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">TypeScript</span>
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">Java</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 mb-2">フレームワーク・ライブラリ</h3>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">React</span>
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Node.js</span>
                          <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">Next.js</span>
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">Express</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">経験・実績</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-gray-800">Eコマースサイト開発</h3>
                        <p className="text-sm text-gray-600 mb-2">2023年6月 - 2023年12月</p>
                        <p className="text-gray-700 text-sm">
                          React + Node.jsを使用したフルスタックEコマースサイトの開発。ユーザー認証、商品管理、
                          決済システムの実装を担当。月間売上100万円を達成。
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">AIチャットボット開発</h3>
                        <p className="text-sm text-gray-600 mb-2">2023年3月 - 2023年5月</p>
                        <p className="text-gray-700 text-sm">
                          Python + TensorFlowを使用した自然言語処理チャットボットの開発。
                          顧客サポート業務の効率化に貢献。
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">学歴</h2>
                    <div>
                      <h3 className="font-medium text-gray-800">東京大学 情報科学科</h3>
                      <p className="text-sm text-gray-600">2021年4月 - 2025年3月（予定）</p>
                      <p className="text-gray-700 text-sm mt-1">
                        情報工学、アルゴリズム、データベース、ソフトウェア工学を専攻。
                        GPA: 3.8/4.0
                      </p>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">資格・認定</h2>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">AWS認定ソリューションアーキテクト</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Google Cloud認定</span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">TOEIC 900点</span>
                    </div>
                  </div>
                </>
              ) : pdfFormat === 'table' ? (
                <>
                  {/* Table Format */}
                  {/* PDF Header */}
                  <div className="text-center mb-8 pb-6 border-b-2 border-gray-200">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">田中 太郎</h1>
                    <p className="text-lg text-gray-600 mb-2">東京大学・情報科学科</p>
                    <p className="text-sm text-gray-500">Web開発者 / フルスタックエンジニア</p>
                  </div>

                  {/* Contact Information Table */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">連絡先</h2>
                    <table className="w-full border-collapse border border-gray-300">
                      <tbody>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700 w-1/3">メール</td>
                          <td className="border border-gray-300 px-4 py-2">tanaka@example.com</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">電話</td>
                          <td className="border border-gray-300 px-4 py-2">090-1234-5678</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">住所</td>
                          <td className="border border-gray-300 px-4 py-2">東京都渋谷区</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">GitHub</td>
                          <td className="border border-gray-300 px-4 py-2">github.com/tanaka-taro</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Skills Table */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">スキル</h2>
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">カテゴリ</th>
                          <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">スキル</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">プログラミング言語</td>
                          <td className="border border-gray-300 px-4 py-2">JavaScript, Python, TypeScript, Java</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">フレームワーク・ライブラリ</td>
                          <td className="border border-gray-300 px-4 py-2">React, Node.js, Next.js, Express</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">データベース</td>
                          <td className="border border-gray-300 px-4 py-2">MySQL, PostgreSQL, MongoDB</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">クラウド・インフラ</td>
                          <td className="border border-gray-300 px-4 py-2">AWS, Google Cloud, Docker</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Experience Table */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">経験・実績</h2>
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">期間</th>
                          <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">プロジェクト名</th>
                          <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">技術・成果</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-4 py-2">2023年6月 - 2023年12月</td>
                          <td className="border border-gray-300 px-4 py-2 font-medium">Eコマースサイト開発</td>
                          <td className="border border-gray-300 px-4 py-2">React + Node.js, 月間売上100万円達成</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2">2023年3月 - 2023年5月</td>
                          <td className="border border-gray-300 px-4 py-2 font-medium">AIチャットボット開発</td>
                          <td className="border border-gray-300 px-4 py-2">Python + TensorFlow, 顧客サポート効率化</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-2">2022年9月 - 2023年2月</td>
                          <td className="border border-gray-300 px-4 py-2 font-medium">モバイルアプリ開発</td>
                          <td className="border border-gray-300 px-4 py-2">React Native, 10,000ダウンロード達成</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Education Table */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">学歴</h2>
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">期間</th>
                          <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">学校・専攻</th>
                          <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">成績・特記事項</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-4 py-2">2021年4月 - 2025年3月（予定）</td>
                          <td className="border border-gray-300 px-4 py-2 font-medium">東京大学 情報科学科</td>
                          <td className="border border-gray-300 px-4 py-2">GPA: 3.8/4.0, 情報工学専攻</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Certifications Table */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">資格・認定</h2>
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">資格名</th>
                          <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">取得年月</th>
                          <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">スコア・等級</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-4 py-2 font-medium">AWS認定ソリューションアーキテクト</td>
                          <td className="border border-gray-300 px-4 py-2">2023年12月</td>
                          <td className="border border-gray-300 px-4 py-2">Associate</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2 font-medium">Google Cloud認定</td>
                          <td className="border border-gray-300 px-4 py-2">2023年8月</td>
                          <td className="border border-gray-300 px-4 py-2">Professional</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-2 font-medium">TOEIC</td>
                          <td className="border border-gray-300 px-4 py-2">2023年6月</td>
                          <td className="border border-gray-300 px-4 py-2">900点</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <>
                  {/* Resume Format */}
                  <div className="bg-white border border-gray-400 rounded-lg p-8 max-w-3xl mx-auto shadow-inner text-gray-900">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h1 className="text-2xl font-bold">履歴書</h1>
                      </div>
                      <div className="text-right text-sm">
                        <div>作成日: 2024年4月1日</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="col-span-2">
                        <div className="mb-2"><span className="font-semibold">氏名</span>: 田中 太郎</div>
                        <div className="mb-2"><span className="font-semibold">フリガナ</span>: タナカ タロウ</div>
                        <div className="mb-2"><span className="font-semibold">生年月日</span>: 2002年1月1日（22歳）</div>
                        <div className="mb-2"><span className="font-semibold">性別</span>: 男性</div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="w-24 h-28 bg-gray-200 rounded border border-gray-400 flex items-center justify-center text-gray-400">写真</div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <span className="font-semibold">現住所</span>: 東京都渋谷区
                    </div>
                    <div className="mb-4">
                      <span className="font-semibold">電話番号</span>: 090-1234-5678
                    </div>
                    <div className="mb-4">
                      <span className="font-semibold">メールアドレス</span>: tanaka@example.com
                    </div>
                    <div className="mb-6">
                      <span className="font-semibold">学歴・職歴</span>:
                      <table className="w-full border mt-2 text-sm">
                        <tbody>
                          <tr>
                            <td className="border px-2 py-1 w-1/4">2021年4月</td>
                            <td className="border px-2 py-1">東京大学 情報科学科 入学</td>
                          </tr>
                          <tr>
                            <td className="border px-2 py-1">2025年3月（予定）</td>
                            <td className="border px-2 py-1">東京大学 情報科学科 卒業見込</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="mb-6">
                      <span className="font-semibold">資格・免許</span>:
                      <ul className="list-disc ml-6 mt-2">
                        <li>AWS認定ソリューションアーキテクト</li>
                        <li>TOEIC 900点</li>
                      </ul>
                    </div>
                    <div className="mb-6">
                      <span className="font-semibold">志望動機・自己PR</span>:
                      <div className="mt-2 p-3 border rounded bg-gray-50">
                        Web開発とAI技術に強い関心を持ち、ReactやPythonを活用したプロジェクト経験があります。新しい技術の習得やチームでの協働を大切にしています。
                      </div>
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">本人希望欄</span>:
                      <div className="mt-2 p-3 border rounded bg-gray-50">
                        貴社の開発チームでスキルを活かし、成長したいと考えています。
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">ポートフォリオを共有</h3>
              <button
                onClick={closeShareModal}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  共有URL
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value="https://y-folio.com/portfolio/tanaka-taro"
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg bg-gray-50 text-sm"
                  />
                  <button
                    onClick={handleCopyUrl}
                    className={`px-4 py-2 border border-l-0 border-gray-300 rounded-r-lg transition ${
                      copied 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {copied ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {copied && (
                  <p className="text-green-600 text-sm mt-2">URLをコピーしました！</p>
                )}
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">共有方法を選択</h4>
                <div className="grid grid-cols-2 gap-3">
                  {shareOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={option.action}
                      className={`flex items-center p-3 rounded-lg border border-gray-200 transition ${option.bgColor} ${option.hoverBg}`}
                    >
                      <option.icon className={`w-5 h-5 mr-3 ${option.color}`} />
                      <span className="text-sm font-medium text-gray-700">{option.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">共有設定</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                    <span className="ml-2 text-sm text-gray-600">閲覧統計を公開する</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="ml-2 text-sm text-gray-600">コメントを許可する</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end p-6 border-t border-gray-200">
              <button
                onClick={closeShareModal}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;