export type AddressSharedType = {
    id: number;
    storeId: number;
    addressTypeId: number;
    addressStreet: string;
    addressNumber: string | null;
    addressNeighborhood: string;
    addressComplement: string | null;
    addressCep: string | null;
    cityId: number | null;
    created_at: Date;
    city: City;
};

type State = {
    id: number;
    name: string;
    uf: string;
    ibge: number;
};

type City = {
    id: number;
    name: string;
    ibge: number;
    stateId: number;
    latLon: string | null;
    cod_tom: number | null;
    state: State;
};
