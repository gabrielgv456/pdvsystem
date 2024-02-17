import * as S from './style'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export const TabIcmsProduct = () => {
    const [inputProductsModalQuantity, setinputProductsModalQuantity] = useState<number | null>(null)
    const [inputvalueProduct, setinputvalueProduct] = useState<string | null>(null)
    const options = ['teste']

    return (
        <S.Container>
            <S.SectionContainer>
                <Autocomplete
                    value={inputvalueProduct}
                    onChange={(event: any, newValue: string | null) => {
                        setinputvalueProduct(newValue);
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={options}
                    sx={{flex: '1 1 120px'}}
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
                    value={inputvalueProduct}
                    onChange={(event: any, newValue: string | null) => {
                        setinputvalueProduct(newValue);
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={options}
                    sx={{ flex: '1 2 200px' }}
                    size='small'
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="CST ICMS"
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
                    value={inputvalueProduct}
                    onChange={(event: any, newValue: string | null) => {
                        setinputvalueProduct(newValue);
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={options}
                    sx={{ flex: '1 2 270px' }}
                    size='small'
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="Motivo Desoneração ICMS(%)"
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
                    sx={{ flex: '1 1 170px' }}
                    size='small'
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="CFOP NFe"
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
                    value={inputvalueProduct}
                    onChange={(event: any, newValue: string | null) => {
                        setinputvalueProduct(newValue);
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={options}
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
                    value={inputvalueProduct}
                    onChange={(event: any, newValue: string | null) => {
                        setinputvalueProduct(newValue);
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={options}
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
                    value={inputvalueProduct}
                    onChange={(event: any, newValue: string | null) => {
                        setinputvalueProduct(newValue);
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={options}
                    sx={{ flex: '1 1 120px'}}
                    size='small'
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="CFOP NFCe"
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
                    sx={{flex: '1 1 200px'}}
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