import * as S from './style'
import * as type from './interfaces'
import Switch from '@mui/material/Switch';
import { CurrencyMask, CurrencyMaskValue } from '../../../../../../masks/CurrencyMask';
import TextField from '@mui/material/TextField';
import { useState, DragEvent, ChangeEvent, useEffect, memo } from 'react';
import { useApi } from '../../../../../../hooks/useApi';
import Autocomplete from '@mui/material/Autocomplete';
import { AuthContext } from '../../../../../../contexts/Auth/AuthContext';
import { useMessageBoxContext } from '../../../../../../contexts/MessageBox/MessageBoxContext';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { FormatChangePercent, FormatCurrencytoFloatdb, FormatPercent, currencyFormat, currencyRemoveNotNumbers, percentFormatIntl, removeNotNumerics, strTofixed2Float } from '../../../../../../utils/utils';
import { addEditProductDataPrincipal } from '../../saveProduct/interfaces';
import { UploadImage } from '../../../../../../components/uploadImage/uploadImage';

export const TabInfoProduct = memo((props: type.tabInfoProductProps) => {

    const { findItemType, findNCM } = useApi()
    const [selectedUnitMeasurement, setSelectedUnitMeasurement] = useState<string | null>(props.itemData?.unitMeasurement ?? 'UN')
    const { MessageBox } = useMessageBoxContext()
    const [optionsItensType, setOptionsItensType] = useState<type.itemType[]>([])
    const [selectedItemType, setSelectedItemType] = useState<type.itemType | null>(null)
    const optionsUnitMeasurement = ['UN']
    const [ncmCode, setNcmCode] = useState<type.ncmType | null>(null)
    const [optionsNCM, setOptionsNCM] = useState<type.ncmType[]>([])

    function handleChangeData<T extends keyof addEditProductDataPrincipal>(
        property: T, value: addEditProductDataPrincipal[T]) {
        props.setDataAddEditProduct(prevState => {
            return {
                ...prevState,
                principal: {
                    ...prevState.principal,
                    [property]: value
                }
            }
        })
    }

    useEffect(() => {
        async function searchNCM() {
            try {
                const dataFindNCM = await findNCM()
                if (!dataFindNCM.Success) {
                    throw new Error('Falha ao obter lista NCM!' + dataFindNCM.erro)
                }
                setOptionsNCM(dataFindNCM.ncmList)
                setNcmCode(dataFindNCM.ncmList.find((item: type.ncmType) => item.Codigo === props.dataAddEditProduct.principal.ncmCode))
            }
            catch (error) {
                MessageBox('info', (error as Error).message)
            }
        }

        async function searchItemType() {
            try {
                const dataFindItemType = await findItemType()
                if (!dataFindItemType.Success) {
                    throw new Error('Falha ao obter lista de tipos de item!' + (dataFindItemType.erro ?? ''))
                }
                setOptionsItensType(dataFindItemType.findItemType)
                const defaultOptionItemType = dataFindItemType.findItemType.find((item: type.itemType) => item.id === props.itemData?.itemTypeId)
                if (defaultOptionItemType) {
                    setSelectedItemType(defaultOptionItemType)
                }
            }
            catch (error) {
                MessageBox('info', (error as Error).message)
            }
        }

        // async function searchCfop() {
        //     try {
        //         const dataFindCfop = await findCfop()
        //         if (!dataFindCfop.Success) {
        //             throw new Error('Falha ao obter lista de Cfop!' + (dataFindCfop.erro ?? ''))
        //         }
        //         setOptionsCfop(dataFindCfop.findCfop)
        //         setSelectedCfop(dataFindCfop.findCfop.find((item: type.cfopType) => item.id === props.dataAddEditProduct.principal.cfopId))
        //     }
        //     catch (error) {
        //         MessageBox('info', (error as Error).message)
        //     }
        // }

        searchItemType();
        // searchCfop();
        searchNCM();
    }, [])

    const changeValueProduct = async (value: string) => {
        const valueProduct = FormatCurrencytoFloatdb(value ?? '0')
        handleChangeData('value', valueProduct)

        const costProduct = FormatCurrencytoFloatdb(props.dataAddEditProduct.principal.cost?.toString() ?? '0')

        if (costProduct !== 0) {
            const profit = valueProduct - costProduct;
            const percentualProfit = (profit / costProduct) * 100;
            handleChangeData('profitMargin', parseFloat(percentualProfit.toFixed(2)))
        }
    }

    const changeCostProduct = async (value: string) => {

        handleChangeData('cost', FormatCurrencytoFloatdb(value))
        const valueProduct = props.dataAddEditProduct.principal.value ?? 0

        if (valueProduct !== 0) {
            const costProduct = FormatCurrencytoFloatdb(value)
            const profit = valueProduct - costProduct;
            const percentualProfit = (profit / costProduct) * 100;
            handleChangeData('profitMargin', parseFloat(percentualProfit.toFixed(2)))
        }
    }

    const changeProfitProduct = async (value: string) => {
        handleChangeData('profitMargin', strTofixed2Float(value))
        const costProduct = props.dataAddEditProduct.principal.cost ?? 0
        if (costProduct <= 0) {
            MessageBox('info', 'Informe o custo do produto!')
            handleChangeData('profitMargin', 0)
            return
        }
        const profit = parseFloat(value)
        const newValueProduct = parseFloat((costProduct + (costProduct * (profit / 100))) + "").toFixed(2)
        handleChangeData('value', Number(newValueProduct))
    }

    return (

        <S.DivModalAddProduct>
            <div style={{ width: '100%', gap: 20, alignItems: 'center', display: 'flex' }}>
                <UploadImage
                    maxSize={1}
                    url={props.dataAddEditProduct.principal.urlImage}
                    idImage={props.dataAddEditProduct.principal.imageId}
                    setIdImage={(newValue: number | null) => handleChangeData('imageId', newValue)}
                />
                <label>
                    Produto ativo
                    <Switch
                        checked={props.dataAddEditProduct.principal.active}
                        onChange={(e) => { handleChangeData('active', (e.target.checked)) }}
                    />
                </label>
            </div>

            <TextField
                value={props.dataAddEditProduct.principal.name}
                onChange={(e) => handleChangeData('name', e.target.value)}
                id="outlined-basic"
                label="Nome do Produto*"
                variant="outlined"
                className='InputSection'
                autoFocus
            />
            <TextField
                value={props.dataAddEditProduct.principal.codRef}
                onChange={(e) => handleChangeData('codRef', Number(removeNotNumerics(e.target.value)))}
                id="outlined-basic"
                label="Cód. Referência*"
                variant="outlined"
                className='InputSection'
            />
            <TextField
                value={currencyFormat(props.dataAddEditProduct.principal.cost)}
                onChange={(e) => changeCostProduct(e.target.value)}
                id="outlined-basic"
                label="Custo*"
                variant="outlined"
                className='InputSection' />
            <TextField
                value={props.dataAddEditProduct.principal.profitMargin}
                onChange={(e) => { changeProfitProduct(e.target.value) }}
                id="outlined-basic"
                label="M. Lucro (%)*"
                className='InputSection'
                type='number'
                InputLabelProps={{
                    shrink: !!props.dataAddEditProduct.principal.profitMargin
                }}
                variant="outlined" />
            <TextField
                value={currencyFormat(props.dataAddEditProduct.principal.value)}
                onChange={(e) => changeValueProduct(e.target.value)}
                id="outlined-basic"
                className='InputSection'
                InputLabelProps={{
                    shrink: !!props.dataAddEditProduct.principal.value
                }}
                label="Preço venda*"
                variant="outlined" />
            <TextField
                value={props.dataAddEditProduct.principal.quantity}
                onChange={(e) => handleChangeData('quantity', (Number(removeNotNumerics(e.target.value))))}
                id="outlined-basic"
                label="Estoque*"
                className='InputSection'
                variant="outlined" />
            <TextField
                value={props.dataAddEditProduct.principal.barCode}
                onChange={(e) => handleChangeData('barCode', removeNotNumerics(e.target.value))}
                id="outlined-basic"
                className='InputSection'
                label="Código de barras"
                variant="outlined" />
            <TextField
                value={props.dataAddEditProduct.principal.exTipi}
                onChange={(e) => handleChangeData('exTipi', (e.target.value))}
                id="outlined-basic"
                className='InputSection'
                label="Ex Tipi"
                variant="outlined" />
            <TextField
                value={props.dataAddEditProduct.principal.brand}
                onChange={(e) => handleChangeData('brand', (e.target.value))}
                id="outlined-basic"
                className='InputSection'
                label="Marca"
                variant="outlined" />
            <Autocomplete
                value={selectedUnitMeasurement}
                onChange={(event: any, newValue: string | null) => {
                    setSelectedUnitMeasurement(newValue);
                }}
                className='InputSection'
                noOptionsText="Não encontrado"
                id="controllable-states-demo"
                disabled
                options={optionsUnitMeasurement}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        label="Unidade de Medida"
                    />
                } />

            <Autocomplete
                value={selectedItemType}
                onChange={(event: any, newValue: type.itemType | null) => {
                    setSelectedItemType(newValue)
                    if (newValue) {
                        handleChangeData('itemTypeId', newValue.id)
                    }
                }}
                noOptionsText="Não encontrado"
                id="controllable-states-demo"
                options={optionsItensType}
                className='InputSection'
                getOptionLabel={(option) => (option.id + ' ' + option.description)}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        label="Tipo Item*"
                    />
                } />
            <Autocomplete
                value={ncmCode}
                onChange={(event: any, newValue: type.ncmType | null) => {
                    setNcmCode(newValue);
                    handleChangeData('ncmCode', newValue?.Codigo ?? null)
                }}
                noOptionsText="Não encontrado"
                id="controllable-states-demo"
                options={optionsNCM}
                className='InputSection'
                getOptionLabel={(option) => (option.Codigo + ' ' + option.Descricao)}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        label="Código NCM*"
                    />
                } />
            {/* <Autocomplete
                value={selectedItemType}
                onChange={(event: any, newValue: type.itemType | null) => {
                    setSelectedItemType(newValue);
                    if (newValue) {
                        handleChangeData('itemTypeId', newValue.id)
                    }
                }}
                noOptionsText="Não encontrado"
                id="controllable-states-demo"
                options={optionsItensType}
                className='InputSection'
                getOptionLabel={(option) => (option.id + ' ' + option.description)}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        label="CEST"
                    />
                } />
 */}


        </S.DivModalAddProduct >
    )
})