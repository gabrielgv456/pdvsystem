import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { cepFormat, optionsUF } from '../../../../../../utils/utils';
import { useMessageBoxContext } from '../../../../../../contexts/MessageBox/MessageBoxContext';
import axios from 'axios';
import * as S from './style'

interface DeliveryAddressClient {
    setvalueInputClientAdressStreet: (value: string) => void
    setvalueInputClientAdressNeighborhood: (value: string) => void
    setvalueInputClientAdressCity: (value: string) => void
    setvalueInputClientAdressState: (value: string | null) => void
    setvalueInputClientAdressCep: (value: string) => void
    setvalueInputClientAdressNumber: (value: string) => void
    valueInputClientAdressCep: string
    valueInputClientAdressStreet: string
    valueInputClientAdressNumber: string
    valueInputClientAdressNeighborhood: string
    valueInputClientAdressCity: string
    valueInputClientAdressState: string | null
}


export const DeliveryAddressClient = (props: DeliveryAddressClient) => {

    const { MessageBox } = useMessageBoxContext()

    async function handleConsultCep(cep: string) {
        const cepformated = cep.replace(/[^0-9]/g, '')

        if (cepformated.length === 8) {
            try {
                const { data } = await axios.get(`https:\\viacep.com.br/ws/${cepformated}/json/`)

                if (data.erro) {
                    MessageBox('error', 'CEP invalido')
                }
                else {
                    props.setvalueInputClientAdressStreet(data.logradouro)
                    props.setvalueInputClientAdressNeighborhood(data.bairro)
                    props.setvalueInputClientAdressCity(data.localidade)
                    props.setvalueInputClientAdressState(data.uf)
                }
            }
            catch (error: any) {
                MessageBox('info', error.message)
            }
        }

    }

    return (
        <S.DivModal>
            <label style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>

                <TextField
                    value={props.valueInputClientAdressCep}
                    onChange={(e) => {
                        props.setvalueInputClientAdressCep(cepFormat(e.target.value, props.valueInputClientAdressCep))
                    }}
                    onBlur={(e) => handleConsultCep(e.target.value)}
                    id="outlined-basic"
                    label="CEP"
                    variant="outlined"
                    sx={{ width: '27%' }}
                />

                <TextField
                    value={props.valueInputClientAdressStreet}
                    onChange={(e) => {
                        props.setvalueInputClientAdressStreet(
                            e.target.value.length > 50 ?
                                props.valueInputClientAdressStreet
                                :
                                e.target.value
                        )
                    }}
                    id="outlined-basic"
                    label="Endereço"
                    variant="outlined"
                    sx={{ width: '57%' }}
                />

                <TextField
                    value={props.valueInputClientAdressNumber}
                    onChange={(e) => {
                        props.setvalueInputClientAdressNumber(
                            e.target.value.length > 5 ?
                                props.valueInputClientAdressNumber
                                :
                                e.target.value
                        )
                    }}
                    id="outlined-basic"
                    label="Nº"
                    variant="outlined"
                    sx={{ width: '13%' }}
                />

            </label>

            <label style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                <TextField
                    value={props.valueInputClientAdressNeighborhood}
                    onChange={(e) => props.setvalueInputClientAdressNeighborhood(
                        e.target.value.length > 30 ?
                            props.valueInputClientAdressNeighborhood
                            :
                            e.target.value)}
                    type="text"
                    id="outlined-basic"
                    label="Bairro"
                    variant="outlined"
                    sx={{ width: '40%' }} />

                <TextField
                    value={props.valueInputClientAdressCity}
                    onChange={(e) => props.setvalueInputClientAdressCity(
                        e.target.value.length > 30 ?
                            props.valueInputClientAdressCity
                            :
                            e.target.value)}
                    type="text"
                    id="outlined-basic"
                    label="Cidade"
                    variant="outlined"
                    sx={{ width: '40%' }} />


                <Autocomplete
                    value={props.valueInputClientAdressState}
                    onChange={(event: any, newValue: string | null) => {
                        props.setvalueInputClientAdressState(newValue);
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={optionsUF}
                    sx={{ width: '18%' }}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="UF"

                        />
                    } />
            </label>
        </S.DivModal>

    )
}