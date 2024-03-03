import { addEditProductDataPrincipal } from "./saveProduct/interfaces";
import { icmsType, searchOptions } from "./tabs/icmsProduct/interfaces";


export interface addEditProductDataSend {
    principal: addEditProductDataPrincipal,
    icms: icmsType
}