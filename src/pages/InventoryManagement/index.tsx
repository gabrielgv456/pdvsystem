import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import * as S from "./style"
import { useDarkMode } from '../../contexts/DarkMode/DarkModeProvider';
import { MdAdd, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { ListProducts } from './ListProducts/ListProducts';
import { useApi } from '../../hooks/useApi';
import { BsCheckCircle, BsSearch } from 'react-icons/bs';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { AiOutlineClose, } from 'react-icons/ai';
import { ModalTransactionsProducts } from './Modals/TransactionsProducts';
import { useMessageBoxContext } from "../../contexts/MessageBox/MessageBoxContext";
import { ModalAddEditProduct } from "./Modals/AddEditProduct";


interface ProductsReturnApiProps {
    id: number;
    name: string;
    value: number;
    totalValue: number;
    created_at: Date;
    active: boolean;
    quantity: number;
    barCode: string,
    cost: number,
    itemTypeId: number,
    cfopId: number,
    ncmCode: string,
    profitMargin: number,
    unitMeasurement:string
}

export interface TransactionsProductsReturnApi {
    type: string;
    description: string;
    created_at: Date;
    quantity: number;
    totalQuantity: number;
}

export const InventoryManagement = () => {
    const { findProducts } = useApi()
    const auth = useContext(AuthContext);
    const Theme = useDarkMode();
    const [ProductsReturnApi, setProductsReturnApi] = useState<ProductsReturnApiProps[]>([])
    const [ItensPerPageExtract, SetItensPerPageExtract] = useState(10)
    const [atualPageExtract, SetAtualPageExtract] = useState(0)
    const [isModalAddEditProductOpen, setisModalAddEditProductOpen] = useState(false);
    const [isModalSucessOpen, setisModalSucessOpen] = useState(false);
    const [isModalTransactionsProductsOpen, setisModalTransactionsProductsOpen] = useState(false);
    const [inputSearchProduct, setinputSearchProduct] = useState("")
    const inputSearchProductLowwer = inputSearchProduct.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    const [dataTransactionsProductsReturnApi, setdataTransactionsProductsReturnApi] = useState<TransactionsProductsReturnApi[]>([])
    const ProductsReturnApiFiltered = ProductsReturnApi.filter((product) => product.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(inputSearchProductLowwer))
    const PagesExtract = Math.ceil(ProductsReturnApiFiltered.length / ItensPerPageExtract)
    const StartIndexExtract = atualPageExtract * ItensPerPageExtract
    const EndIndexExtract = StartIndexExtract + ItensPerPageExtract
    const paginedTransactionsReturnApi = ProductsReturnApiFiltered.slice(StartIndexExtract, EndIndexExtract)


    useEffect(() => {
        SearchProducts();
    }, [])

    function handleOpenModalConfirmSell() {
        setisModalAddEditProductOpen(true)
    }

    function handleCloseModalSucess() {
        SearchProducts()
        setisModalSucessOpen(false)
    }
    function handleContinueAddingProducts() {
        setisModalAddEditProductOpen(true)
        setisModalSucessOpen(false)
    }

    const EditItensPerPage = (ItensPerPage: number) => {
        SetItensPerPageExtract(ItensPerPage)
        SetAtualPageExtract(0)
    }
    const SearchProducts = async () => {
        const data = await findProducts(auth.idUser)
        setProductsReturnApi(data.listProducts)
    }

    return (
        <>
            <S.Container isDarkMode={Theme.DarkMode}>

                <S.Header>
                    <S.LabelSearchProduct>
                        <BsSearch style={{ margin: '15px', color: "#9eaab5" }} size="18" />
                        <input
                            value={inputSearchProduct}
                            onChange={(e) => setinputSearchProduct(e.target.value)}
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
                            placeholder="Localizar Produto..."></input>
                    </S.LabelSearchProduct>
                    <label>
                        <S.ButtonAddProduct onClick={handleOpenModalConfirmSell} isDarkMode={Theme.DarkMode}>
                            <MdAdd size="22" />
                            <b>NOVO PRODUTO</b>
                        </S.ButtonAddProduct>
                    </label>
                </S.Header>


                <S.DivListProducts>

                    <S.DivTitleListProducts isDarkMode={Theme.DarkMode}>
                        <S.labelEdit></S.labelEdit>
                        <S.labelProduct><b>Produto</b></S.labelProduct>
                        <S.labelStatus><b>Status</b></S.labelStatus>
                        <S.labelQuantity><b>Saldo</b></S.labelQuantity>
                        <S.labelValue><b>Valor</b></S.labelValue>
                        <S.labelCriadoEm ><b>Criado em</b></S.labelCriadoEm>
                        <S.labelTrash></S.labelTrash>
                        <S.labelTrash></S.labelTrash>

                    </S.DivTitleListProducts>



                    {paginedTransactionsReturnApi.map((item) => (
                        <ListProducts
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            value={item.value}
                            quantity={item.quantity}
                            active={item.active}
                            barCode= {item.barCode}
                            cost= {item.cost}
                            itemTypeId= {item.itemTypeId}
                            cfopId= {item.cfopId}
                            ncmCode= {item.ncmCode}
                            profitMargin= {item.profitMargin}
                            unitMeasurement={item.unitMeasurement}
                            isModalTransactionsProductsOpen={isModalTransactionsProductsOpen}
                            setisModalTransactionsProductsOpen={setisModalTransactionsProductsOpen}
                            searchProduct={SearchProducts}
                            dataTransactionsProductsReturnApi={dataTransactionsProductsReturnApi}
                            setdataTransactionsProductsReturnApi={setdataTransactionsProductsReturnApi}
                            created_at={item.created_at} />

                    ))
                    }

                    {ProductsReturnApi.length === 0 &&
                        <h5 style={{ color: '#485059', marginTop: '5%' }}>Nenhum resultado encontrado</h5>
                    }

                    <S.DivFooterListProducts isDarkMode={Theme.DarkMode}>
                        <select value={ItensPerPageExtract}
                            onChange={(e) => EditItensPerPage(Number(e.target.value))}
                            style={{ border: 'none', width: '40px', background: 'none', color: '#67636d' }}>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={10000}>*</option>
                        </select>
                        <S.DivRightFooterProducts>
                            <label>Qtd Total: {ProductsReturnApi.reduce((acc, item) => { return acc + item.quantity }, 0)}</label>
                            <label>Valor Total: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ProductsReturnApi.reduce((acc, item) => { return acc + item.totalValue }, 0))}</label>

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
                        </S.DivRightFooterProducts>

                    </S.DivFooterListProducts>
                </S.DivListProducts>

                {/******     Modals Start  *********/}

                <ModalTransactionsProducts
                    dataTransactionsProductsReturnApi={dataTransactionsProductsReturnApi}
                    isModalTransactionsProductsOpen={isModalTransactionsProductsOpen}
                    setisModalTransactionsProductsOpen={setisModalTransactionsProductsOpen}
                />

                <ModalAddEditProduct
                    isModalAddEditProductOpen={isModalAddEditProductOpen}
                    setisModalAddEditProductOpen={setisModalAddEditProductOpen}
                    setisModalSucessOpen={setisModalSucessOpen}
                    type="Add"
                />

                <Modal open={isModalSucessOpen} onClose={handleCloseModalSucess}>
                    <Box sx={{
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: {
                            xs: '80%', // phone
                            sm: '80%', // tablets
                            md: 500, // small laptop
                            lg: 500, // desktop
                            xl: 500 // large screens
                        },
                        //width: '80%',
                        bgcolor: Theme.DarkMode ? 'var(--backgroundDarkMode2)' : 'background.paper',
                        color: Theme.DarkMode ? '#ffffff' : '#000',
                        border: Theme.DarkMode ? '1px solid silver' : '',
                        boxShadow: 24, p: 4,
                    }}
                    >
                        <S.DivModalSucess>
                            <h3 style={{ alignSelf: 'center' }}>Produto adicionado com sucesso!</h3>
                            <BsCheckCircle color="var(--Green)" size="50" className="IconSucess" />
                            <div style={{ display: 'flex', marginTop: '30px', gap: '5px' }}>
                                <S.ButtonAddSucessProductModal onClick={handleContinueAddingProducts}><b>Continuar adicionando</b></S.ButtonAddSucessProductModal>
                                <S.ButtonExitSucessProductModal onClick={handleCloseModalSucess}><b>Sair</b></S.ButtonExitSucessProductModal>
                            </div>
                        </S.DivModalSucess>
                        <S.ButtonCloseModal isDarkMode={Theme.DarkMode} onClick={handleCloseModalSucess}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonCloseModal>
                    </Box>
                </Modal>
            </S.Container>
        </>
    )
}