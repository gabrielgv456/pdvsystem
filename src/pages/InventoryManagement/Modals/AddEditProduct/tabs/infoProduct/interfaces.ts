import { Dispatch, SetStateAction } from 'react';
import { addEditProductDataSend } from '../../interfaces';
import { ProductsReturnApiProps } from '../../../../interfaces';


export interface tabInfoProductProps {
    dataAddEditProduct: addEditProductDataSend
    setDataAddEditProduct: Dispatch<SetStateAction<addEditProductDataSend>>
    itemData?: ProductsReturnApiProps;
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