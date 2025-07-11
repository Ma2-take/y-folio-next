'use client';

import { User } from '@/types/User';
import { Edit, Eye, Share2, FileText } from 'lucide-react';

interface Props {
  user: User;
  handleShareClick: () => void;
  handlePdfPreview: () => void;
}

export default function PortfolioPreview({ user, handleShareClick, handlePdfPreview }: Props) {
  return (
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
            <div>
              <h4 className="text-xl font-bold text-gray-800">
                {user.name}
              </h4>
              <p className="text-gray-600">
                {user.university}・{user.grade}年
              </p>
            </div>
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
  );
}
