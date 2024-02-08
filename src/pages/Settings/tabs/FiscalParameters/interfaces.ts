export type typeFiscalParameters = {
    taxCrtId: number | null
    taxRegimeId: number | null
    taxCstPisId: number | null
    taxCstPisAliquot: number | null
    taxCstCofinsId: number | null
    taxCstCofinsAliquot: number | null
}

export type typeReqChangeFiscalParameters = typeFiscalParameters | { storeId: number }

export type typeOptions = { id: number, description: string }