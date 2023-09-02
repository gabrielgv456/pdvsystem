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
import { cellNumberFormat, cepFormat, phoneNumberFormat } from '../../../../../utils/utils';
import { SellersandClientsType } from '../../../../SalesControl';
import { MuiBox } from '../../../../../components/box/muiBox';
import { DefaultButtonCloseModal, DefaultIconCloseModal } from '../../../../../components/buttons/closeButtonModal';

interface ListSellerstoAddSellerProps {
    isModalAddSellerOpen: boolean;
    setisModalAddSellerOpen: (value: boolean) => void;
    setisModalSucessOpen?: (value: boolean) => void;
    searchSellers?: () => void;
    handleChangeSeller?: (newSeller: SellersandClientsType) => void
}



export const ModalAddSeller = (props: ListSellerstoAddSellerProps) => {


    const Theme = useDarkMode()
    const { addSeller } = useApi()
    const auth = useContext(AuthContext)
    const [valueInputSellerName, setvalueInputSellerName] = useState("")
    const [valueInputSellerGender, setvalueInputSellerGender] = useState("")
    const [valueInputSellerCpf, setvalueInputSellerCpf] = useState("")
    const [valueInputSellerEmail, setvalueInputSellerEmail] = useState("")
    const [valueInputSellerBirthDate, setvalueInputSellerBirthDate] = useState<string | null>(null)
    const [valueInputSellerPhoneNumber, setvalueInputSellerPhoneNumber] = useState("")
    const [valueInputSellerCellNumber, setvalueInputSellerCellNumber] = useState("")
    const [valueInputSellerAdressStreet, setvalueInputSellerAdressStreet] = useState("")
    const [valueInputSellerAdressNumber, setvalueInputSellerAdressNumber] = useState("")
    const [valueInputSellerAdressNeighborhood, setvalueInputSellerAdressNeighborhood] = useState("")
    const [valueInputSellerAdressComplement, setvalueInputSellerAdressComplement] = useState("")
    const [valueInputSellerAdressCity, setvalueInputSellerAdressCity] = useState("")
    const [valueInputSellerAdressState, setvalueInputSellerAdressState] = useState<string | null>(null)
    const [valueInputSellerAdressCep, setvalueInputSellerAdressCep] = useState("")
    const [valueInputSellerActive, setvalueInputSellerActive] = useState(true)
    const optionsUF = ["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO"]
    const { MessageBox } = useMessageBoxContext()

    function eraseValues() {
        setvalueInputSellerName("")
        setvalueInputSellerGender("")
        setvalueInputSellerCpf("")
        setvalueInputSellerEmail("")
        setvalueInputSellerBirthDate(null)
        setvalueInputSellerPhoneNumber("")
        setvalueInputSellerCellNumber("")
        setvalueInputSellerAdressStreet("")
        setvalueInputSellerAdressNumber("")
        setvalueInputSellerAdressNeighborhood("")
        setvalueInputSellerAdressComplement("")
        setvalueInputSellerAdressCity("")
        setvalueInputSellerAdressState(null)
        setvalueInputSellerAdressCep("")
        setvalueInputSellerActive(true)
    }

    async function handleCloseModalAddSeller() {
        props.setisModalAddSellerOpen(false)
        eraseValues()
    }

    async function handleConsultCep(cep: string) {
        const cepformated = cep.replace(/[^0-9]/g, '')

        if (cepformated.length === 8) {
            try {
                const { data } = await axios.get(`https://viacep.com.br/ws/${cepformated}/json/`)

                if (data.erro) {
                    MessageBox('error', 'CEP invalido')
                }
                else {
                    setvalueInputSellerAdressStreet(data.logradouro)
                    setvalueInputSellerAdressNeighborhood(data.bairro)
                    setvalueInputSellerAdressCity(data.localidade)
                    setvalueInputSellerAdressState(data.uf)
                }
            }
            catch (error: any) {
                MessageBox('info', error.message)
            }
        }

    }

    const finaldataAddSellerToSendApi = {
        storeId: auth.idUser,
        name: valueInputSellerName,
        active: valueInputSellerActive,
        email: valueInputSellerEmail,
        adressCep: valueInputSellerAdressCep !== null || "" ? (valueInputSellerAdressCep.replace(/[^0-9]/g, '')) : null,
        adressCity: valueInputSellerAdressCity,
        adressComplement: valueInputSellerAdressComplement,
        adressNeighborhood: valueInputSellerAdressNeighborhood,
        adressNumber: valueInputSellerAdressNumber,
        adressState: valueInputSellerAdressState,
        adressStreet: valueInputSellerAdressStreet,
        birthDate: valueInputSellerBirthDate,
        cellNumber: valueInputSellerCellNumber !== null || "" ? (valueInputSellerCellNumber.replace(/[^0-9]/g, '')) : null,
        cpf: valueInputSellerCpf !== null || "" ? (valueInputSellerCpf.replace(/[^0-9]/g, '')) : null,
        gender: valueInputSellerCpf.length !== 18 ? valueInputSellerGender : null,
        phoneNumber: valueInputSellerPhoneNumber !== null || "" ? (valueInputSellerPhoneNumber.replace(/[^0-9]/g, '')) : null,

    }

    const AddSellerApi = async () => {
        try {
            if (!(valueInputSellerCpf && valueInputSellerName && valueInputSellerBirthDate && valueInputSellerGender &&
                valueInputSellerCpf !== "" && valueInputSellerName !== "" && valueInputSellerBirthDate !== "" &&
                (valueInputSellerCpf.length === 14 || valueInputSellerCpf.length === 18))) { throw new Error('Campos obrigatórios não informados') }
            const data = await addSeller(finaldataAddSellerToSendApi)
            if (!data.Success) { throw new Error(data.erro) }
            props.setisModalAddSellerOpen(false)
            if (props.setisModalSucessOpen) props.setisModalSucessOpen(true)
            if (props.searchSellers) props.searchSellers()
            if (props.handleChangeSeller) props.handleChangeSeller(data.dataSeller)
            eraseValues()
        }
        catch (error: any) {
            MessageBox('error', 'Falha ao adicionar vendedor! ' + error.message)
        }
    }

    return (

        <Modal open={props.isModalAddSellerOpen} onClose={handleCloseModalAddSeller}>
            <MuiBox desktopWidth={600} mobileWidthPercent='80%'>
                <h3 style={{ width: 'max-content', margin: '0 auto' }}> Cadastro de Vendedor </h3>
                <S.DivModal>
                    <label style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                        <TextField
                            value={valueInputSellerName}
                            onChange={(e) => {
                                setvalueInputSellerName(
                                    e.target.value.length > 40 ?
                                        valueInputSellerName
                                        :
                                        e.target.value)
                            }}
                            id="outlined-basic"
                            label={"Nome *"}
                            variant="outlined"
                            autoFocus
                            sx={{ width: '80%', color: 'red' }}
                        />
                        {valueInputSellerCpf.length < 18 &&
                            <div style={{ display: 'flex', flexDirection: 'column', fontSize: "0.9rem", width: '20%', alignItems: 'center' }}>

                                <section >

                                    Gênero

                                </section>
                                <label style={{ fontSize: "0.8rem" }}>
                                    <input
                                        type="radio"

                                        value="M"
                                        checked={valueInputSellerGender === 'M'}
                                        onChange={(e) => setvalueInputSellerGender(e.target.value)}
                                    />M

                                    <input
                                        type="radio"
                                        value="F"
                                        style={{ marginLeft: "10px" }}
                                        checked={valueInputSellerGender === 'F'}
                                        onChange={(e) => setvalueInputSellerGender(e.target.value)}
                                    />F
                                </label>

                            </div>
                        }
                    </label>

                    <label style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                        <TextField
                            value={valueInputSellerCpf}
                            onChange={(e) => {
                                setvalueInputSellerCpf(e.target.value.replace(/\D/g, '').length === 11 ?
                                    e.target.value.replace(/[^0-9]/g, '')
                                        .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4")
                                    : e.target.value.replace(/[^0-9]/g, '').length > 11 ?
                                        valueInputSellerCpf
                                        :
                                        e.target.value.replace(/[^0-9]/g, '')
                                )
                            }}
                            label={"CPF *"}
                            id="outlined-basic"
                            variant="outlined"
                            sx={{ width: '49%' }}
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ptBR}>
                            <DatePicker
                                disableFuture
                                label={"Data de Nascimento "}
                                openTo="year"
                                views={['year', 'month', 'day']}
                                value={valueInputSellerBirthDate}
                                onChange={(newValue) => {
                                    setvalueInputSellerBirthDate(newValue);
                                }}
                                renderInput={(params) => <TextField sx={{ width: '49%' }} {...params} />}
                            />
                        </LocalizationProvider>

                    </label>

                    <TextField
                        value={valueInputSellerEmail}
                        onChange={(e) => {
                            setvalueInputSellerEmail(
                                e.target.value.length > 40 ?
                                    valueInputSellerEmail
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
                            value={valueInputSellerPhoneNumber}
                            onChange={(e) => {
                                setvalueInputSellerPhoneNumber(
                                    phoneNumberFormat(e.target.value, valueInputSellerPhoneNumber))
                            }}
                            id="outlined-basic"
                            label="Telefone"
                            variant="outlined"
                            sx={{ width: '49%' }}
                        />

                        <TextField
                            value={valueInputSellerCellNumber}
                            onChange={(e) => {
                                setvalueInputSellerCellNumber(cellNumberFormat(e.target.value, valueInputSellerCellNumber))
                            }}
                            id="outlined-basic"
                            label="Celular"
                            variant="outlined"
                            sx={{ width: '49%' }}
                        />

                    </label>

                    <label style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>

                        <TextField
                            value={valueInputSellerAdressCep}
                            onChange={(e) => {
                                setvalueInputSellerAdressCep(cepFormat(e.target.value, valueInputSellerAdressCep))
                            }}
                            onBlur={(e) => handleConsultCep(e.target.value)}
                            id="outlined-basic"
                            label="CEP"
                            variant="outlined"
                            sx={{ width: '27%' }}
                        />

                        <TextField
                            value={valueInputSellerAdressStreet}
                            onChange={(e) => {
                                setvalueInputSellerAdressStreet(
                                    e.target.value.length > 50 ?
                                        valueInputSellerAdressStreet
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
                            value={valueInputSellerAdressNumber}
                            onChange={(e) => {
                                setvalueInputSellerAdressNumber(
                                    e.target.value.length > 5 ?
                                        valueInputSellerAdressNumber
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
                            value={valueInputSellerAdressNeighborhood}
                            onChange={(e) => setvalueInputSellerAdressNeighborhood(
                                e.target.value.length > 30 ?
                                    valueInputSellerAdressNeighborhood
                                    :
                                    e.target.value)}
                            type="text"
                            id="outlined-basic"
                            label="Bairro"
                            variant="outlined"
                            sx={{ width: '40%' }} />

                        <TextField
                            value={valueInputSellerAdressCity}
                            onChange={(e) => setvalueInputSellerAdressCity(
                                e.target.value.length > 30 ?
                                    valueInputSellerAdressCity
                                    :
                                    e.target.value)}
                            type="text"
                            id="outlined-basic"
                            label="Cidade"
                            variant="outlined"
                            sx={{ width: '40%' }} />


                        <Autocomplete
                            value={valueInputSellerAdressState}
                            onChange={(event: any, newValue: string | null) => {
                                setvalueInputSellerAdressState(newValue);
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
                <S.ButtonModal onClick={AddSellerApi} isDarkMode={Theme.DarkMode} style={{ margin: '0 auto' }}>
                    <MdFileDownloadDone size="22" />
                    <b>ADICIONAR VENDEDOR</b>
                </S.ButtonModal>
                <DefaultButtonCloseModal onClick={handleCloseModalAddSeller}>
                    <DefaultIconCloseModal />
                </DefaultButtonCloseModal>
            </MuiBox>
        </Modal>
    )
}