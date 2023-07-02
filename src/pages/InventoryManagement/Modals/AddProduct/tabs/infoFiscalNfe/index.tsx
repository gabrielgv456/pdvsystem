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
            <b style={{display:'flex',alignSelf:'flex-start'}}>Principal</b>
            <Autocomplete
                    value={inputvalueProduct}
                    onChange={(event: any, newValue: string | null) => {
                        setinputvalueProduct(newValue);
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={options}
                    sx={{ width: '48%' }}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="ICMS Origem"
                        />
                    } />
            
            <b style={{display:'flex',alignSelf:'flex-start'}}>NFe (Nota Fiscal Eletrônica)</b>
            <section style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>

                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    label="CFOP"
                    variant="outlined"
                    sx={{ width: '21%' }} />
                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    label="Red. BC ICMS(%)"
                    variant="outlined"
                    sx={{ width: '38%' }} disabled />

                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    label="Alíquota ICMS(%)"
                    variant="outlined"
                    sx={{ width: '38%' }} disabled />
            </section>
            
            <section style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
               
                <Autocomplete
                    value={inputvalueProduct}
                    onChange={(event: any, newValue: string | null) => {
                        setinputvalueProduct(newValue);
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={options}
                    sx={{ width: '48%' }}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="ICMS - CST"
                        />
                    } />
            </section>
            <b style={{display:'flex',alignSelf:'flex-start'}}>NFCe (Nota Fiscal ao Consumidor Eletrônica)</b>
            <section style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>

                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    label="CFOP"
                    variant="outlined"
                    sx={{ width: '21%' }} />
                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    label="Red. BC ICMS(%)"
                    variant="outlined"
                    sx={{ width: '38%' }} disabled />

                <TextField
                    value={inputProductsModalQuantity}
                    onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))}
                    type="number"
                    id="outlined-basic"
                    label="Alíquota ICMS(%)"
                    variant="outlined"
                    sx={{ width: '38%' }} disabled />
            </section>
            
            <section style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
               
                <Autocomplete
                    value={inputvalueProduct}
                    onChange={(event: any, newValue: string | null) => {
                        setinputvalueProduct(newValue);
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={options}
                    sx={{ width: '48%' }}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="ICMS - CST"
                        />
                    } />
            </section>
        </S.DivModalAddProduct>
    )
}