'use client';

export default function TablePdfContent() {
  return (
    <>
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b-2 border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">田中 太郎</h1>
        <p className="text-lg text-gray-600 mb-2">東京大学・情報科学科</p>
        <p className="text-sm text-gray-500">Web開発者 / フルスタックエンジニア</p>
      </div>

      {/* Contact Info */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">連絡先</h2>
        <table className="w-full border-collapse border border-gray-300 text-sm">
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

      {/* Skills */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">スキル</h2>
        <table className="w-full border-collapse border border-gray-300 text-sm">
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

      {/* Experience */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">経験・実績</h2>
        <table className="w-full border-collapse border border-gray-300 text-sm">
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

      {/* Education */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">学歴</h2>
        <table className="w-full border-collapse border border-gray-300 text-sm">
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

      {/* Certifications */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">資格・認定</h2>
        <table className="w-full border-collapse border border-gray-300 text-sm">
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
  );
}