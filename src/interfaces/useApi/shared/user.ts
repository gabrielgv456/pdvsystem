import { AddressSharedType } from "./address"

export type UserSharedType = {
    email: string,
    name: string,
    phone: string | null,
    addressRelation: AddressSharedType,
    cellPhone: string | null,
    fantasyName: string | null,
    cnpj: string | null,
    ie: string | null
}