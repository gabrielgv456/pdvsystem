import * as S from './style'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export const TabFiscal = () => {
    const [inputProductsModalQuantity, setinputProductsModalQuantity] = useState<number | null>(null)
    const [inputvalueProduct, setinputvalueProduct] = useState<string | null>(null)
    const options = ['teste']

    return (
        <S.DivModalAddProduct>
            <b style={{ display: 'flex', alignSelf: 'flex-start' }}>ICMS</b>
            <section style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Autocomplete
                    value={inputvalueProduct}
                    onChange={(event: any, newValue: string | null) => {
                        setinputvalueProduct(newValue);
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={options}
                    sx={{ width: '49%' }}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="CST"
                        />
                    } />
                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    label="Alíquota (%)"
                    variant="outlined"
                    sx={{ width: '49%' }}/>



            </section>

            <section style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    label="Base Cálculo (R$)"
                    variant="outlined"
                    sx={{ width: '49%' }}/>

                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    label="Valor (R$)"
                    variant="outlined"
                    sx={{ width: '49%' }} />



            </section>

            <b style={{ display: 'flex', alignSelf: 'flex-start' }}>PIS</b>
            <section style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Autocomplete
                    value={inputvalueProduct}
                    onChange={(event: any, newValue: string | null) => {
                        setinputvalueProduct(newValue);
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={options}
                    sx={{ width: '49%' }}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="CST"
                        />
                    } />
                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    label="Alíquota (%)"
                    variant="outlined"
                    sx={{ width: '49%' }}/>



            </section>

            <section style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    label="Base Cálculo (R$)"
                    variant="outlined"
                    sx={{ width: '49%' }}/>

                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    label="Valor (R$)"
                    variant="outlined"
                    sx={{ width: '49%' }} />



            </section>
            <b style={{ display: 'flex', alignSelf: 'flex-start' }}>CONFINS</b>
            <section style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Autocomplete
                    value={inputvalueProduct}
                    onChange={(event: any, newValue: string | null) => {
                        setinputvalueProduct(newValue);
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={options}
                    sx={{ width: '49%' }}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="CST"
                        />
                    } />
                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    label="Alíquota (%)"
                    variant="outlined"
                    sx={{ width: '49%' }}/>



            </section>

            <section style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    label="Base Cálculo (R$)"
                    variant="outlined"
                    sx={{ width: '49%' }}/>

                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    label="Valor (R$)"
                    variant="outlined"
                    sx={{ width: '49%' }} />



            </section>
        </S.DivModalAddProduct>
    )
}