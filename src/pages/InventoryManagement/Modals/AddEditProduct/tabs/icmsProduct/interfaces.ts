import { Dispatch, SetStateAction } from "react"
import { addEditProductDataSend } from "../../interfaces"

export type icmsProductProps = {
    dataAddEditProduct: addEditProductDataSend
    setDataAddEditProduct: Dispatch<SetStateAction<addEditProductDataSend>>
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
    taxIcmsOriginId: Number | null
    fcpAliquot?: Number | null
}

export type TaxIcmsNfeType = {
    taxCstIcmsId: Number | null
    taxModalityBCId?: Number | null
    taxReasonExemptionId?: Number | null
    taxCfopStateId?: Number | null
    taxCfopInterstateId?: Number | null
    taxRedBCICMS?: Number | null
    taxAliquotIcms?: Number | null
}

export type TaxIcmsNfceType = {
    taxCstIcmsId: Number | null
    taxCfopId?: Number | null
    taxCfopDevolutionId?: Number | null
    taxRedBCICMS?: Number | null
    taxAliquotIcms?: Number | null
}

export type TaxIcmsNoPayerType = {
    taxCstIcmsId?: Number | null
    taxRedBCICMS?: Number | null
    taxAliquotIcms?: Number | null
}

export type TaxIcmsSTType = {
    taxCstIcmsStId?: Number | null
    taxCfopStateIdSt?: Number | null
    taxCfopInterstateIdSt?: Number | null
    taxModalityBCIdSt?: Number | null
    taxRedBCICMSSt?: Number | null
    taxAliquotIcmsInner?: Number | null
    taxRedBCICMSInner?: Number | null
    taxMvaPauta?: Number | null
}

