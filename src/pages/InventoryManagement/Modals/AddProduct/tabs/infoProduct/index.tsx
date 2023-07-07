import * as S from './style'
import Switch from '@mui/material/Switch';
import { CurrencyMask, CurrencyMaskValue } from '../../../../../../masks/CurrencyMask';
import { MdFileDownloadDone } from 'react-icons/md';
import TextField from '@mui/material/TextField';
import { useContext, useState, DragEvent, ChangeEvent } from 'react';
import { useApi } from '../../../../../../hooks/useApi';
import Autocomplete from '@mui/material/Autocomplete';
import { AuthContext } from '../../../../../../contexts/Auth/AuthContext';
import { useMessageBoxContext } from '../../../../../../contexts/MessageBox/MessageBoxContext';
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkModeProvider';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { FormatCurrencytoFloatdb, FormatPercent, currencyRemoveNotNumbers, removeNotNumerics } from '../../../../../../utils/utils';
import { info } from 'console';

interface tabInfoProductProps {
    setisModalSucessOpen: (value: boolean) => void;
    setisModalAddProductOpen: (value: boolean) => void
}

export const TabInfoProduct = (props: tabInfoProductProps) => {

    const { addProducts } = useApi()
    const auth = useContext(AuthContext)
    const [inputvalueProduct, setinputvalueProduct] = useState<string | null>(null)
    const [inputCostProduct, setInputCostProduct] = useState<string | null>(null)
    const [inputProfitMargin, setInputProfitMargin] = useState<string | null>(null)
    const [inputProductsModalQuantity, setinputProductsModalQuantity] = useState<number | null>(null)
    const [isProductActiveModalAddProduct, setisProductActiveModalAddProduct] = useState(true)
    const [inputProductsModalName, setinputProductsModalName] = useState("")
    const { MessageBox } = useMessageBoxContext()
    const Theme = useDarkMode()
    const options = ['teste']
    const [dragOver, setDragOver] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const changeValueProduct = async (value: string) => {
        setinputvalueProduct(CurrencyMaskValue(value))
        const valueProduct = FormatCurrencytoFloatdb(value ?? '0')
        const costProduct = FormatCurrencytoFloatdb(inputCostProduct ?? '0')
        const profit = valueProduct - costProduct;
        const percentualProft = costProduct === 0 ? 0 : (profit / costProduct) * 100;
        setInputProfitMargin(percentualProft.toFixed(2) + '%')
    }

    const changeCostProduct = async (value: string) => {
        setInputCostProduct(CurrencyMaskValue(value))
        const valueProduct = FormatCurrencytoFloatdb(inputvalueProduct ?? '0')
        const costProduct = FormatCurrencytoFloatdb(value ?? '0')
        const profit = valueProduct - costProduct;
        const percentualProft = valueProduct === 0 ? 0 : (profit / costProduct) * 100;
        setInputProfitMargin(percentualProft.toFixed(2) + '%')
    }

    const changeProfitProduct = async (value: string) => {

        setInputProfitMargin(FormatPercent(value))
        const costProduct = FormatCurrencytoFloatdb(inputCostProduct ?? '0')
        if (costProduct <= 0) {
            MessageBox('info', 'Informe o custo do produto!')
            setInputProfitMargin(FormatPercent('0'))
            return
        }
        const profit = FormatCurrencytoFloatdb(FormatPercent(value) ?? '0')
        const newValueProduct = costProduct + (costProduct * (profit / 100))
        setinputvalueProduct(CurrencyMaskValue(newValueProduct + ""))
       
    }



    const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setDragOver(false);

        const file = event.dataTransfer.files[0];
        setSelectedImage(file);
        // Fazer chamada para API
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setSelectedImage(file);
        // Fazer chamada para API
    };

    const AddProductApi = async () => {

        if (inputProductsModalName !== ""
            && finaldataAddProductsToSendApi.value > 0
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
                props.setisModalSucessOpen(true)
            } catch (error: any) {
                MessageBox('error', error.message)
            }
        }
        else {
            MessageBox('info', 'Insira todos dados corretamente!')
        }
    }



    const finaldataAddProductsToSendApi = {
        userId: auth.idUser,
        name: inputProductsModalName,
        value: FormatCurrencytoFloatdb(inputvalueProduct),
        quantity: inputProductsModalQuantity,
        active: isProductActiveModalAddProduct
    }


    return (
        <>
            <S.DivModalAddProduct>
                {/*
                REMOVE COMMENT TO ENABLE PICTURE PRODUCT
                {selectedImage ?
                    <img width={100} style={{ maxHeight: 140 }} src={URL.createObjectURL(selectedImage)}></img> :
                    <S.labelChangeImg onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        dragOver={dragOver}>
                        <AiOutlineCloudUpload size='30' />
                        Selecione ou arraste uma imagem
                        <input type='file' onChange={handleFileChange} />
                    </S.labelChangeImg>
                } */}
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
                        value={inputCostProduct}
                        onChange={(e) => changeCostProduct(e.target.value)}
                        id="outlined-basic"
                        label="Custo"
                        variant="outlined"
                        sx={{ width: '29%' }} />
                    <TextField
                        value={inputProfitMargin}
                        onChange={(e) => changeProfitProduct(e.target.value)}
                        id="outlined-basic"
                        label="Margem de Lucro (%)"
                        variant="outlined"
                        sx={{ width: '38%' }} />
                    <TextField
                        value={inputvalueProduct}
                        onChange={(e) => changeValueProduct(e.target.value)}
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