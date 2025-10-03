import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  const data = await request.json()
  console.log('API受信データ:', data)

  const resolvedUserId = data.user_id ?? data.userId ?? data.user?.id ?? data.user?.uid

  if (!resolvedUserId) {
    return NextResponse.json(
      { success: false, error: 'user_id is required' },
      { status: 400 }
    )
  }

  const toNullableString = (value: unknown) => {
    if (typeof value !== 'string') return value == null ? null : String(value)
    const trimmed = value.trim()
    return trimmed.length > 0 ? trimmed : null
  }

  const toStringOrEmpty = (value: unknown) => {
    if (typeof value === 'string') return value
    if (value == null) return ''
    return String(value)
  }

  const userName = toNullableString(data.user?.name ?? data.name)
  const userEmail = toNullableString(data.user?.email ?? data.email)
  const userPhone = toNullableString(data.user?.phone ?? data.phone)
  const userAddress = toNullableString(data.user?.address ?? data.address)

  const portfolioSource = data.portfolio ?? {
    id: data.id,
    name: data.name,
    university: data.university,
    faculty: data.faculty ?? data.department,
    grade: data.grade,
    email: data.email,
    phone: data.phone,
    address: data.address,
    selfIntroduction: data.selfIntroduction,
    skillTags: data.skillTags,
    certifications: data.certifications,
    projects: data.projects,
    experience: data.experience,
    other: data.other,
    publication: data.publication,
    visibilitySettings: data.visibilitySettings,
  }

  const skillTags = Array.isArray(portfolioSource.skillTags)
    ? portfolioSource.skillTags
    : Array.isArray(data.skillTags)
      ? data.skillTags
      : []

  const projects = Array.isArray(portfolioSource.projects)
    ? portfolioSource.projects
    : Array.isArray(data.projects)
      ? data.projects
      : []

  const ensureObject = (value: unknown) =>
    value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {}

  const experience = ensureObject(portfolioSource.experience ?? data.experience)
  const other = ensureObject(portfolioSource.other ?? data.other)
  const publication = ensureObject(portfolioSource.publication ?? data.publication)
  const visibilitySettings = ensureObject(
    portfolioSource.visibilitySettings ?? data.visibilitySettings
  )

  try {
  let targetUserId = resolvedUserId

    const existingUserById = await prisma.user.findUnique({
      where: { id: targetUserId },
    })

    if (!existingUserById && userEmail) {
      const existingUserByEmail = await prisma.user.findUnique({
        where: { email: userEmail },
      })

      if (existingUserByEmail) {
        targetUserId = existingUserByEmail.id
      }
    }

    const userRecord = await prisma.user.upsert({
      where: { id: targetUserId },
      update: {
        email: userEmail ?? undefined,
        name: userName ?? undefined,
      },
      create: {
        id: targetUserId,
        email: userEmail,
        name: userName,
      },
    })

    const portfolioData = {
      userId: userRecord.id,
      name: portfolioSource.name ?? userName ?? '',
      university: portfolioSource.university ?? '',
      faculty: portfolioSource.faculty ?? '',
      grade: portfolioSource.grade ?? '',
      email: toStringOrEmpty(portfolioSource.email ?? userEmail),
      phone: toStringOrEmpty(portfolioSource.phone ?? userPhone),
      address: toStringOrEmpty(portfolioSource.address ?? userAddress),
      selfIntroduction: toStringOrEmpty(portfolioSource.selfIntroduction),
      skillTags: JSON.stringify(skillTags),
      certifications: toStringOrEmpty(portfolioSource.certifications),
      projects: JSON.stringify(projects),
      experience: JSON.stringify(experience),
      other: JSON.stringify(other),
      publication: JSON.stringify(publication),
      visibilitySettings: JSON.stringify(visibilitySettings),
    }

    const portfolioId: string | undefined = portfolioSource.id ?? data.id ?? undefined

    const portfolio = portfolioId
      ? await prisma.portfolio.upsert({
          where: { id: portfolioId },
          update: portfolioData,
          create: {
            id: portfolioId,
            ...portfolioData,
          },
        })
      : await prisma.portfolio.create({
          data: portfolioData,
        })

    return NextResponse.json({ success: true, portfolio })
  } catch (error) {
    console.error('保存エラー:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
