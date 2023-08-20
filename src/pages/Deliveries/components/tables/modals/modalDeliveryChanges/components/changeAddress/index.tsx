import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { cepFormat, optionsUF } from '../../../../../../../../utils/utils';
import { useMessageBoxContext } from '../../../../../../../../contexts/MessageBox/MessageBoxContext';
import axios from 'axios';
import * as S from './style'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ptBR from 'dayjs/locale/pt-br'
import { DeliveriesReturnApiProps } from '../../../../../..';
import { useContext, useState } from 'react';
import { DefaultButton } from '../../../../../../../../components/buttons/defaultButton';
import { AuthContext } from '../../../../../../../../contexts/Auth/AuthContext';
import { useApi } from '../../../../../../../../hooks/useApi';

interface DeliveryAddressClientProps {
    selectedDeliveryModal: DeliveriesReturnApiProps,
    searchDeliveries: () => void
}
export interface typeRequestDeliveryAdressChange {
    scheduledDate: string | null;
    addressId: number;
    deliveryId: number;
    storeId: number;
    id: number;
    addressStreet: string;
    addressNumber: string;
    addressNeighborhood: string;
    addressComplement: string;
    addressCity: string;
    addressState: string | null;
    addressCep: string;
}

export const DeliveryAddressChange = (props: DeliveryAddressClientProps) => {

    const { MessageBox } = useMessageBoxContext()
    const [newDeliveryAddress, setNewDeliveryAddress] = useState<DeliveriesReturnApiProps>(props.selectedDeliveryModal)
    const auth = useContext(AuthContext)
    const { changeAdressDelivery } = useApi()

    const dataRequestApi: typeRequestDeliveryAdressChange = {
        ...newDeliveryAddress.address,
        scheduledDate: newDeliveryAddress.scheduledDate,
        addressId: newDeliveryAddress.address.id,
        deliveryId: newDeliveryAddress.id,
        storeId: auth.idUser
    }

    async function handleRequestApi() {
        try {
            const result = await changeAdressDelivery(dataRequestApi)
            if (!result.Success) throw new Error(result.Erro)
            MessageBox('success', 'Dados de entrega atualizados com sucesso!')
            props.searchDeliveries()
        } catch (error: any) {
            MessageBox('error', 'Falha ao atualizar dados de entrega! ' + error.message)
        }
    }

    async function handleConsultCep(cep: string) {
        const cepformated = cep.replace(/[^0-9]/g, '')
        if (cepformated.length === 8) {
            try {
                const { data } = await axios.get(`https:\\viacep.com.br/ws/${cepformated}/json/`)
                if (data.erro) {
                    MessageBox('error', 'CEP invalido')
                }
                else {
                    if (newDeliveryAddress) {
                        setNewDeliveryAddress({
                            ...newDeliveryAddress,
                            address: {
                                ...newDeliveryAddress.address,
                                addressNeighborhood: data.bairro,
                                addressState: data.uf,
                                addressStreet: data.logradouro,
                                addressCity: data.localidade,
                                addressCep: newDeliveryAddress.address.addressCep,
                                addressComplement: '',
                                addressNumber: ''
                            }
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
            <S.LabelModal>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ptBR}>
                    <DatePicker
                        label={"Data de Entrega"}
                        openTo="day"
                        views={['year', 'month', 'day']}
                        className='TextField'
                        disablePast={true}
                        value={newDeliveryAddress.scheduledDate}
                        onChange={(newValue) => {
                            setNewDeliveryAddress({ ...newDeliveryAddress, scheduledDate: newValue });
                        }}
                        renderInput={(params) => <TextField size="small" sx={{ width: '30%' }} {...params} />}
                    />
                </LocalizationProvider>

                <TextField
                    value={newDeliveryAddress.address.addressCep}
                    onChange={(e) => {
                        setNewDeliveryAddress({ ...newDeliveryAddress, address: { ...newDeliveryAddress.address, addressCep: cepFormat(e.target.value, newDeliveryAddress.address.addressCep) } })
                    }}
                    onBlur={(e) => handleConsultCep(e.target.value)}
                    size='small'
                    id="outlined-basic"
                    className='TextField'
                    label="CEP"
                    variant="outlined"
                    sx={{ width: '18%' }}
                />

                <TextField
                    value={newDeliveryAddress.address.addressStreet}
                    onChange={(e) => {
                        setNewDeliveryAddress({ ...newDeliveryAddress, address: { ...newDeliveryAddress.address, addressStreet: `${e.target.value.length > 50 ? newDeliveryAddress.address.addressStreet : e.target.value}` } })
                    }}
                    id="outlined-basic"
                    label="Endereço"
                    className='TextField'
                    size='small'
                    variant="outlined"
                    sx={{ width: '40%' }}
                />

                <TextField
                    value={newDeliveryAddress.address.addressNumber}
                    onChange={(e) => {
                        setNewDeliveryAddress({ ...newDeliveryAddress, address: { ...newDeliveryAddress.address, addressNumber: `${e.target.value.length > 5 ? newDeliveryAddress.address.addressNumber : e.target.value}` } })
                    }}
                    id="outlined-basic"
                    label="Nº"
                    variant="outlined"
                    className='TextField'
                    size='small'
                    sx={{ width: '10%' }}
                />

            </S.LabelModal>

            <S.LabelModal>
                <TextField
                    value={newDeliveryAddress.address.addressNeighborhood}
                    onChange={(e) =>
                        setNewDeliveryAddress({ ...newDeliveryAddress, address: { ...newDeliveryAddress.address, addressNeighborhood: `${e.target.value.length > 30 ? newDeliveryAddress.address.addressNeighborhood : e.target.value}` } })
                    }
                    type="text"
                    id="outlined-basic"
                    size='small'
                    label="Bairro"
                    variant="outlined"
                    className='TextField'
                    sx={{ width: '35%' }} />

                <TextField
                    value={newDeliveryAddress.address.addressCity}
                    onChange={(e) =>
                        setNewDeliveryAddress({ ...newDeliveryAddress, address: { ...newDeliveryAddress.address, addressCity: `${e.target.value.length > 30 ? newDeliveryAddress.address.addressCity : e.target.value}` } })
                    }
                    type="text"
                    id="outlined-basic"
                    label="Cidade"
                    className='TextField'
                    variant="outlined"
                    size='small'
                    sx={{ width: '45%' }} />

                <Autocomplete
                    value={newDeliveryAddress.address.addressState}
                    onChange={(event: any, newValue: string | null) => {
                        setNewDeliveryAddress({ ...newDeliveryAddress, address: { ...newDeliveryAddress.address, addressState: newValue } })
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    className='TextField'
                    options={optionsUF}
                    size='small'
                    sx={{ width: '19%' }}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="UF"

                        />
                    } />
            </S.LabelModal>
            <DefaultButton selectedColor='--Green' onClick={() => handleRequestApi()}>
                Salvar
            </DefaultButton>
        </S.DivModal>

    )
}


