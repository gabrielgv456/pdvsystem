import * as S from './style'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export const TabIcmsSTProduct = () => {
    const [inputProductsModalQuantity, setinputProductsModalQuantity] = useState<number | null>(null)
    const [inputvalueProduct, setinputvalueProduct] = useState<string | null>(null)
    const options = ['teste']

    return (
        <S.Container>
            <S.SectionContainer>
                <b style={{ display: 'flex', alignSelf: 'flex-start', width: '100%' }}>ICMS ST</b>
                <Autocomplete
                    value={inputvalueProduct}
                    onChange={(event: any, newValue: string | null) => {
                        setinputvalueProduct(newValue);
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={options}
                    sx={{ flex: '1 1 250px' }}
                    size='small'
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="CST ICMS ST"
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
                    sx={{ flex: '1 1 250px' }}
                    size='small'
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="CFOP ST"
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
                    sx={{ flex: '1 1 250px' }}
                    size='small'
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="CFOP ST Interestadual"
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
                    sx={{ flex: '1 2 250px' }}
                    size='small'
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="Modalidade BC ICMS ST "
                        />
                    } />
                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    label="MVA (%) / Pauta"
                    variant="outlined"
                    size='small'
                    sx={{ flex: '1 1 250px' }} />
                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    label="Redução BC ICMS ST (%)"
                    variant="outlined"
                    size='small'
                    sx={{ flex: '1 1 250px' }}
                />
                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    label="Alíquota ICMS Interna (%)"
                    variant="outlined"
                    size='small'
                    sx={{ flex: '1 1 250px' }}
                />
                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
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