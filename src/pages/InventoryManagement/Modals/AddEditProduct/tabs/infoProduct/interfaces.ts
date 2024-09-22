import { Dispatch, SetStateAction } from 'react';
import { sharedAddEditProductRequest } from '@shared/api/inventoryManagement/productsRequest';
import { sharedProdutcsType } from '@shared/api/inventoryManagement/productsResponse';
import { taxGroupsOptions } from '@shared/api/inventoryManagement/findTaxOptions';


export interface tabInfoProductProps {
    dataAddEditProduct: sharedAddEditProductRequest
    setDataAddEditProduct: Dispatch<SetStateAction<sharedAddEditProductRequest>>
    itemData?: sharedProdutcsType;
    taxGroupOptions: taxGroupsOptions[]
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