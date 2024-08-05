import { Dispatch, SetStateAction } from "react"
import { searchOptions } from "../icmsProduct/interfaces"
import { addEditProductDataSend } from "../../interfaces"

export type ipiPisCofinsProps = {
    dataAddEditProduct: addEditProductDataSend
    setDataAddEditProduct: Dispatch<SetStateAction<addEditProductDataSend>>
    taxOptions: searchOptions | null
}

export type taxPisType = {
    taxCstPisExitId: number | null
    taxCstPisEntranceId: number | null
    taxAliquotPisExit: number | null
    taxAliquotPisEntrance: number | null
}

export type taxIpiType = {
    taxCstIpiExitId: number | null
    taxCstIpiEntranceId: number | null
    taxAliquotIpi: number | null
    taxClassificationClassIpi: string | null
    taxStampIpi: string | null
    taxQtdStampControlIpi: number | null
    taxCodEnquadLegalIpi: string | null
    taxCnpjProd: string | null
}

export type taxCofinsType = {
    taxCstCofinsExitId: number | null
    taxCstCofinsEntranceId: number | null
    taxAliquotCofinsExit: number | null
    taxAliquotCofinsEntrance: number | null
}