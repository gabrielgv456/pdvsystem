export type MenuMuiProps = {
    options: optionItem[]
    selectedPeriod: string
}

export type optionItem = {
    option: string,
    value: number,
    action: (userId: number, lastPeriod: number) => Promise<any>
    state: (newValue: any) => void,
    stateOption: (newValue: any) => void
}
