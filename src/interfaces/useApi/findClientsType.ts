import { AddressSharedType } from "./shared/address";

export type ClientType_FindClients = {
    id: number;
    created_at: Date;
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
    address: AddressSharedType | null;
};

export type findClientsType = {
    Success: boolean;
    findClients: ClientType_FindClients[];
    erro?: string
};
