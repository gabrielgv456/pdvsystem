import * as S from './style'
import Switch from '@mui/material/Switch';
import { CurrencyMask } from '../../../../../../masks/CurrencyMask';
import { MdFileDownloadDone } from 'react-icons/md';
import TextField from '@mui/material/TextField';
import { useContext, useState } from 'react';
import { useApi } from '../../../../../../hooks/useApi';
import Autocomplete from '@mui/material/Autocomplete';
import { AuthContext } from '../../../../../../contexts/Auth/AuthContext';
import { useMessageBoxContext } from '../../../../../../contexts/MessageBox/MessageBoxContext';
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkModeProvider';

interface tabInfoProductProps {
    setisModalSucessOpen: (value: boolean) => void;
    setisModalAddProductOpen: (value:boolean) => void
}

export const TabInfoProduct = (props:tabInfoProductProps) => {

    const { addProducts } = useApi()
    const auth = useContext(AuthContext)
    const [inputvalueProduct, setinputvalueProduct] = useState<string | null>(null)
    const [finalvalueProduct, setfinalvalueProduct] = useState(0)
    const [inputProductsModalQuantity, setinputProductsModalQuantity] = useState<number | null>(null)
    const [isProductActiveModalAddProduct, setisProductActiveModalAddProduct] = useState(true)
    const [inputProductsModalName, setinputProductsModalName] = useState("")
    const { MessageBox } = useMessageBoxContext()
    const Theme = useDarkMode()
    const options = ['teste']
    
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
                props.setisModalAddProductOpen(false)
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
    
    const changeInputValueProduct = async (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {

        setinputvalueProduct(e.target.value)

        let formatvalue = e.target.value
        formatvalue = formatvalue.replace(/\D/g, "")
        formatvalue = formatvalue.replace(/(\d)(\d{2})$/, "$1.$2")
        setfinalvalueProduct(parseFloat(formatvalue))
    }
    const finaldataAddProductsToSendApi = {
        userId: auth.idUser,
        name: inputProductsModalName,
        value: finalvalueProduct,
        quantity: inputProductsModalQuantity,
        active: isProductActiveModalAddProduct
    }


    return (
        <>
            <S.DivModalAddProduct>
               
                <TextField
                    value={inputProductsModalName}
                    onChange={(e) => setinputProductsModalName(e.target.value)}
                    id="outlined-basic"
                    label="Nome do Produto"
                    variant="outlined"
                    autoFocus
                    sx={{ width: '100%' }} />
                <section style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <TextField
                        value={inputvalueProduct}
                        onChange={(e) => changeInputValueProduct(CurrencyMask(e))}
                        id="outlined-basic"
                        label="Custo"
                        variant="outlined"
                        sx={{ width: '29%' }} />
                    <TextField
                        value={inputvalueProduct}
                        onChange={(e) => changeInputValueProduct(CurrencyMask(e))}
                        id="outlined-basic"
                        label="Margem de Lucro (%)"
                        variant="outlined"
                        sx={{ width: '38%' }} />
                    <TextField
                        value={inputvalueProduct}
                        onChange={(e) => changeInputValueProduct(CurrencyMask(e))}
                        id="outlined-basic"
                        label="Valor"
                        variant="outlined"
                        sx={{ width: '29%' }} />
                </section>
                <section style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>

                    <TextField
                        value={inputProductsModalQuantity}
                        onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                        type="number"
                        id="outlined-basic"
                        label="Estoque"
                        variant="outlined"
                        sx={{ width: '25%' }} />
                    <TextField
                        value={inputProductsModalQuantity}
                        onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                        type="number"
                        id="outlined-basic"
                        label="Código de barras"
                        variant="outlined"
                        sx={{ width: '38%' }} />
                    <TextField
                        value={inputProductsModalQuantity}
                        onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                        type="number"
                        id="outlined-basic"
                        label="Código NCM"
                        variant="outlined"
                        sx={{ width: '33%' }} />
                </section>
                <section style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                
                <Autocomplete
                    value={inputvalueProduct}
                    onChange={(event: any, newValue: string | null) => {
                        setinputvalueProduct(newValue);
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={options}
                    sx={{ width: '48%' }}
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
                    sx={{ width: '48%' }}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="Unidade de Medida"
                        />
                    } />

            </section>
               
                <section>
                    Produto ativo
                    <Switch checked={isProductActiveModalAddProduct} onChange={(e) => { setisProductActiveModalAddProduct(e.target.checked) }} />
                </section>
            </S.DivModalAddProduct>
            <S.ButtonAddProductModal onClick={AddProductApi} isDarkMode={Theme.DarkMode} style={{ margin: '0 auto' }}>
                <MdFileDownloadDone size="22" />
                <b>ADICIONAR PRODUTO</b>
            </S.ButtonAddProductModal>
        </>
    )
}