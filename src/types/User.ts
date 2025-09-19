export interface User {
    id: string
    email: string
    password_hash: string
    name: string
    university?: string | null
    grade?: string | null
    department?: string | null
    phone?: string | null
    address?: string | null
    birthDate?: Date | null
    selfIntroduction?: string | null
    is_active: boolean
    email_verified: boolean
    verification_token?: string | null
    reset_token?: string | null
    reset_token_expires?: Date | null
    certifications?: string | null
    awards?: string | null
    created_at: Date
    updated_at: Date
}
