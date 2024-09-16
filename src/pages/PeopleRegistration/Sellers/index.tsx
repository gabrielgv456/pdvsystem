import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import * as S from "./style"
import { useDarkMode } from '../../../contexts/DarkMode/DarkModeProvider';
import { MdAdd, MdChevronRight, MdOutlineMail } from 'react-icons/md';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useApi } from '../../../hooks/useApi';
import { BsSearch, BsTrash } from 'react-icons/bs';
import { ModalAddSeller } from "./Modals/addSeller";
import { useLayout } from "../../../contexts/Layout/layoutContext";
import { CircularProgressSpinner } from "src/spinners/progress/CircularProgressSpinner";
import { DefaultTable } from "src/components/table/table";
import { cellNumberFormat, cpfCnpjFormat } from "src/utils/utils";
import { RiWhatsappLine } from "react-icons/ri";
import { ModalEditSeller } from "./ListSellers/modals/editSeller";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { ModalDeleteSeller } from "./ListSellers/modals/deleteSeller";
import { useMessageBoxContext } from "src/contexts/MessageBox/MessageBoxContext";



export interface SellersReturnApiProps {
    id: number,
    name: string,
    cpf: string,
    email: string | null,
    birthDate: Date,
    matricula: number | null,
    gender: string | null,
    phoneNumber: string | null,
    cellNumber: string | null,
    adressStreet: string | null,
    adressNumber: string | null,
    adressNeighborhood: string | null,
    adressComplement: string | null,
    adressCity: string | null,
    adressState: string | null,
    adressCep: string | null,
    active: boolean,
    created_at: Date
}

interface SidebartoPeopleRegistrationProps {
    PeopleMode: string,
    setPeopleMode: (value: string) => void
}


export const SellersRegistration = (props: SidebartoPeopleRegistrationProps) => {

    const { setActualPage } = useLayout();
    setActualPage('Pessoas')
    const { findSellers } = useApi()
    const auth = useContext(AuthContext);
    const Theme = useDarkMode();
    const { MessageBox } = useMessageBoxContext()
    const [isLoading, setIsLoading] = useState(true)
    const [SellersReturnApi, setSellersReturnApi] = useState<SellersReturnApiProps[]>([])
    const [inputSearchSeller, setinputSearchSeller] = useState("")
    const inputSearchSellerLowwer = inputSearchSeller.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    const SellersReturnApiFiltered = SellersReturnApi.filter((seller) => seller.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(inputSearchSellerLowwer))

    const [isModalEditSellerOpen, setisModalEditSellerOpen] = useState(false);
    const [isModalAddSellerOpen, setisModalAddSellerOpen] = useState(false);
    const [isModalDeleteSellerOpen, setisModalDeleteSellerOpen] = useState(false)
    const [selectedSeller, setSelectedSeller] = useState<SellersReturnApiProps | null>(null)

    useEffect(() => {
        try {
            setIsLoading(true)
            SearchSellers()
        } catch (error) {
            MessageBox('error', 'Ocorreu uma falha ao buscar os vendedores!' + (error as Error).message)
        } finally {
            setIsLoading(false)
        }
    }, [])

    function handleOpenModalConfirmSell() {
        setisModalAddSellerOpen(true)
    }

    const SearchSellers = async () => {
        const data = await findSellers(auth.idUser)
        setSellersReturnApi(data.findSellers)
    }

    const handleChangePeopleType = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        if (newAlignment !== null) {
            props.setPeopleMode(newAlignment);
        }
    };

    function handleEditSeller(seller: SellersReturnApiProps) {
        setSelectedSeller(seller)
        setisModalEditSellerOpen(true)
    }

    function handleCloseModalEditSeller() {
        setSelectedSeller(null)
        setisModalEditSellerOpen(false)
    }

    function handleDeleteSeller(seller: SellersReturnApiProps) {
        setSelectedSeller(seller)
        setisModalDeleteSellerOpen(true)
    }

    function handleCloseModalDeleteSeller() {
        setSelectedSeller(null)
        setisModalDeleteSellerOpen(false)
    }

    return (
        <>
            <S.Container isDarkMode={Theme.DarkMode}>
                <S.Content isDarkMode={Theme.DarkMode}>
                    <S.Header>
                        <S.LabelSearchSeller>
                            <BsSearch style={{ margin: '15px', color: "#9eaab5" }} size="18" />
                            <input
                                value={inputSearchSeller}
                                onChange={(e) => setinputSearchSeller(e.target.value)}
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
                                placeholder="Localizar Colaborador..."></input>
                        </S.LabelSearchSeller>
                        <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '5%' }}>
                            <ToggleButtonGroup
                                color="primary"
                                value={props.PeopleMode}
                                exclusive
                                onChange={handleChangePeopleType}
                            >
                                <ToggleButton value="Clients" style={{ padding: '0.8rem', height: 'min-content', fontSize: '1rem' }}>Clientes</ToggleButton>
                                <ToggleButton value="Sellers" style={{ padding: '0.8rem', height: 'min-content', fontSize: '1rem' }}>Vendedores</ToggleButton>

                            </ToggleButtonGroup>
                            <S.ButtonAddSeller onClick={handleOpenModalConfirmSell} isDarkMode={Theme.DarkMode}>
                                <MdAdd size="22" />
                                <b>NOVO VENDEDOR</b>
                            </S.ButtonAddSeller>
                        </section>

                    </S.Header>


                    {isLoading ? <CircularProgressSpinner /> : (
                        SellersReturnApiFiltered.length > 0 &&
                        <DefaultTable
                            headers={['', 'Nome', 'CPF', '', 'Celular', '', 'Email', '']}
                            rows={SellersReturnApiFiltered.map(item => {
                                return {
                                    active: item.active,
                                    columns: [
                                        { component: <S.ButtonEdit onClick={() => handleEditSeller(item)} title="Editar Vendedor"><HiOutlinePencilAlt size="20" /></S.ButtonEdit> },
                                        { component: item.name },
                                        { component: cpfCnpjFormat(item.cpf) },
                                        {
                                            component:
                                                item.cellNumber ?
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
                                        { component: <S.ButtonTrash onClick={() => handleDeleteSeller(item)} title="Excluir Vendedor" ><BsTrash size="1rem" /></S.ButtonTrash> }

                                    ]
                                }
                            })}
                        />
                    )
                    }

                </S.Content>
            </S.Container>

            {/******     Modals Start  *********/}

            <ModalAddSeller
                isModalAddSellerOpen={isModalAddSellerOpen}
                setisModalAddSellerOpen={setisModalAddSellerOpen}
                searchSellers={SearchSellers}
            />
            {selectedSeller &&
                <ModalEditSeller
                    seller={selectedSeller}
                    isModalEditSellerOpen={isModalEditSellerOpen}
                    handleCloseModalEditSeller={handleCloseModalEditSeller}
                    searchSellers={SearchSellers}
                />
            }
            {selectedSeller &&
                <ModalDeleteSeller
                    isModalDeleteSellerOpen={isModalDeleteSellerOpen}
                    handleCloseModalDeleteSeller={handleCloseModalDeleteSeller}
                    idSeller={selectedSeller?.id}
                    searchSellers={SearchSellers}
                />
            }
        </>
    )
}