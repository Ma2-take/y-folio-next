'use client';

import { useEffect, useState } from 'react';
import { fetchUser } from '@/lib/api/user';
import { User } from '@/types/User';

interface Props {
  userId: string;
}

export default function CareerPdfContent({ userId }: Props) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                console.log('CareerPdfContent: Loading user data for ID:', userId); // デバッグログ
                
                if (!userId) {
                    throw new Error('ユーザーIDが指定されていません');
                }

                const userData = await fetchUser(userId);
                
                console.log('CareerPdfContent: Received user data:', userData); // デバッグログ
                
                setUser(userData);

            } catch (err) {
                console.error('CareerPdfContent: Error loading user data:', {
                    error: err,
                    message: err instanceof Error ? err.message : 'Unknown error'
                });
                
                setError(
                    err instanceof Error 
                        ? `データ取得エラー: ${err.message}` 
                        : 'データの取得中に予期せぬエラーが発生しました'
                );
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            loadUserData();
        }
    }, [userId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                    <p className="text-gray-600">読み込み中...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="text-red-800 font-medium mb-2">エラーが発生しました</h3>
                    <p className="text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="p-8 text-center">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800">ユーザー情報が見つかりません</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-8">職務経歴書</h1>
            
            {/* 基本情報 */}
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 border-b-2 border-gray-200">基本情報</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                        <div className="text-lg font-semibold">{user.name}</div>
                        <div>{user.address}</div>
                        <div>{user.phone}</div>
                    </div>
                    <div className="space-y-2">
                        <div>{user.email}</div>
                        <div>{user.github}</div>
                        <div>{user.education}</div>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-gray-700 leading-relaxed">
                        {user.profile}
                    </p>
                </div>
            </div>

            {/* スキル */}
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 border-b-2 border-gray-200">保有スキル</h2>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-medium mb-2">プログラミング言語</h3>
                        <ul className="list-disc list-inside text-gray-700">
                            {user.portfolio?.skills?.map((skill, index) => (
                                <li key={index}>{skill.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* キャリア */}
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 border-b-2 border-gray-200">職務経歴</h2>
                {user.portfolio?.careers?.map((career, index) => (
                    <div key={index} className="mb-4">
                        <h3 className="font-medium text-gray-800">{career.companyName}</h3>
                        <p className="text-sm text-gray-600">
                            {career.startDate} - {career.endDate || '現在'}
                        </p>
                        <p className="text-gray-700">{career.description}</p>
                    </div>
                ))}
            </div>

            {/* 資格 */}
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 border-b-2 border-gray-200">資格・免許</h2>
                <div className="flex flex-wrap gap-2">
                    {user.portfolio?.certifications?.map((cert, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                            {cert.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}