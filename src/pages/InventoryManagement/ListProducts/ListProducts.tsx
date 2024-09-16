import { BsCheckCircle, BsTrash } from "react-icons/bs";
import { useDarkMode } from "../../../contexts/DarkMode/DarkModeProvider";
import * as S from "./style"
import * as type from './interfaces'
import { BiTransfer } from "react-icons/bi"
import { HiOutlinePencilAlt } from "react-icons/hi";
import Modal from '@mui/material/Modal';
import { useContext, useState } from "react";
import TextField from '@mui/material/TextField';
import { useApi } from "../../../hooks/useApi";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { RiAdminLine } from "react-icons/ri";
import { formatCurrencyNew } from "../../../masks/CurrencyMask"
import { useMessageBoxContext } from "../../../contexts/MessageBox/MessageBoxContext";
import { MuiBox } from "../../../components/box/muiBox";
import { DefaultButtonCloseModal, DefaultIconCloseModal } from "../../../components/buttons/closeButtonModal";


export const ListProducts = (props: type.ListProductsProps) => {

    const { deleteProducts, findTransactionsProducts } = useApi()
    const auth = useContext(AuthContext)
    const Theme = useDarkMode();
    const gethoursTransactions = new Date(props.item.created_at).toLocaleString('pt-BR', { timeZone: 'UTC' })
    const formatedItemValue = formatCurrencyNew(props.item.value)
    const [isModalEditProductOpen, setisModalEditProductOpen] = useState(false);
    const [isModalMasterKeyOpen, setisModalMasterKeyOpen] = useState(false)
    const [inputMasterKey, setinputMasterKey] = useState("")
    const [isModalDeleteProductOpen, setisModalDeleteProductOpen] = useState(false)
    const [isModalSucessOpen, setisModalSucessOpen] = useState(false)
    const [inputvalueProduct, setinputvalueProduct] = useState<string | null>(formatCurrencyNew(props.item.value))
    const [valueInputProductName, setvalueInputProductName] = useState(props.item.name)
    const [finalvalueProduct, setfinalvalueProduct] = useState(props.item.value)
    const [valueInputProductQuantity, setvalueInputProductQuantity] = useState(props.item.quantity)
    const [valueInputProductActive, setvalueInputProductActive] = useState(props.item.active)
    const { MessageBox } = useMessageBoxContext()
    const finaldataEditProductsToSendApi = {
        id: props.item.id,
        name: valueInputProductName,
        value: finalvalueProduct,
        quantity: valueInputProductQuantity,
        active: valueInputProductActive,
        userId: auth.idUser
    }
    const changeInputValueProduct = async (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {

        setinputvalueProduct(e.target.value)

        let formatvalue = e.target.value
        formatvalue = formatvalue.replace(/\D/g, "")
        formatvalue = formatvalue.replace(/(\d)(\d{2})$/, "$1.$2")
        setfinalvalueProduct(parseFloat(formatvalue))
    }
    function handleCloseModalSucess() {
        props.searchProduct()
        setisModalSucessOpen(false)
    }
    function handleCloseModalMasterKey() {
        setisModalMasterKeyOpen(false)
    }
    function handleCloseModalDeleteProduct() {
        setisModalDeleteProductOpen(false)
    }
    function handleVerifyMasterKey() {
        if (inputMasterKey === auth.masterkey) {
            handleCloseModalMasterKey()
            setinputMasterKey("")
            setisModalDeleteProductOpen(true)
        }
        else {
            MessageBox('error', 'Senha de Administrador incorreta!')
        }
    }
    const handleDeleteProductApi = async () => {
        const data = await deleteProducts({ id: props.item.id })
        if (data.Success) {
            setisModalDeleteProductOpen(false)
            setisModalSucessOpen(true)
        }
        else {
            MessageBox('error', data.Erro)
        }


    }
    function handleCloseModalEditProduct() {
        setvalueInputProductName(props.item.name)
        setfinalvalueProduct(props.item.value)
        setvalueInputProductQuantity(props.item.quantity)
        setvalueInputProductActive(props.item.active)
        setinputvalueProduct(formatCurrencyNew(props.item.value))
        setisModalEditProductOpen(false)
    }

    const handleOpenModalTransactionsProducts = async () => {
        props.setisModalTransactionsProductsOpen(true)
        const data = await findTransactionsProducts({ id: props.item.id, storeId: auth.idUser })
        props.setdataTransactionsProductsReturnApi(data.findTransactionsProducts)
    }


    return (
        <>
            <S.TrContainer isDarkMode={Theme.DarkMode} isProductActive={props.item.active} >

                <S.TdEdit ><HiOutlinePencilAlt onClick={() => {
                    props.setActualItemEdit(props.item)
                    props.setisModalAddEditProductOpen(true)
                }} title="Editar Produto" size="20" style={{ cursor: 'pointer' }} /></S.TdEdit>

                <td>  <S.imgProduct src={props.item.urlImage ?? ''} /></td>

                <S.TdNameProduct isDarkMode={Theme.DarkMode}>
                    <b>{props.item.name}</b>
                </S.TdNameProduct>

                <td style={{ textAlign: 'center' }}>
                    {(props.item.quantity ?? 0) > 0 ?
                        <S.SpanStatus style={Theme.DarkMode ? { color: '#4daf42' } : { backgroundColor: '#eaf9e0', color: '#4daf42' }} isDarkMode={Theme.DarkMode}>
                            <b>Em estoque</b>
                        </S.SpanStatus>
                        :
                        <S.SpanStatus style={Theme.DarkMode ? { color: '#b82338' } : { backgroundColor: '#ffe2e1', color: '#b82338' }} isDarkMode={Theme.DarkMode}>
                            <b>Sem estoque</b>
                        </S.SpanStatus>
                    }

                </td>

                <S.TdQuantity isDarkMode={Theme.DarkMode}>
                    <b>{props.item.quantity}</b>
                </S.TdQuantity>

                <S.TdQuantity isDarkMode={Theme.DarkMode}>
                    <b>{props.reservedQuantity > 0 ? props.reservedQuantity : ''}</b>
                </S.TdQuantity>

                <S.TdValue isDarkMode={Theme.DarkMode}>
                    <b>{formatedItemValue}</b>
                </S.TdValue>

                <S.TdDate >
                    <b>{gethoursTransactions}</b>
                </S.TdDate>

                <S.TdInfo ><BiTransfer onClick={handleOpenModalTransactionsProducts} title="Movimentações" style={{ width: '1rem', cursor: 'pointer' }} /></S.TdInfo>
                <S.TdTrash  ><BsTrash onClick={() => setisModalDeleteProductOpen(true)} title="Excluir Produto" style={{ width: '1rem', cursor: 'pointer' }} /></S.TdTrash>

            </S.TrContainer>



            <Modal open={isModalMasterKeyOpen} onClose={handleCloseModalMasterKey}>
                <MuiBox desktopWidth={500} mobileWidthPercent="80%">
                    <S.DivRestrictAcessModal>
                        <h3 style={{ alignSelf: 'center' }}>Acesso Restrito</h3>
                        <label style={{ display: 'flex', alignItems: 'center' }}>
                            <RiAdminLine size="32" color='#485059' style={{ marginRight: 5 }} />
                            <TextField
                                value={inputMasterKey}
                                onChange={(e) => setinputMasterKey(e.target.value)}
                                type="password"

                                label="Senha de administrador"
                                variant="filled"
                                sx={{ width: '80%', borderRadius: '0 !important' }} />

                            <S.ButtonRestrictAcessModal onClick={handleVerifyMasterKey}>OK</S.ButtonRestrictAcessModal>
                        </label>
                    </S.DivRestrictAcessModal>
                    <DefaultButtonCloseModal onClick={handleCloseModalMasterKey}>
                        <DefaultIconCloseModal />
                    </DefaultButtonCloseModal>
                </MuiBox>
            </Modal>

            <Modal open={isModalDeleteProductOpen} onClose={handleCloseModalDeleteProduct}>
                <MuiBox desktopWidth={500} mobileWidthPercent="80%">
                    <S.DivDeleteProductModal>
                        <h3 style={{ alignSelf: 'center' }}>Deseja realmente excluir o produto?</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '40%' }}>
                            <S.ButtonYesDeleteProductModal onClick={handleDeleteProductApi}><b>SIM</b></S.ButtonYesDeleteProductModal>
                            <S.ButtonNoDeleteProductModal onClick={handleCloseModalDeleteProduct}><b>NÃO</b></S.ButtonNoDeleteProductModal>
                        </div>
                    </S.DivDeleteProductModal>
                    <DefaultButtonCloseModal onClick={handleCloseModalDeleteProduct}>
                        <DefaultIconCloseModal />
                    </DefaultButtonCloseModal>
                </MuiBox>
            </Modal>



            <Modal open={isModalSucessOpen} onClose={handleCloseModalSucess}>
                <MuiBox desktopWidth={500} mobileWidthPercent="80%" >
                    <S.DivDeleteProductModal>
                        <h3 style={{ alignSelf: 'center' }}>Procedimento realizado com sucesso!</h3>
                        <BsCheckCircle color="var(--Green)" size="50" className="IconSucess" />
                    </S.DivDeleteProductModal>
                    <DefaultButtonCloseModal onClick={handleCloseModalSucess}>
                        <DefaultIconCloseModal />
                    </DefaultButtonCloseModal>
                </MuiBox>
            </Modal>
        </>
    )

}
