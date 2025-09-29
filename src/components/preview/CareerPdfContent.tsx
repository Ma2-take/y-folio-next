'use client';

export default function CareerPdfContent() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-8">職務経歴書</h1>
            
            {/* 基本情報 */}
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 border-b-2 border-gray-200">基本情報</h2>
                {/* 基本情報の内容 */}
            </div>

            {/* 職務経歴 */}
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 border-b-2 border-gray-200">職務経歴</h2>
                {/* 職務経歴の内容 */}
            </div>

            {/* スキル */}
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 border-b-2 border-gray-200">保有スキル</h2>
                {/* スキルの内容 */}
            </div>

            {/* 資格・免許 */}
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 border-b-2 border-gray-200">資格・免許</h2>
                {/* 資格・免許の内容 */}
            </div>
        </div>
    );
}