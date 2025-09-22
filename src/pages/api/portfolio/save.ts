import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { userId, ...form } = req.body;

  try {
    const portfolio = await prisma.portfolio.create({
      data: {
        userId,
        name: form.name,
        university: form.university,
        faculty: form.faculty,
        grade: form.grade,
        email: form.email,
        phone: form.phone,
        address: form.address,
        selfIntroduction: form.selfIntroduction,
        skillTags: JSON.stringify(form.skillTags),
        certifications: form.certifications,
        projects: JSON.stringify(form.projects),
        experience: JSON.stringify(form.experience),
        other: JSON.stringify(form.other),
        publication: JSON.stringify(form.publication),
        visibilitySettings: JSON.stringify(form.visibilitySettings),
      },
    });
    res.status(200).json({ portfolio });
  } catch (error) {
    res.status(500).json({ error: "保存に失敗しました" });
  }
}