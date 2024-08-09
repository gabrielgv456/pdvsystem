export type editClientTypeReq = {
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
    address: AddressType | null;
}

export type AddressType = {
    id?: number;
    storeId?: number;
    addressTypeId: number;
    addressStreet: string;
    addressNumber: string;
    addressNeighborhood: string;
    addressComplement: string;
    addressCep: string;
    cityId: number;
    created_at?: string;
    city?: CityStateType;
};

interface State {
    id: number;
    name: string;
    uf: string;
    ibge: number;
}

interface CityStateType {
    id: number;
    name: string;
    ibge: number;
    stateId: number;
    latLon: string;
    cod_tom: number;
    state: State;
}
