'use client';

export default function ResumePdfContent() {
    return (
        <div className="bg-white border border-gray-400 rounded-lg p-8 max-w-3xl mx-auto shadow-inner text-gray-900 text-sm">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">履歴書</h1>
                </div>
                <div className="text-right text-sm">
                    <div>作成日: 2024年4月1日</div>
                </div>
            </div>

            {/* 氏名・写真・基本情報 */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="col-span-2">
                    <div className="mb-2"><span className="font-semibold">氏名</span>: 田中 太郎</div>
                    <div className="mb-2"><span className="font-semibold">フリガナ</span>: タナカ タロウ</div>
                    <div className="mb-2"><span className="font-semibold">生年月日</span>: 2002年1月1日（22歳）</div>
                    <div className="mb-2"><span className="font-semibold">性別</span>: 男性</div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="w-24 h-28 bg-gray-200 rounded border border-gray-400 flex items-center justify-center text-gray-400">
                        写真
                    </div>
                </div>
            </div>

            {/* 住所・連絡先 */}
            <div className="mb-4">
                <span className="font-semibold">現住所</span>: 東京都渋谷区
            </div>
            <div className="mb-4">
                <span className="font-semibold">電話番号</span>: 090-1234-5678
            </div>
            <div className="mb-4">
                <span className="font-semibold">メールアドレス</span>: tanaka@example.com
            </div>

            {/* 学歴・職歴 */}
            <div className="mb-6">
                <span className="font-semibold">学歴・職歴</span>:
                <table className="w-full border mt-2">
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

            {/* 資格・免許 */}
            <div className="mb-6">
                <span className="font-semibold">資格・免許</span>:
                <ul className="list-disc ml-6 mt-2">
                    <li>AWS認定ソリューションアーキテクト</li>
                    <li>TOEIC 900点</li>
                </ul>
            </div>

            {/* 志望動機・自己PR */}
            <div className="mb-6">
                <span className="font-semibold">志望動機・自己PR</span>:
                <div className="mt-2 p-3 border rounded bg-gray-50 leading-relaxed">
                    Web開発とAI技術に強い関心を持ち、ReactやPythonを活用したプロジェクト経験があります。
                    新しい技術の習得やチームでの協働を大切にしています。
                </div>
            </div>

            {/* 本人希望欄 */}
            <div className="mb-2">
                <span className="font-semibold">本人希望欄</span>:
                <div className="mt-2 p-3 border rounded bg-gray-50 leading-relaxed">
                    貴社の開発チームでスキルを活かし、成長したいと考えています。
                </div>
            </div>
        </div>
    );
}