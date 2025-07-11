export interface User {
    id: string
    email: string
    password_hash: string
    name: string
    university?: string | null
    phone?: string | null
    address?: string | null
    grade?: string | null
    birth_date?: Date | null
    selfIntroduction?: string | null
    is_active: boolean
    email_verified: boolean
    verification_token?: string | null
    reset_token?: string | null
    reset_token_expires?: Date | null
    created_at: Date
    updated_at: Date
}
