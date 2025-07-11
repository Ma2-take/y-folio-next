export interface Portfolio {
    id: string
    user_id: string
    isPublic: boolean
    autoDeleteAfterOneYear?: boolean | false
    skills?: string[] | null
    certifications?: string | null
    internship?: string | null
    extracurricular?: string | null
    experience?: string | null
    awards?: string | null
    customQuestions?: string | null
    additionalInfo?: string | null
}
