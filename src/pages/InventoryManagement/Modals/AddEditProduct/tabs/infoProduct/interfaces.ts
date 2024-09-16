import { Dispatch, SetStateAction } from 'react';
import { ProductsReturnApiProps } from '../../../../interfaces';
import { sharedAddEditProductRequest } from '@shared/api/inventoryManagement/productsRequest';
import { sharedProdutcsType } from '@shared/api/inventoryManagement/productsResponse';


export interface tabInfoProductProps {
    dataAddEditProduct: sharedAddEditProductRequest
    setDataAddEditProduct: Dispatch<SetStateAction<sharedAddEditProductRequest>>
    itemData?: sharedProdutcsType;
}

export interface ncmType {
    Codigo: string,
    Descricao: string
}
export interface itemType {
    id: number,
    description: string
}
export interface cfopType {
    id: number,
    description: string
}