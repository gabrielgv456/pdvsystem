import { addEditProductDataPrincipal } from "./saveProduct/interfaces";
import { icmsType, searchOptions } from "./tabs/icmsProduct/interfaces";
import { taxCofinsType, taxIpiType, taxPisType } from "./tabs/ipiPisCofinsProduct/interfaces";


export interface addEditProductDataSend {
    principal: addEditProductDataPrincipal,
    icms: icmsType,
    ipi: taxIpiType,
    cofins: taxCofinsType,
    pis: taxPisType
}