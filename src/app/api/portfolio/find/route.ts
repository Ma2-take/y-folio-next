import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        
        console.log('Received request with data:', data); // デバッグログ

        const { uid } = data;

        if (!uid) {
            return NextResponse.json(
                { error: 'ユーザーIDが必要です' },
                { status: 400 }
            );
        }

        console.log('Searching for user with uid:', uid); // デバッグログ

        const account = await prisma.account.findUnique({
            where: {
                provider_providerUserId: {
                    provider: "google",
                    providerUserId: uid
                }
            },
            include: {
                user: {
                    include: {
                        portfolios: {
                            include: {
                                skills: true,
                                certifications: true,
                                careers: true
                            }
                        }
                    }
                }
            }
        });

        console.log('Database query result:', account); // デバッグログ

        if (!account || !account.user) {
            return NextResponse.json(
                { error: 'ユーザーが見つかりません' },
                { status: 404 }
            );
        }

        // ユーザーデータを整形
        const userData = {
            ...account.user,
            portfolio: account.user.portfolios?.[0] || null,
            skills: account.user.portfolios?.[0]?.skills || [],
            certifications: account.user.portfolios?.[0]?.certifications || [],
            careers: account.user.portfolios?.[0]?.careers || []
        };

        console.log('Sending response:', userData); // デバッグログ

        return NextResponse.json(userData);

    } catch (error) {
        console.error('API Error:', {
            error,
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        });

        return NextResponse.json(
            { 
                error: 'データの取得に失敗しました',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}