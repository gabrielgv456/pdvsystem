import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import * as S from "./style"
import TextField from '@mui/material/TextField';
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkModeProvider';
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';
import { useApi } from '../../../../../../hooks/useApi';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../../../../contexts/Auth/AuthContext';
import { ClientsReturnApiProps } from '../../../index'
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ptBR from 'dayjs/locale/pt-br'


interface ListClientstoEditClientProps {
    client: ClientsReturnApiProps;
    isModalEditClientOpen: boolean;
    setisModalEditClientOpen: (value: boolean) => void;
    setisModalSucessOpen: (value: boolean) => void;
}



export const ModalEditClient = (props: ListClientstoEditClientProps) => {

    const cpfcnpjformated =
        props.client.cpf.replace(/\D/g, '').length === 11 ?
            props.client.cpf.replace(/\D/g, '')
                .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4")
            : props.client.cpf.replace(/\D/g, '').length === 14 ?
                props.client.cpf.replace(/\D/g, '')
                    .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5")
                : props.client.cpf.replace(/\D/g, '').length > 14 ?
                    props.client.cpf
                    :
                    props.client.cpf;
    const cepformated = props.client.adressCep !== null ? props.client.adressCep.toString().replace(/(\d{5})(\d{3})/g, "$1-$2") : ""
    const cellformated = props.client.cellNumber !== null ? props.client.cellNumber.replace(/(\d{2})(\d{5})(\d{4})/g, "($1)$2-$3") : ""
    const telformated = props.client.phoneNumber !== null ? props.client.phoneNumber.replace(/(\d{2})(\d{4})(\d{4})/g, "($1)$2-$3") : ""

    const Theme = useDarkMode()
    const { editClient } = useApi()
    const auth = useContext(AuthContext)
    //const birthDateFormated = props.client.birthDate.toString().replace(/\T.+/g, "")
    const [valueInputClientName, setvalueInputClientName] = useState(props.client.name)
    const [valueInputClientGender, setvalueInputClientGender] = useState(props.client.gender)
    const [valueInputClientCpfCnpj, setvalueInputClientCpfCnpj] = useState(cpfcnpjformated)
    const [valueInputClientEmail, setvalueInputClientEmail] = useState(props.client.email)
    const [valueInputClientBirthDate, setvalueInputClientBirthDate] = useState<string | null>(String(props.client.birthDate))
    const [valueInputClientPhoneNumber, setvalueInputClientPhoneNumber] = useState(telformated)
    const [valueInputClientCellNumber, setvalueInputClientCellNumber] = useState(cellformated)
    const [valueInputClientAdressStreet, setvalueInputClientAdressStreet] = useState(props.client.adressStreet)
    const [valueInputClientAdressNumber, setvalueInputClientAdressNumber] = useState(props.client.adressNumber)
    const [valueInputClientAdressNeighborhood, setvalueInputClientAdressNeighborhood] = useState(props.client.adressNeighborhood)
    const [valueInputClientAdressComplement, setvalueInputClientAdressComplement] = useState(props.client.adressComplement)

    const [valueInputClientAdressCity, setvalueInputClientAdressCity] = useState(props.client.adressCity)
    const [valueInputClientAdressState, setvalueInputClientAdressState] = useState(props.client.adressState)
    const [valueInputClientAdressCep, setvalueInputClientAdressCep] = useState(cepformated)
    //const [valueInputClientActive, setvalueInputClientActive] = useState(props.client.active)
    const optionsUF = ["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO"]


    function handleCloseModalEditClient() {
        props.setisModalEditClientOpen(false)
    }

    async function handleConsultCep(cep: string) {
        const cepformated = cep.replace(/[^0-9]/g, '')

        if (cepformated.length === 8) {
            try {
                const { data } = await axios.get(`https:\\viacep.com.br/ws/${cepformated}/json/`)

                if (data.erro) {
                    alert('CEP invalido')
                }
                else {
                    setvalueInputClientAdressStreet(data.logradouro)
                    setvalueInputClientAdressNeighborhood(data.bairro)
                    setvalueInputClientAdressCity(data.localidade)
                    setvalueInputClientAdressState(data.uf)
                }
            }
            catch (error) {
                console.log(error)
            }
        }

    }

    const finaldataEditClientToSendApi = {
        storeId: auth.idUser,
        idClient: props.client.id,
        name: valueInputClientName,
        email: valueInputClientEmail,
        adressCep: valueInputClientAdressCep !== null || "" ? (valueInputClientAdressCep.replace(/[^0-9]/g, '')) : null,
        adressCity: valueInputClientAdressCity,
        adressComplement: valueInputClientAdressComplement,
        adressNeighborhood: valueInputClientAdressNeighborhood,
        adressNumber: valueInputClientAdressNumber,
        adressState: valueInputClientAdressState,
        adressStreet: valueInputClientAdressStreet,
        birthDate: valueInputClientBirthDate,
        cellNumber: valueInputClientCellNumber !== null || "" ? (valueInputClientCellNumber.replace(/[^0-9]/g, '')) : null,
        cpf: valueInputClientCpfCnpj !== null || "" ? (valueInputClientCpfCnpj.replace(/[^0-9]/g, '')) : null,
        gender: valueInputClientCpfCnpj.length !== 18 ? valueInputClientGender : null,
        phoneNumber: valueInputClientPhoneNumber !== null || "" ? (valueInputClientPhoneNumber.replace(/[^0-9]/g, '')) : null,

    }

    const EditClientApi = async () => {
        if (valueInputClientCpfCnpj && valueInputClientName && valueInputClientBirthDate &&
            valueInputClientCpfCnpj !== "" && valueInputClientName !== "" && valueInputClientBirthDate !== "" &&
            (valueInputClientCpfCnpj.length === 14 || valueInputClientCpfCnpj.length === 18)
        ) {
            if (valueInputClientEmail === null || valueInputClientEmail === "") {
                try {
                    const data = await editClient(finaldataEditClientToSendApi)
                    if (data.Success) {
                        props.setisModalEditClientOpen(false)
                        props.setisModalSucessOpen(true)
                    }
                    else {
                        alert(data.erro)
                    }
                }
                catch (error) {
                    alert(`Falha ao enviar dados. ERRO:${error}`)
                }
            }
            else {
                if (valueInputClientEmail !== null && valueInputClientEmail.includes("@" && ".")) {
                    try {
                        const data = await editClient(finaldataEditClientToSendApi)
                        if (data.Success) {
                            props.setisModalEditClientOpen(false)
                            props.setisModalSucessOpen(true)
                        }
                        else {
                            alert(data.erro)
                        }
                    }
                    catch (error) {
                        alert(`Falha ao enviar dados. ERRO:${error}`)
                    }
                }
                else {
                    alert("Email inválido!")
                }
            }
        }
        else {
            alert("Campos obrigatórios não preenchidos !")
        }
    }

    return (

        <Modal open={props.isModalEditClientOpen} onClose={handleCloseModalEditClient}>
            <Box sx={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: {
                    xs: '80%', // phone
                    sm: '80%', // tablets
                    md: 500, // small laptop
                    lg: 500, // desktop
                    xl: 500 // large screens
                },
                //width: '80%',
                bgcolor: Theme.DarkMode ? 'var(--backgroundDarkMode2)' : 'background.paper',
                color: Theme.DarkMode ? '#ffffff' : '#000',
                border: Theme.DarkMode ? '1px solid silver' : '',
                boxShadow: 24, p: 4,
            }}
            >
                <S.DivModal>
                    <label style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                        <TextField
                            value={valueInputClientName}
                            onChange={(e) => {
                                setvalueInputClientName(
                                    e.target.value.length > 40 ?
                                        valueInputClientName
                                        :
                                        e.target.value)
                            }}
                            id="outlined-basic"
                            label={valueInputClientName.length === 0 ?
                                "Nome/Razão Social *"
                                :
                                valueInputClientCpfCnpj.length === 14 ?
                                    "Nome *"
                                    :
                                    valueInputClientCpfCnpj.length === 18 ?
                                        "Razão Social *"
                                        :
                                        "Nome/Razão Social *"
                            }
                            variant="outlined"
                            sx={{ width: '80%' }}
                        />
                        {valueInputClientCpfCnpj.length < 18 &&
                            <div style={{ display: 'flex', flexDirection: 'column', fontSize: "0.9rem", width: '20%', alignItems: 'center' }}>

                                <section >

                                    Gênero

                                </section>
                                <label style={{ fontSize: "0.8rem" }}>
                                    <input
                                        type="radio"

                                        value="M"
                                        checked={valueInputClientGender === 'M'}
                                        onChange={(e) => setvalueInputClientGender(e.target.value)}
                                    />M

                                    <input
                                        type="radio"
                                        value="F"
                                        style={{ marginLeft: "10px" }}
                                        checked={valueInputClientGender === 'F'}
                                        onChange={(e) => setvalueInputClientGender(e.target.value)}
                                    />F
                                </label>

                            </div>
                        }
                    </label>

                    <label style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                        <TextField
                            value={valueInputClientCpfCnpj}
                            onChange={(e) => {
                                setvalueInputClientCpfCnpj(e.target.value.replace(/\D/g, '').length === 11 ?
                                    e.target.value.replace(/[^0-9]/g, '')
                                        .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4")
                                    : e.target.value.replace(/\D/g, '').length === 14 ?
                                        e.target.value.replace(/[^0-9]/g, '')
                                            .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5")
                                        : e.target.value.replace(/[^0-9]/g, '').length > 14 ?
                                            valueInputClientCpfCnpj
                                            :
                                            e.target.value.replace(/[^0-9]/g, '')
                                )
                            }}
                            label={valueInputClientCpfCnpj.length === 0 ?
                                "CPF/CNPJ *"
                                :
                                valueInputClientCpfCnpj.length === 14 ?
                                    "CPF *"
                                    :
                                    valueInputClientCpfCnpj.length === 18 ?
                                        "CNPJ *"
                                        :
                                        "CPF/CNPJ *"
                            }
                            id="outlined-basic"
                            variant="outlined"
                            sx={{ width: '49%' }}
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ptBR}>
                            <DatePicker
                                disableFuture

                                label={valueInputClientCpfCnpj.length === 0 ?
                                    "Nascimento/Fundação *"
                                    :
                                    valueInputClientCpfCnpj.length === 14 ?
                                        "Data de Nascimento *"
                                        :
                                        valueInputClientCpfCnpj.length === 18 ?
                                            "Data de Fundação *"
                                            :
                                            "Nascimento/Fundação *"
                                }
                                openTo="year"
                                views={['year', 'month', 'day']}
                                value={valueInputClientBirthDate}
                                onChange={(newValue) => {
                                    setvalueInputClientBirthDate(newValue);
                                }}
                                renderInput={(params) => <TextField sx={{ width: '49%' }} {...params} variant="outlined" />}
                            />

                        </LocalizationProvider>


                    </label>

                    <TextField
                        value={valueInputClientEmail}
                        onChange={(e) => {
                            setvalueInputClientEmail(
                                e.target.value.length > 50 ?
                                    valueInputClientEmail
                                    :
                                    e.target.value)
                        }}
                        id="outlined-basic"
                        label="E-mail"
                        variant="outlined"
                        sx={{ width: '95%' }}
                    />


                    <label style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                        <TextField
                            value={valueInputClientPhoneNumber}
                            onChange={(e) => {
                                setvalueInputClientPhoneNumber(
                                    e.target.value.replace(/[^0-9]/g, '').length === 2 ?
                                        e.target.value.replace(/[^0-9]/g, '').replace(/(\d{2})/g, "($1)")
                                        :
                                        e.target.value.replace(/[^0-9]/g, '').length === 3 ?
                                            e.target.value.replace(/[^0-9]/g, '').replace(/(\d{2})(\d{1})(\d{*})/g, "($1)$2")
                                            :
                                            e.target.value.replace(/[^0-9]/g, '').length === 10 ?
                                                e.target.value.replace(/[^0-9]/g, '').replace(/(\d{2})(\d{4})(\d{4})/g, "($1)$2-$3")
                                                :
                                                e.target.value.replace(/[^0-9]/g, '').length > 10 ?
                                                    valueInputClientPhoneNumber
                                                    :
                                                    e.target.value.replace(/[^0-9]/g, '')
                                )
                            }}
                            id="outlined-basic"
                            label="Telefone"
                            variant="outlined"
                            sx={{ width: '49%' }}
                        />

                        <TextField
                            value={valueInputClientCellNumber}
                            onChange={(e) => {
                                setvalueInputClientCellNumber(
                                    e.target.value.replace(/[^0-9]/g, '').length === 2 ?
                                        e.target.value.replace(/[^0-9]/g, '').replace(/(\d{2})/g, "($1)")
                                        :
                                        e.target.value.replace(/[^0-9]/g, '').length === 3 ?
                                            e.target.value.replace(/[^0-9]/g, '').replace(/(\d{2})(\d{1})(\d{*})/g, "($1)$2")
                                            :
                                            e.target.value.replace(/[^0-9]/g, '').length === 11 ?
                                                e.target.value.replace(/[^0-9]/g, '').replace(/(\d{2})(\d{5})(\d{4})/g, "($1)$2-$3")
                                                :
                                                e.target.value.replace(/[^0-9]/g, '').length > 11 ?
                                                    valueInputClientCellNumber
                                                    :
                                                    e.target.value.replace(/[^0-9]/g, '')
                                )
                            }}
                            id="outlined-basic"
                            label="Celular"
                            variant="outlined"
                            sx={{ width: '49%' }}
                        />

                    </label>

                    <label style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>

                        <TextField
                            value={valueInputClientAdressCep}
                            onChange={(e) => {
                                setvalueInputClientAdressCep(
                                    e.target.value.replace(/[^0-9]/g, '').length === 8 ?
                                        e.target.value.toString().replace(/(\d{5})(\d{3})/g, "$1-$2")
                                        :
                                        e.target.value.replace(/[^0-9]/g, '').length > 8 ?
                                            valueInputClientAdressCep
                                            :
                                            e.target.value)
                            }}
                            onBlur={(e) => handleConsultCep(e.target.value)}
                            id="outlined-basic"
                            label="CEP"
                            variant="outlined"
                            sx={{ width: '27%' }}
                        />

                        <TextField
                            value={valueInputClientAdressStreet}
                            onChange={(e) => {
                                setvalueInputClientAdressStreet(
                                    e.target.value.length > 50 ?
                                        valueInputClientAdressStreet
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
                            value={valueInputClientAdressNumber}
                            onChange={(e) => {
                                setvalueInputClientAdressNumber(
                                    e.target.value.length > 5 ?
                                        valueInputClientAdressNumber
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
                            value={valueInputClientAdressNeighborhood}
                            onChange={(e) => setvalueInputClientAdressNeighborhood(
                                e.target.value.length > 30 ?
                                    valueInputClientAdressNeighborhood
                                    :
                                    e.target.value)}
                            type="text"
                            id="outlined-basic"
                            label="Bairro"
                            variant="outlined"
                            sx={{ width: '40%' }} />

                        <TextField
                            value={valueInputClientAdressCity}
                            onChange={(e) => setvalueInputClientAdressCity(
                                e.target.value.length > 30 ?
                                    valueInputClientAdressCity
                                    :
                                    e.target.value)}
                            type="text"
                            id="outlined-basic"
                            label="Cidade"
                            variant="outlined"
                            sx={{ width: '40%' }} />


                        <Autocomplete
                            value={valueInputClientAdressState}
                            onChange={(event: any, newValue: string | null) => {
                                setvalueInputClientAdressState(newValue);
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
                <S.ButtonModal onClick={EditClientApi} isDarkMode={Theme.DarkMode} style={{ margin: '0 auto' }}>
                    <AiOutlineEdit size="22" />
                    <b>FINALIZAR EDIÇÃO</b>
                </S.ButtonModal>

                <S.ButtonCloseModal isDarkMode={Theme.DarkMode} onClick={handleCloseModalEditClient}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonCloseModal>


            </Box>
        </Modal>
    )
}