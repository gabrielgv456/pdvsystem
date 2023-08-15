import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import * as S from "./style"
import TextField from '@mui/material/TextField';
import { AiOutlineClose } from 'react-icons/ai';
import { useContext, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkModeProvider';
import { useApi } from '../../../../../hooks/useApi';
import { AuthContext } from '../../../../../contexts/Auth/AuthContext';
import { MdFileDownloadDone } from 'react-icons/md';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ptBR from 'dayjs/locale/pt-br'
import { useMessageBoxContext } from '../../../../../contexts/MessageBox/MessageBoxContext';
import { cellNumberFormat, cepFormat, cpfCnpjFormat, optionsUF, phoneNumberFormat } from '../../../../../utils/utils';
import { ClientsType } from '../../../../Sell/Modals/CheckOut';




interface ListClientstoAddClientProps {
    isModalAddClientOpen: boolean;
    setisModalAddClientOpen: (value: boolean) => void;
    setisModalSucessOpen?: (value: boolean) => void;
    searchClients?: () => void;
    handleChangeClient?: (newClient: ClientsType) => void
}



export const ModalAddClient = (props: ListClientstoAddClientProps) => {


    const Theme = useDarkMode()
    const { addClient } = useApi()

    const auth = useContext(AuthContext)
    const [valueInputClientName, setvalueInputClientName] = useState("")
    const [valueInputClientGender, setvalueInputClientGender] = useState("")
    const [valueInputClientCpfCnpj, setvalueInputClientCpfCnpj] = useState("")
    const [valueInputClientEmail, setvalueInputClientEmail] = useState("")
    const [valueInputClientBirthDate, setvalueInputClientBirthDate] = useState<string | null>(null)
    const [valueInputClientPhoneNumber, setvalueInputClientPhoneNumber] = useState("")
    const [valueInputClientCellNumber, setvalueInputClientCellNumber] = useState("")
    const [valueInputClientAdressStreet, setvalueInputClientAdressStreet] = useState("")
    const [valueInputClientAdressNumber, setvalueInputClientAdressNumber] = useState("")
    const [valueInputClientAdressNeighborhood, setvalueInputClientAdressNeighborhood] = useState("")
    const [valueInputClientAdressComplement, setvalueInputClientAdressComplement] = useState("")
    const [valueInputClientAdressCity, setvalueInputClientAdressCity] = useState("")
    const [valueInputClientAdressState, setvalueInputClientAdressState] = useState<string | null>(null)
    const [valueInputClientAdressCep, setvalueInputClientAdressCep] = useState("")
    const [valueInputClientActive, setvalueInputClientActive] = useState(true)
    const { MessageBox } = useMessageBoxContext()
    function eraseValues() {
        setvalueInputClientName("")
        setvalueInputClientGender("")
        setvalueInputClientCpfCnpj("")
        setvalueInputClientEmail("")
        setvalueInputClientBirthDate(null)
        setvalueInputClientPhoneNumber("")
        setvalueInputClientCellNumber("")
        setvalueInputClientAdressStreet("")
        setvalueInputClientAdressNumber("")
        setvalueInputClientAdressNeighborhood("")
        setvalueInputClientAdressComplement("")
        setvalueInputClientAdressCity("")
        setvalueInputClientAdressState(null)
        setvalueInputClientAdressCep("")
        setvalueInputClientActive(true)
    }

    async function handleCloseModalAddClient() {
        props.setisModalAddClientOpen(false)
        eraseValues()
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
                    setvalueInputClientAdressStreet(data.logradouro)
                    setvalueInputClientAdressNeighborhood(data.bairro)
                    setvalueInputClientAdressCity(data.localidade)
                    setvalueInputClientAdressState(data.uf)
                }
            }
            catch (error: any) {
                MessageBox('info', error.message)
            }
        }

    }

    const finaldataAddClientToSendApi = {
        storeId: auth.idUser,
        name: valueInputClientName,
        active: valueInputClientActive,
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

    const AddClientApi = async () => {
        try {
            if (!(valueInputClientCpfCnpj && valueInputClientName && valueInputClientBirthDate &&
                valueInputClientCpfCnpj !== "" && valueInputClientName !== "" && valueInputClientBirthDate !== "" &&
                (valueInputClientCpfCnpj.length === 14 || valueInputClientCpfCnpj.length === 18))
            ) { throw new Error('Campos obrigatórios não informados!') }
            const data = await addClient(finaldataAddClientToSendApi)
            if (data.Success) {
                props.setisModalAddClientOpen(false)
                if (props.setisModalSucessOpen) { props.setisModalSucessOpen(true) } else { MessageBox('success', 'Cliente cadastrado com sucesso! ') }
                if (props.searchClients) { props.searchClients() }
                if (props.handleChangeClient) { props.handleChangeClient(data.dataClient)}
                eraseValues()
            }
            else {
                throw new Error(data.erro)
            }
        }
        catch (error: any) {
            MessageBox('error', 'Falha ao adicionar cliente! ' + error.message)
        }
    }

    return (

        <Modal open={props.isModalAddClientOpen} onClose={handleCloseModalAddClient}>
            <Box sx={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: {
                    xs: '80%', // phone
                    sm: '80%', // tablets
                    md: 600, // small laptop
                    lg: 600, // desktop
                    xl: 600 // large screens
                },
                //width: '80%',
                bgcolor: Theme.DarkMode ? 'var(--backgroundDarkMode2)' : 'background.paper',
                color: Theme.DarkMode ? '#ffffff' : '#000',
                border: Theme.DarkMode ? '1px solid silver' : '',
                borderRadius: '6px',
                boxShadow: 24, p: 4,
            }}
            >
                <h3 style={{ width: 'max-content', margin: '0 auto' }}> Inclusão de Cliente </h3>
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
                            autoFocus
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
                                setvalueInputClientCpfCnpj(cpfCnpjFormat(e.target.value, valueInputClientCpfCnpj))
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
                                e.target.value.length > 40 ?
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
                                setvalueInputClientPhoneNumber(phoneNumberFormat(e.target.value, valueInputClientPhoneNumber))
                            }}
                            id="outlined-basic"
                            label="Telefone"
                            variant="outlined"
                            sx={{ width: '49%' }}
                        />

                        <TextField
                            value={valueInputClientCellNumber}
                            onChange={(e) => {
                                setvalueInputClientCellNumber(cellNumberFormat(e.target.value, valueInputClientCellNumber))
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
                                setvalueInputClientAdressCep(cepFormat(e.target.value, valueInputClientAdressCep))
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
                <S.ButtonModal onClick={AddClientApi} isDarkMode={Theme.DarkMode} style={{ margin: '0 auto' }}>
                    <MdFileDownloadDone size="22" />
                    <b>ADICIONAR CLIENTE</b>
                </S.ButtonModal>

                <S.ButtonCloseModal isDarkMode={Theme.DarkMode} onClick={handleCloseModalAddClient}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonCloseModal>


            </Box>
        </Modal>
    )
}