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
import { ListProductsProps } from '../../../../ListProducts/ListProducts';


interface tabInfoProductProps {
    setisModalSucessOpen: (value: boolean) => void;
    setisModalAddEditProductOpen: (value: boolean) => void,
    type: 'Add' | 'Edit',
    itemData?: ListProductsProps;
}

interface ncmType {
    Codigo: string,
    Descricao: string
}
interface itemType {
    id: number,
    descricao: string
}
interface cfopType {
    id: number,
    descricao: string
}
export const TabInfoProduct = (props: tabInfoProductProps) => {

    const { addProducts, findNCM, findItemType, findCfop, editProducts } = useApi()
    const auth = useContext(AuthContext)
    const [inputvalueProduct, setinputvalueProduct] = useState<string | null>(CurrencyMaskValue(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.itemData?.value ?? 0)))
    const [inputCostProduct, setInputCostProduct] = useState<string | null>(CurrencyMaskValue(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.itemData?.cost ?? 0)))
    const [inputProfitMargin, setInputProfitMargin] = useState<string | null>((props.itemData?.profitMargin) !== (undefined || null) ? ((props.itemData?.profitMargin) + "%") : null)
    const [inputProductsModalQuantity, setinputProductsModalQuantity] = useState<number | null>(props.itemData?.quantity ?? null)
    const [inputBarCode, setInputBarCode] = useState<string | null>(props.itemData?.barCode ?? null)
    const [selectedUnitMeasurement, setSelectedUnitMeasurement] = useState<string | null>(props.itemData?.unitMeasurement ?? 'UN')
    const [isProductActiveModalAddProduct, setisProductActiveModalAddProduct] = useState<boolean>(props.itemData?.active ?? true)
    const [inputProductsModalName, setinputProductsModalName] = useState<string | null>(props.itemData?.name ?? null)
    const { MessageBox } = useMessageBoxContext()
    const Theme = useDarkMode()
    const [optionsItensType, setOptionsItensType] = useState<itemType[]>([])
    const [selectedItemType, setSelectedItemType] = useState<itemType | null>(null)
    const [optionsCfop, setOptionsCfop] = useState<itemType[]>([])
    const [selectedCfop, setSelectedCfop] = useState<itemType | null>(null)
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
                setNcmCode(dataFindNCM.ncmList.find((item: ncmType) => item.Codigo === props.itemData?.ncmCode))
            }
            catch (error: any) {
                MessageBox('info', error.message)
            }
        }

        async function searchItemType() {
            try {
                const dataFindItemType = await findItemType()
                if (!dataFindItemType.Success) {
                    throw new Error('Falha ao obter lista de tipos de item!')
                }
                setOptionsItensType(dataFindItemType.findItemType)
            }
            catch (error: any) {
                MessageBox('info', error.message)
            }
        }

        async function searchCfop() {
            try {
                const dataFindCfop = await findCfop()
                if (!dataFindCfop.Success) {
                    throw new Error('Falha ao obter lista de tipos de item!')
                }
                setOptionsCfop(dataFindCfop.findCfop)
                setSelectedCfop(dataFindCfop.findCfop.find((item: cfopType) => item.id === props.itemData?.cfopId))
            }
            catch (error: any) {
                MessageBox('info', error.message)
            }
        }

        //searchItemType();
        searchCfop();
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

    function validateFields() {
        if (!(inputProductsModalName !== ""
            && finaldataAddProductsToSendApi.value > 0
            && finaldataAddProductsToSendApi.cost > 0
            && finaldataAddProductsToSendApi.profitMargin 
            && (finaldataAddProductsToSendApi.quantity ?? 0) > 0
        )) {
            throw new Error('Informe todos os campos obrigatórios!')
        }
    }

    const AddProductApi = async () => {
        try {
            validateFields()
            delete finaldataAddProductsToSendApi.id
            const data = await addProducts(finaldataAddProductsToSendApi)
            if (!data.Sucess) {
                throw new Error('Falha ao adicionar produto! ' + data.erro)
            }
            props.setisModalAddEditProductOpen(false)
            setinputProductsModalName("")
            setinputProductsModalQuantity(null)
            setinputvalueProduct(null)
            props.setisModalSucessOpen(true)
        } catch (error: any) {
            MessageBox('error', error.message)
        }
    }

    const EditProductApi = async () => {
        try {
            validateFields()
            const data = await editProducts(finaldataAddProductsToSendApi)
            if (!data.Sucess) {
                throw new Error('Falha ao editar produto! ' + data.erro)
            }
            props.setisModalAddEditProductOpen(false)
            props.setisModalSucessOpen(true)
        }
        catch (error: any) {
            MessageBox('error', error.message)
        }
    }

    const finaldataAddProductsToSendApi = {
        id: props.itemData?.id ,
        userId: auth.idUser,
        name: inputProductsModalName,
        value: FormatCurrencytoFloatdb(inputvalueProduct),
        quantity: inputProductsModalQuantity,
        active: isProductActiveModalAddProduct,
        cost: FormatCurrencytoFloatdb(inputCostProduct),
        profitMargin: FormatCurrencytoFloatdb(FormatPercent(inputProfitMargin) ?? '0'),
        barCode: inputBarCode,
        ncmCode: ncmCode?.Codigo ?? null,
        //itemTypeId: selectedItemType?.id,
        cfopId: selectedCfop?.id ?? null,
        unitMeasurement: 'UN'//selectedUnitMeasurement
    }


    return (
        <>
            <S.DivModalAddProduct>
                {/* REMOVE COMMENT TO ENABLE PICTURE PRODUCT */}
                {/* {selectedImage ?
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
                        value={selectedCfop}
                        onChange={(event: any, newValue: cfopType | null) => {
                            setSelectedCfop(newValue);
                        }}
                        noOptionsText="Não encontrado"
                        id="controllable-states-demo"
                        options={optionsCfop}
                        getOptionLabel={(option) => (option.id + ' - ' + option.descricao)}
                        sx={{ width: '48%' }}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="CFOP"
                            />
                        } />
                    <Autocomplete
                        value={selectedUnitMeasurement}
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
            <S.ButtonAddProductModal onClick={props.type === 'Add' ? AddProductApi : EditProductApi} isDarkMode={Theme.DarkMode} style={{ margin: '0 auto' }}>
                <MdFileDownloadDone size="22" />
                {props.type === 'Add' ?
                    <b>ADICIONAR PRODUTO</b>
                    :
                    <b>EDITAR PRODUTO</b>
                }
            </S.ButtonAddProductModal>
        </>
    )
}