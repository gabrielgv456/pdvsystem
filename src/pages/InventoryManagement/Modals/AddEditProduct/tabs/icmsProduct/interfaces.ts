import { sharedAddEditProductRequest } from "@shared/api/inventoryManagement/productsRequest"
import { Dispatch, SetStateAction } from "react"

export type icmsProductProps = {
    dataAddEditProduct: sharedAddEditProductRequest
    setDataAddEditProduct: Dispatch<SetStateAction<sharedAddEditProductRequest>>
    icmsOptions: searchOptions | null
}

export type icmsType = {
    TaxIcms: TaxIcmsType,
    TaxIcmsNfe: TaxIcmsNfeType,
    TaxIcmsNfce: TaxIcmsNfceType,
    TaxIcmsNoPayer: TaxIcmsNoPayerType,
    TaxIcmsST: TaxIcmsSTType
}

export type searchOptions = {
    originOptions: optionsType[]
    cstOptions: optionsType[]
    exemptionOptions: optionsType[]
    cfopStateOptions: optionsType[]
    cfopInterstateOptions: optionsType[]
    modalityOptions: optionsType[]
    cfopNfceOptions: optionsType[]
    cfopNfceDevolutionOptions: optionsType[]
    cstIpiEntranceOptions: optionsType[],
    cstIpiExitOptions: optionsType[],
    cstPisEntranceOptions: optionsType[],
    cstPisExitOptions: optionsType[],
    cstCofinsEntranceOptions: optionsType[],
    cstCofinsExitOptions: optionsType[]
}

export type selectedOptions = {
    originOption: optionsType | null
    cstNfeOption: optionsType | null
    cstNotPayerOption: optionsType | null
    cstNfceOption: optionsType | null
    exemptionOption: optionsType | null
    cfopStateOption: optionsType | null
    cfopInterstateOption: optionsType | null
    modalityOption: optionsType | null
    cfopNfceOption: optionsType | null
    cfopNfceDevolutionOption: optionsType | null
}

export type optionsType = {
    id: number
    description: string
}

export type TaxIcmsType = {
    taxIcmsOriginId: number | null
    fcpAliquot: number | null
}

export type TaxIcmsNfeType = {
    taxCstIcmsId: number | null
    taxModalityBCId: number | null
    taxReasonExemptionId: number | null
    taxCfopStateId: number | null
    taxCfopInterstateId: number | null
    taxRedBCICMS: number | null
    taxAliquotIcms: number | null
}

export type TaxIcmsNfceType = {
    taxCstIcmsId: number | null
    taxCfopId: number | null
    taxCfopDevolutionId: number | null
    taxRedBCICMS: number | null
    taxAliquotIcms: number | null
}

export type TaxIcmsNoPayerType = {
    taxCstIcmsId: number | null
    taxRedBCICMS: number | null
    taxAliquotIcms: number | null
}

export type TaxIcmsSTType = {
    taxCstIcmsStId: number | null
    taxCfopStateIdSt: number | null
    taxCfopInterstateIdSt: number | null
    taxModalityBCIdSt: number | null
    taxRedBCICMSSt: number | null
    taxAliquotIcmsInner: number | null
    taxRedBCICMSInner: number | null
    taxMvaPauta: number | null
}

