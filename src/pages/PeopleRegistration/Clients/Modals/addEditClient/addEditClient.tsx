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
import { cellNumberFormat, cepFormat, cpfCnpjFormat, optionsUF, phoneNumberFormat, removeNotNumerics, validateCPForCNPJ } from '../../../../../utils/utils';
import { MuiBox } from '../../../../../components/box/muiBox';
import { DefaultButtonCloseModal, DefaultIconCloseModal } from '../../../../../components/buttons/closeButtonModal';
import { ClientsReturnApiProps } from '../..';

export const ModalAddEditClient = (props: type.ListClientstoAddClientProps) => {

    const Theme = useDarkMode()
    const { addClient, editClient } = useApi()
    const { MessageBox } = useMessageBoxContext()
    const auth = useContext(AuthContext)
    const defaultClientData: type.TypeClientData = {
        name: props.client?.name ?? "",
        gender: props.client?.gender ?? "",
        cpf: cpfCnpjFormat(props.client?.cpf ?? ""),
        email: props.client?.email ?? "",
        ie: props.client?.ie ?? "",
        suframa: props.client?.suframa ?? "",
        finalCostumer: props.client?.finalCostumer ?? false,
        birthDate: props.client?.birthDate ?? null,
        phoneNumber: phoneNumberFormat(props.client?.phoneNumber ?? ''),
        cellNumber: cellNumberFormat(props.client?.cellNumber ?? ""),
        adressStreet: props.client?.adressStreet ?? "",
        adressNumber: props.client?.adressNumber ?? "",
        adressNeighborhood: props.client?.adressNeighborhood ?? "",
        adressComplement: props.client?.adressComplement ?? "",
        adressCity: props.client?.adressCity ?? "",
        adressState: props.client?.adressState ?? "",
        adressCep: cepFormat(props.client?.adressCep ?? ""),
        active: props.client?.active ?? true,
        taxRegimeId: props.client?.taxRegimeId ?? null,
        taxPayerTypeId: props.client?.taxPayerTypeId ?? null
    }
    const optionsTaxPayerId: type.typeOptions[] = [{ id: 1, description: "1 - Contribuinte ICMS" },
    { id: 2, description: "2 - Contribuinte Isento" },
    { id: 9, description: "9 - Não Contribuinte, pode ou não possuir Inscrição Estadual" }]
    const optionsTaxRegimeId: type.typeOptions[] = [{ id: 1, description: 'Lucro Real' },
    { id: 2, description: 'Simples Nacional' },
    { id: 3, description: 'Lucro Presumido' }]
    const [clientData, setClientData] = useState<type.TypeClientData>(defaultClientData)
    const [selectedTaxPayerId, setSelectedTaxPayerId] = useState<type.typeOptions | null>(optionsTaxPayerId.find(item => item.id === props.client?.taxPayerTypeId) ?? null)
    const [selectedTaxRegimeId, setSelectedTaxRegimeId] = useState<type.typeOptions | null>(optionsTaxRegimeId.find(item => item.id === props.client?.taxRegimeId) ?? null)


    async function handleCloseModalAddClient() {
        props.setisModalAddEditClientOpen(false)
        if (props.type === 'add') setClientData(defaultClientData)
    }
    function handleChangeTaxPayerType(newValue: type.typeOptions | null) {
        setSelectedTaxPayerId(newValue)
        setClientData({ ...clientData, taxPayerTypeId: (newValue?.id ?? null) })
    }
    function handleChangeTaxRegimeId(newValue: type.typeOptions | null) {
        setSelectedTaxRegimeId(newValue)
        setClientData({ ...clientData, taxRegimeId: (newValue?.id ?? null) })
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
                    setClientData({
                        ...clientData,
                        adressStreet: data.logradouro,
                        adressNeighborhood: data.bairro,
                        adressCity: data.localidade,
                        adressState: data.uf
                    })
                }
            }
            catch (error) {
                MessageBox('info', (error as Error).message)
            }
        }

    }

    const finaldataAddClientToSendApi: ClientsReturnApiProps = {
        storeId: auth.idUser,
        idClient: props.client?.id,
        name: clientData.name,
        active: clientData.active,
        email: clientData.email ?? null,
        adressCep: (removeNotNumerics(clientData.adressCep)) ?? null,
        adressCity: clientData.adressCity ?? null,
        adressComplement: clientData.adressComplement ?? null,
        adressNeighborhood: clientData.adressNeighborhood ?? null,
        adressNumber: clientData.adressNumber ?? null,
        adressState: clientData.adressState ?? null,
        adressStreet: clientData.adressStreet ?? null,
        adressUF: clientData.adressState ?? null,
        birthDate: clientData.birthDate ?? null,
        cellNumber: (removeNotNumerics(clientData.cellNumber)) ?? null,
        cpf: (removeNotNumerics(clientData.cpf)) ?? null,
        gender: clientData.cpf.length !== 18 ? clientData.gender : null,
        phoneNumber: (removeNotNumerics(clientData.phoneNumber)) ?? null,
        ie: clientData.ie ?? null,
        suframa: clientData.suframa ?? null,
        finalCostumer: clientData.finalCostumer ?? null,
        taxRegimeId: clientData.taxRegimeId ?? null,
        taxPayerTypeId: clientData.taxPayerTypeId ?? null
    }

    const AddClientApi = async () => {
        try {
            if (!(clientData.cpf && clientData.name && clientData.birthDate)) {
                throw new Error('Campos obrigatórios não informados!')
            }
            if (!validateCPForCNPJ(clientData.cpf)) throw new Error('Cpf ou Cnpj inválido!')
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
        catch (error) {
            MessageBox('error', `Falha ao ${props.type === 'add' ? 'adicionar' : (props.type === 'edit' && 'editar')} cliente! ` + (error as Error).message)
        }
    }

    return (

        <Modal open={props.isModalAddEditClientOpen} onClose={handleCloseModalAddClient}>
            <MuiBox desktopWidth={600} mobileWidthPercent='80%'>
                <h3 style={{ width: 'max-content', margin: '0 auto' }}> {(props.type === 'add') ? 'Cadastro de Cliente' : (props.type === 'edit' && 'Edição de cliente')} </h3>
                <S.DivModal>
                    <label style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                        <TextField
                            value={clientData.cpf}
                            onChange={(e) => {
                                setClientData({ ...clientData, cpf: cpfCnpjFormat(e.target.value, clientData.cpf) })
                            }}
                            label={clientData.cpf.length === 0 ?
                                "CPF/CNPJ *"
                                :
                                clientData.cpf.length === 14 ?
                                    "CPF *"
                                    :
                                    clientData.cpf.length === 18 ?
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

                                label={clientData.cpf.length === 0 ?
                                    "Nascimento/Fundação *"
                                    :
                                    clientData.cpf.length === 14 ?
                                        "Data de Nascimento *"
                                        :
                                        clientData.cpf.length === 18 ?
                                            "Data de Fundação *"
                                            :
                                            "Nascimento/Fundação *"
                                }
                                openTo="year"
                                views={['year', 'month', 'day']}
                                value={clientData.birthDate}
                                onChange={(newValue) => {
                                    setClientData({ ...clientData, birthDate: newValue });
                                }}
                                renderInput={(params) => <TextField sx={{ width: '49%' }} {...params} variant="outlined" />}
                            />

                        </LocalizationProvider>
                    </label>
                    <label style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                        <TextField
                            value={clientData.name}
                            onChange={(e) => {
                                setClientData(
                                    e.target.value.length > 40 ?
                                        clientData
                                        :
                                        { ...clientData, name: e.target.value })
                            }}
                            id="outlined-basic"
                            label={clientData.name.length === 0 ?
                                "Nome/Razão Social *"
                                :
                                clientData.cpf.length === 14 ?
                                    "Nome *"
                                    :
                                    clientData.cpf.length === 18 ?
                                        "Razão Social *"
                                        :
                                        "Nome/Razão Social *"
                            }
                            variant="outlined"
                            sx={{ width: clientData.cpf.length < 18 ? '80%' : '60%' }}
                        />
                        {clientData.cpf.length < 18 ?
                            <div style={{ display: 'flex', flexDirection: 'column', fontSize: "0.9rem", width: '20%', alignItems: 'center' }}>

                                <section >

                                    Gênero

                                </section>
                                <label style={{ fontSize: "0.8rem" }}>
                                    <input
                                        type="radio"

                                        value="M"
                                        checked={clientData.gender === 'M'}
                                        onChange={(e) => setClientData({ ...clientData, gender: e.target.value })}
                                    />M

                                    <input
                                        type="radio"
                                        value="F"
                                        style={{ marginLeft: "10px" }}
                                        checked={clientData.gender === 'F'}
                                        onChange={(e) => setClientData({ ...clientData, gender: e.target.value })}
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
                                options={optionsTaxRegimeId}
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
                            value={clientData.suframa}
                            onChange={(e) => {
                                setClientData(
                                    e.target.value.length > 40 ?
                                        clientData
                                        :
                                        { ...clientData, suframa: e.target.value })
                            }}
                            id="outlined-basic"
                            label="SUFRAMA"
                            size='small'
                            variant="outlined"
                            sx={{ width: '20%' }}
                        />
                        <TextField
                            value={clientData.ie}
                            onChange={(e) => {
                                setClientData(
                                    e.target.value.length > 40 ?
                                        clientData
                                        :
                                        { ...clientData, ie: e.target.value })
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
                            value={clientData.email}
                            onChange={(e) => {
                                setClientData(
                                    e.target.value.length > 40 ?
                                        clientData
                                        :
                                        { ...clientData, email: e.target.value })
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
                            value={clientData.phoneNumber}
                            onChange={(e) => {
                                setClientData({ ...clientData, phoneNumber: phoneNumberFormat(e.target.value, clientData.phoneNumber) })
                            }}
                            id="outlined-basic"
                            label="Telefone"
                            variant="outlined"
                            size='small'
                            sx={{ width: '49%' }}
                        />

                        <TextField
                            value={clientData.cellNumber}
                            onChange={(e) => {
                                setClientData({ ...clientData, cellNumber: cellNumberFormat(e.target.value, clientData.cellNumber) })
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
                            value={clientData.adressCep}
                            onChange={(e) => {
                                setClientData({ ...clientData, adressCep: cepFormat(e.target.value, clientData.adressCep) })
                            }}
                            onBlur={(e) => handleConsultCep(e.target.value)}
                            id="outlined-basic"
                            label="CEP"
                            size='small'
                            variant="outlined"
                            sx={{ width: '27%' }}
                        />

                        <TextField
                            value={clientData.adressStreet}
                            onChange={(e) => {
                                setClientData(
                                    e.target.value.length > 50 ?
                                        clientData
                                        :
                                        { ...clientData, adressStreet: e.target.value }
                                )
                            }}
                            id="outlined-basic"
                            label="Endereço"
                            variant="outlined"
                            size='small'
                            sx={{ width: '57%' }}
                        />

                        <TextField
                            value={clientData.adressNumber}
                            onChange={(e) => {
                                setClientData(
                                    e.target.value.length > 5 ?
                                        clientData
                                        :
                                        { ...clientData, adressNumber: e.target.value }
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
                            value={clientData.adressNeighborhood}
                            onChange={(e) => setClientData(
                                e.target.value.length > 30 ?
                                    clientData
                                    :
                                    { ...clientData, adressNeighborhood: e.target.value })}
                            type="text"
                            id="outlined-basic"
                            label="Bairro"
                            variant="outlined"
                            size='small'
                            sx={{ width: '40%' }} />

                        <TextField
                            value={clientData.adressCity}
                            onChange={(e) => setClientData(
                                e.target.value.length > 30 ?
                                    clientData
                                    :
                                    { ...clientData, adressCity: e.target.value })}
                            type="text"
                            id="outlined-basic"
                            label="Cidade"
                            size='small'
                            variant="outlined"
                            sx={{ width: '40%' }} />


                        <Autocomplete
                            value={clientData.adressState}
                            onChange={(event: any, newValue: string | null) => {
                                setClientData({ ...clientData, adressState: newValue });
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
                    <label style={{ display: 'flex', width: '95%' }}>
                        <input checked={clientData.finalCostumer ?? false} type='checkbox' onChange={(e) => {
                            setClientData({ ...clientData, finalCostumer: e.target.checked })
                        }} />
                        Consumidor final
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