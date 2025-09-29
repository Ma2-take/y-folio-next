import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const data = await request.json(); 
    try {
        const account = await prisma.account.findUnique({
            where: {
                provider_providerUserId: {
                    provider: "google",
                    providerUserId: data.uid,
                },
            },
            include: { user: true },
        });

        if (!account || !account.user) {
            return NextResponse.json(
                { success: false, message: "ユーザーが見つかりません" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, user: account.user });
    } catch (e) {
        console.error("取得エラー:", e);
        return NextResponse.json(
            { success: false, error: String(e) },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}