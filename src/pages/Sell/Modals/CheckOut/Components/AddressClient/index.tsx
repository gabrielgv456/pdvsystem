import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { cepFormat, optionsUF } from '../../../../../../utils/utils';
import { useMessageBoxContext } from '../../../../../../contexts/MessageBox/MessageBoxContext';
import axios from 'axios';
import * as S from './style'
import { useEffect } from 'react';
import { ClientsType, deliveryAddressClientType } from '../..';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ptBR from 'dayjs/locale/pt-br'

interface DeliveryAddressClientProps {
    setDeliveryClientType: (value: deliveryAddressClientType) => void
    addressDeliveryClient: deliveryAddressClientType
    inputClient: ClientsType | null
}


export const DeliveryAddressClient = (props: DeliveryAddressClientProps) => {

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
                    if (props.addressDeliveryClient) {
                        props.setDeliveryClientType({
                            ...props.addressDeliveryClient,
                            addressNeighborhood: data.bairro,
                            addressState: data.uf,
                            addressStreet: data.logradouro,
                            addressCity: data.localidade,
                            addressCep: props.addressDeliveryClient.addressCep,
                            addressComplement: '',
                            addressNumber: '',
                            addressUF: data.uf
                        })
                    }
                }
            }
            catch (error: any) {
                MessageBox('info', error.message)
            }
        }

    }

    return (
        <S.DivModal>
            <label style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>

                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ptBR}>
                    <DatePicker
                        label={"Data de Entrega"}
                        openTo="day"
                        views={['year', 'month', 'day']}
                        disablePast={true}
                        value={props.addressDeliveryClient.scheduledDate}
                        onChange={(newValue) => {
                            props.setDeliveryClientType({ ...props.addressDeliveryClient, scheduledDate: newValue });
                        }}
                        renderInput={(params) => <TextField size="small" sx={{ width: '30%' }} {...params} />}
                    />
                </LocalizationProvider>

                <TextField
                    value={props.addressDeliveryClient.addressCep}
                    onChange={(e) => {
                        props.setDeliveryClientType({ ...props.addressDeliveryClient, addressCep: cepFormat(e.target.value, props.addressDeliveryClient.addressCep) })
                    }}
                    onBlur={(e) => handleConsultCep(e.target.value)}
                    size='small'
                    id="outlined-basic"
                    label="CEP"
                    variant="outlined"
                    sx={{ width: '18%' }}
                />

                <TextField
                    value={props.addressDeliveryClient.addressStreet}
                    onChange={(e) => {
                        props.setDeliveryClientType({ ...props.addressDeliveryClient, addressStreet: `${e.target.value.length > 50 ? props.addressDeliveryClient.addressStreet : e.target.value}` })
                    }}
                    id="outlined-basic"
                    label="Endereço"
                    size='small'
                    variant="outlined"
                    sx={{ width: '40%' }}
                />

                <TextField
                    value={props.addressDeliveryClient.addressNumber}
                    onChange={(e) => {
                        props.setDeliveryClientType({ ...props.addressDeliveryClient, addressNumber: `${e.target.value.length > 5 ? props.addressDeliveryClient.addressNumber : e.target.value}` })
                    }}
                    id="outlined-basic"
                    label="Nº"
                    variant="outlined"
                    size='small'
                    sx={{ width: '10%' }}
                />

            </label>

            <label style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <TextField
                    value={props.addressDeliveryClient.addressNeighborhood}
                    onChange={(e) =>
                        props.setDeliveryClientType({ ...props.addressDeliveryClient, addressNeighborhood: `${e.target.value.length > 30 ? props.addressDeliveryClient.addressNeighborhood : e.target.value}` })
                    }
                    type="text"
                    id="outlined-basic"
                    size='small'
                    label="Bairro"
                    variant="outlined"
                    sx={{ width: '35%' }} />

                <TextField
                    value={props.addressDeliveryClient.addressCity}
                    onChange={(e) =>
                        props.setDeliveryClientType({ ...props.addressDeliveryClient, addressCity: `${e.target.value.length > 30 ? props.addressDeliveryClient.addressCity : e.target.value}` })
                    }
                    type="text"
                    id="outlined-basic"
                    label="Cidade"
                    variant="outlined"
                    size='small'
                    sx={{ width: '45%' }} />

                <Autocomplete
                    value={props.addressDeliveryClient.addressState}
                    onChange={(event: any, newValue: string | null) => {
                        props.setDeliveryClientType({ ...props.addressDeliveryClient, addressState: newValue })
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={optionsUF}
                    size='small'
                    sx={{ width: '19%' }}
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