import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import * as S from "./style"
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';
import { useContext, useState } from 'react';
import { SellersReturnApiProps } from '../../../index'
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkModeProvider';
import { useApi } from '../../../../../../hooks/useApi';
import { AuthContext } from '../../../../../../contexts/Auth/AuthContext';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ptBR from 'dayjs/locale/pt-br'
import { useMessageBoxContext } from '../../../../../../contexts/MessageBox/MessageBoxContext';
import { cellNumberFormat, cepFormat, cpfCnpjFormat, phoneNumberFormat, removeNotNumerics, validateCPForCNPJ } from '../../../../../../utils/utils';
import { MuiBox } from '../../../../../../components/box/muiBox';
import { DefaultButtonCloseModal, DefaultIconCloseModal } from '../../../../../../components/buttons/closeButtonModal';

interface ListSellerstoEditSellerProps {
    seller: SellersReturnApiProps;
    isModalEditSellerOpen: boolean;
    handleCloseModalEditSeller: () => void;
    searchSellers: () => void;
}



export const ModalEditSeller = (props: ListSellerstoEditSellerProps) => {

    const cpfcnpjformated = cpfCnpjFormat(props.seller.cpf, props.seller.cpf, true);
    const cepformated = props.seller.adressCep !== null ? props.seller.adressCep.toString().replace(/(\d{5})(\d{3})/g, "$1-$2") : ""
    const cellformated = props.seller.cellNumber !== null ? props.seller.cellNumber.replace(/(\d{2})(\d{5})(\d{4})/g, "($1)$2-$3") : ""
    const telformated = props.seller.phoneNumber !== null ? props.seller.phoneNumber.replace(/(\d{2})(\d{4})(\d{4})/g, "($1)$2-$3") : ""

    const Theme = useDarkMode()
    const { editSeller } = useApi()
    const auth = useContext(AuthContext)
    //const birthDateFormated = props.seller.birthDate.toString().replace(/\T.+/g, "")
    const [valueInputSellerName, setvalueInputSellerName] = useState(props.seller.name)
    const [valueInputSellerGender, setvalueInputSellerGender] = useState(props.seller.gender)
    const [valueInputSellerCpfCnpj, setvalueInputSellerCpfCnpj] = useState(cpfcnpjformated)
    const [valueInputSellerEmail, setvalueInputSellerEmail] = useState(props.seller.email)
    const [valueInputSellerBirthDate, setvalueInputSellerBirthDate] = useState<string | null>(String(props.seller.birthDate))
    const [valueInputSellerPhoneNumber, setvalueInputSellerPhoneNumber] = useState(telformated)
    const [valueInputSellerCellNumber, setvalueInputSellerCellNumber] = useState(cellformated)
    const [valueInputSellerAdressStreet, setvalueInputSellerAdressStreet] = useState(props.seller.adressStreet)
    const [valueInputSellerAdressNumber, setvalueInputSellerAdressNumber] = useState(props.seller.adressNumber)
    const [valueInputSellerAdressNeighborhood, setvalueInputSellerAdressNeighborhood] = useState(props.seller.adressNeighborhood)
    const [valueInputSellerAdressComplement, setvalueInputSellerAdressComplement] = useState(props.seller.adressComplement)
    const [valueInputSellerAdressCity, setvalueInputSellerAdressCity] = useState(props.seller.adressCity)
    const [valueInputSellerAdressState, setvalueInputSellerAdressState] = useState(props.seller.adressState)
    const [valueInputSellerAdressCep, setvalueInputSellerAdressCep] = useState(cepformated)
    const [valueInputSellerActive, setvalueInputSellerActive] = useState(props.seller.active)
    const optionsUF = ["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO"]
    const { MessageBox } = useMessageBoxContext()

    async function handleConsultCep(cep: string) {
        const cepformated = removeNotNumerics(cep)

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
            catch (error) {
                MessageBox('info', (error as Error).message)
            }
        }

    }

    const finaldataEditSellerToSendApi = {
        storeId: auth.idUser,
        idSeller: props.seller.id,
        name: valueInputSellerName,
        email: valueInputSellerEmail,
        adressCep: valueInputSellerAdressCep !== null || "" ? (removeNotNumerics(valueInputSellerAdressCep)) : null,
        adressCity: valueInputSellerAdressCity,
        adressComplement: valueInputSellerAdressComplement,
        adressNeighborhood: valueInputSellerAdressNeighborhood,
        adressNumber: valueInputSellerAdressNumber,
        adressState: valueInputSellerAdressState,
        adressStreet: valueInputSellerAdressStreet,
        birthDate: valueInputSellerBirthDate,
        cellNumber: valueInputSellerCellNumber !== null || "" ? (removeNotNumerics(valueInputSellerCellNumber)) : null,
        cpf: valueInputSellerCpfCnpj !== null || "" ? (removeNotNumerics(valueInputSellerCpfCnpj)) : null,
        gender: valueInputSellerCpfCnpj.length !== 18 ? valueInputSellerGender : null,
        phoneNumber: valueInputSellerPhoneNumber !== null || "" ? (removeNotNumerics(valueInputSellerPhoneNumber)) : null,
        active: valueInputSellerActive
    }

    const EditSellerApi = async () => {
        if (!(valueInputSellerCpfCnpj && valueInputSellerName && valueInputSellerBirthDate && valueInputSellerGender &&
            valueInputSellerCpfCnpj !== "" && valueInputSellerName !== "" && valueInputSellerBirthDate !== "" &&
            (valueInputSellerCpfCnpj.length === 14 || valueInputSellerCpfCnpj.length === 18))
        ) { MessageBox('warning', 'Campos obrigatórios não informados!'); return }


        try {
            if (!(valueInputSellerEmail && valueInputSellerEmail.includes("@" && "."))) {
                throw new Error('E-mail inválido')
            }
            if (!(validateCPForCNPJ(valueInputSellerCpfCnpj))) { throw new Error('Cpf inválido') }
            const data = await editSeller(finaldataEditSellerToSendApi)
            if (data.Success) {
                props.handleCloseModalEditSeller()
                MessageBox('success', 'Vendedor editado com sucesso!')
                props.searchSellers()
            }
            else {
                MessageBox('error', data.erro)
            }
        }
        catch (error) {
            MessageBox('error', `Falha ao editar vendedor! ${(error as Error).message}`)
        }

    }

    return (

        <Modal open={props.isModalEditSellerOpen} onClose={props.handleCloseModalEditSeller}>
            <MuiBox desktopWidth={500} mobileWidthPercent='80%' >
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
                            sx={{ width: '80%' }}
                        />

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

                    </label>

                    <label style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                        <TextField
                            value={valueInputSellerCpfCnpj}
                            onChange={(e) => {
                                setvalueInputSellerCpfCnpj(e.target.value.replace(/\D/g, '').length === 11 ?
                                    removeNotNumerics(e.target.value)
                                        .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4")
                                    : removeNotNumerics(e.target.value).length > 11 ?
                                        valueInputSellerCpfCnpj
                                        :
                                        removeNotNumerics(e.target.value)
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
                                e.target.value.length > 50 ?
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
                                setvalueInputSellerPhoneNumber(phoneNumberFormat(e.target.value, valueInputSellerPhoneNumber))
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
                    <label>
                        Vendedor Habilitado
                        <Switch checked={valueInputSellerActive} onChange={(e) => { setvalueInputSellerActive(e.target.checked) }} />
                    </label>

                </S.DivModal>

                <S.ButtonModal onClick={EditSellerApi} isDarkMode={Theme.DarkMode} style={{ margin: '0 auto' }}>
                    <AiOutlineEdit size="22" />
                    <b>FINALIZAR EDIÇÃO</b>
                </S.ButtonModal>
                <DefaultButtonCloseModal onClick={props.handleCloseModalEditSeller}>
                    <DefaultIconCloseModal />
                </DefaultButtonCloseModal>
            </MuiBox>
        </Modal>

    )
}