import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { cepFormat, optionsUF, removeNotNumerics } from '../../../../../../../utils/utils';
import { useMessageBoxContext } from '../../../../../../../contexts/MessageBox/MessageBoxContext';
import axios from 'axios';
import * as S from './style'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ptBR from 'dayjs/locale/pt-br'
import { DeliveriesReturnApiProps } from '../../../../..';
import { useContext, useState } from 'react';
import { DefaultButton } from '../../../../../../../components/buttons/defaultButton';
import { AuthContext } from '../../../../../../../contexts/Auth/AuthContext';
import { useApi } from '../../../../../../../hooks/useApi';

interface DeliveryAddressClientProps {
    selectedDeliveryModal: DeliveriesReturnApiProps,
    moreOneDelivery: boolean,
    searchDeliveries: () => void
    setSelectedDeliveryModal:(value:DeliveriesReturnApiProps) => void
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
    const auth = useContext(AuthContext)
    const { changeAdressDelivery } = useApi()

    const dataRequestApi: typeRequestDeliveryAdressChange = {
        ...props.selectedDeliveryModal.address,
        scheduledDate: props.selectedDeliveryModal.scheduledDate,
        addressId: props.selectedDeliveryModal.address.id,
        deliveryId: props.selectedDeliveryModal.id,
        storeId: auth.idUser
    }

    async function handleRequestApi() {
        try {
            const result = await changeAdressDelivery(dataRequestApi)
            if (!result.Success) throw new Error(result.Erro)
            props.searchDeliveries()
            MessageBox('success', 'Dados de entrega atualizados com sucesso!')
        } catch (error: any) {
            MessageBox('error', 'Falha ao atualizar dados de entrega! ' + error.message)
        }
    }

    async function handleConsultCep(cep: string) {
        const cepformated = removeNotNumerics(cep)
        if (cepformated.length === 8) {
            try {
                const { data } = await axios.get(`https://viacep.com.br/ws/${cepformated}/json/`)
                if (data.erro) {
                    MessageBox('error', 'CEP invalido')
                }
                else {
                    if (props.selectedDeliveryModal) {
                        props.setSelectedDeliveryModal({
                            ...props.selectedDeliveryModal,
                            address: {
                                ...props.selectedDeliveryModal.address,
                                addressNeighborhood: data.bairro,
                                addressState: data.uf,
                                addressStreet: data.logradouro,
                                addressCity: data.localidade,
                                addressCep: props.selectedDeliveryModal.address.addressCep,
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
                        value={props.selectedDeliveryModal.scheduledDate}
                        onChange={(newValue) => {
                            props.setSelectedDeliveryModal({ ...props.selectedDeliveryModal, scheduledDate: newValue });
                        }}
                        renderInput={(params) => <TextField size="small" sx={{ width: '30%' }} {...params} />}
                    />
                </LocalizationProvider>

                <TextField
                    value={props.selectedDeliveryModal.address.addressCep}
                    onChange={(e) => {
                        props.setSelectedDeliveryModal({ ...props.selectedDeliveryModal, address: { ...props.selectedDeliveryModal.address, addressCep: cepFormat(e.target.value, props.selectedDeliveryModal.address.addressCep) } })
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
                    value={props.selectedDeliveryModal.address.addressStreet}
                    onChange={(e) => {
                        props.setSelectedDeliveryModal({ ...props.selectedDeliveryModal, address: { ...props.selectedDeliveryModal.address, addressStreet: `${e.target.value.length > 50 ? props.selectedDeliveryModal.address.addressStreet : e.target.value}` } })
                    }}
                    id="outlined-basic"
                    label="Endereço"
                    className='TextField'
                    size='small'
                    variant="outlined"
                    sx={{ width: '40%' }}
                />

                <TextField
                    value={props.selectedDeliveryModal.address.addressNumber}
                    onChange={(e) => {
                        props.setSelectedDeliveryModal({ ...props.selectedDeliveryModal, address: { ...props.selectedDeliveryModal.address, addressNumber: `${e.target.value.length > 5 ? props.selectedDeliveryModal.address.addressNumber : e.target.value}` } })
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
                    value={props.selectedDeliveryModal.address.addressNeighborhood}
                    onChange={(e) =>
                        props.setSelectedDeliveryModal({ ...props.selectedDeliveryModal, address: { ...props.selectedDeliveryModal.address, addressNeighborhood: `${e.target.value.length > 30 ? props.selectedDeliveryModal.address.addressNeighborhood : e.target.value}` } })
                    }
                    type="text"
                    id="outlined-basic"
                    size='small'
                    label="Bairro"
                    variant="outlined"
                    className='TextField'
                    sx={{ width: '35%' }} />

                <TextField
                    value={props.selectedDeliveryModal.address.addressCity}
                    onChange={(e) =>
                        props.setSelectedDeliveryModal({ ...props.selectedDeliveryModal, address: { ...props.selectedDeliveryModal.address, addressCity: `${e.target.value.length > 30 ? props.selectedDeliveryModal.address.addressCity : e.target.value}` } })
                    }
                    type="text"
                    id="outlined-basic"
                    label="Cidade"
                    className='TextField'
                    variant="outlined"
                    size='small'
                    sx={{ width: '45%' }} />

                <Autocomplete
                    value={props.selectedDeliveryModal.address.addressState}
                    onChange={(event: any, newValue: string | null) => {
                        props.setSelectedDeliveryModal({ ...props.selectedDeliveryModal, address: { ...props.selectedDeliveryModal.address, addressState: newValue } })
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


