
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import * as S from "./style"
import { useDarkMode } from '../../../contexts/DarkMode/DarkModeProvider';
import { MdAdd, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useApi } from '../../../hooks/useApi';
import { BsSearch } from 'react-icons/bs';
import { ListClients } from './ListClients/ListClients';
import { ModalAddClient } from "./Modals/addClient/addClient";
import { ModalSuccessClient } from "./Modals/Success/modalSuccess";



export interface ClientsReturnApiProps {
    id: number;
    name: string;
    gender: string;
    cpf: string;
    email: string | null;
    created_at: Date;
    active: boolean;
    birthDate: Date,
    phoneNumber: string | null,
    cellNumber: string | null,
    adressStreet: string | null,
    adressNumber: string | null,
    adressNeighborhood: string,
    adressComplement: string | null,
    adressCity: string | null,
    adressState: string | null,
    adressCep: string | null,
    adressUF: string | null
}

interface SidebartoPeopleRegistrationProps {
    PeopleMode: string,
    setPeopleMode: (value: string) => void
}


export const ClientsRegistration = (props: SidebartoPeopleRegistrationProps) => {
    const { findClients } = useApi()
    const auth = useContext(AuthContext);
    const Theme = useDarkMode();
    const [ClientsReturnApi, setClientsReturnApi] = useState<ClientsReturnApiProps[]>([])
    const [ItensPerPageExtract, SetItensPerPageExtract] = useState(10)
    const [atualPageExtract, SetAtualPageExtract] = useState(0)
    const [isModalAddClientOpen, setisModalAddClientOpen] = useState(false);
    const [isModalSucessOpen, setisModalSucessOpen] = useState(false);
    const [inputSearchClient, setinputSearchClient] = useState("")
    const inputSearchClientLowwer = inputSearchClient.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    const ClientsReturnApiFiltered = ClientsReturnApi.filter((Client) => Client.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(inputSearchClientLowwer))
    const PagesExtract = Math.ceil(ClientsReturnApiFiltered.length / ItensPerPageExtract)
    const StartIndexExtract = atualPageExtract * ItensPerPageExtract
    const EndIndexExtract = StartIndexExtract + ItensPerPageExtract
    const paginedTransactionsReturnApi = ClientsReturnApiFiltered.slice(StartIndexExtract, EndIndexExtract)

    useEffect(() => {
        SearchClients()
    }, [])

    function handleOpenModalConfirmSell() {
        setisModalAddClientOpen(true)

    }


    function handleContinueAddingClients() {
        setisModalAddClientOpen(true)
        setisModalSucessOpen(false)
    }






    const EditItensPerPage = (ItensPerPage: number) => {
        SetItensPerPageExtract(ItensPerPage)
        SetAtualPageExtract(0)
    }
    const SearchClients = async () => {
        const data = await findClients(auth.idUser)
        setClientsReturnApi(data.findClients)
    }

    const handleChangePeopleType = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        console.log(newAlignment)
        if (newAlignment !== null) {
            props.setPeopleMode(newAlignment);
        }
    };

    return (
        <>
            <S.Container isDarkMode={Theme.DarkMode}>
                <S.Header>
                    <S.LabelSearchClient>
                        <BsSearch style={{ margin: '15px', color: "#9eaab5" }} size="18" />
                        <input
                            value={inputSearchClient}
                            onChange={(e) => setinputSearchClient(e.target.value)}
                            style={{
                                border: "none",
                                background: 'none',
                                borderRadius: '7px',
                                width: '100%',
                                height: '100%',
                                outline: 'none',
                                fontSize: "1rem",
                                color: `${Theme.DarkMode ? '#fff' : '#000'}`
                            }}
                            placeholder="Localizar Consumidor..."></input>
                    </S.LabelSearchClient>
                    <ToggleButtonGroup

                        color="info"
                        value={props.PeopleMode}
                        exclusive
                        onChange={handleChangePeopleType}

                    >
                        <ToggleButton value="Clients" >Clientes</ToggleButton>
                        <ToggleButton value="Sellers">Vendedores</ToggleButton>

                    </ToggleButtonGroup>

                    <label>
                        <S.ButtonAddClient onClick={handleOpenModalConfirmSell} isDarkMode={Theme.DarkMode}>
                            <MdAdd size="22" />
                            <b>NOVO CLIENTE</b>
                        </S.ButtonAddClient>
                    </label>

                </S.Header>


                <S.DivListClients>

                    <S.DivTitleListClients isDarkMode={Theme.DarkMode}>
                        <label style={{ width: '32px', display: 'flex', marginLeft: 10 }}>&nbsp;</label>
                        <label style={{ width: '25%', display: 'flex' }}><b>Nome / Razão Social </b></label>
                        <label style={{ width: '15%', display: 'flex' }}><b>CPF/CNPJ</b></label>
                        <label style={{ width: '15%', display: 'flex' }}><b>Celular</b></label>
                        <label style={{ width: '20%', display: 'flex' }}><b>Email</b></label>
                        <label style={{ width: '28px', display: 'flex', marginRight: 10 }}>&nbsp;</label>
                    </S.DivTitleListClients>



                    {paginedTransactionsReturnApi.map((item) => (
                        <ListClients
                            client={item}
                            key={item.id}
                            searchClient={SearchClients}
                            created_at={item.created_at} />

                    ))
                    }

                    {ClientsReturnApi.length === 0 &&
                        <h5 style={{ color: '#485059', marginTop: '5%' }}>Nenhum resultado encontrado</h5>
                    }

                    <S.DivFooterListClients isDarkMode={Theme.DarkMode}>
                        <select value={ItensPerPageExtract}
                            onChange={(e) => EditItensPerPage(Number(e.target.value))}
                            style={{ border: 'none', width: '40px', background: 'none', color: '#67636d' }}>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={10000}>*</option>
                        </select>
                        <div style={{ fontSize: '0.85rem', color: '#67636d', display: 'flex', width: '20%', justifyContent: 'space-between', minWidth: 'max-content', alignItems: 'center' }}>
                            {PagesExtract > 0 ? <label> Página {atualPageExtract + 1} de {PagesExtract}</label> : <label></label>}

                            <S.DivAlterPage>

                                {atualPageExtract <= PagesExtract && atualPageExtract > 0 ?
                                    <button style={{ border: 'none', background: 'none', margin: 0 }} onClick={(e) => SetAtualPageExtract(atualPageExtract - 1)}>
                                        <MdChevronLeft color='#4b535c' size="25" />
                                    </button>
                                    :
                                    <button style={{ cursor: 'context-menu', border: 'none', background: 'none', margin: 0 }}>
                                        <MdChevronLeft color='#b8c0c9' size="25" />
                                    </button>
                                }
                                {atualPageExtract + 1 >= PagesExtract ?
                                    <button style={{ cursor: 'context-menu', border: 'none', background: 'none', margin: 0 }}>
                                        <MdChevronRight color='#b8c0c9' size="25" />
                                    </button>
                                    :
                                    <button style={{ border: 'none', background: 'none', margin: 0 }} onClick={(e) => SetAtualPageExtract(atualPageExtract + 1)}>
                                        <MdChevronRight color='#4b535c' size="25" />
                                    </button>
                                }
                            </S.DivAlterPage>
                        </div>

                    </S.DivFooterListClients>
                </S.DivListClients>
            </S.Container>


            <ModalAddClient
                setisModalAddClientOpen={setisModalAddClientOpen}
                setisModalSucessOpen={setisModalSucessOpen}
                isModalAddClientOpen={isModalAddClientOpen}
                searchClients={SearchClients}
            />

            <ModalSuccessClient
                setisModalSucessOpen={setisModalSucessOpen}
                isModalSucessOpen={isModalSucessOpen}
                handleContinueAddingClients={handleContinueAddingClients}
            />

        </>
    )
}