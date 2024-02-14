import { ClientsReturnApiProps } from '../..';
import { ClientsType } from '../../../../Sell/Modals/CheckOut';

export interface ListClientstoAddClientProps {
    type: 'add'|'edit'
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
    birthDate: Date | string | null,
    phoneNumber: string,
    cellNumber: string,
    adressStreet: string,
    adressNumber: string,
    adressNeighborhood: string,
    adressComplement: string,
    adressCity: string,
    adressState: string | null,
    adressCep: string,
    active: boolean,
    ie: string,
    suframa: string
    finalCostumer: boolean | null,
    taxRegimeId: number | null,
    taxPayerTypeId: number | null,
}

export type typeOptions = { id: number, description: string }