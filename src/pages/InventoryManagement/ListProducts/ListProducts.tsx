import { BsCheckCircle, BsTrash } from "react-icons/bs";
import { useDarkMode } from "../../../contexts/DarkMode/DarkModeProvider";
import * as S from "./style"
import { BiTransfer } from "react-icons/bi"
import { HiOutlinePencilAlt } from "react-icons/hi";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useContext, useState } from "react";
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { useApi } from "../../../hooks/useApi";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { RiAdminLine } from "react-icons/ri";
import { TransactionsProductsReturnApi } from "../index"
import { CurrencyMask } from "../../../masks/CurrencyMask"
import { useMessageBoxContext } from "../../../contexts/MessageBox/MessageBoxContext";
import { ModalAddEditProduct } from "../Modals/AddEditProduct";

export interface ListProductsProps {
    id: number;
    name: string;
    value: number;
    created_at: Date;
    active: boolean;
    quantity: number;
    barCode: string,
    cost: number,
    itemTypeId: number,
    cfopId:number,
    ncmCode: string,
    profitMargin: number,
    unitMeasurement:string,
    dataTransactionsProductsReturnApi: TransactionsProductsReturnApi[];
    isModalTransactionsProductsOpen: boolean;
    setisModalTransactionsProductsOpen: (isModalTransactionsProductsOpen: boolean) => void;
    setdataTransactionsProductsReturnApi: (dataTransactionsProductsReturnApi: TransactionsProductsReturnApi[]) => void;
    searchProduct: () => void;
}





export const ListProducts = (props: ListProductsProps) => {


    const { editProducts, deleteProducts, findTransactionsProducts } = useApi()
    const auth = useContext(AuthContext)
    const Theme = useDarkMode();
    const gethoursTransactions = new Date(props.created_at).toLocaleString('pt-BR', { timeZone: 'UTC' })
    const formatedItemValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.value)
    const [isModalEditProductOpen, setisModalEditProductOpen] = useState(false);
    const [isModalMasterKeyOpen, setisModalMasterKeyOpen] = useState(false)
    const [inputMasterKey, setinputMasterKey] = useState("")
    const [isModalDeleteProductOpen, setisModalDeleteProductOpen] = useState(false)
    const [isModalSucessOpen, setisModalSucessOpen] = useState(false)
    const [inputvalueProduct, setinputvalueProduct] = useState<string | null>(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.value))
    const [valueInputProductName, setvalueInputProductName] = useState(props.name)
    const [finalvalueProduct, setfinalvalueProduct] = useState(props.value)
    const [valueInputProductQuantity, setvalueInputProductQuantity] = useState(props.quantity)
    const [valueInputProductActive, setvalueInputProductActive] = useState(props.active)
    const { MessageBox } = useMessageBoxContext()
    const finaldataEditProductsToSendApi = {
        id: props.id,
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
        const data = await deleteProducts({ id: props.id })
        if (data.Sucess) {
            setisModalDeleteProductOpen(false)
            setisModalSucessOpen(true)
        }
        else {
            MessageBox('error', data.Erro)
        }


    }
    function handleCloseModalEditProduct() {
        setvalueInputProductName(props.name)
        setfinalvalueProduct(props.value)
        setvalueInputProductQuantity(props.quantity)
        setvalueInputProductActive(props.active)
        setinputvalueProduct(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.value))
        setisModalEditProductOpen(false)
    }
    
    const handleOpenModalTransactionsProducts = async () => {
        props.setisModalTransactionsProductsOpen(true)
        const data = await findTransactionsProducts({ id: props.id, storeId: auth.idUser })
        props.setdataTransactionsProductsReturnApi(data.findTransactionsProducts)
    }


    return (
        <>
            <S.Container isDarkMode={Theme.DarkMode} isProductActive={props.active}>

                <S.ButtonEdit onClick={() => setisModalEditProductOpen(true)} title="Editar Produto"><HiOutlinePencilAlt size="20" /></S.ButtonEdit>

                <S.LabelNameProduct isDarkMode={Theme.DarkMode}>
                    <b>{props.name}</b>
                </S.LabelNameProduct>

                {props.quantity > 0 ?
                    <S.LabelStatus style={Theme.DarkMode ? { color: '#4daf42' } : { backgroundColor: '#eaf9e0', color: '#4daf42' }} isDarkMode={Theme.DarkMode}>
                        <b>Em estoque</b>
                    </S.LabelStatus>
                    :
                    <S.LabelStatus style={Theme.DarkMode ? { color: '#b82338' } : { backgroundColor: '#ffe2e1', color: '#b82338' }} isDarkMode={Theme.DarkMode}>
                        <b>Sem estoque</b>
                    </S.LabelStatus>
                }

                <S.LabelQuantity isDarkMode={Theme.DarkMode}>
                    <b>{props.quantity}</b>
                </S.LabelQuantity>

                <S.LabelValue isDarkMode={Theme.DarkMode}>
                    <b>{formatedItemValue}</b>
                </S.LabelValue>

                <S.LabelDate >
                    <b>{gethoursTransactions}</b>
                </S.LabelDate>

                <S.ButtonInfo onClick={handleOpenModalTransactionsProducts} title="Movimentações"><BiTransfer size="16" /></S.ButtonInfo>
                <S.ButtonTrash onClick={() => setisModalDeleteProductOpen(true)} title="Excluir Produto" ><BsTrash size="16" /></S.ButtonTrash>

            </S.Container>


            <ModalAddEditProduct
                isModalAddEditProductOpen={isModalEditProductOpen}
                setisModalAddEditProductOpen={handleCloseModalEditProduct}
                setisModalSucessOpen={setisModalSucessOpen}
                type="Edit"
                itemData={props}
            />

            {/* <Modal open={isModalEditProductOpen} onClose={handleCloseModalEditProduct}>
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
                   <S.DivModalProduct>
                        <TextField 
                            value={valueInputProductName}
                            onChange={(e)=>{setvalueInputProductName(e.target.value)}}
                            id="outlined-basic" 
                            label="Nome do Produto" 
                            variant="outlined" 
                            sx={{width:'90%'}}/>   

                        <label style={{display:'flex', justifyContent:'space-between',width:'90%'}}>

                        <TextField 
                        value={inputvalueProduct}
                        onChange={(e) => changeInputValueProduct(CurrencyMask(e))}
                        id="outlined-basic" 
                        label="Valor" 
                        variant="outlined" 
                        sx={{width:'48%'}}/> 

                        <TextField 
                        value={valueInputProductQuantity}
                        onChange={(e)=>{setvalueInputProductQuantity(Number(e.target.value))}}
                        type="number" 
                        id="outlined-basic" 
                        label="Quantidade em Estoque" 
                        variant="outlined" 
                        sx={{width:'48%'}}/> 

                        </label>
                        
                        <label>
                            Produto ativo 
                            <Switch checked={valueInputProductActive} onChange={(e)=>setvalueInputProductActive(e.target.checked)}/>
                        </label>

                    </S.DivModalProduct>
                        <S.ButtonProductModal onClick={EditProductApi}  isDarkMode={Theme.DarkMode} style={{margin: '0 auto'}}>
                            <AiOutlineEdit size="22"/>
                            <b>FINALIZAR EDIÇÃO</b>
                        </S.ButtonProductModal>

                        <S.ButtonCloseModal isDarkMode={Theme.DarkMode} onClick={handleCloseModalEditProduct}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonCloseModal>



                </Box>
            </Modal> */}




            <Modal open={isModalMasterKeyOpen} onClose={handleCloseModalMasterKey}>
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
                    <S.ButtonCloseModal isDarkMode={Theme.DarkMode} onClick={handleCloseModalMasterKey}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonCloseModal>
                </Box>
            </Modal>

            <Modal open={isModalDeleteProductOpen} onClose={handleCloseModalDeleteProduct}>
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
                    <S.DivDeleteProductModal>
                        <h3 style={{ alignSelf: 'center' }}>Deseja realmente excluir o produto?</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '40%' }}>
                            <S.ButtonYesDeleteProductModal onClick={handleDeleteProductApi}><b>SIM</b></S.ButtonYesDeleteProductModal>
                            <S.ButtonNoDeleteProductModal onClick={handleCloseModalDeleteProduct}><b>NÃO</b></S.ButtonNoDeleteProductModal>
                        </div>
                    </S.DivDeleteProductModal>
                    <S.ButtonCloseModal isDarkMode={Theme.DarkMode} onClick={handleCloseModalDeleteProduct}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonCloseModal>
                </Box>
            </Modal>



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
                    <S.DivDeleteProductModal>
                        <h3 style={{ alignSelf: 'center' }}>Procedimento realizado com sucesso!</h3>
                        <BsCheckCircle color="var(--Green)" size="50" className="IconSucess" />
                    </S.DivDeleteProductModal>
                    <S.ButtonCloseModal isDarkMode={Theme.DarkMode} onClick={handleCloseModalSucess}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonCloseModal>
                </Box>
            </Modal>







        </>




    )

}
