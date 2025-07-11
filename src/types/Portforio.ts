export interface PortfolioSkills {
    id: string
    user_id: string
    is_public: boolean
    auto_delete_after_one_year?: boolean | false
    created_at: Date
    updated_at: Date
}
