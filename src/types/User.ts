import { AddressSharedType } from "../interfaces/useApi/shared/address"

export type User = {
    id: number
    name: string
    email: string
    address?: AddressSharedType | null
    cellPhone: string
    cnpj: string
    phone: string
    urlLogo: string
    masterkey: string
}