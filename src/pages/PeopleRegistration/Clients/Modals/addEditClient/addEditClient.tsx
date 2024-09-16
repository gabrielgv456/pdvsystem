import Modal from '@mui/material/Modal';
import * as S from "./style"
import * as type from "./interfaces"
import TextField from '@mui/material/TextField';
import { useContext, useEffect, useState } from 'react';
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
import { editClientTypeReq } from '../../../../../interfaces/useApi/editClientTypeReq';
import { BsCheckCircle } from 'react-icons/bs';

export const ModalAddEditClient = (props: type.ListClientstoAddClientProps) => {

    useEffect(() => {
        const getDefaultCity = async () => {
            if (props.client?.address?.city.ibge) {
                const city = await handleGetCitiesIbge(props.client?.address?.city.ibge)
                if (city) setSelectedCity(city[0])
            }
        }
        if (props.type === 'add') {
            handleGetCities(null)
        } else if (props.type === 'edit') {
            getDefaultCity()
        }
    }, [])

    useEffect(() => { setClientData(defaultClientData) }, [props.client])



    const Theme = useDarkMode()
    const { addClient, editClient, getCities } = useApi()
    const { MessageBox } = useMessageBoxContext()
    const auth = useContext(AuthContext)
    const [isSuccess, setIsSuccess] = useState(false)
    const [citiesOptions, setCitiesOptions] = useState<type.CityStateType[] | null>(null)
    const [selectedCity, setSelectedCity] = useState<type.CityStateType | null>(null)
    const defaultClientData: type.TypeClientData = {
        name: props.client?.name ?? "",
        gender: props.client?.gender ?? "",
        cpf: cpfCnpjFormat(props.client?.cpf ?? ""),
        email: props.client?.email ?? "",
        ie: props.client?.ie ?? "",
        suframa: props.client?.suframa ?? "",
        finalCostumer: (props.type === 'add') ? true : (props.client?.finalCostumer ?? false),
        birthDate: props.client?.birthDate ?? null,
        phoneNumber: phoneNumberFormat(props.client?.phoneNumber ?? ''),
        cellNumber: cellNumberFormat(props.client?.cellNumber ?? ""),
        active: props.client?.active ?? true,
        taxRegimeId: props.client?.taxRegimeId ?? null,
        taxPayerTypeId: props.client?.taxPayerTypeId ?? null,
        address: {
            addressStreet: props.client?.address?.addressStreet ?? "",
            addressNumber: props.client?.address?.addressNumber ?? "",
            addressNeighborhood: props.client?.address?.addressNeighborhood ?? "",
            addressComplement: props.client?.address?.addressComplement ?? "",
            addressCityId: props.client?.address?.cityId ?? 0,
            addressCep: cepFormat(props.client?.address?.addressCep ?? "")
        }
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

    function handleChangeClientDataAddress<T extends keyof type.Address>(
        property: T, value: type.Address[T]) {
        setClientData(prevState => {
            return {
                ...prevState,
                address: {
                    ...prevState.address,
                    [property]: value
                }
            }
        })
    }

    async function handleSelectCity(newValue: type.CityStateType | null) {
        setSelectedCity(newValue)
        if (newValue) {
            handleChangeClientDataAddress('addressCityId', newValue.id)
        }
    }
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

    async function handleGetCities(city: string | null) {
        try {
            const response = await getCities(city)
            if (!response.Success) throw new Error(response.erro ?? 'Erro desconhecido')
            setCitiesOptions(response.cities)
        } catch (error) {
            MessageBox('error', (error as Error).message)
        }
    }

    async function handleGetCitiesIbge(ibge: number | null): Promise<type.CityStateType[] | undefined> {
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

                if (data.erro) { MessageBox('error', 'CEP invalido') }
                else {
                    const city = await handleGetCitiesIbge(data.ibge)

                    if (city) {
                        setClientData({
                            ...clientData,
                            address: {
                                ...clientData.address,
                                addressCityId: city[0].id,
                                addressStreet: data.logradouro,
                                addressNeighborhood: data.bairro
                            }
                        })

                        setSelectedCity(city[0])
                    }
                }
            }
            catch (error) {
                MessageBox('info', (error as Error).message)
            }
        }

    }

    const finaldataAddClientToSendApi: editClientTypeReq = {
        storeId: auth.idUser,
        id: props.client?.id ?? null,
        addressId: 1,
        created_at: null,
        name: clientData.name,
        active: clientData.active,
        email: clientData.email ?? null,
        address: {
            cityId: clientData.address.addressCityId ?? null,
            addressCep: removeNotNumerics(clientData.address.addressCep) ?? null,
            addressComplement: clientData.address.addressComplement ?? null,
            addressNeighborhood: clientData.address.addressNeighborhood ?? null,
            addressNumber: clientData.address.addressNumber ?? null,
            addressStreet: clientData.address.addressStreet ?? null,
            addressTypeId: 2 // 2 = principal
        },
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
                if (props.type === 'add') { setIsSuccess(true) } else { MessageBox('success', `Cliente ${props.type === 'edit' && 'editado'} com sucesso! `) }
                if (props.type === 'edit') props.setisModalAddEditClientOpen(false)
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

    function handleContinueAddingClients() {
        setClientData(defaultClientData)
        setIsSuccess(false)
    }

    return (

        <Modal open={props.isModalAddEditClientOpen} onClose={handleCloseModalAddClient}>
            <MuiBox desktopWidth={600} mobileWidthPercent='80%'>
                {!isSuccess &&
                    <h3 style={{ width: 'max-content', margin: '0 auto' }}> {(props.type === 'add') ? 'Cadastro de Cliente' : (props.type === 'edit' && 'Edição de cliente')} </h3>
                }
                <S.DivModal>
                    {isSuccess ?
                        <>
                            <h3 style={{ alignSelf: 'center' }}>Cliente adicionado com sucesso!</h3>
                            <BsCheckCircle color="var(--Green)" size="50" className="IconSucess" />
                            <div style={{ display: 'flex', marginTop: '30px', gap: '5px' }}>
                                <S.ButtonAddSucessClientModal onClick={handleContinueAddingClients}><b>Continuar adicionando</b></S.ButtonAddSucessClientModal>
                                <S.ButtonExitSucessClientModal onClick={() => props.setisModalAddEditClientOpen(false)}><b>Sair</b></S.ButtonExitSucessClientModal>
                            </div>
                        </>
                        :
                        <>
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
                                    value={clientData.address.addressCep}
                                    onChange={(e) => {
                                        handleChangeClientDataAddress('addressCep', cepFormat(e.target.value, clientData.address.addressCep))
                                    }}
                                    onBlur={(e) => handleConsultCep(e.target.value)}
                                    id="outlined-basic"
                                    label="CEP"
                                    size='small'
                                    variant="outlined"
                                    sx={{ width: '27%' }}
                                />

                                <TextField
                                    value={clientData.address.addressStreet}
                                    onChange={(e) => {
                                        handleChangeClientDataAddress('addressStreet', e.target.value.length > 50 ?
                                            clientData.address.addressStreet : e.target.value)
                                    }}
                                    id="outlined-basic"
                                    label="Endereço"
                                    variant="outlined"
                                    size='small'
                                    sx={{ width: '57%' }}
                                />

                                <TextField
                                    value={clientData.address.addressNumber}
                                    onChange={(e) => {
                                        handleChangeClientDataAddress('addressNumber', e.target.value.length > 5 ?
                                            clientData.address.addressNumber : e.target.value)
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
                                    value={clientData.address.addressNeighborhood}
                                    onChange={(e) => handleChangeClientDataAddress('addressNeighborhood',
                                        e.target.value.length > 30 ?
                                            clientData.address.addressNeighborhood
                                            :
                                            e.target.value)}
                                    type="text"
                                    id="outlined-basic"
                                    label="Bairro"
                                    variant="outlined"
                                    size='small'
                                    sx={{ width: '40%' }} />



                                <Autocomplete
                                    value={selectedCity}
                                    onChange={(event: any, newValue: type.CityStateType | null) => {
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
                            value={clientData.addressState}
                            onChange={(event: any, newValue: string | null) => {
                                setClientData({ ...clientData, addressState: newValue });
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
                            } /> */}
                            </label>
                            <label style={{ display: 'flex', width: '95%' }}>
                                <input checked={clientData.finalCostumer ?? false} type='checkbox' onChange={(e) => {
                                    setClientData({ ...clientData, finalCostumer: e.target.checked })
                                }} />
                                Consumidor final
                            </label>

                        </>
                    }
                </S.DivModal>
                {!isSuccess &&
                    <S.ButtonModal onClick={AddClientApi} isDarkMode={Theme.DarkMode} style={{ margin: '0 auto' }}>
                        <MdFileDownloadDone size="22" />
                        {props.type === 'add' &&
                            <b>ADICIONAR CLIENTE</b>
                        }
                        {props.type === 'edit' &&
                            <b>EDITAR CLIENTE</b>
                        }
                    </S.ButtonModal>
                }
                <DefaultButtonCloseModal onClick={handleCloseModalAddClient}>
                    <DefaultIconCloseModal />
                </DefaultButtonCloseModal>
            </MuiBox>
        </Modal>
    )
}