import * as S from './style'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export const TabIpiPisCofinsProduct = () => {
    const [inputProductsModalQuantity, setinputProductsModalQuantity] = useState<number | null>(null)
    const [inputvalueProduct, setinputvalueProduct] = useState<string | null>(null)
    const options = ['teste']

    return (
        <S.Container>
            <S.SectionContainer>
                <b style={{ display: 'flex', alignSelf: 'flex-start', flex: '1 1 100%' }}>IPI</b>
                <Autocomplete
                    value={inputvalueProduct}
                    onChange={(event: any, newValue: string | null) => {
                        setinputvalueProduct(newValue);
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={options}
                    size='small'
                    sx={{ flex: '1 1 200px' }}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="CST IPI Saída"
                        />
                    } />
                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    label="Alíquota IPI(%)"
                    size='small'
                    variant="outlined"
                    sx={{ flex: '1 1 150px' }} />
                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    size='small'
                    id="outlined-basic"
                    label="Classe Enquadramento IPI"
                    variant="outlined"
                    sx={{ flex: '1 1 250px' }}
                />
                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    size='small'
                    label="Selo IPI"
                    variant="outlined"
                    sx={{ flex: '1 1 120px' }}
                />
                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    size='small'
                    id="outlined-basic"
                    label="Qtde de Selo Controle"
                    variant="outlined"
                    sx={{ flex: '1 1 190px' }}
                />
                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    size='small'
                    id="outlined-basic"
                    label="Cód. Enquadramento Legal"
                    variant="outlined"
                    sx={{ flex: '1 1 240px' }}
                />
                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    size='small'
                    id="outlined-basic"
                    label="CNPJ Produtor Mercadoria"
                    variant="outlined"
                    sx={{ flex: '1 1 240px' }}
                />
                <Autocomplete
                    value={inputvalueProduct}
                    onChange={(event: any, newValue: string | null) => {
                        setinputvalueProduct(newValue);
                    }}
                    size='small'
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={options}
                    sx={{ flex: '1 1 200px' }}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="CST IPI Entrada"
                        />
                    } />

            </S.SectionContainer>

            <S.SectionContainer>

                <b style={{ display: 'flex', alignSelf: 'flex-start', flex: '1 1 100%' }}>PIS</b>
                <Autocomplete
                    value={inputvalueProduct}
                    onChange={(event: any, newValue: string | null) => {
                        setinputvalueProduct(newValue);
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={options}
                    size='small'
                    sx={{ flex: '1 1 180px' }}

                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="CST PIS Saída*"
                        />
                    } />
                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    size='small'
                    label="Alíquota PIS Saída(%)"
                    variant="outlined"
                    sx={{ flex: '1 1 180px' }} />
                <Autocomplete
                    value={inputvalueProduct}
                    onChange={(event: any, newValue: string | null) => {
                        setinputvalueProduct(newValue);
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={options}
                    size='small'
                    sx={{ flex: '1 1 180px' }}

                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="CST PIS Entrada"
                        />
                    } />
                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    size='small'
                    id="outlined-basic"
                    label="Alíquota PIS Entrada(%)"
                    variant="outlined"
                    sx={{ flex: '1 1 180px' }}
                />
            </S.SectionContainer>
            <S.SectionContainer>
                <b style={{ display: 'flex', alignSelf: 'flex-start', width: '100%' }}>COFINS</b>
                <Autocomplete
                    value={inputvalueProduct}
                    onChange={(event: any, newValue: string | null) => {
                        setinputvalueProduct(newValue);
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={options}
                    size='small'
                    sx={{ flex: '1 1 180px' }}

                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="CST COFINS Saída*"
                        />
                    } />
                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    size='small'
                    label="Alíquota COFINS Saída(%)"
                    variant="outlined"
                    sx={{ flex: '1 1 230px' }} />
                <Autocomplete
                    value={inputvalueProduct}
                    onChange={(event: any, newValue: string | null) => {
                        setinputvalueProduct(newValue);
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={options}
                    size='small'
                    sx={{ flex: '1 1 200px' }}

                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="CST COFINS Entrada"
                        />
                    } />
                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    size='small'
                    id="outlined-basic"
                    label="Alíquota COFINS Entrada(%)"
                    variant="outlined"
                    sx={{ flex: '1 1 2000px' }}
                />
            </S.SectionContainer>
        </S.Container>


    )
}