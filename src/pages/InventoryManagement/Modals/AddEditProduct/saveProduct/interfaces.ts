import { sharedAddEditProductRequest } from "@shared/api/inventoryManagement/productsRequest"


export type SaveProductProps = {
    type: 'Add' | 'Edit'
    dataToSend: sharedAddEditProductRequest
    setisModalSucessOpen: (newValue: boolean) => void
    setisModalAddEditProductOpen: (newValue: boolean) => void
    setDataAddEditProduct: (newValue: sharedAddEditProductRequest) => void
    defaultDataEditProduct: sharedAddEditProductRequest
}

export type addEditProductDataPrincipal = {
    id?: number
    userId: number
    codRef: number | null
    name: string
    exTipi: string | null
    brand: string | null
    value: number 
    quantity: number | null
    active: boolean
    cost: number | null
    profitMargin: number | null
    barCode: string | null
    ncmCode: string | null
    cfopId: number | null
    unitMeasurement: string
    itemTypeId: number | null
    imageId: number | null
    urlImage: string | null
}