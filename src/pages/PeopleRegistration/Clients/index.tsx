
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import * as S from "./style"
import { useDarkMode } from '../../../contexts/DarkMode/DarkModeProvider';
import { MdAdd, MdOutlineMail } from 'react-icons/md';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useApi } from '../../../hooks/useApi';
import { BsSearch, BsTrash } from 'react-icons/bs';
import { ModalAddEditClient } from "./Modals/addEditClient/addEditClient";
import { useMessageBoxContext } from "../../../contexts/MessageBox/MessageBoxContext";
import { useLayout } from "../../../contexts/Layout/layoutContext";
import { ClientType_FindClients } from "../../../interfaces/useApi/findClientsType";
import { CircularProgressSpinner } from "src/spinners/progress/CircularProgressSpinner";
import { DefaultTable } from "../../../components/table/table";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { ModalDeleteClient } from "./ListClients/Modals/deleteClient";
import { cellNumberFormat, cpfCnpjFormat, limitLength, normalizeAndLowercase } from "src/utils/utils";
import { RiWhatsappLine } from "react-icons/ri";



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
    const [isModalAddEditClientOpen, setisModalAddEditClientOpen] = useState(false);
    const [inputSearchClient, setinputSearchClient] = useState("")
    const inputSearchClientLowwer = normalizeAndLowercase(inputSearchClient)
    const ClientsReturnApiFiltered = ClientsReturnApi.filter((Client) => normalizeAndLowercase(Client.name).includes(inputSearchClientLowwer))

    const [isModalEditClientOpen, setisModalEditClientOpen] = useState(false)
    const [isModalDeleteClientOpen, setisModalDeleteClientOpen] = useState(false)
    const [selectedClient, setSelectedClient] = useState<ClientsReturnApiProps | null>(null)

    useEffect(() => {
        SearchClients()
    }, [])

    function handleOpenModalConfirmSell() {
        setisModalAddEditClientOpen(true)

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

    function handleEditClient(client: ClientsReturnApiProps) {
        setSelectedClient(client)
        setisModalEditClientOpen(true)
    }

    function handleCloseModalEditClient() {
        setSelectedClient(null)
        setisModalEditClientOpen(false)
    }

    function handleDeleteClient(client: ClientsReturnApiProps) {
        setSelectedClient(client)
        setisModalDeleteClientOpen(true)
    }

    function handleCloseModalDeleteClient() {
        setSelectedClient(null)
        setisModalDeleteClientOpen(false)
    }

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

                    {isLoading ? <CircularProgressSpinner /> : (
                        ClientsReturnApiFiltered &&
                        <DefaultTable
                            headers={['', 'Nome / Razão Social', 'CPF/CNPJ', '', 'Celular', '', 'Email', '']}
                            rows={ClientsReturnApiFiltered.map(item => {
                                return {
                                    active: item.active,
                                    columns: [
                                        { component: <S.ButtonEdit onClick={() => handleEditClient(item)} title="Editar Cliente"><HiOutlinePencilAlt size="1rem" /></S.ButtonEdit> },
                                        { component: item.name },
                                        { component: cpfCnpjFormat(item.cpf) },
                                        {
                                            component: item.cellNumber ?
                                                <a href={`https://wa.me/55${item.cellNumber}`} target="blank" title="Enviar WhatsApp"><RiWhatsappLine color="#47c254" size="1rem" /></a>
                                                : ''
                                        },
                                        { component: cellNumberFormat(item.cellNumber ?? '') },
                                        {
                                            component: item.email ?
                                                <a href={`mailto:${item.email}`} title="Enviar e-mail" ><MdOutlineMail color="#85cdc5" size="1rem" /></a>
                                                : ''
                                        },
                                        { component: <S.DivLengthAjust>{item.email}</S.DivLengthAjust> },
                                        { component: <S.ButtonTrash onClick={() => handleDeleteClient(item)} title="Excluir Cliente" ><BsTrash size="1rem" /></S.ButtonTrash> }

                                    ]
                                }
                            })}
                        />
                    )
                    }

                </S.Content>
            </S.Container>


            <ModalAddEditClient
                setisModalAddEditClientOpen={setisModalAddEditClientOpen}
                isModalAddEditClientOpen={isModalAddEditClientOpen}
                searchClients={SearchClients}
                type="add"
            />
            {selectedClient &&
                <ModalAddEditClient
                    client={selectedClient}
                    isModalAddEditClientOpen={isModalEditClientOpen}
                    setisModalAddEditClientOpen={handleCloseModalEditClient}
                    searchClients={SearchClients}
                    type="edit"
                />
            }

            {selectedClient &&
                <ModalDeleteClient
                    clientId={selectedClient?.id}
                    handleCloseModalDeleteClient={handleCloseModalDeleteClient}
                    isModalDeleteClientOpen={isModalDeleteClientOpen}
                    searchClients={SearchClients}
                />
            }


        </>
    )
}