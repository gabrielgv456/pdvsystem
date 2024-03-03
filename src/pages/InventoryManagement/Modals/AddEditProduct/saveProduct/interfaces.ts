import { addEditProductDataSend } from "../interfaces"

export type SaveProductProps = {
    type: 'Add' | 'Edit'
    dataToSend: addEditProductDataSend
    setisModalSucessOpen: (newValue: boolean) => void
    setisModalAddEditProductOpen: (newValue: boolean) => void
    setDataAddEditProduct: (newValue: addEditProductDataSend) => void
    defaultDataEditProduct: addEditProductDataSend
}

export type addEditProductDataPrincipal = {
    id?: number
    userId: number
    codRef: number | null
    name: string
    exTipi: string | null
    brand: string | null
    value: number | null
    quantity: number | null
    active: boolean
    cost: number | null
    profitMargin: number | null
    barCode: string | null
    ncmCode: string | null
    cfopId: number | null
    unitMeasurement: string
    itemTypeId: number | null
}