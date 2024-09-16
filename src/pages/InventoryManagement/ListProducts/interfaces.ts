import { sharedProdutcsType } from "@shared/api/inventoryManagement/productsResponse";
import { ProductsReturnApiProps, TransactionsProductsReturnApi } from "../interfaces";

export interface ListProductsProps {
    item: sharedProdutcsType;
    dataTransactionsProductsReturnApi: TransactionsProductsReturnApi[];
    isModalTransactionsProductsOpen: boolean;
    reservedQuantity: number,
    setisModalTransactionsProductsOpen: (isModalTransactionsProductsOpen: boolean) => void;
    setdataTransactionsProductsReturnApi: (dataTransactionsProductsReturnApi: TransactionsProductsReturnApi[]) => void;
    searchProduct: () => void;
    setActualItemEdit: (newValue: sharedProdutcsType | undefined) => void
    isModalAddEditProductOpen: boolean;
    setisModalAddEditProductOpen: (value: boolean) => void;
}