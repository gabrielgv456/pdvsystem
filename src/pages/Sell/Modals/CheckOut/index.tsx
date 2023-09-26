import Modal from '@mui/material/Modal';
import { useState, useEffect, useContext } from 'react';
import { MdAddCircleOutline, MdPending } from "react-icons/md"
import { HiBadgeCheck } from "react-icons/hi"
import { AiFillCloseCircle, AiFillPrinter, AiOutlineClose, AiOutlineCloseCircle } from "react-icons/ai"
import { BsFillBagCheckFill, BsFillCreditCardFill, BsFillCreditCard2FrontFill, BsPersonBadge, BsFillPersonFill } from "react-icons/bs"
import { PaymentMethods } from "../../PaymentMethods/PaymentMethods";
import { GeneratePDFSell } from "../../../../components/pdfGenerator/GeneratePDFSell";
import PixIcon from '@mui/icons-material/Pix';
import { FaMoneyBillWave, FaTruck } from "react-icons/fa"
import * as S from './style'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkModeProvider';
import { useApi } from '../../../../hooks/useApi';
import { AuthContext } from "../../../../contexts/Auth/AuthContext";
import { useMessageBoxContext } from '../../../../contexts/MessageBox/MessageBoxContext';
import { MethodsType, ProductsType, ProductsTypeOptions } from '../..';
import Radio from '@mui/material/Radio';
import { DeliveryAddressClient } from './Components/AddressClient';
import { ModalAddClient } from '../../../PeopleRegistration/Clients/Modals/addClient/addClient';
import { ModalSuccessClient } from '../../../PeopleRegistration/Clients/Modals/Success/modalSuccess';
import { ModalAddSeller } from '../../../PeopleRegistration/Sellers/Modals/addSeller';
import { MuiBox } from '../../../../components/box/muiBox';
import { IoMdCloseCircle } from 'react-icons/io';
import { DefaultButtonCloseModal, DefaultIconCloseModal } from '../../../../components/buttons/closeButtonModal';
import { DefaultButton } from '../../../../components/buttons/defaultButton';
import { RiFileList3Line } from 'react-icons/ri';
import { GeneratePDFBudget } from '../../../../components/pdfGenerator/GeneratePDFBudget';

interface handleChangeProps {
    UserId: number;
    totalValue: number;
    valuePayment: number;
    changeValue: number | null;
    sellerId: number | null;
    clientId: number | null;
    Products: ProductsType[];
    Payment: MethodsType[];
    isDelivery: boolean;
    delivery: deliveryAddressClientType
}

interface SellersOptionType {
    name: string;
    code: number;
}


export interface SellersandClientsType {
    id: number;
    name: string;
    cpf: string;
    active: boolean;
}
export interface ClientsType {
    id: number;
    name: string;
    gender: string;
    cpf: string;
    email: string | null;
    created_at: Date;
    active: boolean;
    birthDate: Date,
    phoneNumber: string | null,
    cellNumber: string | null,
    adressStreet: string | null,
    adressNumber: string | null,
    adressNeighborhood: string,
    adressComplement: string | null,
    adressCity: string | null,
    adressState: string | null,
    adressCep: string | null,
    adressUF: string | null
}

export interface deliveryAddressClientType {
    addressStreet: string | null,
    addressNumber: string | null,
    addressNeighborhood: string | null,
    addressComplement: string | null,
    addressCity: string | null,
    addressState: string | null,
    addressCep: string,
    addressUF: string | null,
    scheduledDate: Date | null
    | null
}

export type typesPayment = 'money' | 'debitcard' | 'creditcard' | 'pix' | 'others' | 'onDelivery'

interface ModalCheckOutProps {
    listMethods: MethodsType[]
    setMethods: (value: MethodsType[]) => void
    isModalConfirmSellOpen: boolean
    setisModalConfirmSellOpen: (value: boolean) => void
    needReturnCash: string
    setListProducts: (value: ProductsType[]) => void
    setinputProducts: (value: ProductsTypeOptions | null) => void
    setNeedReturnCash: (value: string) => void
    sumvalue: number
    sumpayvalue: number
    sumCost: number
    listProducts: ProductsType[]
    formatedmissvalue: string
    calculatemissvalue: number
    sumvalueformated: string
    sumquantity: number
    sumDiscount: number
}


export const ModalCheckOut = (props: ModalCheckOutProps) => {

    const Theme = useDarkMode()
    const { MessageBox } = useMessageBoxContext()
    const auth = useContext(AuthContext);
    const { addsell, findSellers, findClients } = useApi()
    const [isSellEnded, setisSellEnded] = useState(false)
    const [inputSeller, setInputSeller] = useState<SellersandClientsType | null>(null)
    const [inputClient, setInputClient] = useState<ClientsType | null>(null)
    const [codRefSell, setCodRefSell] = useState<number | null>(null)
    const [sellers, setSellers] = useState<SellersandClientsType[]>([])
    const [clients, setClients] = useState<ClientsType[]>([])
    const [selectedDeliveryType, setSelectedDeliveryType] = useState('instantDelivery');
    const [isModalAddClientOpen, setisModalAddClientOpen] = useState(false)
    const [isModalAddSellerOpen, setisModalAddSellerOpen] = useState(false)
    const [addressDeliveryClient, setDeliveryClientType] = useState<deliveryAddressClientType>({ addressCep: '', addressCity: '', addressComplement: '', addressNeighborhood: '', addressNumber: '', addressState: '', addressStreet: '', addressUF: '', scheduledDate: null })
    const handleChangeDeliveryType = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === 'instantDelivery') {
            props.setMethods(props.listMethods.filter(method => method.type !== 'onDelivery'))
        }
        setSelectedDeliveryType(event.target.value);
    };

    async function handleChangeSeller(newSeller: SellersandClientsType | null) {
        setInputSeller(newSeller);
    }

    async function handleChangeClient(newClient: ClientsType | null) {
        setInputClient(newClient);
        setDeliveryClientType({
            ...addressDeliveryClient,
            addressCep: newClient?.adressCep ?? '',
            addressCity: newClient?.adressCity ?? '',
            addressComplement: newClient?.adressComplement ?? '',
            addressNeighborhood: newClient?.adressNeighborhood ?? '',
            addressNumber: newClient?.adressNumber ?? '',
            addressState: newClient?.adressState ?? '',
            addressStreet: newClient?.adressStreet ?? '',
            addressUF: newClient?.adressUF ?? ''
        })
    }

    useEffect(() => {

        const SellersSearch = async () => {
            const data = await findSellers(auth.idUser);
            if (data.Success) {
                setSellers(data.findSellers)
            }
            else {
                MessageBox('error', data.erro)
            }
        }
        const ClientsSearch = async () => {
            const data = await findClients(auth.idUser);
            if (data.Success) {
                setClients(data.findClients)
            }
            else {
                MessageBox('error', data.erro)
            }
        }
        ClientsSearch();
        SellersSearch();
    }, [])

    const handleAddMethod = (valuetype: typesPayment) => {
        const alreadyexistMethod = verifyifexistsMethod(valuetype)
        if (!alreadyexistMethod) {
            let newMethods = [...props.listMethods]
            newMethods.push({
                id: props.listMethods.length + 1,
                type: valuetype,
                value: 0,
                valueFormated: ""

            })
            props.setMethods(newMethods)

        }
    }

    const verifyifexistsMethod = (method: string) => {
        const existsMethod = props.listMethods.some((item) => item.type === method)
        return existsMethod
    }

    function handleRemoveMethod(id: number) {
        let filteredmethods = props.listMethods.filter(method => method.id !== id)
        props.setMethods(filteredmethods)
    }

    function handleEditMethod(id: number, value: number, valueformated: string) {
        let newMethods = [...props.listMethods]

        for (let i in newMethods) {
            if (newMethods[i].id === id) {
                newMethods[i].value = value
                newMethods[i].valueFormated = valueformated
            }

            props.setMethods(newMethods)
        }
    }

    function handleRemoveOneMethod(id: number, value: number) {

        let newMethods = [...props.listMethods]
        for (let i in newMethods) {
            if (newMethods[i].id === id) {
                newMethods[i].value = newMethods[i].value - 25
            }
        }
        props.setMethods(newMethods)

    }

    function handleCloseModalConfirmSell() {
        if (isSellEnded) {
            props.setListProducts([])
            props.setMethods([])
            props.setNeedReturnCash('N')
            setInputClient(null)
            setInputSeller(null)
            setSelectedDeliveryType('instantDelivery')
            setDeliveryClientType({ addressCep: '', addressCity: '', addressComplement: '', addressNeighborhood: '', addressNumber: '', addressState: '', addressStreet: '', addressUF: '', scheduledDate: null })
            props.setinputProducts(null)
            props.setisModalConfirmSellOpen(false)
            setisSellEnded(false)
        } else {
            props.setisModalConfirmSellOpen(false)
        }
    }

    const finallistapi = {
        UserId: auth.idUser,
        totalValue: props.sumvalue,
        totalDiscount: props.sumDiscount > 0 ? props.sumDiscount : null,
        valuePayment: props.sumpayvalue,
        changeValue: null,
        totalCost: props.sumCost,
        sellerId: inputSeller ? inputSeller.id : null,
        clientId: inputClient ? inputClient.id : null,
        Products: [...props.listProducts],
        Payment: [...props.listMethods],
        isDelivery: (selectedDeliveryType === 'futureDelivery'),
        delivery: { ...addressDeliveryClient }
    }

    const handleSendtoApi = async (valuesSelltoSendApi: handleChangeProps) => {
        if (props.listMethods.length === 0) {
            MessageBox('warning', " Insira um método de pagamento!")
            return
        }
        if (valuesSelltoSendApi.isDelivery && String(valuesSelltoSendApi.delivery.scheduledDate) === 'Invalid Date') {
            MessageBox('warning', 'Data de entrega inválida! Corrija e tente novamente')
            return
        }
        if (props.listMethods.some(method => Number.isNaN(method.value)) || props.listMethods.some(method => method.value === 0)) {
            MessageBox('warning', 'Existe método de pagamento vazio, remova ou insira o valor!')
            return
        }
        if (props.needReturnCash === 'N') {
            MessageBox('warning', ` Restam ${props.formatedmissvalue} a serem recebidos!`)
            return
        }
        if (valuesSelltoSendApi.isDelivery) {
            try {
                if (!valuesSelltoSendApi.delivery.addressCep) throw new Error(`Cep obrigatório!`)
                if (!valuesSelltoSendApi.delivery.addressCity) throw new Error(`Cidade obrigatória!`)
                if (!valuesSelltoSendApi.delivery.addressNeighborhood) throw new Error(`Bairro obrigatório!`)
                if (!valuesSelltoSendApi.delivery.addressNumber) throw new Error(`Número residencia obrigatório!`)
                if (!valuesSelltoSendApi.delivery.addressState) throw new Error(`Estado obrigatório!`)
                if (!valuesSelltoSendApi.delivery.addressStreet) throw new Error(`Rua obrigatória!`)
                if (!valuesSelltoSendApi.delivery.scheduledDate) throw new Error(`Data de entrega obrigatória!`)
            } catch (error: any) {
                MessageBox('warning', error.message)
                return
            }
        }
        if (props.needReturnCash === 'Y') {
            if (window.confirm(`Confirma o troco de ${props.formatedmissvalue} ?`)) {
                if (props.listMethods.length !== 0 && props.calculatemissvalue <= 0) {
                    valuesSelltoSendApi.changeValue = Math.abs(props.calculatemissvalue) //convert negative to positive       
                    try {
                        const data = await addsell(valuesSelltoSendApi)
                        if (!data.Success) {
                            throw new Error(data.Erro)
                        }
                        setisSellEnded(true)
                        setCodRefSell(data.codRef)
                    } catch (error: any) {
                        MessageBox('error', error.message)
                    }
                }
            }
        }
        if (props.needReturnCash === 'OK') {
            if (props.listMethods.length !== 0 && props.calculatemissvalue <= 0) {
                try {
                    const data = await addsell(valuesSelltoSendApi)
                    if (!data.Success) {
                        throw new Error(data.Erro)
                    }
                    setisSellEnded(true)
                    setCodRefSell(data.codRef)
                } catch (error: any) {
                    MessageBox('error', error.message)
                }
            }
        }
    }

    return (
        <>
            <Modal open={props.isModalConfirmSellOpen} onClose={handleCloseModalConfirmSell}>
                <MuiBox desktopWidth={650} mobileWidthPercent='90%' padding='25px'>
                    <S.SectionMConfirmSell>
                        {(isSellEnded && codRefSell) && <div style={{ fontSize: '1.1rem' }}><b>Código da venda: </b> {codRefSell}</div>}
                        <div style={{ fontSize: '1.1rem', marginBottom: '0px' }}><b>Total:</b> {props.sumvalueformated}</div>
                        {props.needReturnCash === 'N' ? <div style={{ fontSize: '1.1rem' }}><b>Restante:</b> {props.formatedmissvalue}</div> : ''}
                        {props.needReturnCash === 'Y' && <div style={{ fontSize: '1.1rem', color: 'red' }}><b>Troco:</b> {props.formatedmissvalue}</div>}
                        {props.needReturnCash === 'OK' && <div style={{ fontSize: '1.1rem', color: 'green' }}><b>Restante:</b> {props.formatedmissvalue}</div>}
                    </S.SectionMConfirmSell>
                    {isSellEnded ? <S.LabelSellEnded><HiBadgeCheck className="HiBadgeCheck" style={{ color: 'var(--Green)' }} size="130" /> Venda confirmada com sucesso ! </S.LabelSellEnded> : ''}

                    {isSellEnded ? '' :
                        <div>
                            <S.DivInputs>
                                <S.labelClient>
                                    <BsFillPersonFill size="22" color="#5d5c5c" />
                                    <Autocomplete
                                        style={{ width: '84%' }}
                                        options={clients}
                                        value={inputClient}
                                        onChange={(event: any, newValue: ClientsType | null) => {
                                            handleChangeClient(newValue)
                                        }}
                                        getOptionLabel={(option) =>
                                            (option.cpf)
                                                .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4")
                                                .concat(" - ")
                                                .concat(option.name)
                                        }
                                        //getOptionLabel={ (option: SellersOptionType) => option.name}
                                        id="autocomplete_clients"
                                        autoComplete
                                        noOptionsText="Nenhum resultado"
                                        includeInputInList
                                        renderInput={(params) => (
                                            <TextField {...params} label="Cliente" variant="standard" />
                                        )}
                                    />
                                    <button style={{ border: 'none', background: 'none' }}>
                                        <MdAddCircleOutline size='22' color='var(--Green)' onClick={() => setisModalAddClientOpen(true)} />
                                    </button>
                                </S.labelClient>
                                <S.labelSeller>
                                    <BsPersonBadge size="22" color="#5d5c5c" />
                                    <Autocomplete
                                        style={{ width: '84%' }}
                                        options={sellers.filter(seller => seller.active)}
                                        getOptionLabel={(option) => option.name}
                                        value={inputSeller}
                                        onChange={(event: any, newValue: SellersandClientsType | null) => {
                                            handleChangeSeller(newValue)
                                        }}
                                        //getOptionLabel={ (option: SellersOptionType) => option.name}
                                        id="autocomplete_sellers"
                                        autoComplete
                                        includeInputInList
                                        noOptionsText="Nenhum resultado"
                                        renderInput={(params) => (
                                            <TextField {...params} label="Vendedor" variant="standard" />
                                        )}
                                    />
                                    <button style={{ border: 'none', background: 'none' }}>
                                        <MdAddCircleOutline size='22' color='var(--Green)' onClick={() => setisModalAddSellerOpen(true)} />
                                    </button>
                                </S.labelSeller>
                            </S.DivInputs>
                            <div>
                                <S.PHeaderModal>Qual será o tipo de entrega?</S.PHeaderModal>
                                <Radio
                                    checked={selectedDeliveryType === 'instantDelivery'}
                                    onChange={handleChangeDeliveryType}
                                    value="instantDelivery"
                                    name="radio-buttons"
                                    inputProps={{ 'aria-label': 'A' }}
                                />
                                Entrega Imediata
                                <Radio
                                    checked={selectedDeliveryType === 'futureDelivery'}
                                    onChange={handleChangeDeliveryType}
                                    value="futureDelivery"
                                    name="radio-buttons"
                                    inputProps={{ 'aria-label': 'B' }}
                                />
                                Entrega Futura
                            </div>
                            {selectedDeliveryType === 'futureDelivery' &&
                                <DeliveryAddressClient
                                    setDeliveryClientType={setDeliveryClientType}
                                    addressDeliveryClient={addressDeliveryClient}
                                    inputClient={inputClient}
                                />
                            }
                            <S.PHeaderModal>Qual a forma de pagamento?</S.PHeaderModal>
                        </div>

                    }
                    {!isSellEnded &&
                        <S.DivModalIconsPayment>
                            <S.LabelIconsModal onClick={() => handleAddMethod('money')} isDarkMode={Theme.DarkMode} ><FaMoneyBillWave className="hoverbutton" size={25} style={{ color: '#23591b' }} />Dinheiro</S.LabelIconsModal>
                            <S.LabelIconsModal onClick={() => handleAddMethod('debitcard')} isDarkMode={Theme.DarkMode}><BsFillCreditCardFill className="hoverbutton" size={25} style={{ color: '#f1b917' }} />Cartão de Débito</S.LabelIconsModal>
                            <S.LabelIconsModal onClick={() => handleAddMethod('creditcard')} isDarkMode={Theme.DarkMode}><BsFillCreditCard2FrontFill className="hoverbutton" size={25} style={{ color: '#da506e' }} />Cartão de Crédito</S.LabelIconsModal>
                            <S.LabelIconsModal onClick={() => handleAddMethod('pix')} isDarkMode={Theme.DarkMode}><PixIcon className="hoverbutton" style={{ color: '#5cbcb1' }} /> &nbsp; PIX &nbsp;</S.LabelIconsModal>
                            <S.LabelIconsModal onClick={() => handleAddMethod('others')} isDarkMode={Theme.DarkMode}><MdPending className="hoverbutton" size={25} style={{ color: '#7a3c3c' }} />Outros</S.LabelIconsModal>

                            {selectedDeliveryType === 'futureDelivery' &&
                                <S.LabelDeliveryIconsModal className='deliveryIcon' onClick={() => handleAddMethod('onDelivery')} isDarkMode={Theme.DarkMode}><FaTruck className="hoverbutton" size={25} style={{ color: 'var(--Blue)' }} />Na entrega</S.LabelDeliveryIconsModal>
                            }
                        </S.DivModalIconsPayment>
                    }
                    {props.listMethods.map((item) => (
                        <PaymentMethods key={item.id} isSellEnded={isSellEnded} item={item} handleRemoveOneMethod={handleRemoveOneMethod} handleEditMethod={handleEditMethod} handleRemoveMethod={handleRemoveMethod} />
                    ))}

                    <S.DivModalButtons>
                        {isSellEnded ?
                            <S.ButtonPrint onClick={(e) => GeneratePDFSell(props.sumDiscount, props.sumvalue, props.sumvalueformated, props.sumquantity, props.listProducts, new Date().toLocaleDateString(), codRefSell, auth.user)}><AiFillPrinter style={{ marginRight: 2 }} />Comprovante</S.ButtonPrint>
                            :
                            <>
                                <DefaultButton onClick={(e) => GeneratePDFBudget(props.sumDiscount, props.sumvalue, props.sumvalueformated, props.sumquantity, props.listProducts, new Date().toLocaleDateString(), codRefSell, auth.user, inputClient, inputSeller)} selectedColor='--NoColor' fontSize='1.01rem' padding='7px 10px 7px 10px' borderRadius='13px'> <RiFileList3Line style={{ marginRight: 2 }} /> Orçamento</DefaultButton>
                                <DefaultButton selectedColor='--Green' fontSize='1.08rem' padding='7px 25px 7px 25px' borderRadius='13px' onClick={() => handleSendtoApi(finallistapi)}><BsFillBagCheckFill style={{ marginRight: 2 }} /> Finalizar</DefaultButton>
                            </>
                        }
                    </S.DivModalButtons>
                    <DefaultButtonCloseModal onClick={handleCloseModalConfirmSell}>
                        <DefaultIconCloseModal />
                    </DefaultButtonCloseModal>
                </MuiBox>
            </Modal>
            <ModalAddClient
                isModalAddClientOpen={isModalAddClientOpen}
                setisModalAddClientOpen={setisModalAddClientOpen}
                handleChangeClient={handleChangeClient}
            />
            <ModalAddSeller
                isModalAddSellerOpen={isModalAddSellerOpen}
                setisModalAddSellerOpen={setisModalAddSellerOpen}
                handleChangeSeller={handleChangeSeller}
            />

        </>
    )
}