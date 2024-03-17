import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import * as S from "./style"
import * as type from './interfaces'
import { useDarkMode } from '../../contexts/DarkMode/DarkModeProvider';
import { MdAdd, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { ListProducts } from './ListProducts/ListProducts';
import { useApi } from '../../hooks/useApi';
import { BsCheckCircle, BsSearch } from 'react-icons/bs';
import Modal from '@mui/material/Modal';
import { AiOutlineClose, } from 'react-icons/ai';
import { ModalTransactionsProducts } from './Modals/TransactionsProducts';
import { useMessageBoxContext } from "../../contexts/MessageBox/MessageBoxContext";
import { ModalAddEditProduct } from "./Modals/AddEditProduct";
import { MuiBox } from "../../components/box/muiBox";
import { DefaultButtonCloseModal, DefaultIconCloseModal } from "../../components/buttons/closeButtonModal";
import { useLayout } from "../../contexts/Layout/layoutContext";


export const InventoryManagement = () => {

    const { setActualPage } = useLayout();
    setActualPage('Gestão de Estoque')
    const { findProducts } = useApi()
    const auth = useContext(AuthContext);
    const Theme = useDarkMode();
    const [actualItemEdit, setActualItemEdit] = useState<type.ProductsReturnApiProps | undefined>()
    const [ProductsReturnApi, setProductsReturnApi] = useState<type.ProductsReturnApiProps[]>([])
    const [ItensPerPageExtract, SetItensPerPageExtract] = useState(10)
    const [atualPageExtract, SetAtualPageExtract] = useState(0)
    const [isModalAddEditProductOpen, setisModalAddEditProductOpen] = useState(false);
    const [isModalSucessOpen, setisModalSucessOpen] = useState(false);
    const [isModalTransactionsProductsOpen, setisModalTransactionsProductsOpen] = useState(false);
    const [inputSearchProduct, setinputSearchProduct] = useState("")
    const inputSearchProductLowwer = inputSearchProduct.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    const [dataTransactionsProductsReturnApi, setdataTransactionsProductsReturnApi] = useState<type.TransactionsProductsReturnApi[]>([])
    const ProductsReturnApiFiltered = ProductsReturnApi.filter((product) => product.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(inputSearchProductLowwer))
    const PagesExtract = Math.ceil(ProductsReturnApiFiltered.length / ItensPerPageExtract)
    const StartIndexExtract = atualPageExtract * ItensPerPageExtract
    const EndIndexExtract = StartIndexExtract + ItensPerPageExtract
    const paginedTransactionsReturnApi = ProductsReturnApiFiltered.slice(StartIndexExtract, EndIndexExtract)


    useEffect(() => {
        SearchProducts();
    }, [])

    function handleOpenModalConfirmSell() {
        setActualItemEdit(undefined)
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
                <S.Content isDarkMode={Theme.DarkMode}>
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
                            <S.labelQuantity><b>Disponível</b></S.labelQuantity>
                            <S.labelQuantity><b>Reservado</b></S.labelQuantity>
                            <S.labelValue><b>Valor</b></S.labelValue>
                            <S.labelCriadoEm ><b>Criado em</b></S.labelCriadoEm>
                            <S.labelTrash></S.labelTrash>
                            <S.labelTrash></S.labelTrash>

                        </S.DivTitleListProducts>



                        {paginedTransactionsReturnApi.map((item) => (
                            <ListProducts
                                key={item.id}
                                item={item}
                                isModalTransactionsProductsOpen={isModalTransactionsProductsOpen}
                                setisModalTransactionsProductsOpen={setisModalTransactionsProductsOpen}
                                searchProduct={SearchProducts}
                                dataTransactionsProductsReturnApi={dataTransactionsProductsReturnApi}
                                setdataTransactionsProductsReturnApi={setdataTransactionsProductsReturnApi}
                                setActualItemEdit={setActualItemEdit}
                                isModalAddEditProductOpen={isModalAddEditProductOpen}
                                setisModalAddEditProductOpen={setisModalAddEditProductOpen}
                                reservedQuantity={item.deliveries.reduce((acc, item) => {
                                    return acc + item.itemSell.quantity
                                }, 0)}
                            />

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
                                <label>Qtd Total: {ProductsReturnApi.reduce((acc, item) => { return acc + (item.quantity ?? 0) }, 0)}</label>
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
                    {actualItemEdit ?
                        <ModalAddEditProduct
                            itemData={actualItemEdit}
                            isModalAddEditProductOpen={isModalAddEditProductOpen}
                            setisModalAddEditProductOpen={setisModalAddEditProductOpen}
                            setisModalSucessOpen={setisModalSucessOpen}
                            type={'Edit'}
                        />
                        :
                        <ModalAddEditProduct
                            isModalAddEditProductOpen={isModalAddEditProductOpen}
                            setisModalAddEditProductOpen={setisModalAddEditProductOpen}
                            setisModalSucessOpen={setisModalSucessOpen}
                            type={'Add'}
                        />
                    }
                    <Modal open={isModalSucessOpen} onClose={handleCloseModalSucess}>
                        <MuiBox desktopWidth={500} mobileWidthPercent="80%" >
                            <S.DivModalSucess>
                                <h3 style={{ alignSelf: 'center' }}>Produto {actualItemEdit ? 'editado' : 'adicionado'} com sucesso!</h3>
                                <BsCheckCircle color="var(--Green)" size="50" className="IconSucess" />
                                <div style={{ display: 'flex', marginTop: '30px', gap: '5px' }}>
                                    {!actualItemEdit &&
                                        <S.ButtonAddSucessProductModal onClick={handleContinueAddingProducts}><b>Continuar adicionando</b></S.ButtonAddSucessProductModal>
                                    }
                                    <S.ButtonExitSucessProductModal onClick={handleCloseModalSucess}><b>Sair</b></S.ButtonExitSucessProductModal>
                                </div>
                            </S.DivModalSucess>
                            <DefaultButtonCloseModal onClick={handleCloseModalSucess}>
                                <DefaultIconCloseModal />
                            </DefaultButtonCloseModal>
                        </MuiBox>
                    </Modal>
                </S.Content>
            </S.Container>

        </>
    )
}