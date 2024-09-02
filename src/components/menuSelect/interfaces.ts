import { ReactNode } from "react"

export type MenuMuiProps = {
    sizeIcon? : number,
    options: optionItem[]
    selected: string
}

export type optionItem = {
    option: string,
    value?: number,
    icon?: ReactNode,
    action?: (userId: number, lastPeriod: number) => Promise<any>
    state?: (newValue: any) => void,
    stateOption?: (newValue: any) => void
    actionGeneric?: () => Promise<void>
}
