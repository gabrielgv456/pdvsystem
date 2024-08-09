import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { cepFormat, optionsUF, removeNotNumerics } from '../../../../../../utils/utils';
import { useMessageBoxContext } from '../../../../../../contexts/MessageBox/MessageBoxContext';
import axios from 'axios';
import * as S from './style'
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ClientsType, deliveryAddressClientType } from '../..';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ptBR from 'dayjs/locale/pt-br'
import { CityStateType } from '../../../../../PeopleRegistration/Clients/Modals/addEditClient/interfaces';

interface DeliveryAddressClientProps {
    setDeliveryClientType: Dispatch<SetStateAction<deliveryAddressClientType>>
    setSelectedCity: Dispatch<SetStateAction<CityStateType | null>>
    addressDeliveryClient: deliveryAddressClientType
    inputClient: ClientsType | null
    handleGetCitiesIbge(ibge: number | null): Promise<CityStateType[] | undefined>
    handleGetCities(city: string | null): void
    citiesOptions: CityStateType[] | null
    selectedCity: CityStateType | null
}


export const DeliveryAddressClient = (props: DeliveryAddressClientProps) => {

    useEffect(() => {
        props.handleGetCities(null)
    }, [])

    const { MessageBox } = useMessageBoxContext()

    async function handleSelectCity(newValue: CityStateType | null) {
        props.setSelectedCity(newValue)
        if (newValue) {
            handleChangeAddress('addressCityId', newValue.id)
        }
    }

    function handleChangeAddress<T extends keyof deliveryAddressClientType>(
        property: T, value: deliveryAddressClientType[T]) {
        props.setDeliveryClientType(prevState => {
            return {
                ...prevState,
                [property]: value
            }
        })
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
                    if (props.addressDeliveryClient) {

                        const city = await props.handleGetCitiesIbge(data.ibge)
                        if (city) {
                            props.setDeliveryClientType({
                                ...props.addressDeliveryClient,
                                addressNeighborhood: data.bairro,
                                addressStreet: data.logradouro,
                                addressCityId: city[0].id,
                                addressCep: props.addressDeliveryClient.addressCep,
                                addressComplement: '',
                                addressNumber: ''
                            })

                            props.setSelectedCity(city[0])
                        }
                    }
                }
            }
            catch (error) {
                MessageBox('info', (error as Error).message)
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
                            handleChangeAddress('scheduledDate', newValue);
                        }}
                        renderInput={(params) => <TextField size="small" sx={{ width: '30%' }} {...params} />}
                    />
                </LocalizationProvider>

                <TextField
                    value={props.addressDeliveryClient.addressCep}
                    onChange={(e) => {
                        handleChangeAddress('addressCep', cepFormat(e.target.value, props.addressDeliveryClient.addressCep))
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
                        handleChangeAddress('addressStreet', `${e.target.value.length > 50 ? props.addressDeliveryClient.addressStreet : e.target.value}`)
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
                        handleChangeAddress('addressNumber', `${e.target.value.length > 5 ? props.addressDeliveryClient.addressNumber : e.target.value}`)
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
                        handleChangeAddress('addressNeighborhood', `${e.target.value.length > 30 ? props.addressDeliveryClient.addressNeighborhood : e.target.value}`)
                    }
                    type="text"
                    id="outlined-basic"
                    size='small'
                    label="Bairro"
                    variant="outlined"
                    sx={{ width: '41%' }} />

                <Autocomplete
                    value={props.selectedCity}
                    onChange={(event: any, newValue: CityStateType | null) => {
                        handleSelectCity(newValue)
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    size='small'
                    options={props.citiesOptions ?? []}
                    getOptionLabel={(option) => (
                        option.name + ' - ' + option.state.uf
                    )}
                    sx={{ width: '58%' }}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="Cidade"
                            onChange={(e) => { props.handleGetCities(e.target.value) }}
                        />
                    } />

                {/* <Autocomplete
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
                    } /> */}
            </label>
        </S.DivModal>

    )
}