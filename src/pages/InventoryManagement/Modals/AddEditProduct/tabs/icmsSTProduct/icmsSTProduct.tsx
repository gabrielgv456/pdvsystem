import * as S from './style'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { TaxIcmsSTType, icmsProductProps, optionsType, searchOptions } from '../icmsProduct/interfaces';
import { strTofixed2Float } from '../../../../../../utils/utils';

export const TabIcmsSTProduct = (props: icmsProductProps) => {

    function findOption<T extends keyof TaxIcmsSTType, S extends keyof searchOptions>(
        property: T,
        option: S
    ): optionsType | null {
        if (!props.icmsOptions) return null
        const taxId = props.dataAddEditProduct.icms.TaxIcmsST[property]
        const array: optionsType[] = props.icmsOptions[option]
        return array.find(
            item => item.id === taxId)
            ?? null
    }

    function handleChangeTax<T extends keyof TaxIcmsSTType>(
        property: T, value: TaxIcmsSTType[T]) {
        props.setDataAddEditProduct(prevState => {
            return {
                ...prevState,
                icms: {
                    ...prevState.icms,
                    TaxIcmsST: {
                        ...prevState.icms.TaxIcmsST,
                        [property]: value
                    }
                }
            }
        })
    }

    return (
        <S.Container>
            <S.SectionContainer>
                <b style={{ display: 'flex', alignSelf: 'flex-start', width: '100%' }}>ICMS ST</b>
                <Autocomplete
                    value={findOption('taxCstIcmsStId', 'cstOptions')}
                    onChange={(_event: any, newValue: optionsType | null) => {
                        handleChangeTax('taxCstIcmsStId', newValue?.id)
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    getOptionLabel={(option) => (option.description)}
                    options={props.icmsOptions?.cstOptions ?? []}
                    sx={{ flex: '1 1 250px' }}
                    size='small'
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="CST ICMS ST"
                        />
                    } />
                <Autocomplete
                    value={findOption('taxCfopStateIdSt', 'cfopStateOptions')}
                    onChange={(_event: any, newValue: optionsType | null) => {
                        handleChangeTax('taxCfopStateIdSt', newValue?.id)
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    getOptionLabel={(option) => (option.id + ' - ' + option.description)}
                    options={props.icmsOptions?.cfopStateOptions ?? []}
                    sx={{ flex: '1 1 250px' }}
                    size='small'
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="CFOP ST"
                        />
                    } />
                <Autocomplete
                    value={findOption('taxCfopInterstateIdSt', 'cfopInterstateOptions')}
                    onChange={(_event: any, newValue: optionsType | null) => {
                        handleChangeTax('taxCfopInterstateIdSt', newValue?.id)
                    }}
                    noOptionsText="Não encontrado"
                    getOptionLabel={(option) => (option.id + ' - ' + option.description)}
                    id="controllable-states-demo"
                    options={props.icmsOptions?.cfopInterstateOptions ?? []}
                    sx={{ flex: '1 1 250px' }}
                    size='small'
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="CFOP ST Interestadual"
                        />
                    } />
                <Autocomplete
                    value={findOption('taxModalityBCIdSt', 'modalityOptions')}
                    onChange={(_event: any, newValue: optionsType | null) => {
                        handleChangeTax('taxModalityBCIdSt', newValue?.id)
                    }}
                    noOptionsText="Não encontrado"
                    getOptionLabel={(option) => (option.description)}
                    id="controllable-states-demo"
                    options={props.icmsOptions?.modalityOptions ?? []}
                    sx={{ flex: '1 2 250px' }}
                    size='small'
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="Modalidade BC ICMS ST "
                        />
                    } />
                <TextField
                    value={props.dataAddEditProduct.icms.TaxIcmsST.taxMvaPauta}
                    onChange={(e) => handleChangeTax('taxMvaPauta', strTofixed2Float(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    label="MVA (%) / Pauta"
                    variant="outlined"
                    size='small'
                    sx={{ flex: '1 1 250px' }} />
                <TextField
                    value={props.dataAddEditProduct.icms.TaxIcmsST.taxRedBCICMSSt}
                    onChange={(e) => handleChangeTax('taxRedBCICMSSt', strTofixed2Float(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    label="Redução BC ICMS ST (%)"
                    variant="outlined"
                    size='small'
                    sx={{ flex: '1 1 250px' }}
                />
                <TextField
                    value={props.dataAddEditProduct.icms.TaxIcmsST.taxAliquotIcmsInner}
                    onChange={(e) => handleChangeTax('taxAliquotIcmsInner', strTofixed2Float(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    label="Alíquota ICMS Interna (%)"
                    variant="outlined"
                    size='small'
                    sx={{ flex: '1 1 250px' }}
                />
                <TextField
                    value={props.dataAddEditProduct.icms.TaxIcmsST.taxRedBCICMSInner}
                    onChange={(e) => handleChangeTax('taxRedBCICMSInner', strTofixed2Float(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    label="Redução BC ICMS Interna (%)"
                    variant="outlined"
                    size='small'
                    sx={{ flex: '1 1 250px' }}
                />
            </S.SectionContainer>
        </S.Container>


    )
}