import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { cepFormat, optionsUF } from '../../../../../../utils/utils';
import { useMessageBoxContext } from '../../../../../../contexts/MessageBox/MessageBoxContext';
import axios from 'axios';
import * as S from './style'
import { useEffect } from 'react';
import { ClientsType, deliveryAddressClientType } from '../..';

interface DeliveryAddressClientProps {
    // setvalueInputClientAdressStreet: (value: string) => void
    // setvalueInputClientAdressNeighborhood: (value: string) => void
    // setvalueInputClientAdressCity: (value: string) => void
    // setvalueInputClientAdressState: (value: string | null) => void
    // setvalueInputClientAdressCep: (value: string) => void
    // setvalueInputClientAdressNumber: (value: string) => void
    // valueInputClientAdressCep: string
    // valueInputClientAdressStreet: string
    // valueInputClientAdressNumber: string
    // valueInputClientAdressNeighborhood: string
    // valueInputClientAdressCity: string
    // valueInputClientAdressState: string | null
    setDeliveryClientType: (value: deliveryAddressClientType) => void
    addressDeliveryClient: deliveryAddressClientType
    inputClient: ClientsType | null
}


export const DeliveryAddressClient = (props: DeliveryAddressClientProps) => {

    const { MessageBox } = useMessageBoxContext()

    useEffect(() => {
        //props.
    }, [props.inputClient?.id])

    async function SearchAddressClient() {

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
                    if (props.addressDeliveryClient) {
                        props.setDeliveryClientType({
                            adressNeighborhood: data.bairro,
                            adressState: data.uf,
                            adressStreet: data.logradouro,
                            adressCity: data.localidade,
                            adressCep: props.addressDeliveryClient.adressCep,
                            adressComplement: '',
                            adressNumber: '',
                            adressUF: data.uf
                        })
                    }
                    // props.setvalueInputClientAdressStreet(data.logradouro)
                    // props.setvalueInputClientAdressNeighborhood(data.bairro)
                    // props.setvalueInputClientAdressCity(data.localidade)
                    // props.setvalueInputClientAdressState(data.uf)
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
                    value={props.addressDeliveryClient.adressCep}
                    onChange={(e) => {
                        props.setDeliveryClientType({ ...props.addressDeliveryClient, adressCep: e.target.value })
                        //props.addressDeliveryClient.adressCep = e.target.value
                        //props.setvalueInputClientAdressCep(cepFormat(e.target.value, props.addressDeliveryClient?.adressCep))
                    }}
                    onBlur={(e) => handleConsultCep(e.target.value)}
                    id="outlined-basic"
                    label="CEP"
                    variant="outlined"
                    sx={{ width: '27%' }}
                />

                <TextField
                    value={props.addressDeliveryClient.adressStreet}
                    onChange={(e) => {
                        // props.setvalueInputClientAdressStreet(
                        //     e.target.value.length > 50 ?
                        //         props.valueInputClientAdressStreet
                        //         :
                        //         e.target.value
                        // )
                        props.addressDeliveryClient.adressStreet = e.target.value
                    }}
                    id="outlined-basic"
                    label="Endereço"
                    variant="outlined"
                    sx={{ width: '57%' }}
                />

                <TextField
                    value={props.addressDeliveryClient.adressNumber}
                    onChange={(e) => {
                        // props.setvalueInputClientAdressNumber(
                        //     e.target.value.length > 5 ?
                        //         props.valueInputClientAdressNumber
                        //         :
                        //         e.target.value
                        // )
                        props.addressDeliveryClient.adressNumber = e.target.value
                    }}
                    id="outlined-basic"
                    label="Nº"
                    variant="outlined"
                    sx={{ width: '13%' }}
                />

            </label>

            <label style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                <TextField
                    value={props.addressDeliveryClient.adressNeighborhood}
                    onChange={(e) =>
                        // props.setvalueInputClientAdressNeighborhood(
                        // e.target.value.length > 30 ?
                        //     props.valueInputClientAdressNeighborhood
                        //     :
                        //     e.target.value)
                        props.addressDeliveryClient.adressNeighborhood = e.target.value
                    }
                    type="text"
                    id="outlined-basic"
                    label="Bairro"
                    variant="outlined"
                    sx={{ width: '40%' }} />

                <TextField
                    value={props.addressDeliveryClient.adressCity}
                    onChange={(e) =>
                        // props.setvalueInputClientAdressCity(
                        // e.target.value.length > 30 ?
                        //     props.valueInputClientAdressCity
                        //     :
                        //     e.target.value)
                        props.addressDeliveryClient.adressCity = e.target.value
                    }
                    type="text"
                    id="outlined-basic"
                    label="Cidade"
                    variant="outlined"
                    sx={{ width: '40%' }} />


                <Autocomplete
                    value={props.addressDeliveryClient.adressState}
                    onChange={(event: any, newValue: string | null) => {
                        //props.setvalueInputClientAdressState(newValue);
                        props.addressDeliveryClient.adressState = newValue
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