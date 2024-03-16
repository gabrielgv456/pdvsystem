import { addEditProductDataPrincipal } from "./Modals/AddEditProduct/saveProduct/interfaces";
import { TaxIcmsNfceType, TaxIcmsNfeType, TaxIcmsNoPayerType, TaxIcmsSTType } from "./Modals/AddEditProduct/tabs/icmsProduct/interfaces";
import { taxCofinsType, taxIpiType, taxPisType } from "./Modals/AddEditProduct/tabs/ipiPisCofinsProduct/interfaces";

type editFields = {
  deliveries: [{ itemSell: { quantity: number } }]
  taxIcms: TaxIcms[]
  taxIpi: taxIpiType[]
  taxCofins: taxCofinsType[]
  taxPis: taxPisType[]
  created_at: Date
  totalValue: number
}

export type ProductsReturnApiProps = addEditProductDataPrincipal & editFields

export interface TransactionsProductsReturnApi {
  type: string;
  description: string;
  created_at: Date;
  quantity: number;
  totalQuantity: number;
}

type TaxIcmsOrigin = {
  id: number;
  description: string;
};

type TaxIcms = {
  id: number;
  productId: number;
  taxIcmsOriginId: number;
  fcpAliquot: number;
  taxIcmsNfce: TaxIcmsNfceType[];
  taxIcmsNfe: TaxIcmsNfeType[];
  taxIcmsNoPayer: TaxIcmsNoPayerType[];
  taxIcmsSt: TaxIcmsSTType[]
  taxIcmsOrigin: TaxIcmsOrigin;
};  
