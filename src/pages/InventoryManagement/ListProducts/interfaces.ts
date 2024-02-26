import { ProductsReturnApiProps, TransactionsProductsReturnApi } from "../index"

export interface ListProductsProps {
    item: ProductsReturnApiProps;
    dataTransactionsProductsReturnApi: TransactionsProductsReturnApi[];
    isModalTransactionsProductsOpen: boolean;
    reservedQuantity: number,
    setisModalTransactionsProductsOpen: (isModalTransactionsProductsOpen: boolean) => void;
    setdataTransactionsProductsReturnApi: (dataTransactionsProductsReturnApi: TransactionsProductsReturnApi[]) => void;
    searchProduct: () => void;
    setActualItemEdit: (newValue: ProductsReturnApiProps | undefined) => void
    isModalAddEditProductOpen: boolean;
    setisModalAddEditProductOpen: (value: boolean) => void;
}