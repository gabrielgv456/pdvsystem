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
    ClientName: string,
    ClientGender: string,
    ClientCpfCnpj: string,
    ClientEmail: string,
    ClientBirthDate: Date | string | null,
    ClientPhoneNumber: string,
    ClientCellNumber: string,
    ClientAdressStreet: string,
    ClientAdressNumber: string,
    ClientAdressNeighborhood: string,
    ClientAdressComplement: string,
    ClientAdressCity: string,
    ClientAdressState: string | null,
    ClientAdressCep: string,
    ClientActive: boolean,
    ClientIe: string,
    ClientSuframa: string
    ClientFinalCostumer: boolean,
    ClientTaxRegimeId: number | null,
    ClientTaxPayerTypeId: number | null
}

export type typeOptions = { id: number, description: string }