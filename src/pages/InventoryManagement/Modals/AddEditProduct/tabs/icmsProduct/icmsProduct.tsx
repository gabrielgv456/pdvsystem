import * as S from './style'
import * as type from './interfaces'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useApi } from '../../../../../../hooks/useApi';
import { useMessageBoxContext } from '../../../../../../contexts/MessageBox/MessageBoxContext';

export const TabIcmsProduct = () => {
    useEffect(() => {
        async function searchOptions() {
            try {
                const response: type.searchOptions = await findIcmsOptions()
                if (!response.Success) { throw new Error(response.erro) }
                setOptions(response)
            } catch (error: any) {
                MessageBox('error', 'Falha ao buscar opções ICMS!' + (error.message ?? ''))
            }
        }
        searchOptions()
    }, [])
    const [options, setOptions] = useState<type.searchOptions | null>(null)
    const { findIcmsOptions } = useApi()
    const [inputProductsModalQuantity, setinputProductsModalQuantity] = useState<number | null>(null)
    const [inputvalueProduct, setinputvalueProduct] = useState<string | null>(null)
    const { MessageBox } = useMessageBoxContext()
    const [value, setValue] = useState<type.optionsType | null>(null)
    return (
        <S.Container>
            <S.SectionContainer>
                <Autocomplete
                    value={value}
                    onChange={(event: any, newValue: type.optionsType | null) => {
                        setValue(newValue);
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={options?.originOptions ?? []}
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
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
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
                    value={value}
                    onChange={(event: any, newValue: type.optionsType | null) => {
                        setValue(newValue);
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={options?.cstOptions ?? []}
                    sx={{ flex: '1 2 200px' }}
                    getOptionLabel={(option) => (option.description)}
                    size='small'
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="CST ICMS"
                        />
                    } />
                <Autocomplete
                    value={value}
                    onChange={(event: any, newValue: type.optionsType | null) => {
                        setValue(newValue);
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={options?.modalityOptions ?? []}
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
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    label="Red. BC ICMS(%)"
                    variant="outlined"
                    size='small'
                    sx={{ flex: '1 1 200px' }}
                />
                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    label="Alíquota ICMS(%)"
                    variant="outlined"
                    size='small'
                    sx={{ flex: '1 1 200px' }} />
                <Autocomplete
                    value={value}
                    onChange={(event: any, newValue: type.optionsType | null) => {
                        setValue(newValue);
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={options?.exemptionOptions ?? []}
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
                    value={value}
                    onChange={(event: any, newValue: type.optionsType | null) => {
                        setValue(newValue);
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    getOptionLabel={(option) => (option.id + ' - ' + option.description)}
                    options={options?.cfopStateOptions ?? []}
                    sx={{ flex: '1 1 170px' }}
                    size='small'
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="CFOP NFe"
                        />
                    } />
                <Autocomplete
                    value={value}
                    onChange={(event: any, newValue: type.optionsType | null) => {
                        setValue(newValue);
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={options?.cfopInterstateOptions ?? []}
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
                    value={value}
                    onChange={(event: any, newValue: type.optionsType | null) => {
                        setValue(newValue);
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={options?.originOptions ?? []}
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
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    label="Red. BC ICMS(%)"
                    variant="outlined"
                    size='small'
                    sx={{ flex: '1 1 160px ' }}
                />
                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
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
                    value={value}
                    onChange={(event: any, newValue: type.optionsType | null) => {
                        setValue(newValue);
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={options?.originOptions ?? []}
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
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    label="Alíquota ICMS(%)"
                    variant="outlined"
                    size='small'
                    sx={{ flex: '1 1 200px' }} />
                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    label="Red. BC ICMS(%)"
                    variant="outlined"
                    size='small'
                    sx={{ flex: '1 1 160px' }}
                />
                <Autocomplete
                    value={value}
                    onChange={(event: any, newValue: type.optionsType | null) => {
                        setValue(newValue);
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={options?.originOptions ?? []}
                    getOptionLabel={(option) => (option.description)}
                    sx={{ flex: '1 1 120px' }}
                    size='small'
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="CFOP NFCe"
                        />
                    } />
                <Autocomplete
                    value={value}
                    onChange={(event: any, newValue: type.optionsType | null) => {
                        setValue(newValue);
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    getOptionLabel={(option) => (option.description)}
                    options={options?.originOptions ?? []}
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