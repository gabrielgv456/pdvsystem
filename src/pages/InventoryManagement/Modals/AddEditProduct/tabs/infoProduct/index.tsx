import * as S from './style'
import * as type from './interfaces'
import Switch from '@mui/material/Switch';
import { removeCurrencyMaskNew, formatCurrencyNew } from '../../../../../../masks/CurrencyMask';
import TextField from '@mui/material/TextField';
import { useState, useEffect, memo, useContext } from 'react';
import { useApi } from '../../../../../../hooks/useApi';
import Autocomplete from '@mui/material/Autocomplete';
import { useMessageBoxContext } from '../../../../../../contexts/MessageBox/MessageBoxContext';
import { removeNotNumerics, strTofixed2Float } from '../../../../../../utils/utils';
import { UploadImage } from '../../../../../../components/uploadImage/uploadImage';
import { AuthContext } from 'src/contexts/Auth/AuthContext';
import { sharedAddEditProductRequest } from '@shared/api/inventoryManagement/productsRequest';
import { optionsType } from '../icmsProduct/interfaces';
import { taxGroupsOptions } from '@shared/api/inventoryManagement/findTaxOptions';

export const TabInfoProduct = memo((props: type.tabInfoProductProps) => {

    const { findItemType, findNCM, getTaxGroupsById } = useApi()
    const [selectedUnitMeasurement, setSelectedUnitMeasurement] = useState<string | null>(props.itemData?.unitMeasurement ?? 'UN')
    const { MessageBox } = useMessageBoxContext()
    const { idUser } = useContext(AuthContext)
    const [optionsItensType, setOptionsItensType] = useState<type.itemType[]>([])
    const [selectedItemType, setSelectedItemType] = useState<type.itemType | null>(null)
    const optionsUnitMeasurement = ['UN']
    const [ncmCode, setNcmCode] = useState<type.ncmType | null>(null)
    const [optionsNCM, setOptionsNCM] = useState<type.ncmType[]>([])

    function handleChangeData<T extends keyof sharedAddEditProductRequest['principal']>(
        property: T, value: sharedAddEditProductRequest['principal'][T]) {
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

    function findTaxGroupOption(): taxGroupsOptions | null {
        if (!props.taxGroupOptions || !props.itemData) return null
        const taxId = props.dataAddEditProduct.principal.taxGroupId
        const array: taxGroupsOptions[] = props.taxGroupOptions
        return array.find(
            item => item.id === taxId)
            ?? null
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
        const newValue = removeCurrencyMaskNew(value)

        handleChangeData('value', newValue)

        const costProduct = props.dataAddEditProduct.principal.cost ?? 0

        if (costProduct !== 0) {
            const profit = newValue - costProduct;
            const percentualProfit = (profit / costProduct) * 100;
            handleChangeData('profitMargin', parseFloat(percentualProfit.toFixed(2)))
        }
    }

    const changeCostProduct = async (value: string) => {
        const newCost = removeCurrencyMaskNew(value)

        handleChangeData('cost', newCost)
        const valueProduct = props.dataAddEditProduct.principal.value ?? 0

        if (valueProduct !== 0) {
            const profit = valueProduct - newCost;
            const percentualProfit = (profit / newCost) * 100;
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

    async function handleChangeTaxGroup(newValue: taxGroupsOptions | null) {
        try {
            if (newValue?.id) {
                const response = await getTaxGroupsById(idUser, newValue.id)
                if (!response.Success) throw new Error(response.erro)
                props.setDataAddEditProduct({
                    ...props.dataAddEditProduct,
                    cofins: response.taxGroup.taxCofins,
                    ipi: response.taxGroup.taxIpi,
                    pis: response.taxGroup.taxPis,
                    icms: {
                        ...props.dataAddEditProduct.icms,
                        TaxIcmsNfce: response.taxGroup.taxIcms.taxIcmsNfce,
                        TaxIcmsNfe: response.taxGroup.taxIcms.taxIcmsNfe,
                        TaxIcmsNoPayer: response.taxGroup.taxIcms.taxIcmsNoPayer,
                        TaxIcmsST: response.taxGroup.taxIcms.taxIcmsSt
                    }
                })
            }
            handleChangeData('taxGroupId', newValue?.id ?? null)
        } catch (error) {
            MessageBox('error', 'Ocorreu uma falha ao buscar o grupo de tributação! ' + (error as Error).message)
        }
    }


    return (

        <S.DivModalAddProduct>
            <div style={{ width: '100%', gap: 20, alignItems: 'center', display: 'flex', flexWrap: 'wrap' }}>
                <UploadImage
                    type='image'
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
                value={formatCurrencyNew(props.dataAddEditProduct.principal.cost)}
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
                value={formatCurrencyNew(props.dataAddEditProduct.principal.value)}
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
                sx={{ flex: '1 1 300px' }}
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
                sx={{ flex: '1 1 300px' }}
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

            <Autocomplete
                value={findTaxGroupOption()}
                onChange={(event: any, newValue: taxGroupsOptions | null) => {
                    handleChangeTaxGroup(newValue)
                }}
                noOptionsText="Não encontrado"
                id="controllable-states-demo"
                options={props.taxGroupOptions}
                sx={{ flex: '1 1 600px' }}
                getOptionLabel={(option) => (option.code + ' - ' + option.description)}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        label="Grupo de tributação"
                    />
                } />
        </S.DivModalAddProduct >
    )
})