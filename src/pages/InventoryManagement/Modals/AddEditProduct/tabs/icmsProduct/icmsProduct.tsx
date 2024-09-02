import * as S from './style'
import * as type from './interfaces'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { removeNotNumerics, strTofixed2Float } from '../../../../../../utils/utils';

export const TabIcmsProduct = (props: type.icmsProductProps) => {

    function findOption<T extends keyof type.icmsType, S extends keyof type.searchOptions>(
        taxType: T,
        property: keyof type.icmsType[T],
        option: S
    ): type.optionsType | null {
        if (!props.icmsOptions) return null
        const taxId = props.dataAddEditProduct.icms[taxType][property]
        if (typeof (taxId) !== 'number') return null
        const array: type.optionsType[] = props.icmsOptions[option]
        return array.find(
            item => item.id === taxId)
            ?? null
    }
    function handleChangeTax<T extends keyof type.icmsType>(
        taxType: T,
        property: keyof type.icmsType[T],
        value: type.icmsType[T][keyof type.icmsType[T]]
    ) {
        props.setDataAddEditProduct(prevState => {
            return {
                ...prevState, icms: {
                    ...prevState.icms, [taxType]: {
                        ...prevState.icms[taxType],
                        [property]: value
                    }
                }
            };
        });
    }

    return (
        <S.Container>
            <S.SectionContainer style={{ marginTop: 0 }}>
                <Autocomplete
                    value={findOption('TaxIcms', 'taxIcmsOriginId', 'originOptions')}
                    onChange={(event: any, newValue: type.optionsType | null) => {
                        handleChangeTax('TaxIcms', 'taxIcmsOriginId', newValue?.id ?? null)
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={props.icmsOptions?.originOptions ?? []}
                    getOptionLabel={(option) => (option.description)}
                    sx={{ flex: '1 1 120px' }}
                    size='small'
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="Origem*"
                        />
                    } />
                <TextField
                    value={props.dataAddEditProduct.icms.TaxIcms.fcpAliquot}
                    onChange={(e) => {
                        handleChangeTax('TaxIcms', 'fcpAliquot', strTofixed2Float(e.target.value))
                    }}
                    type="number"
                    id="outlined-basic"
                    label="Alíquota FCP(%)"
                    variant="outlined"
                    size='small'
                    sx={{ flex: '1 1 200px' }} />
            </S.SectionContainer>

            <S.SectionContainer>
                <b style={{ display: 'flex', alignSelf: 'flex-start', width: '100%' }}>ICMS Nota Fiscal Eletrônica</b>
                <Autocomplete
                    value={findOption('TaxIcmsNfe', 'taxCstIcmsId', 'cstOptions')}
                    onChange={(_event: any, newValue: type.optionsType | null) => {
                        handleChangeTax('TaxIcmsNfe', 'taxCstIcmsId', newValue?.id ?? null)
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={props.icmsOptions?.cstOptions ?? []}
                    sx={{ flex: '1 2 200px' }}
                    getOptionLabel={(option) => (option.description)}
                    size='small'
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="CST ICMS*"
                        />
                    } />
                <Autocomplete
                    value={findOption('TaxIcmsNfe', 'taxModalityBCId', 'modalityOptions')}
                    onChange={(_event: any, newValue: type.optionsType | null) => {
                        handleChangeTax('TaxIcmsNfe', 'taxModalityBCId', newValue?.id ?? null)
                    }}
                    disabled={!findOption('TaxIcmsNfe', 'taxCstIcmsId', 'cstOptions')}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={props.icmsOptions?.modalityOptions ?? []}
                    getOptionLabel={(option) => (option.description)}
                    sx={{ flex: '1 2 200px' }}
                    size='small'
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="Modalidade BC ICMS"
                        />
                    } />
                <TextField
                    value={props.dataAddEditProduct.icms.TaxIcmsNfe.taxRedBCICMS}
                    onChange={(e) => handleChangeTax('TaxIcmsNfe', 'taxRedBCICMS', strTofixed2Float(e.target.value))}
                    type="number"
                    disabled={!findOption('TaxIcmsNfe', 'taxCstIcmsId', 'cstOptions')}
                    id="outlined-basic"
                    title='Percentual de redução da base de calculo ICMS'
                    label="Red. BC ICMS(%)"
                    variant="outlined"
                    size='small'
                    sx={{ flex: '1 1 200px' }}
                />
                <TextField
                    value={props.dataAddEditProduct.icms.TaxIcmsNfe.taxAliquotIcms}
                    onChange={(e) => handleChangeTax('TaxIcmsNfe', 'taxAliquotIcms', strTofixed2Float(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    disabled={!findOption('TaxIcmsNfe', 'taxCstIcmsId', 'cstOptions')}
                    label="Alíquota ICMS(%)"
                    variant="outlined"
                    size='small'
                    sx={{ flex: '1 1 200px' }} />
                <Autocomplete
                    value={findOption('TaxIcmsNfe', 'taxReasonExemptionId', 'exemptionOptions')}
                    onChange={(_event: any, newValue: type.optionsType | null) => {
                        handleChangeTax('TaxIcmsNfe', 'taxReasonExemptionId', newValue?.id ?? null)
                    }}
                    noOptionsText="Não encontrado"
                    disabled={!findOption('TaxIcmsNfe', 'taxCstIcmsId', 'cstOptions')}
                    id="controllable-states-demo"
                    options={props.icmsOptions?.exemptionOptions ?? []}
                    sx={{ flex: '1 2 270px' }}
                    getOptionLabel={(option) => (option.description)}
                    size='small'
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="Motivo Desoneração ICMS"
                        />
                    } />
                <Autocomplete
                    value={findOption('TaxIcmsNfe', 'taxCfopStateId', 'cfopStateOptions')}
                    onChange={(_event: any, newValue: type.optionsType | null) => {
                        handleChangeTax('TaxIcmsNfe', 'taxCfopStateId', newValue?.id ?? null)
                    }}
                    noOptionsText="Não encontrado"
                    disabled={!findOption('TaxIcmsNfe', 'taxCstIcmsId', 'cstOptions')}
                    id="controllable-states-demo"
                    getOptionLabel={(option) => (option.id + ' - ' + option.description)}
                    options={props.icmsOptions?.cfopStateOptions ?? []}
                    sx={{ flex: '1 1 170px' }}
                    size='small'
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="CFOP NFe"
                        />
                    } />
                <Autocomplete
                    value={findOption('TaxIcmsNfe', 'taxCfopInterstateId', 'cfopInterstateOptions')}
                    onChange={(_event: any, newValue: type.optionsType | null) => {
                        handleChangeTax('TaxIcmsNfe', 'taxCfopInterstateId', newValue?.id ?? null)
                    }}
                    noOptionsText="Não encontrado"
                    disabled={!findOption('TaxIcmsNfe', 'taxCstIcmsId', 'cstOptions')}
                    id="controllable-states-demo"
                    options={props.icmsOptions?.cfopInterstateOptions ?? []}
                    getOptionLabel={(option) => (option.id + ' - ' + option.description)}
                    sx={{ flex: '1 1 200px' }}
                    size='small'
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="CFOP Interestadual"
                        />
                    } />

            </S.SectionContainer>
            <S.SectionContainer>
                <b style={{ display: 'flex', alignSelf: 'flex-start', width: '100%' }}>ICMS Não Contribuinte</b>
                <Autocomplete
                    value={findOption('TaxIcmsNoPayer', 'taxCstIcmsId', 'cstOptions')}
                    onChange={(_event: any, newValue: type.optionsType | null) => {
                        handleChangeTax('TaxIcmsNoPayer', 'taxCstIcmsId', newValue?.id ?? null)
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={props.icmsOptions?.cstOptions ?? []}
                    getOptionLabel={(option) => (option.description)}
                    sx={{ flex: '1 4 250px' }}
                    size='small'
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="CST ICMS Não Contribuinte"
                        />
                    } />
                <TextField
                    value={props.dataAddEditProduct.icms.TaxIcmsNoPayer.taxRedBCICMS}
                    onChange={(e) => handleChangeTax('TaxIcmsNoPayer', 'taxRedBCICMS', strTofixed2Float(e.target.value))}
                    type="number"
                    disabled={!findOption('TaxIcmsNoPayer', 'taxCstIcmsId', 'cstOptions')}
                    id="outlined-basic"
                    label="Red. BC ICMS(%)"
                    variant="outlined"
                    size='small'
                    sx={{ flex: '1 1 160px ' }}
                />
                <TextField
                    value={props.dataAddEditProduct.icms.TaxIcmsNoPayer.taxAliquotIcms}
                    onChange={(e) => handleChangeTax('TaxIcmsNoPayer', 'taxAliquotIcms', strTofixed2Float(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    disabled={!findOption('TaxIcmsNoPayer', 'taxCstIcmsId', 'cstOptions')}
                    label="Alíquota ICMS(%)"
                    variant="outlined"
                    size='small'
                    sx={{ flex: '1 1 160px ' }}
                />
            </S.SectionContainer>
            <S.SectionContainer>
                <b style={{ display: 'flex', alignSelf: 'flex-start', width: '100%' }}>ICMS Nota Fiscal do Consumidor Eletrônica</b>
                <Autocomplete
                    value={findOption('TaxIcmsNfce', 'taxCstIcmsId', 'cstOptions')}
                    onChange={(_event: any, newValue: type.optionsType | null) => {
                        handleChangeTax('TaxIcmsNfce', 'taxCstIcmsId', newValue?.id ?? null)
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={props.icmsOptions?.cstOptions ?? []}
                    getOptionLabel={(option) => (option.description)}
                    sx={{ flex: '1 4 220px' }}
                    size='small'
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="CST ICMS NFCE*"
                        />
                    } />
                <TextField
                    value={props.dataAddEditProduct.icms.TaxIcmsNfce.taxAliquotIcms}
                    onChange={(e) => handleChangeTax('TaxIcmsNfce', 'taxAliquotIcms', strTofixed2Float(e.target.value))}
                    type="number"
                    disabled={!findOption('TaxIcmsNfce', 'taxCstIcmsId', 'cstOptions')}
                    id="outlined-basic"
                    label="Alíquota ICMS(%)"
                    variant="outlined"
                    size='small'
                    sx={{ flex: '1 1 75px' }} />
                <TextField
                    value={props.dataAddEditProduct.icms.TaxIcmsNfce.taxRedBCICMS}
                    onChange={(e) => handleChangeTax('TaxIcmsNfce', 'taxRedBCICMS', strTofixed2Float(e.target.value))}
                    type="number"
                    disabled={!findOption('TaxIcmsNfce', 'taxCstIcmsId', 'cstOptions')}
                    id="outlined-basic"
                    label="Red. BC ICMS(%)"
                    variant="outlined"
                    size='small'
                    sx={{ flex: '1 1 70px' }}
                />
                <Autocomplete
                    value={findOption('TaxIcmsNfce', 'taxCfopId', 'cfopNfceOptions')}
                    onChange={(_event: any, newValue: type.optionsType | null) => {
                        handleChangeTax('TaxIcmsNfce', 'taxCfopId', newValue?.id ?? null)
                    }}
                    noOptionsText="Não encontrado"
                    disabled={!findOption('TaxIcmsNfce', 'taxCstIcmsId', 'cstOptions')}
                    id="controllable-states-demo"
                    options={props.icmsOptions?.cfopNfceOptions ?? []}
                    getOptionLabel={(option) => (option.id + ' - ' + option.description)}
                    sx={{ flex: '1 1 140px' }}
                    size='small'
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="CFOP NFCe"
                        />
                    } />
                <Autocomplete
                    value={findOption('TaxIcmsNfce', 'taxCfopDevolutionId', 'cfopNfceDevolutionOptions')}
                    onChange={(_event: any, newValue: type.optionsType | null) => {
                        handleChangeTax('TaxIcmsNfce', 'taxCfopDevolutionId', newValue?.id ?? null)
                    }}
                    noOptionsText="Não encontrado"
                    disabled={!findOption('TaxIcmsNfce', 'taxCstIcmsId', 'cstOptions')}
                    id="controllable-states-demo"
                    getOptionLabel={(option) => (option.id + ' - ' + option.description)}
                    options={props.icmsOptions?.cfopNfceDevolutionOptions ?? []}
                    sx={{ flex: '1 1 130px' }}
                    size='small'
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="CFOP NFCe Devolução"
                        />
                    } />

            </S.SectionContainer>

        </S.Container>


    )
}