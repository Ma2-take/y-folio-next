import Link from 'next/link'
import React from 'react'

export default function NavBar() {
    return (
        <nav className="bg-white shadow-lg fixed w-full z-50" >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <i className="fas fa-briefcase text-2xl text-indigo-600 mr-2"></i>
                        <h1 className="text-2xl font-bold text-gray-800">
                            <Link href="/" className="">
                                Y-folio
                            </Link>
                            </h1>
                    </div>
                    <div className="hidden md:flex space-x-6">
                        <Link href="/#features" className="text-gray-600 hover:text-indigo-600 transition">機能</Link>
                        <Link href="/portfolio/list" className="text-gray-600 hover:text-indigo-600 transition">ポートフォリオ一覧</Link>
                        <Link href="/tags" className="text-gray-600 hover:text-indigo-600 transition">タグ一覧</Link>
                        <Link href="/dashboard" className="text-gray-600 hover:text-indigo-600 transition">ダッシュボード</Link>
                    </div>
                    <div className="flex space-x-3">
                        <Link href="/login" className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition">ログイン</Link>
                        <Link href="/signup" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">新規登録</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
