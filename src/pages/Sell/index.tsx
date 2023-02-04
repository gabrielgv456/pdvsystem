import { useContext, useState, KeyboardEvent, useEffect } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { AuthContext } from "../../contexts/Auth/AuthContext";
import * as S from "./style"
import { useDarkMode } from '../../contexts/DarkMode/DarkModeProvider';
import { MdLibraryAdd, MdPending } from "react-icons/md"
import { HiBadgeCheck } from "react-icons/hi"
import { AiFillPrinter, AiOutlineClose } from "react-icons/ai"
import { FaCheckCircle, FaMoneyBillWave } from "react-icons/fa"
import { BsFillBagCheckFill, BsFillCreditCardFill, BsFillCreditCard2FrontFill, BsPersonBadge, BsFillPersonFill } from "react-icons/bs"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ListSell } from "./ListSell/ListSell";
import PixIcon from '@mui/icons-material/Pix';
import { useApi } from "../../hooks/useApi";
import { PaymentMethods } from "./PaymentMethods/PaymentMethods";
import { GeneratePDF } from "../../hooks/useGeneratePDF";

export const Sell = () => {

    interface ProductsTypeReturnApi {
        id: number;
        name: string;
        value: number;
        active: boolean;
        quantity: number;

    }
    interface ProductsTypeOptions {
        id: number;
        name: string;
        value: number;
        firstLetter: string;

    }
    interface ProductsType {
        name: string;
        id: number;
        totalvalue: number;
        initialvalue: number;
        quantity: number;
    };
    interface MethodsType {
        id: number;
        type: string;
        value: number;
        valueFormated: string;

    };
    interface SellersOptionType {
        name: string;
        code: number;
    }
    interface SellersandClientsType {
        id: number;
        name: string;
        cpf: string;
        active: boolean;
    }

    const auth = useContext(AuthContext);
    const Theme = useDarkMode();
    const [sellers, setSellers] = useState<SellersandClientsType[]>([])
    const [clients, setClients] = useState<SellersandClientsType[]>([])
    const { addsell, findProducts, findSellers, findClients } = useApi();
    const [Products, setProducts] = useState<ProductsTypeReturnApi[]>([])
    const [NoFilteredProducts, setNoFilteredProducts] = useState<ProductsTypeReturnApi[]>([])
    const [isSellEnded, setisSellEnded] = useState(false)
    const [inputSeller, setInputSeller] = useState<SellersandClientsType | null>(null)
    const [inputClient, setInputClient] = useState<SellersandClientsType | null>(null)
    const [isClientNecessary, setisClientNecessary] = useState(false)
    const [isSellerNecessary, setisSellerNecessary] = useState(false)

    useEffect(() => {
        const Productsresult = async () => {
            const data = await findProducts(auth.idUser);
            setNoFilteredProducts(data.listProducts)
        }
        const SellersSearch = async () => {
            const data = await findSellers(auth.idUser);
            if (data.Success) {
                setSellers(data.findSellers)
                //setSellers(sellers.filter(seller=>seller.name))
            }
            else {
                alert(data.erro)
            }
        }
        const ClientsSearch = async () => {
            const data = await findClients(auth.idUser);
            if (data.Success) {
                setClients(data.findClients)
                //setSellers(sellers.filter(seller=>seller.name))
            }
            else {
                alert(data.erro)
            }
        }
        ClientsSearch();
        Productsresult();
        SellersSearch();
    }, [])

    useEffect(() => {
        const Productsfilter = async () => {
            const filteringProducts = NoFilteredProducts.filter(product => product.active === true && product.quantity > 0)
            setProducts(filteringProducts)
        }
        Productsfilter()
    }, [NoFilteredProducts])


    const options = Products.map((option) => {
        const firstLetter = option.name[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });

    // FUNCTIONS FOR PAYMENT METHODS //

    const [listMethods, setMethods] = useState<MethodsType[]>([])

    const handleAddMethod = (valuetype: string) => {
        const alreadyexistMethod = verifyifexistsMethod(valuetype)
        if (!alreadyexistMethod) {
            let newMethods = [...listMethods]
            newMethods.push({
                id: listMethods.length + 1,
                type: valuetype,
                value: 0,
                valueFormated: ""

            })
            setMethods(newMethods)

        }
    }
    function handleRemoveMethod(id: number) {
        let filteredmethods = listMethods.filter(method => method.id !== id)

        setMethods(filteredmethods)
    }
    function handleEditMethod(id: number, value: number, valueformated: string) {
        let newMethods = [...listMethods]

        for (let i in newMethods) {
            if (newMethods[i].id === id) {
                newMethods[i].value = value
                newMethods[i].valueFormated = valueformated
            }

            setMethods(newMethods)
            console.log(finallistapi)
        }


    }
    function handleRemoveOneMethod(id: number, value: number) {

        let newMethods = [...listMethods]
        for (let i in newMethods) {
            if (newMethods[i].id === id) {
                newMethods[i].value = newMethods[i].value - 25
            }
        }
        setMethods(newMethods)

    }

    //FUNCTIONS FOR PRODUCTS LIST//

    const [listProducts, setListProducts] = useState<ProductsType[]>([])
    const [inputProducts, setinputProducts] = useState<ProductsTypeOptions | null>(null)

    const handleAddProduct = () => {
        console.log(inputProducts)
        let newList = [...listProducts]
        if (inputProducts) {
            let verifyexistsProduct = newList.some((item) => item.id === inputProducts.id)
            if (verifyexistsProduct) {
                if (window.confirm("Produto já incluso, deseja inserir mais uma unidade?")) {
                    handleEditItem(inputProducts.id, 0)
                    setinputProducts(null)
                } else {
                    setinputProducts(null)
                }

            }
            if (!verifyexistsProduct) {
                newList.push({
                    name: inputProducts.name,
                    id: inputProducts.id,
                    quantity: 1,
                    initialvalue: inputProducts.value,
                    totalvalue: inputProducts.value,

                })
                setListProducts(newList)
                setinputProducts(null)

            }
        }
    }
    function handleRemoveItem(id: number) {
        let filteredtasks = listProducts.filter(list => list.id !== id)

        setListProducts(filteredtasks)
    }
    function handleEditItem(id: number, item: number) {
        let verifyQuantityProducts = Products.find(product => product.id === id)
        console.log(verifyQuantityProducts)

        let newList = [...listProducts]

        for (let i in newList) {
            if (newList[i].id === id) {
                if (verifyQuantityProducts !== undefined && newList[i].quantity < verifyQuantityProducts.quantity) {
                    newList[i].quantity = newList[i].quantity + 1
                    newList[i].totalvalue = newList[i].totalvalue + newList[i].initialvalue
                }
                else {
                    alert(`Saldo máximo do produto atingido! Estoque disponivel: ${verifyQuantityProducts?.quantity}`)
                }
            }
        }
        setListProducts(newList)

    }
    function handleRemoveOneItem(id: number, item: number) {
        let newList = [...listProducts]
        for (let i in newList) {
            if (newList[i].id === id) {
                newList[i].quantity = newList[i].quantity - 1
                newList[i].totalvalue = newList[i].totalvalue - newList[i].initialvalue
            }
        }
        setListProducts(newList)
        console.log(listProducts)

    }
    const handleKeyUP = (e: KeyboardEvent) => {
        console.log(e.code)
        if (e.code === 'Enter' || e.code === 'NumpadEnter' && inputProducts) {

            handleAddProduct()
        }
    }
    const [isModalConfirmSellOpen, setisModalConfirmSellOpen] = useState(false);
    function handleOpenModalConfirmSell() {
        if (listProducts.length > 0) {
            setisModalConfirmSellOpen(true)
        }
    }
    function handleCloseModalConfirmSell() {
        if (isSellEnded) {
            setListProducts([])
            setMethods([])
            setNeedReturnCash('N')
            setValue([0])
            setinputProducts(null)
            setisModalConfirmSellOpen(false)
            setisSellEnded(false)

        } else {
            setisModalConfirmSellOpen(false)
        }

    }


    const sumquantity = listProducts.map(item => item.quantity).reduce((prev, curr) => prev + curr, 0);
    const sumvalue = listProducts.map(item => item.totalvalue).reduce((prev, curr) => prev + curr, 0);
    const sumvalueformated = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sumvalue);
    const [value, setValue] = useState([0])

    function onChangeValuePayment(ValuePayment: number) {
        let newvalue = value
        newvalue.push(
            ValuePayment
        )
        setValue(newvalue)

        console.log(listProducts)
    }
    const sumpayvalue = listMethods.filter(item => Number.isNaN(item.value) === false).map(item => item.value).reduce((prev, curr) => prev + curr, 0);
    const calculatemissvalue = sumvalue - sumpayvalue
    let formatedmissvalue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(calculatemissvalue).replace('-', "")
    const [needReturnCash, setNeedReturnCash] = useState('N')

    const verifyifexistsMethod = (method: string) => {
        const existsMethod = listMethods.some((item) => item.type === method)
        return existsMethod
    }

    useEffect(() => {
        if (sumvalue - sumpayvalue < 0) { setNeedReturnCash('Y') };
        if (sumvalue - sumpayvalue === 0) { setNeedReturnCash('OK') };
        if (sumvalue - sumpayvalue > 0) { setNeedReturnCash('N') };
        console.log(sumpayvalue, listMethods)
    }, [formatedmissvalue])

    //const finallistapi = JSON.stringify({Products: {...listProducts}, Payment: {...listMethods}})
    const finallistapi = {
        UserId: auth.idUser,
        totalValue: sumvalue,
        valuePayment: sumpayvalue,
        sellerId: inputSeller ? inputSeller.id : null,
        clientId: inputClient ? inputClient.id : null,
        Products: [...listProducts],
        Payment: [...listMethods],
    }

    const handleSendtoApi = async (valuesSelltoSendApi: object) => {
        if (listMethods.length == 0) {
            alert("ERRO: Insira um método de pagamento!")
        }
        else {
            if (listMethods.some(method => Number.isNaN(method.value)) || listMethods.some(method => method.value === 0)) {
                alert('ERRO: Existe método de pagamento vazio, remova ou insira o valor!')
            }
            else {
                if (needReturnCash === 'N') {
                    alert(`ERRO: Restam ${formatedmissvalue} a serem recebidos!`)
                }

                if (needReturnCash === 'Y') {
                    if (window.confirm(`Confirma o troco de ${formatedmissvalue} ?`)) {
                        if (listMethods.length !== 0 && calculatemissvalue <= 0) {
                            const data = await addsell(valuesSelltoSendApi)
                            if (data.Success === true) {
                                setisSellEnded(true)
                            }
                            if (data.Success === false) {
                                alert(`ERRO: ${JSON.stringify(data.Erro)}`)
                            }
                        }
                    }
                }
                if (needReturnCash === 'OK') {
                    if (listMethods.length !== 0 && calculatemissvalue <= 0) {
                        const data = await addsell(valuesSelltoSendApi)
                        if (data.Success === true) {
                            setisSellEnded(true)
                        }
                        if (data.Success === false) {
                            alert(`ERRO: ${JSON.stringify(data.Erro)}`)
                        }
                    }
                }
            }
        }
    }




    return (
        <>
            <Modal open={isModalConfirmSellOpen} onClose={handleCloseModalConfirmSell}>
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
                    bgcolor: Theme.DarkMode ? 'var(--backgroundDarkMode2)' : 'background.paper',
                    color: Theme.DarkMode ? '#ffffff' : '#000',
                    border: Theme.DarkMode ? '1px solid silver' : '',
                    boxShadow: 24, p: 4,
                }}>
                    <div style={{ fontSize: '1.1rem', marginBottom: '10px' }}><b>Total:</b> {sumvalueformated}</div>
                    {needReturnCash === 'N' ? <div style={{ fontSize: '1.1rem' }}><b>Restante:</b> {formatedmissvalue}</div> : ''}
                    {needReturnCash === 'Y' && <div style={{ fontSize:'1.1rem', color: 'red'}}><b>Troco:</b> {formatedmissvalue}</div>}
                    {needReturnCash === 'OK' && <div style={{ fontSize:'1.1rem', color: 'green'}}><b>Restante:</b> {formatedmissvalue}</div>}
                    {isSellEnded ? <S.LabelSellEnded><HiBadgeCheck className="HiBadgeCheck" style={{ color: 'var(--Green)' }} size="130" /> Venda confirmada com sucesso ! </S.LabelSellEnded> : ''}
                    {isSellEnded ? '' :
                        <div>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>


                                <label style={{ display: 'flex', width: "48%", alignItems: 'flex-end', justifyContent: 'space-around' }}>
                                    <BsFillPersonFill size="22" color="#5d5c5c" />
                                    <Autocomplete
                                        style={{ width: '84%' }}
                                        options={clients}
                                        value={inputClient}
                                        onChange={(event: any, newValue: SellersandClientsType | null) => {
                                            setInputClient(newValue);
                                        }}
                                        getOptionLabel={(option) =>
                                            (option.name)
                                                .concat(" - ")
                                                .concat(option.cpf)
                                                .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "($1.$2.$3-$4)")

                                        }
                                        //getOptionLabel={ (option: SellersOptionType) => option.name}
                                        id="autocomplete_clients"
                                        autoComplete
                                        noOptionsText="Nenhum resultado"
                                        includeInputInList
                                        renderInput={(params) => (
                                            <TextField {...params} label="Cliente" variant="standard" />
                                        )}
                                    /> </label>



                                <label style={{ display: 'flex', width: "48%", alignItems: 'flex-end', justifyContent: 'space-around' }}>
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
                                </label>
                            </div>

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
                    {listMethods.map((item) => (
                        <PaymentMethods key={item.id} isSellEnded={isSellEnded} item={item} handleRemoveOneMethod={handleRemoveOneMethod} handleEditMethod={handleEditMethod} handleRemoveMethod={handleRemoveMethod} value={value} onChangeValuePayment={onChangeValuePayment} />
                    ))}

                    <S.DivModalButtons>
                        {isSellEnded ?
                            <S.ButtonPrint onClick={(e) => GeneratePDF(listProducts, sumvalueformated, sumquantity)}><AiFillPrinter style={{ marginRight: 2 }} />Comprovante</S.ButtonPrint>
                            : ''}
                        {isSellEnded ? '' :
                            <S.ButtonEndSell onClick={() => handleSendtoApi(finallistapi)}><BsFillBagCheckFill style={{ marginRight: 2 }} /> Finalizar</S.ButtonEndSell>
                        }
                    </S.DivModalButtons>

                    <S.ButtonClose isDarkMode={Theme.DarkMode} onClick={handleCloseModalConfirmSell}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonClose>

                </Box>
            </Modal>


            <S.Container isDarkMode={Theme.DarkMode}>
                <S.Header>
                    <S.Box>
                        <Autocomplete
                            value={inputProducts}
                            onChange={(event: any, newValue: ProductsTypeOptions | null) => setinputProducts(newValue)}
                            id="grouped-demo"
                            noOptionsText={"Nenhum Resultado"}
                            options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                            groupBy={(option) => option.firstLetter}
                            getOptionLabel={(option) => option.name}
                            sx={{ boxShadow: 'rgba(58, 53, 65, 0.1) 0px 1px 2px 0px', border: '#fff', width: '100%', '& input': { color: Theme.DarkMode ? '#fff' : '', "& .MuiInputLabel-root": { color: 'green' } } }}
                            renderInput={(params) => <TextField {...params}
                                sx={{ borderColor: '#fff' }}
                                onKeyUp={handleKeyUP}
                                label="Selecione um produto"
                                autoFocus />}
                        />
                    </S.Box>
                    <S.Button onClick={handleAddProduct}>
                        <MdLibraryAdd size="25" />
                    </S.Button>
                </S.Header>
                <S.Main>
                    <S.DivList>
                        {listProducts.map((item) => (
                            <ListSell key={item.name} item={item} handleRemoveItem={handleRemoveItem} handleEditItem={handleEditItem} handleRemoveOneItem={handleRemoveOneItem} />

                        ))}</S.DivList>
                    <S.Checkout isDarkMode={Theme.DarkMode}>
                        <label>Qtd: {sumquantity}</label>
                        <label>Valor Total:</label>
                        <S.TotalValue>
                            {sumvalueformated}
                        </S.TotalValue>
                        <S.DivConfirmSell>
                            <S.Button onClick={handleOpenModalConfirmSell}><FaCheckCircle size="80" /></S.Button>
                            <S.LabelConfirm onClick={handleOpenModalConfirmSell}>Confirmar Venda</S.LabelConfirm>
                        </S.DivConfirmSell>
                    </S.Checkout>

                </S.Main>



            </S.Container>
        </>
    )
}