
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkModeProvider';
import Switch from '@mui/material/Switch';
import { CurrencyMask } from '../../../../masks/CurrencyMask';
import { MdFileDownloadDone } from 'react-icons/md';
import { useContext, useState } from 'react';
import { useApi } from '../../../../hooks/useApi';
import * as S from './style'
import { useMessageBoxContext } from '../../../../contexts/MessageBox/MessageBoxContext';
import { AuthContext } from '../../../../contexts/Auth/AuthContext';
import { AiOutlineClose } from 'react-icons/ai';
import Autocomplete from '@mui/material/Autocomplete';

interface PropsModalAddProduct {
    isModalAddProductOpen: boolean;
    setisModalAddProductOpen: (value: boolean) => void;
    setisModalSucessOpen: (value: boolean) => void
}

export const ModalAddProduct = (props: PropsModalAddProduct) => {

    const Theme = useDarkMode()
    const { addProducts } = useApi()
    const auth = useContext(AuthContext)
    const [inputvalueProduct, setinputvalueProduct] = useState<string | null>(null)
    const [finalvalueProduct, setfinalvalueProduct] = useState(0)
    const [inputProductsModalQuantity, setinputProductsModalQuantity] = useState<number | null>(null)
    const [isProductActiveModalAddProduct, setisProductActiveModalAddProduct] = useState(true)
    const [inputProductsModalName, setinputProductsModalName] = useState("")
    const { MessageBox } = useMessageBoxContext()
    const options = ['teste']

    const changeInputValueProduct = async (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {

        setinputvalueProduct(e.target.value)

        let formatvalue = e.target.value
        formatvalue = formatvalue.replace(/\D/g, "")
        formatvalue = formatvalue.replace(/(\d)(\d{2})$/, "$1.$2")
        setfinalvalueProduct(parseFloat(formatvalue))
    }

    function handleCloseModalAddProduct() {
        props.setisModalAddProductOpen(false)
    }

    const finaldataAddProductsToSendApi = {
        userId: auth.idUser,
        name: inputProductsModalName,
        value: finalvalueProduct,
        quantity: inputProductsModalQuantity,
        active: isProductActiveModalAddProduct
    }


    const AddProductApi = async () => {

        if (inputProductsModalName !== ""
            && finalvalueProduct > 0
            && inputProductsModalQuantity
            && inputProductsModalQuantity > 0) {
            try {
                const data = await addProducts(finaldataAddProductsToSendApi)
                if (!data.Sucess) {
                    throw new Error('Falha ao adicionar produto! ' + data.erro)
                }
                handleCloseModalAddProduct()
                setinputProductsModalName("")
                setinputProductsModalQuantity(null)
                setinputvalueProduct(null)
                setfinalvalueProduct(0)
                props.setisModalSucessOpen(true)
            } catch (error: any) {
                MessageBox('error', error.message)
            }
        }
        else {
            MessageBox('info', 'Insira todos dados corretamente!')
        }
    }

    return (

        <Modal open={props.isModalAddProductOpen} onClose={handleCloseModalAddProduct}>
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
                <S.DivModalAddProduct>
                    <TextField
                        value={inputProductsModalName}
                        onChange={(e) => setinputProductsModalName(e.target.value)}
                        id="outlined-basic"
                        label="Nome do Produto"
                        variant="outlined"
                        autoFocus
                        sx={{ width: '90%' }} />
                    <label style={{ display: 'flex', justifyContent: 'space-between', width: '90%' }}>
                        <TextField
                            value={inputvalueProduct}
                            onChange={(e) => changeInputValueProduct(CurrencyMask(e))}
                            id="outlined-basic"
                            label="Valor"
                            variant="outlined"
                            sx={{ width: '48%' }} />

                        <TextField
                            value={inputProductsModalQuantity}
                            onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                            type="number"
                            id="outlined-basic"
                            label="Qtd em Estoque"
                            variant="outlined"
                            sx={{ width: '48%' }} />
                    </label>
                    <TextField
                        value={inputProductsModalQuantity}
                        onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                        type="number"
                        id="outlined-basic"
                        label="Código NCM"
                        variant="outlined"
                        sx={{ width: '48%' }} />
                    <TextField
                        value={inputProductsModalQuantity}
                        onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                        type="number"
                        id="outlined-basic"
                        label="CFOP"
                        variant="outlined"
                        sx={{ width: '48%' }} />
                    <TextField
                        value={inputProductsModalQuantity}
                        onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                        type="number"
                        id="outlined-basic"
                        label="Red. BC ICMS(%)"
                        variant="outlined"
                        sx={{ width: '48%' }} disabled />

                    <TextField
                        value={inputProductsModalQuantity}
                        onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                        type="number"
                        id="outlined-basic"
                        label="Alíquota ICMS(%)"
                        variant="outlined"
                        sx={{ width: '48%' }} disabled />

                    <Autocomplete
                        value={inputvalueProduct}
                        onChange={(event: any, newValue: string | null) => {
                            setinputvalueProduct(newValue);
                        }}
                        noOptionsText="Não encontrado"
                        id="controllable-states-demo"
                        options={options}
                        sx={{ width: '21%' }}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="ICMS Origem"
                            />
                        } />
                    <Autocomplete
                        value={inputvalueProduct}
                        onChange={(event: any, newValue: string | null) => {
                            setinputvalueProduct(newValue);
                        }}
                        noOptionsText="Não encontrado"
                        id="controllable-states-demo"
                        options={options}
                        sx={{ width: '21%' }}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Tipo de item"
                            />
                        } />
                    <Autocomplete
                        value={inputvalueProduct}
                        onChange={(event: any, newValue: string | null) => {
                            setinputvalueProduct(newValue);
                        }}
                        noOptionsText="Não encontrado"
                        id="controllable-states-demo"
                        options={options}
                        sx={{ width: '21%' }}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Unidade de Medida"
                            />
                        } />

                    <Autocomplete
                        value={inputvalueProduct}
                        onChange={(event: any, newValue: string | null) => {
                            setinputvalueProduct(newValue);
                        }}
                        noOptionsText="Não encontrado"
                        id="controllable-states-demo"
                        options={options}
                        sx={{ width: '21%' }}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="ICMS - CST"
                            />
                        } />

                    <label>
                        Produto ativo
                        <Switch checked={isProductActiveModalAddProduct} onChange={(e) => { setisProductActiveModalAddProduct(e.target.checked) }} />
                    </label>
                </S.DivModalAddProduct>
                <S.ButtonAddProductModal onClick={AddProductApi} isDarkMode={Theme.DarkMode} style={{ margin: '0 auto' }}>
                    <MdFileDownloadDone size="22" />
                    <b>ADICIONAR PRODUTO</b>
                </S.ButtonAddProductModal>
                <S.ButtonCloseModal isDarkMode={Theme.DarkMode} onClick={handleCloseModalAddProduct}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonCloseModal>
            </Box>
        </Modal>
    )
}