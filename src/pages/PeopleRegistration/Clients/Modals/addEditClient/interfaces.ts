import { ClientsReturnApiProps } from '../..';
import { ClientsType } from '../../../../Sell/Modals/CheckOut';

export interface ListClientstoAddClientProps {
    type: 'add' | 'edit'
    client?: ClientsReturnApiProps
    isModalAddEditClientOpen: boolean;
    setisModalAddEditClientOpen: (value: boolean) => void;
    setisModalSucessOpen?: (value: boolean) => void;
    searchClients?: () => void;
    handleChangeClient?: (newClient: ClientsType) => void
}

export interface TypeClientData {
    name: string,
    gender: string,
    cpf: string,
    email: string,
    birthDate: Date | null,
    phoneNumber: string,
    cellNumber: string,
    address: Address,
    active: boolean,
    ie: string,
    suframa: string
    finalCostumer: boolean | null,
    taxRegimeId: number | null,
    taxPayerTypeId: number | null
}

export type Address = {
    addressStreet: string,
    addressNumber: string,
    addressNeighborhood: string,
    addressComplement: string,
    addressCityId: number,
    addressCep: string,
}

export type typeOptions = { id: number, description: string }


interface State {
    id: number;
    name: string;
    uf: string;
    ibge: number;
}

export interface CityStateType {
    id: number;
    name: string;
    ibge: number;
    stateId: number;
    latLon: string;
    cod_tom: number;
    state: State;
}

export type AddressType = {
    id: number;
    storeId: number;
    addressTypeId: number;
    addressStreet: string;
    addressNumber: string | null;
    addressNeighborhood: string;
    addressComplement: string | null;
    addressCep: string| null;
    cityId: number | null;
    created_at: Date;
    city?: CityStateType | null;
};

