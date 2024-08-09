import { AddressSharedType } from "./address";

export type ClientSharedType = {

    id: number | null;
    created_at: Date | null;
    name: string;
    gender: string | null;
    cpf: string;
    email: string | null;
    ie: string | null;
    suframa: string | null;
    finalCostumer: boolean | null;
    birthDate: Date | null;
    phoneNumber: string | null;
    cellNumber: string | null;
    addressId: number | null;
    active: boolean;
    storeId: number;
    taxPayerTypeId: number | null;
    taxRegimeId: number | null;
    address: AddressSharedType | null
}