import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useState, useEffect, useContext } from 'react';
import { MdPending } from "react-icons/md"
import { HiBadgeCheck } from "react-icons/hi"
import { AiFillPrinter, AiOutlineClose } from "react-icons/ai"
import { BsFillBagCheckFill, BsFillCreditCardFill, BsFillCreditCard2FrontFill, BsPersonBadge, BsFillPersonFill } from "react-icons/bs"
import { PaymentMethods } from "../../PaymentMethods/PaymentMethods";
import { GeneratePDF } from "../../../../hooks/useGeneratePDF";
import PixIcon from '@mui/icons-material/Pix';
import { FaMoneyBillWave } from "react-icons/fa"
import * as S from './style'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkModeProvider';
import { useApi } from '../../../../hooks/useApi';
import { AuthContext } from "../../../../contexts/Auth/AuthContext";
import { useMessageBoxContext } from '../../../../contexts/MessageBox/MessageBoxContext';
import { MethodsType, ProductsTypeOptions } from '../..';
import Radio from '@mui/material/Radio';
import { DeliveryAddressClient } from './Components/AddressClient';

interface handleChangeProps {
    UserId: number;
    totalValue: number;
    valuePayment: number;
    changeValue: number | null;
    sellerId: number | null;
    clientId: number | null;
    Products: ProductsType[];
    Payment: MethodsType[];
}

interface SellersOptionType {
    name: string;
    code: number;
}


interface ProductsType {
    name: string;
    id: number;
    totalvalue: number;
    initialvalue: number;
    quantity: number;
    totalCost: number;
    initialCost: number
};

interface SellersandClientsType {
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
    adressStreet: string | null,
    adressNumber: string | null,
    adressNeighborhood: string | null,
    adressComplement: string | null,
    adressCity: string | null,
    adressState: string | null,
    adressCep: string | null,
    adressUF: string | null
}

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
    const [value, setValue] = useState([0])
    const [sellers, setSellers] = useState<SellersandClientsType[]>([])
    const [clients, setClients] = useState<ClientsType[]>([])
    const [selectedDeliveryType, setSelectedDeliveryType] = useState('instantDelivery');
    const [addressDeliveryClient, setDeliveryClientType] = useState<deliveryAddressClientType>({ adressCep: '', adressCity: '', adressComplement: '', adressNeighborhood: '', adressNumber: '', adressState: '', adressStreet: '', adressUF: '' })
    // const [valueInputClientAdressStreet, setvalueInputClientAdressStreet] = useState("")
    // const [valueInputClientAdressNumber, setvalueInputClientAdressNumber] = useState("")
    // const [valueInputClientAdressNeighborhood, setvalueInputClientAdressNeighborhood] = useState("")
    // const [valueInputClientAdressCity, setvalueInputClientAdressCity] = useState("")
    // const [valueInputClientAdressState, setvalueInputClientAdressState] = useState<string | null>(null)
    // const [valueInputClientAdressCep, setvalueInputClientAdressCep] = useState("")

    const handleChangeDeliveryType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDeliveryType(event.target.value);
    };

    useEffect(() => {

        const SellersSearch = async () => {
            const data = await findSellers(auth.idUser);
            if (data.Success) {
                setSellers(data.findSellers)
                //setSellers(sellers.filter(seller=>seller.name))
            }
            else {
                MessageBox('error', data.erro)
            }
        }
        const ClientsSearch = async () => {
            const data = await findClients(auth.idUser);
            if (data.Success) {
                setClients(data.findClients)
                //setSellers(sellers.filter(seller=>seller.name))
            }
            else {
                MessageBox('error', data.erro)
            }
        }
        ClientsSearch();
        SellersSearch();
    }, [])

    const handleAddMethod = (valuetype: string) => {
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

    function onChangeValuePayment(ValuePayment: number) {
        let newvalue = value
        newvalue.push(
            ValuePayment
        )
        setValue(newvalue)
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
            setValue([0])
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
        valuePayment: props.sumpayvalue,
        changeValue: null,
        totalCost: props.sumCost,
        sellerId: inputSeller ? inputSeller.id : null,
        clientId: inputClient ? inputClient.id : null,
        Products: [...props.listProducts],
        Payment: [...props.listMethods],
    }

    const handleSendtoApi = async (valuesSelltoSendApi: handleChangeProps) => {
        if (props.listMethods.length == 0) {
            MessageBox('warning', " Insira um método de pagamento!")
        }
        else {
            if (props.listMethods.some(method => Number.isNaN(method.value)) || props.listMethods.some(method => method.value === 0)) {
                MessageBox('warning', 'Existe método de pagamento vazio, remova ou insira o valor!')
            }
            else {
                if (props.needReturnCash === 'N') {
                    MessageBox('warning', ` Restam ${props.formatedmissvalue} a serem recebidos!`)
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
        }
    }

    return (
        <Modal open={props.isModalConfirmSellOpen} onClose={handleCloseModalConfirmSell}>
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
                bgcolor: Theme.DarkMode ? 'var(--backgroundDarkMode2)' : 'background.paper',
                color: Theme.DarkMode ? '#ffffff' : '#000',
                border: Theme.DarkMode ? '1px solid silver' : '',
                borderRadius: '6px',
                boxShadow: 24, p: 4,
            }}>
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
                                        setInputClient(newValue);
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
                                /> </S.labelClient>
                            <S.labelSeller>
                                <BsPersonBadge size="22" color="#5d5c5c" />
                                <Autocomplete
                                    style={{ width: '84%' }}
                                    options={sellers.filter(seller => seller.active)}
                                    getOptionLabel={(option) => option.name}
                                    value={inputSeller}
                                    onChange={(event: any, newValue: SellersandClientsType | null) => {
                                        setInputSeller(newValue);
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
                                // setvalueInputClientAdressStreet={setvalueInputClientAdressStreet}
                                // setvalueInputClientAdressNeighborhood={setvalueInputClientAdressNeighborhood}
                                // setvalueInputClientAdressCity={setvalueInputClientAdressCity}
                                // setvalueInputClientAdressState={setvalueInputClientAdressState}
                                // setvalueInputClientAdressCep={setvalueInputClientAdressCep}
                                // setvalueInputClientAdressNumber={setvalueInputClientAdressNumber}
                                // valueInputClientAdressCep={valueInputClientAdressCep}
                                // valueInputClientAdressStreet={valueInputClientAdressStreet}
                                // valueInputClientAdressNumber={valueInputClientAdressNumber}
                                // valueInputClientAdressNeighborhood={valueInputClientAdressNeighborhood}
                                // valueInputClientAdressCity={valueInputClientAdressCity}
                                // valueInputClientAdressState={valueInputClientAdressState}
                                setDeliveryClientType={setDeliveryClientType}
                                addressDeliveryClient={addressDeliveryClient}
                                inputClient={inputClient}
                            />
                        }
                        <S.PHeaderModal>Qual será a forma de pagamento?</S.PHeaderModal>
                    </div>

                }
                {isSellEnded ? '' :
                    <S.DivModalIconsPayment>
                        <S.LabelIconsModal onClick={() => handleAddMethod('money')} isDarkMode={Theme.DarkMode} ><FaMoneyBillWave className="hoverbutton" size={25} style={{ color: '#23591b' }} />Dinheiro</S.LabelIconsModal>
                        <S.LabelIconsModal onClick={() => handleAddMethod('debitcard')} isDarkMode={Theme.DarkMode}><BsFillCreditCardFill className="hoverbutton" size={25} style={{ color: '#f1b917' }} />Cartão de Débito</S.LabelIconsModal>
                        <S.LabelIconsModal onClick={() => handleAddMethod('creditcard')} isDarkMode={Theme.DarkMode}><BsFillCreditCard2FrontFill className="hoverbutton" size={25} style={{ color: '#da506e' }} />Cartão de Crédito</S.LabelIconsModal>
                        <S.LabelIconsModal onClick={() => handleAddMethod('pix')} isDarkMode={Theme.DarkMode}><PixIcon className="hoverbutton" style={{ color: '#5cbcb1' }} /> &nbsp; PIX &nbsp;</S.LabelIconsModal>
                        <S.LabelIconsModal onClick={() => handleAddMethod('others')} isDarkMode={Theme.DarkMode}><MdPending className="hoverbutton" size={25} style={{ color: '#7a3c3c' }} />Outros</S.LabelIconsModal>
                    </S.DivModalIconsPayment>
                }
                {props.listMethods.map((item) => (
                    <PaymentMethods key={item.id} isSellEnded={isSellEnded} item={item} handleRemoveOneMethod={handleRemoveOneMethod} handleEditMethod={handleEditMethod} handleRemoveMethod={handleRemoveMethod} value={value} onChangeValuePayment={onChangeValuePayment} />
                ))}

                <S.DivModalButtons>
                    {isSellEnded ?
                        <S.ButtonPrint onClick={(e) => GeneratePDF(props.listProducts, props.sumvalueformated, props.sumquantity)}><AiFillPrinter style={{ marginRight: 2 }} />Comprovante</S.ButtonPrint>
                        : ''}
                    {isSellEnded ? '' :
                        <S.ButtonEndSell onClick={() => handleSendtoApi(finallistapi)}><BsFillBagCheckFill style={{ marginRight: 2 }} /> Finalizar</S.ButtonEndSell>
                    }
                </S.DivModalButtons>

                <S.ButtonClose isDarkMode={Theme.DarkMode} onClick={handleCloseModalConfirmSell}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonClose>

            </Box>
        </Modal>

    )
}