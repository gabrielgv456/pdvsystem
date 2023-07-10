import * as S from './style'
import Switch from '@mui/material/Switch';
import { CurrencyMask, CurrencyMaskValue } from '../../../../../../masks/CurrencyMask';
import { MdFileDownloadDone } from 'react-icons/md';
import TextField from '@mui/material/TextField';
import { useContext, useState, DragEvent, ChangeEvent, useEffect } from 'react';
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

interface ncmType {
    Codigo: string,
    Descricao: string
}
interface itemType{
    id:number,
    descricao:string
}
export const TabInfoProduct = (props: tabInfoProductProps) => {

    const { addProducts, findNCM , findItemType} = useApi()
    const auth = useContext(AuthContext)
    const [inputvalueProduct, setinputvalueProduct] = useState<string | null>(null)
    const [inputCostProduct, setInputCostProduct] = useState<string | null>(null)
    const [inputProfitMargin, setInputProfitMargin] = useState<string | null>(null)
    const [inputProductsModalQuantity, setinputProductsModalQuantity] = useState<number | null>(null)
    const [inputBarCode, setInputBarCode] = useState<string | null>(null)   
    const [selectedUnitMeasuremnt, setSelectedUnitMeasurement] = useState<string | null>('UN')
    const [isProductActiveModalAddProduct, setisProductActiveModalAddProduct] = useState(true)
    const [inputProductsModalName, setinputProductsModalName] = useState("")
    const { MessageBox } = useMessageBoxContext()
    const Theme = useDarkMode()
    const [selectedItemType, setSelectedItemType] = useState<itemType | null>(null)
    const [optionsItensType,setOptionsItensType] = useState<itemType[]>([]) 
    const optionsUnitMeasurement = ['UN']
    const [ncmCode, setNcmCode] = useState<ncmType | null>(null)
    const [optionsNCM, setOptionsNCM] = useState<ncmType[]>([])
    const [dragOver, setDragOver] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    useEffect(() => {
        async function searchNCM() {
            try {
                const dataFindNCM = await findNCM()
                if (!dataFindNCM.Success) {
                    throw new Error('Falha ao obter lista NCM!')
                }
                setOptionsNCM(dataFindNCM.ncmList)
            }
            catch (error: any) {
                MessageBox('info', error.message)
            }
        }

        async function searchItemType() {
            try {
                const dataFindItemType= await findItemType()
                if (!dataFindItemType.Success) {
                    throw new Error('Falha ao obter lista de tipos de item!')
                }
                setOptionsItensType(dataFindItemType.findItemType)
            }
            catch (error: any) {
                MessageBox('info', error.message)
            }
        }

        searchItemType();
        searchNCM();
    }, [])




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
        const newValueProduct = parseFloat((costProduct + (costProduct * (profit / 100))) + "").toFixed(2)
        setinputvalueProduct("R$" + newValueProduct.replace('.', ','))

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
        alert(finaldataAddProductsToSendApi.profitMargin)

        if (inputProductsModalName !== ""
            && finaldataAddProductsToSendApi.value > 0
            && finaldataAddProductsToSendApi.cost > 0
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
            MessageBox('info', 'Insira todos dados obrigatórios corretamente!')
        }
    }



    const finaldataAddProductsToSendApi = {
        userId: auth.idUser,
        name: inputProductsModalName,
        value: FormatCurrencytoFloatdb(inputvalueProduct),        
        quantity: inputProductsModalQuantity,
        active: isProductActiveModalAddProduct,

        cost: FormatCurrencytoFloatdb(inputCostProduct),
        profitMargin: FormatCurrencytoFloatdb(FormatPercent(inputProfitMargin) ?? '0'),
        barCode: inputBarCode,
        ncmCode: ncmCode?.Codigo,
        itemTypeId: selectedItemType?.id,
        unitMeasuremnt: selectedUnitMeasuremnt
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
                    label="Nome do Produto*"
                    variant="outlined"
                    autoFocus
                    sx={{ width: '100%' }} />
                <section style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <TextField
                        value={inputCostProduct}
                        onChange={(e) => changeCostProduct(e.target.value)}
                        id="outlined-basic"
                        label="Custo*"
                        variant="outlined"
                        sx={{ width: '32%' }} />
                    <TextField
                        value={inputProfitMargin}
                        onChange={(e) => changeProfitProduct(e.target.value)}
                        id="outlined-basic"
                        label="M. Lucro (%)*"
                        InputLabelProps={{
                            shrink: !!inputProfitMargin
                        }}
                        variant="outlined"
                        sx={{ width: '32%' }} />
                    <TextField
                        value={inputvalueProduct}
                        onChange={(e) => changeValueProduct(e.target.value)}
                        id="outlined-basic"
                        InputLabelProps={{
                            shrink: !!inputvalueProduct
                        }}
                        label="Preço venda*"
                        variant="outlined"
                        sx={{ width: '32%' }} />
                </section>
                <section style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>

                    <TextField
                        value={inputProductsModalQuantity}
                        onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                        type="number"
                        id="outlined-basic"
                        label="Estoque*"
                        variant="outlined"
                        sx={{ width: '22%' }} />
                    <TextField
                        value={inputBarCode}
                        onChange={(e) => setInputBarCode(e.target.value)}
                        type="number"
                        id="outlined-basic"
                        label="Código de barras"
                        variant="outlined"
                        sx={{ width: '34%' }} />
                    <Autocomplete
                        value={ncmCode}
                        onChange={(event: any, newValue: ncmType | null) => {
                            setNcmCode(newValue);
                        }}
                        noOptionsText="Não encontrado"
                        id="controllable-states-demo"
                        options={optionsNCM}
                        getOptionLabel={(option) => (option.Codigo + ' ' + option.Descricao)}
                        sx={{ width: '40%' }}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Código NCM"
                            />
                        } />
                </section>
                <section style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>

                    <Autocomplete
                        value={selectedItemType}
                        onChange={(event: any, newValue: itemType | null) => {
                            setSelectedItemType(newValue);
                        }}
                        noOptionsText="Não encontrado"
                        id="controllable-states-demo"
                        options={optionsItensType}
                        getOptionLabel={(option) => ( option.descricao)}
                        sx={{ width: '48%' }}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Tipo de item"
                            />
                        } />
                    <Autocomplete
                        value={selectedUnitMeasuremnt}
                        onChange={(event: any, newValue: string | null) => {
                            setSelectedUnitMeasurement(newValue);
                        }}
                        noOptionsText="Não encontrado"
                        id="controllable-states-demo"
                        disabled
                        options={optionsUnitMeasurement}
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