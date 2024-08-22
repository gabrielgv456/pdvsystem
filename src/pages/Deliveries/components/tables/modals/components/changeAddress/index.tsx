import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { cepFormat, removeNotNumerics } from '../../../../../../../utils/utils';
import { useMessageBoxContext } from '../../../../../../../contexts/MessageBox/MessageBoxContext';
import axios from 'axios';
import * as S from './style'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ptBR from 'dayjs/locale/pt-br'
import { useContext, useEffect, useState } from 'react';
import { DefaultButton } from '../../../../../../../components/buttons/defaultButton';
import { AuthContext } from '../../../../../../../contexts/Auth/AuthContext';
import { useApi } from '../../../../../../../hooks/useApi';
import { CityStateType } from '../../../../../../PeopleRegistration/Clients/Modals/addEditClient/interfaces';
import { ResultDeliveryType } from '../../../../../../../interfaces/useApi/findDeliveries';
import { AddressSharedType } from "@shared/address";

interface DeliveryAddressClientProps {
    selectedDeliveryModal: ResultDeliveryType,
    moreOneDelivery: boolean,
    searchDeliveries: () => void
    setSelectedDeliveryModal: (value: ResultDeliveryType) => void
}
export type typeRequestDeliveryAdressChange = {
    scheduledDate: Date;
    addressId: number;
    deliveryId: number;
    storeId: number;
    id: number;
} & AddressSharedType

export const DeliveryAddressChange = (props: DeliveryAddressClientProps) => {

    const getDefaultCity = async () => {
        const city = await handleGetCitiesIbge(props.selectedDeliveryModal.address.city.ibge)
        if (city) {
            setCitiesOptions(city)
            setSelectedCity(city[0])
        }
    }

    useEffect(() => {
        getDefaultCity()
    }, [props.selectedDeliveryModal.id])

    const { MessageBox } = useMessageBoxContext()
    const auth = useContext(AuthContext)
    const { changeAdressDelivery, getCities } = useApi()
    const [selectedCity, setSelectedCity] = useState<CityStateType | null>(null)
    const [citiesOptions, setCitiesOptions] = useState<CityStateType[] | null>(null)

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
        } catch (error) {
            MessageBox('error', 'Falha ao atualizar dados de entrega! ' + (error as Error).message)
        }
    }

    async function handleGetCitiesIbge(ibge: number | null): Promise<CityStateType[] | undefined> {
        try {
            const response = await getCities(undefined, ibge)
            if (!response.Success) throw new Error(response.erro ?? 'Erro desconhecido')
            return response.cities
        } catch (error) {
            MessageBox('error', (error as Error).message)
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

                        const city = await handleGetCitiesIbge(data.ibge)
                        if (city) {

                            props.setSelectedDeliveryModal({
                                ...props.selectedDeliveryModal,
                                address: {
                                    ...props.selectedDeliveryModal.address,
                                    addressNeighborhood: data.bairro,
                                    addressStreet: data.logradouro,
                                    cityId: data.localidade,
                                    addressCep: props.selectedDeliveryModal.address.addressCep,
                                    addressComplement: '',
                                    addressNumber: ''
                                }
                            })
                        }
                    }
                }
            }
            catch (error) {
                MessageBox('info', (error as Error).message)
            }
        }
    }


    async function handleSelectCity(newValue: CityStateType | null) {
        setSelectedCity(newValue)
        if (newValue) {
            props.setSelectedDeliveryModal({ ...props.selectedDeliveryModal, address: { ...props.selectedDeliveryModal.address, cityId: newValue.id } })
        }
    }

    async function handleGetCities(city: string | null) {
        try {
            const response = await getCities(city)
            if (!response.Success) throw new Error(response.erro ?? 'Erro desconhecido')
            setCitiesOptions(response.cities)
        } catch (error) {
            MessageBox('error', (error as Error).message)
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
                            if (newValue) props.setSelectedDeliveryModal({ ...props.selectedDeliveryModal, scheduledDate: newValue });
                        }}
                        renderInput={(params) => <TextField size="small" sx={{ width: '30%' }} {...params} />}
                    />
                </LocalizationProvider>

                <TextField
                    value={props.selectedDeliveryModal.address.addressCep}
                    onChange={(e) => {
                        props.setSelectedDeliveryModal({ ...props.selectedDeliveryModal, address: { ...props.selectedDeliveryModal.address, addressCep: cepFormat(e.target.value, props.selectedDeliveryModal.address?.addressCep ?? '') } })
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
                    sx={{ width: '41%' }} />

                <Autocomplete
                    value={selectedCity}
                    onChange={(event: any, newValue: CityStateType | null) => {
                        handleSelectCity(newValue)
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    size='small'
                    options={citiesOptions ?? []}
                    getOptionLabel={(option) => (
                        option.name + ' - ' + option.state.uf
                    )}
                    sx={{ width: '58%' }}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="Cidade"
                            onChange={(e) => { handleGetCities(e.target.value) }}
                        />
                    } />


                {/* <Autocomplete
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
                    } /> */}
            </S.LabelModal>
            <DefaultButton selectedColor='--Green' onClick={() => handleRequestApi()}>
                Salvar
            </DefaultButton>
        </S.DivModal>

    )
}


