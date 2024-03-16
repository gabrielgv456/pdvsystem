import { Dispatch, SetStateAction } from "react"
import { searchOptions } from "../icmsProduct/interfaces"
import { addEditProductDataSend } from "../../interfaces"

export type ipiPisCofinsProps = {
    dataAddEditProduct: addEditProductDataSend
    setDataAddEditProduct: Dispatch<SetStateAction<addEditProductDataSend>>
    taxOptions: searchOptions | null
}

export type taxPisType = {
    taxCstPisExitId: Number | null
    taxCstPisEntranceId: Number | null
    taxAliquotPisExit: Number | null
    taxAliquotPisEntrance: Number | null
}

export type taxIpiType = {
    taxCstIpiExitId: Number | null
    taxCstIpiEntranceId: Number | null
    taxAliquotIpi: Number | null
    taxClassificationClassIpi: String | null
    taxStampIpi: String | null
    taxQtdStampControlIpi: Number | null
    taxCodEnquadLegalIpi: String | null
    taxCnpjProd: String | null
}

export type taxCofinsType = {
    taxCstCofinsExitId: Number | null
    taxCstCofinsEntranceId: Number | null
    taxAliquotCofinsExit: Number | null
    taxAliquotCofinsEntrance: Number | null
}