import * as S from './style'
import * as type from './interfaces'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { removeNotNumerics, strTofixed2Float } from '../../../../../../utils/utils';

export const TabIcmsProduct = (props: type.icmsProductProps) => {

    const [selectedOption, setSelectedOption] = useState<type.selectedOptions | null>({
        cfopInterstateOption: defaultOption('TaxIcmsNfe', 'taxCfopInterstateId'),
        cfopNfceDevolutionOption: defaultOption('TaxIcmsNfce', 'taxCfopDevolutionId'),
        cfopNfceOption: defaultOption('TaxIcmsNfce', 'taxCfopId'),
        cfopStateOption: defaultOption('TaxIcmsNfe', 'taxCfopStateId'),
        cstNfceOption: defaultOption('TaxIcmsNfce', 'taxCstIcmsId'),
        cstNfeOption: defaultOption('TaxIcmsNfe', 'taxCstIcmsId'),
        cstNotPayerOption: defaultOption('TaxIcmsNoPayer', 'taxCstIcmsId'),
        exemptionOption: defaultOption('TaxIcmsNfe', 'taxReasonExemptionId'),
        modalityOption: defaultOption('TaxIcmsNfe', 'taxModalityBCId'),
        originOption: defaultOption('TaxIcms', 'taxIcmsOriginId')
    })

    function handleChangeSelectedOption<T extends keyof type.selectedOptions>(property: T, value: type.selectedOptions[T]) {
        if (selectedOption) {
            setSelectedOption({ ...selectedOption, [property]: value })
        }
    }
    function defaultOption<T extends keyof type.icmsType>(
        taxType: T,
        property: keyof type.icmsType[T]
    ) {
        const taxDefaultValue = props.dataAddEditProduct.icms[taxType][property]
        if (typeof (taxDefaultValue) !== 'number') return null
        return props.icmsOptions?.cfopInterstateOptions.find(
            item => item.id === taxDefaultValue)
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
            <S.SectionContainer>
                <Autocomplete
                    value={selectedOption?.originOption}
                    onChange={(event: any, newValue: type.optionsType | null) => {
                        handleChangeSelectedOption('originOption', newValue)
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
                    value={selectedOption?.cstNfeOption}
                    onChange={(_event: any, newValue: type.optionsType | null) => {
                        handleChangeSelectedOption('cstNfeOption', newValue)
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
                    value={selectedOption?.modalityOption}
                    onChange={(_event: any, newValue: type.optionsType | null) => {
                        handleChangeSelectedOption('modalityOption', newValue)
                        handleChangeTax('TaxIcmsNfe', 'taxModalityBCId', newValue?.id ?? null)
                    }}
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
                    onChange={(e) => handleChangeTax('TaxIcmsNfe', 'taxRedBCICMS', strTofixed2Float(e.target.value) )}
                    type="number"
                    id="outlined-basic"
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
                    label="Alíquota ICMS(%)"
                    variant="outlined"
                    size='small'
                    sx={{ flex: '1 1 200px' }} />
                <Autocomplete
                    value={selectedOption?.exemptionOption}
                    onChange={(_event: any, newValue: type.optionsType | null) => {
                        handleChangeSelectedOption('exemptionOption', newValue)
                        handleChangeTax('TaxIcmsNfe', 'taxReasonExemptionId', newValue?.id ?? null)
                    }}
                    noOptionsText="Não encontrado"
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
                    value={selectedOption?.cfopStateOption}
                    onChange={(_event: any, newValue: type.optionsType | null) => {
                        handleChangeSelectedOption('cfopStateOption', newValue)
                        handleChangeTax('TaxIcmsNfe', 'taxCfopStateId', newValue?.id ?? null)
                    }}
                    noOptionsText="Não encontrado"
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
                    value={selectedOption?.cfopInterstateOption}
                    onChange={(_event: any, newValue: type.optionsType | null) => {
                        handleChangeSelectedOption('cfopInterstateOption', newValue)
                        handleChangeTax('TaxIcmsNfe', 'taxCfopInterstateId', newValue?.id ?? null)
                    }}
                    noOptionsText="Não encontrado"
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
                    value={selectedOption?.cstNotPayerOption}
                    onChange={(_event: any, newValue: type.optionsType | null) => {
                        handleChangeSelectedOption('cstNotPayerOption', newValue)
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
                    label="Alíquota ICMS(%)"
                    variant="outlined"
                    size='small'
                    sx={{ flex: '1 1 160px ' }}
                />
            </S.SectionContainer>
            <S.SectionContainer>
                <b style={{ display: 'flex', alignSelf: 'flex-start', width: '100%' }}>ICMS Nota Fiscal do Consumidor Eletrônica</b>
                <Autocomplete
                    value={selectedOption?.cstNfceOption}
                    onChange={(_event: any, newValue: type.optionsType | null) => {
                        handleChangeSelectedOption('cstNfceOption', newValue)
                        handleChangeTax('TaxIcmsNfce', 'taxCstIcmsId', newValue?.id ?? null)
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={props.icmsOptions?.cstOptions ?? []}
                    getOptionLabel={(option) => (option.description)}
                    sx={{ flex: '1 4 170px' }}
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
                    id="outlined-basic"
                    label="Alíquota ICMS(%)"
                    variant="outlined"
                    size='small'
                    sx={{ flex: '1 1 200px' }} />
                <TextField
                    value={props.dataAddEditProduct.icms.TaxIcmsNfce.taxRedBCICMS}
                    onChange={(e) => handleChangeTax('TaxIcmsNfce', 'taxRedBCICMS', strTofixed2Float(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    label="Red. BC ICMS(%)"
                    variant="outlined"
                    size='small'
                    sx={{ flex: '1 1 160px' }}
                />
                <Autocomplete
                    value={selectedOption?.cfopNfceOption}
                    onChange={(_event: any, newValue: type.optionsType | null) => {
                        handleChangeSelectedOption('cfopNfceOption', newValue)
                        handleChangeTax('TaxIcmsNfce', 'taxCfopId', newValue?.id ?? null)
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={props.icmsOptions?.cfopNfceOptions ?? []}
                    getOptionLabel={(option) => (option.id + ' - ' + option.description)}
                    sx={{ flex: '1 1 120px' }}
                    size='small'
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="CFOP NFCe"
                        />
                    } />
                <Autocomplete
                    value={selectedOption?.cfopNfceDevolutionOption}
                    onChange={(_event: any, newValue: type.optionsType | null) => {
                        handleChangeSelectedOption('cfopNfceDevolutionOption', newValue)
                        handleChangeTax('TaxIcmsNfce', 'taxCfopDevolutionId', newValue?.id ?? null)
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    getOptionLabel={(option) => (option.id + ' - ' + option.description)}
                    options={props.icmsOptions?.cfopNfceDevolutionOptions ?? []}
                    sx={{ flex: '1 1 200px' }}
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