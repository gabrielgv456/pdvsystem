import Modal from '@mui/material/Modal';
import * as S from "./style"
import * as type from "./interfaces"
import TextField from '@mui/material/TextField';
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
import { MuiBox } from '../../../../../components/box/muiBox';
import { DefaultButtonCloseModal, DefaultIconCloseModal } from '../../../../../components/buttons/closeButtonModal';
import { ClientsReturnApiProps } from '../..';

export const ModalAddEditClient = (props: type.ListClientstoAddClientProps) => {

    const Theme = useDarkMode()
    const { addClient, editClient } = useApi()
    const { MessageBox } = useMessageBoxContext()
    const auth = useContext(AuthContext)
    const defaultClientData: type.TypeClientData = {
        ClientName: props.client?.name ?? "",
        ClientGender: props.client?.gender ?? "",
        ClientCpfCnpj: props.client?.cpf ?? "",
        ClientEmail: props.client?.email ?? "",
        ClientIe: props.client?.ie ?? "",
        ClientSuframa: props.client?.suframa ?? "",
        ClientFinalCostumer: props.client?.finalCostumer ?? false,
        ClientBirthDate: props.client?.birthDate ?? null,
        ClientPhoneNumber: props.client?.phoneNumber ?? "",
        ClientCellNumber: props.client?.cellNumber ?? "",
        ClientAdressStreet: props.client?.adressStreet ?? "",
        ClientAdressNumber: props.client?.adressNumber ?? "",
        ClientAdressNeighborhood: props.client?.adressNeighborhood ?? "",
        ClientAdressComplement: props.client?.adressComplement ?? "",
        ClientAdressCity: props.client?.adressCity ?? "",
        ClientAdressState: props.client?.adressState ?? "",
        ClientAdressCep: props.client?.adressCep ?? "",
        ClientActive: props.client?.active ?? true,
        ClientTaxRegimeId: props.client?.taxRegimeId ?? null,
        ClientTaxPayerTypeId: props.client?.taxPayerTypeId ?? null
    }
    const [clientData, setClientData] = useState<type.TypeClientData>(defaultClientData)
    const [selectedTaxPayerId, setSelectedTaxPayerId] = useState<type.typeOptions | null>(null)
    const [selectedTaxRegimeId, setSelectedTaxRegimeId] = useState<type.typeOptions | null>(null)
    const optionsTaxPayerId: type.typeOptions[] = [{ id: 1, description: "1 - Contribuinte ICMS" },
    { id: 2, description: "2 - Contribuinte Isento" },
    { id: 9, description: "9 - Não Contribuinte, pode ou não possuir Inscrição Estadual" }]

    async function handleCloseModalAddClient() {
        props.setisModalAddEditClientOpen(false)
        if (props.type === 'add') setClientData(defaultClientData)
    }
    function handleChangeTaxPayerType(newValue: type.typeOptions | null) {
        setSelectedTaxPayerId(newValue)
        setClientData({ ...clientData, ClientTaxPayerTypeId: (newValue?.id ?? null) })
    }
    function handleChangeTaxRegimeId(newValue: type.typeOptions | null) {
        setSelectedTaxRegimeId(newValue)
        setClientData({ ...clientData, ClientTaxRegimeId: (newValue?.id ?? null) })
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
                    setClientData({ ...clientData, ClientAdressStreet: data.logradouro })
                    setClientData({ ...clientData, ClientAdressNeighborhood: data.bairro })
                    setClientData({ ...clientData, ClientAdressCity: data.localidade })
                    setClientData({ ...clientData, ClientAdressState: data.uf })
                }
            }
            catch (error: any) {
                MessageBox('info', error.message)
            }
        }

    }

    const finaldataAddClientToSendApi: ClientsReturnApiProps = {
        storeId: auth.idUser,
        idClient: props.client?.id,
        name: clientData.ClientName,
        active: clientData.ClientActive,
        email: clientData.ClientEmail,
        adressCep: clientData.ClientAdressCep !== null || "" ? (clientData.ClientAdressCep.replace(/[^0-9]/g, '')) : null,
        adressCity: clientData.ClientAdressCity,
        adressComplement: clientData.ClientAdressComplement,
        adressNeighborhood: clientData.ClientAdressNeighborhood,
        adressNumber: clientData.ClientAdressNumber,
        adressState: clientData.ClientAdressState,
        adressStreet: clientData.ClientAdressStreet,
        adressUF: clientData.ClientAdressState,
        birthDate: clientData.ClientBirthDate,
        cellNumber: clientData.ClientCellNumber !== null || "" ? (clientData.ClientCellNumber.replace(/[^0-9]/g, '')) : null,
        cpf: clientData.ClientCpfCnpj !== null || "" ? (clientData.ClientCpfCnpj.replace(/[^0-9]/g, '')) : null,
        gender: clientData.ClientCpfCnpj.length !== 18 ? clientData.ClientGender : null,
        phoneNumber: clientData.ClientPhoneNumber !== null || "" ? (clientData.ClientPhoneNumber.replace(/[^0-9]/g, '')) : null,
        ie: clientData.ClientIe,
        suframa: clientData.ClientSuframa,
        finalCostumer: clientData.ClientFinalCostumer,
        taxRegimeId: clientData.ClientTaxRegimeId,
        taxPayerTypeId: clientData.ClientTaxPayerTypeId
    }

    const AddClientApi = async () => {
        try {
            if (!(clientData.ClientCpfCnpj && clientData.ClientName && clientData.ClientBirthDate &&
                clientData.ClientCpfCnpj !== "" && clientData.ClientName !== "" && clientData.ClientBirthDate !== "" &&
                (clientData.ClientCpfCnpj.length === 14 || clientData.ClientCpfCnpj.length === 18))
            ) { throw new Error('Campos obrigatórios não informados!') }
            let data
            if (props.type === 'add')
                data = await addClient(finaldataAddClientToSendApi)
            else if (props.type === 'edit')
                data = await editClient(finaldataAddClientToSendApi)
            if (data.Success) {
                props.setisModalAddEditClientOpen(false)
                if (props.setisModalSucessOpen) { props.setisModalSucessOpen(true) } else { MessageBox('success', `Cliente ${props.type === 'add' ? 'cadastrado' : (props.type === 'edit' && 'editado')} com sucesso! `) }
                if (props.searchClients) { props.searchClients() }
                if (props.handleChangeClient) { props.handleChangeClient(data.dataClient) }
                if (props.type === 'add') setClientData(defaultClientData)
            }
            else {
                throw new Error(data.erro)
            }
        }
        catch (error: any) {
            MessageBox('error', `Falha ao ${props.type==='add' ? 'adicionar' : (props.type === 'edit' && 'editar')} cliente! ` + error.message)
        }
    }

    return (

        <Modal open={props.isModalAddEditClientOpen} onClose={handleCloseModalAddClient}>
            <MuiBox desktopWidth={600} mobileWidthPercent='80%'>
                <h3 style={{ width: 'max-content', margin: '0 auto' }}> {(props.type === 'add') ? 'Cadastro de Cliente' : (props.type === 'edit' && 'Edição de cliente')} </h3>
                <S.DivModal>
                    <label style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                        <TextField
                            value={clientData.ClientCpfCnpj}
                            onChange={(e) => {
                                setClientData({ ...clientData, ClientCpfCnpj: cpfCnpjFormat(e.target.value, clientData.ClientCpfCnpj) })
                            }}
                            label={clientData.ClientCpfCnpj.length === 0 ?
                                "CPF/CNPJ *"
                                :
                                clientData.ClientCpfCnpj.length === 14 ?
                                    "CPF *"
                                    :
                                    clientData.ClientCpfCnpj.length === 18 ?
                                        "CNPJ *"
                                        :
                                        "CPF/CNPJ *"
                            }
                            id="outlined-basic"
                            variant="outlined"
                            autoFocus
                            sx={{ width: '49%' }}
                        />


                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ptBR}>
                            <DatePicker
                                disableFuture

                                label={clientData.ClientCpfCnpj.length === 0 ?
                                    "Nascimento/Fundação *"
                                    :
                                    clientData.ClientCpfCnpj.length === 14 ?
                                        "Data de Nascimento *"
                                        :
                                        clientData.ClientCpfCnpj.length === 18 ?
                                            "Data de Fundação *"
                                            :
                                            "Nascimento/Fundação *"
                                }
                                openTo="year"
                                views={['year', 'month', 'day']}
                                value={clientData.ClientBirthDate}
                                onChange={(newValue) => {
                                    setClientData({ ...clientData, ClientBirthDate: newValue });
                                }}
                                renderInput={(params) => <TextField sx={{ width: '49%' }} {...params} variant="outlined" />}
                            />

                        </LocalizationProvider>
                    </label>
                    <label style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                        <TextField
                            value={clientData.ClientName}
                            onChange={(e) => {
                                setClientData(
                                    e.target.value.length > 40 ?
                                        clientData
                                        :
                                        { ...clientData, ClientName: e.target.value })
                            }}
                            id="outlined-basic"
                            label={clientData.ClientName.length === 0 ?
                                "Nome/Razão Social *"
                                :
                                clientData.ClientCpfCnpj.length === 14 ?
                                    "Nome *"
                                    :
                                    clientData.ClientCpfCnpj.length === 18 ?
                                        "Razão Social *"
                                        :
                                        "Nome/Razão Social *"
                            }
                            variant="outlined"
                            sx={{ width: clientData.ClientCpfCnpj.length < 18 ? '80%' : '60%' }}
                        />
                        {clientData.ClientCpfCnpj.length < 18 ?
                            <div style={{ display: 'flex', flexDirection: 'column', fontSize: "0.9rem", width: '20%', alignItems: 'center' }}>

                                <section >

                                    Gênero

                                </section>
                                <label style={{ fontSize: "0.8rem" }}>
                                    <input
                                        type="radio"

                                        value="M"
                                        checked={clientData.ClientGender === 'M'}
                                        onChange={(e) => setClientData({ ...clientData, ClientGender: e.target.value })}
                                    />M

                                    <input
                                        type="radio"
                                        value="F"
                                        style={{ marginLeft: "10px" }}
                                        checked={clientData.ClientGender === 'F'}
                                        onChange={(e) => setClientData({ ...clientData, ClientGender: e.target.value })}
                                    />F
                                </label>

                            </div>

                            :
                            <Autocomplete
                                value={selectedTaxRegimeId}
                                onChange={(event: any, newValue: type.typeOptions | null) => {
                                    handleChangeTaxRegimeId(newValue)
                                }}
                                noOptionsText="Não encontrado"
                                id="controllable-states-demo"
                                options={[{ id: 1, description: 'Lucro Real' },
                                { id: 2, description: 'Simples Nacional' },
                                { id: 3, description: 'Lucro Presumido' }]}
                                sx={{ width: '38%' }}
                                getOptionLabel={(option) => (option.description)}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        label="Regime Tributário"

                                    />
                                } />
                        }
                    </label>
                    <label style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                        <Autocomplete
                            value={selectedTaxPayerId}
                            onChange={(event: any, newValue: type.typeOptions | null) => {
                                handleChangeTaxPayerType(newValue)
                            }}
                            noOptionsText="Não encontrado"
                            id="controllable-states-demo"
                            options={optionsTaxPayerId}
                            getOptionLabel={(option) => (option.description)}
                            sx={{ width: '45%' }}
                            size='small'
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Tipo Contribuinte"
                                />
                            } />
                        <TextField
                            value={clientData.ClientSuframa}
                            onChange={(e) => {
                                setClientData(
                                    e.target.value.length > 40 ?
                                        clientData
                                        :
                                        { ...clientData, ClientSuframa: e.target.value })
                            }}
                            id="outlined-basic"
                            label="SUFRAMA"
                            size='small'
                            variant="outlined"
                            sx={{ width: '20%' }}
                        />
                        <TextField
                            value={clientData.ClientIe}
                            onChange={(e) => {
                                setClientData(
                                    e.target.value.length > 40 ?
                                        clientData
                                        :
                                        { ...clientData, ClientIe: e.target.value })
                            }}
                            id="outlined-basic"
                            label="Inscrição Estadual"
                            variant="outlined"
                            size='small'
                            sx={{ width: '32%' }}
                        />
                    </label>

                    <label style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                        <TextField
                            value={clientData.ClientEmail}
                            onChange={(e) => {
                                setClientData(
                                    e.target.value.length > 40 ?
                                        clientData
                                        :
                                        { ...clientData, ClientEmail: e.target.value })
                            }}
                            id="outlined-basic"
                            label="E-mail"
                            size='small'
                            variant="outlined"
                            sx={{ width: '100%' }}
                        />

                    </label>
                    <label style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                        <TextField
                            value={clientData.ClientPhoneNumber}
                            onChange={(e) => {
                                setClientData({ ...clientData, ClientPhoneNumber: phoneNumberFormat(e.target.value, clientData.ClientPhoneNumber) })
                            }}
                            id="outlined-basic"
                            label="Telefone"
                            variant="outlined"
                            size='small'
                            sx={{ width: '49%' }}
                        />

                        <TextField
                            value={clientData.ClientCellNumber}
                            onChange={(e) => {
                                setClientData({ ...clientData, ClientCellNumber: cellNumberFormat(e.target.value, clientData.ClientCellNumber) })
                            }}
                            id="outlined-basic"
                            label="Celular"
                            size='small'
                            variant="outlined"
                            sx={{ width: '49%' }}
                        />

                    </label>

                    <label style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>

                        <TextField
                            value={clientData.ClientAdressCep}
                            onChange={(e) => {
                                setClientData({ ...clientData, ClientAdressCep: cepFormat(e.target.value, clientData.ClientAdressCep) })
                            }}
                            onBlur={(e) => handleConsultCep(e.target.value)}
                            id="outlined-basic"
                            label="CEP"
                            size='small'
                            variant="outlined"
                            sx={{ width: '27%' }}
                        />

                        <TextField
                            value={clientData.ClientAdressStreet}
                            onChange={(e) => {
                                setClientData(
                                    e.target.value.length > 50 ?
                                        clientData
                                        :
                                        { ...clientData, ClientAdressStreet: e.target.value }
                                )
                            }}
                            id="outlined-basic"
                            label="Endereço"
                            variant="outlined"
                            size='small'
                            sx={{ width: '57%' }}
                        />

                        <TextField
                            value={clientData.ClientAdressNumber}
                            onChange={(e) => {
                                setClientData(
                                    e.target.value.length > 5 ?
                                        clientData
                                        :
                                        { ...clientData, ClientAdressNumber: e.target.value }
                                )
                            }}
                            id="outlined-basic"
                            label="Nº"
                            variant="outlined"
                            size='small'
                            sx={{ width: '13%' }}
                        />

                    </label>

                    <label style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                        <TextField
                            value={clientData.ClientAdressNeighborhood}
                            onChange={(e) => setClientData(
                                e.target.value.length > 30 ?
                                    clientData
                                    :
                                    { ...clientData, ClientAdressNeighborhood: e.target.value })}
                            type="text"
                            id="outlined-basic"
                            label="Bairro"
                            variant="outlined"
                            size='small'
                            sx={{ width: '40%' }} />

                        <TextField
                            value={clientData.ClientAdressCity}
                            onChange={(e) => setClientData(
                                e.target.value.length > 30 ?
                                    clientData
                                    :
                                    { ...clientData, ClientAdressCity: e.target.value })}
                            type="text"
                            id="outlined-basic"
                            label="Cidade"
                            size='small'
                            variant="outlined"
                            sx={{ width: '40%' }} />


                        <Autocomplete
                            value={clientData.ClientAdressState}
                            onChange={(event: any, newValue: string | null) => {
                                setClientData({ ...clientData, ClientAdressState: newValue });
                            }}
                            noOptionsText="Não encontrado"
                            id="controllable-states-demo"
                            size='small'
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
                    {props.type === 'add' &&
                        <b>ADICIONAR CLIENTE</b>
                    }
                    {props.type === 'edit' &&
                        <b>EDITAR CLIENTE</b>
                    }
                </S.ButtonModal>
                <DefaultButtonCloseModal onClick={handleCloseModalAddClient}>
                    <DefaultIconCloseModal />
                </DefaultButtonCloseModal>
            </MuiBox>
        </Modal>
    )
}