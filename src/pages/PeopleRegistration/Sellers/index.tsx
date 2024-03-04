import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import * as S from "./style"
import { useDarkMode } from '../../../contexts/DarkMode/DarkModeProvider';
import { MdAdd, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useApi } from '../../../hooks/useApi';
import { BsSearch } from 'react-icons/bs';
import { ListSellers } from './ListSellers/ListSellers';
import { ModalAddSeller } from "./Modals/addSeller";
import { ModalSuccessSeller } from "./Modals/Success";



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
    const { findSellers } = useApi()
    const auth = useContext(AuthContext);
    const Theme = useDarkMode();
    const [SellersReturnApi, setSellersReturnApi] = useState<SellersReturnApiProps[]>([])
    const [ItensPerPageExtract, SetItensPerPageExtract] = useState(10)
    const [atualPageExtract, SetAtualPageExtract] = useState(0)
    const [isModalAddSellerOpen, setisModalAddSellerOpen] = useState(false);
    const [isModalSucessOpen, setisModalSucessOpen] = useState(false);
    const [isModalTransactionsSellersOpen, setisModalTransactionsSellersOpen] = useState(false);
    const [inputSearchSeller, setinputSearchSeller] = useState("")
    const inputSearchSellerLowwer = inputSearchSeller.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    const SellersReturnApiFiltered = SellersReturnApi.filter((seller) => seller.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(inputSearchSellerLowwer))
    const PagesExtract = Math.ceil(SellersReturnApiFiltered.length / ItensPerPageExtract)
    const StartIndexExtract = atualPageExtract * ItensPerPageExtract
    const EndIndexExtract = StartIndexExtract + ItensPerPageExtract
    const paginedTransactionsReturnApi = SellersReturnApiFiltered.slice(StartIndexExtract, EndIndexExtract)


    useEffect(() => {
        SearchSellers()
    }, [])

    function handleOpenModalConfirmSell() {
        setisModalAddSellerOpen(true)

    }


    function handleContinueAddingSellers() {
        setisModalAddSellerOpen(true)
        setisModalSucessOpen(false)
    }

    const EditItensPerPage = (ItensPerPage: number) => {
        SetItensPerPageExtract(ItensPerPage)
        SetAtualPageExtract(0)
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
                    <S.DivListSellers>
                        <S.DivTitleListSellers isDarkMode={Theme.DarkMode}>
                            <label style={{ width: '32px', display: 'flex', marginLeft: 10 }}>&nbsp;</label>
                            <label style={{ width: '25%', display: 'flex' }}><b>Nome</b></label>
                            <label style={{ width: '15%', display: 'flex' }}><b>CPF</b></label>
                            <S.labelCelular><b>Celular</b></S.labelCelular>
                            <S.labelEmail ><b>Email</b></S.labelEmail>
                            <label style={{ width: '28px', display: 'flex', marginRight: 10 }}>&nbsp;</label>
                        </S.DivTitleListSellers>

                        {paginedTransactionsReturnApi.map((seller) => (
                            <ListSellers
                                key={seller.id}
                                seller={seller}
                                isModalTransactionsSellersOpen={isModalTransactionsSellersOpen}
                                setisModalTransactionsSellersOpen={setisModalTransactionsSellersOpen}
                                searchSeller={SearchSellers}
                            />

                        ))
                        }

                        {SellersReturnApi.length === 0 &&
                            <h5 style={{ color: '#485059', marginTop: '5%' }}>Nenhum resultado encontrado</h5>
                        }

                        <S.DivFooterListSellers isDarkMode={Theme.DarkMode}>
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

                        </S.DivFooterListSellers>
                    </S.DivListSellers>
                </S.Content>
            </S.Container>

            {/******     Modals Start  *********/}

            <ModalAddSeller
                isModalAddSellerOpen={isModalAddSellerOpen}
                setisModalAddSellerOpen={setisModalAddSellerOpen}
                setisModalSucessOpen={setisModalSucessOpen}
                searchSellers={SearchSellers}
            />

            <ModalSuccessSeller
                setisModalSucessOpen={setisModalSucessOpen}
                isModalSucessOpen={isModalSucessOpen}
                handleContinueAddingSellers={handleContinueAddingSellers}
            />



        </>
    )
}