import { User } from "../../types/User"

export type validateTokenType = {
    valid: boolean
    user: User
    token: string
    error_message?: string
    error?: string
}