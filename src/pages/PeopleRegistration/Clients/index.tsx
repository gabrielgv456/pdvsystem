
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
import { ModalAddEditClient } from "./Modals/addEditClient/addEditClient";
import { ModalSuccessClient } from "./Modals/Success/modalSuccess";
import { useMessageBoxContext } from "../../../contexts/MessageBox/MessageBoxContext";
import { useLayout } from "../../../contexts/Layout/layoutContext";
import { AddressType } from "./Modals/addEditClient/interfaces";
import { ClientType_FindClients } from "../../../interfaces/useApi/findClientsType";
import { CircularProgressSpinner } from "src/spinners/progress/CircularProgressSpinner";



export type ClientsReturnApiProps = ClientType_FindClients

interface SidebartoPeopleRegistrationProps {
    PeopleMode: string,
    setPeopleMode: (value: string) => void
}


export const ClientsRegistration = (props: SidebartoPeopleRegistrationProps) => {

    const { setActualPage } = useLayout();
    setActualPage('Pessoas')
    const { findClients } = useApi()
    const { MessageBox } = useMessageBoxContext()
    const auth = useContext(AuthContext);
    const Theme = useDarkMode();
    const [isLoading, setIsLoading] = useState(true)
    const [ClientsReturnApi, setClientsReturnApi] = useState<ClientsReturnApiProps[]>([])
    const [ItensPerPageExtract, SetItensPerPageExtract] = useState(10)
    const [atualPageExtract, SetAtualPageExtract] = useState(0)
    const [isModalAddEditClientOpen, setisModalAddEditClientOpen] = useState(false);
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
        setisModalAddEditClientOpen(true)

    }


    function handleContinueAddingClients() {
        setisModalAddEditClientOpen(true)
        setisModalSucessOpen(false)
    }






    const EditItensPerPage = (ItensPerPage: number) => {
        SetItensPerPageExtract(ItensPerPage)
        SetAtualPageExtract(0)
    }
    const SearchClients = async () => {
        try {
            setIsLoading(true)
            const data = await findClients(auth.idUser)
            if (!data.Success) { throw new Error(data.erro) }
            setClientsReturnApi(data.findClients)
        }
        catch (error) {
            MessageBox('error', 'Falha ao consultar clientes! ' + (error as Error).message ?? '')
        } finally {
            setIsLoading(false)
        }
    }

    const handleChangePeopleType = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        if (newAlignment !== null) {
            props.setPeopleMode(newAlignment);
        }
    };

    return (
        <>
            <S.Container isDarkMode={Theme.DarkMode}>
                <S.Content isDarkMode={Theme.DarkMode}>
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
                        <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '5%' }}>
                            <ToggleButtonGroup

                                color="info"
                                value={props.PeopleMode}
                                exclusive
                                onChange={handleChangePeopleType}

                            >
                                <ToggleButton value="Clients" style={{ padding: '0.8rem', height: 'min-content', fontSize: '1rem' }}>Clientes</ToggleButton>
                                <ToggleButton value="Sellers" style={{ padding: '0.8rem', height: 'min-content', fontSize: '1rem' }}>Vendedores</ToggleButton>

                            </ToggleButtonGroup>


                            <S.ButtonAddClient onClick={handleOpenModalConfirmSell} isDarkMode={Theme.DarkMode}>
                                <MdAdd size="22" />
                                <b>NOVO CLIENTE</b>
                            </S.ButtonAddClient>
                        </section>

                    </S.Header>

                    {isLoading ? <CircularProgressSpinner /> :
                        <S.DivListClients>

                            <S.DivTitleListClients isDarkMode={Theme.DarkMode}>
                                <S.labelEdit >&nbsp;</S.labelEdit>
                                <S.labelNomeRazao><b>Nome / Razão Social </b></S.labelNomeRazao>
                                <S.labelCpfCnpj ><b>CPF/CNPJ</b></S.labelCpfCnpj>
                                <S.labelCelular><b>Celular</b></S.labelCelular>
                                <S.labelEmail ><b>Email</b></S.labelEmail>
                                <S.labelExcluir>&nbsp;</S.labelExcluir>
                            </S.DivTitleListClients>



                            {paginedTransactionsReturnApi.map((item) => (
                                <ListClients
                                    client={item}
                                    key={item.id}
                                    searchClient={SearchClients}
                                    created_at={item.created_at ?? null} />
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
                    }
                </S.Content>
            </S.Container>


            <ModalAddEditClient
                setisModalAddEditClientOpen={setisModalAddEditClientOpen}
                setisModalSucessOpen={setisModalSucessOpen}
                isModalAddEditClientOpen={isModalAddEditClientOpen}
                searchClients={SearchClients}
                type="add"
            />

            <ModalSuccessClient
                setisModalSucessOpen={setisModalSucessOpen}
                isModalSucessOpen={isModalSucessOpen}
                handleContinueAddingClients={handleContinueAddingClients}
            />

        </>
    )
}