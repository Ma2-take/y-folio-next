'use client';

export default function StandardPdfContent() {
  return (
    <>
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b-2 border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">田中 太郎</h1>
        <p className="text-lg text-gray-600 mb-2">東京大学・情報科学科</p>
        <p className="text-sm text-gray-500">Web開発者 / フルスタックエンジニア</p>
      </div>

      {/* Contact */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">連絡先</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><span className="font-medium text-gray-700">メール:</span> tanaka@example.com</div>
          <div><span className="font-medium text-gray-700">電話:</span> 090-1234-5678</div>
          <div><span className="font-medium text-gray-700">住所:</span> 東京都渋谷区</div>
          <div><span className="font-medium text-gray-700">GitHub:</span> github.com/tanaka-taro</div>
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
            情報工学、アルゴリズム、データベース、ソフトウェア工学を専攻。GPA: 3.8/4.0
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
  );
}