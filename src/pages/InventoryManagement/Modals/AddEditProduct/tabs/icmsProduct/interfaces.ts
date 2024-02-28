export type searchOptions = {
    Success: boolean
    erro?: string
    originOptions: optionsType[]
    cstOptions: optionsType[]
    exemptionOptions: optionsType[]
    cfopStateOptions: optionsType[]
    cfopInterstateOptions: optionsType[]
    modalityOptions: optionsType[]
}

export type optionsType = {
    id: number
    description: string
}