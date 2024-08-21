export type SellerSharedType = {
    id: number
    created_at: Date
    name: string
    cpf: string | null
    email: string | null
    birthDate: Date | null
    matricula: number | null
    gender: string | null
    phoneNumber: string | null
    cellNumber: string | null
    adressStreet: string | null
    adressNumber: string | null
    adressNeighborhood: string | null
    adressComplement: string | null
    adressCity: string | null
    adressState: string | null
    adressCep: string | null
    active: boolean
    storeId: number
}