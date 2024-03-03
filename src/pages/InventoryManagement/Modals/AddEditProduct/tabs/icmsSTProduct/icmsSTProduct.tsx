import * as S from './style'
import * as type from './interfaces'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { TaxIcmsSTType, icmsProductProps, icmsType, optionsType, searchOptions } from '../icmsProduct/interfaces';
import { strTofixed2Float } from '../../../../../../utils/utils';

export const TabIcmsSTProduct = (props: icmsProductProps) => {

    const [selectedOption, setSelectedOption] = useState<type.selectedOptions | null>({
        cfopInterstateStOption: defaultOption('taxCfopInterstateIdSt'),
        cfopStateStOption: defaultOption('taxCfopStateIdSt'),
        cstIcmsStOption: defaultOption('taxCstIcmsStId'),
        modalityBCStOption: defaultOption('taxModalityBCIdSt')
    })

    function defaultOption<T extends keyof TaxIcmsSTType>(
        property: T
    ) {
        const taxDefaultValue = props.dataAddEditProduct.icms.TaxIcmsST[property]
        if (typeof (taxDefaultValue) !== 'number') return null
        return props.icmsOptions?.cfopInterstateOptions.find(
            item => item.id === taxDefaultValue)
            ?? null
    }

    function findOption<T extends keyof TaxIcmsSTType, S extends keyof searchOptions>(
        property: T,
        option: S
    ) : optionsType | null {
        if (!props.icmsOptions) return null
        const taxId = props.dataAddEditProduct.icms.TaxIcmsST[property]
        const array : optionsType[] =  props.icmsOptions[option]
        return array.find(
            item =>  item.id === taxId)
            ?? null
    }
    function handleChangeSelectedOption<T extends keyof type.selectedOptions>(property: T, value: type.selectedOptions[T]) {
        if (selectedOption) {
            setSelectedOption({ ...selectedOption, [property]: value })
        }
    }
    function handleChangeTax<T extends keyof TaxIcmsSTType>(
        property: T, value: TaxIcmsSTType[T]) {
        props.setDataAddEditProduct(prevState => {
            return {
                ...prevState,
                icms: {
                    ...prevState.icms,
                    TaxIcmsST: { [property]: value }
                }
            }
        })
    }

    return (
        <S.Container>
            <S.SectionContainer>
                <b style={{ display: 'flex', alignSelf: 'flex-start', width: '100%' }}>ICMS ST</b>
                <Autocomplete
                    value={findOption('taxCstIcmsStId','cstOptions')}
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
                    value={selectedOption?.cfopStateStOption}
                    onChange={(_event: any, newValue: optionsType | null) => {
                        handleChangeSelectedOption('cfopStateStOption', newValue);
                        handleChangeTax('taxCfopStateIdSt', newValue?.id)
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    getOptionLabel={(option) => (option.description)}
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
                    value={selectedOption?.cfopInterstateStOption}
                    onChange={(_event: any, newValue: optionsType | null) => {
                        handleChangeSelectedOption('cfopInterstateStOption', newValue);
                        handleChangeTax('taxCfopInterstateIdSt', newValue?.id)
                    }}
                    noOptionsText="Não encontrado"
                    getOptionLabel={(option) => (option.description)}
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
                    value={selectedOption?.modalityBCStOption}
                    onChange={(_event: any, newValue: optionsType | null) => {
                        handleChangeSelectedOption('modalityBCStOption', newValue);
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