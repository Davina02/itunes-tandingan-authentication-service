export interface RegisterAuthKeyDTO {
    user_id: number
    private_key: string 
    expired_at: Date
}