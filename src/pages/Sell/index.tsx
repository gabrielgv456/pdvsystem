import { useContext, useState, KeyboardEvent, useEffect } from "react";
//import Modal from "react-modal"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { AuthContext } from "../../contexts/Auth/AuthContext";
import * as S from "./style"
import { useDarkMode } from '../../contexts/DarkMode/DarkModeProvider';
import { MdLibraryAdd, MdPending } from "react-icons/md"
import { AiFillPrinter, AiOutlineClose } from "react-icons/ai"
import { FaCheckCircle, FaMoneyBillWave } from "react-icons/fa"
import { BsFillBagCheckFill, BsFillCreditCardFill, BsFillCreditCard2FrontFill } from "react-icons/bs"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ListSell } from "./ListSell/ListSell";
import PixIcon from '@mui/icons-material/Pix';
import { useApi } from "../../hooks/useApi";
import { PaymentMethods } from "./PaymentMethods/PaymentMethods";
import { useGeneratePDF } from "../../hooks/useGeneratePDF";

export const Sell = () => {
  
    interface ProductsTypeReturnApi {
        id: number;
        name: string;
        value: number;

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

    };

    const auth = useContext(AuthContext);
    const Theme = useDarkMode();
    const GeneratePDF = useGeneratePDF;
    const { addsell, findProducts } = useApi();
    const [Products, setProducts] = useState<ProductsTypeReturnApi[]>([])
    const [isSellEnded, setisSellEnded] = useState(false)

    useEffect(() => {
        const Productsresulta = async () => {
            const data = await findProducts(auth.idUser);
            setProducts(data.listProducts)

        }
        Productsresulta()
    }, [])


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
        let newMethods = [...listMethods]
        newMethods.push({
            id: listMethods.length + 1,
            type: valuetype,
            value: 0,

        })
        setMethods(newMethods)

    }
    function handleRemoveMethod(id: number) {
        let filteredmethods = listMethods.filter(method => method.id !== id)

        setMethods(filteredmethods)
    }
    function handleEditMethod(id: number, value: number) {
        let newMethods = [...listMethods]
        for (let i in newMethods) {
            if (newMethods[i].id === id) {
                newMethods[i].value = value
            }
        }
        setMethods(newMethods)
        console.log(finallistapi)


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
            newList.push({
                name: inputProducts.name,
                id: listProducts.length + 1,
                quantity: 1,
                initialvalue: inputProducts.value,
                totalvalue: inputProducts.value,

            })
            setListProducts(newList)

        }
    }
    function handleRemoveItem(id: number) {
        let filteredtasks = listProducts.filter(list => list.id !== id)

        setListProducts(filteredtasks)
    }
    function handleEditItem(id: number, item: number) {
        let newList = [...listProducts]
        for (let i in newList) {
            if (newList[i].id === id) {
                newList[i].quantity = newList[i].quantity + 1
                newList[i].totalvalue = newList[i].totalvalue + newList[i].initialvalue
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
        if (inputProducts) {
            setisModalConfirmSellOpen(true)
        }
    }
    function handleCloseModalConfirmSell() {
        setisModalConfirmSellOpen(false)
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
    const sumpayvalue = listMethods.map(item => item.value).reduce((prev, curr) => prev + curr, 0);
    const missvalue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sumvalue - sumpayvalue)
    const [needReturnCash,setNeedReturnCash] = useState(false)
    useEffect(()=>{
        if (sumvalue-sumpayvalue < 0){setNeedReturnCash(true)}; 
        if(sumvalue-sumpayvalue >= 0){setNeedReturnCash(false)};
    },[missvalue])

    //const finallistapi = JSON.stringify({Products: {...listProducts}, Payment: {...listMethods}})
    const finallistapi = { Products: [...listProducts], Payment: [...listMethods] }

    const handleSendtoApi = async (valuesSelltoSendApi: object) => {
        if (listMethods.length == 0) {
            alert("ERRO: Insira um método de pagamento!")
        }
        if (listMethods.length != 0) {
            await addsell(valuesSelltoSendApi)
            alert("Sucesso")
            setisSellEnded(true)
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
                    width: 500,
                    bgcolor: Theme.DarkMode ? 'var(--backgroundDarkMode2)' : 'background.paper',
                    color: Theme.DarkMode ? '#ffffff' : '#000',
                    border: Theme.DarkMode ? '1px solid silver' : '',
                    boxShadow: 24, p: 4,
                }}>
                    <S.PHeaderModal><b>Total:</b> {sumvalueformated}</S.PHeaderModal>
                    {needReturnCash ? '' : <S.PHeaderModal><b>Restante:</b> {missvalue}</S.PHeaderModal>}
                    {needReturnCash ? <S.PHeaderModalReturnCash><b>Troco:</b> {missvalue}</S.PHeaderModalReturnCash>:''}

                    <S.PHeaderModal>Qual será a forma de pagamento?</S.PHeaderModal>

                    <S.DivModalIconsPayment>
                        <S.LabelIconsModal onClick={() => handleAddMethod('cash')} ><FaMoneyBillWave size={25} style={{color:'#23591b'}}/>Dinheiro</S.LabelIconsModal>
                        <S.LabelIconsModal onClick={() => handleAddMethod('debitcard')}><BsFillCreditCardFill size={25} style={{color:'#f1b917'}}/>Cartão de Débito</S.LabelIconsModal>
                        <S.LabelIconsModal onClick={() => handleAddMethod('creditcard')}><BsFillCreditCard2FrontFill size={25} style={{color:'#da506e'}}/>Cartão de Crédito</S.LabelIconsModal>
                        <S.LabelIconsModal onClick={() => handleAddMethod('pix')}><PixIcon style={{color:'#5cbcb1'}}/>PIX</S.LabelIconsModal>
                        <S.LabelIconsModal onClick={() => handleAddMethod('others')}><MdPending size={25} style={{color:'#7a3c3c'}} />Outros</S.LabelIconsModal>
                    </S.DivModalIconsPayment>
                    {listMethods.map((item) => (
                        <PaymentMethods key={item.id} item={item} handleRemoveOneMethod={handleRemoveOneMethod} handleEditMethod={handleEditMethod} handleRemoveMethod={handleRemoveMethod} value={value} onChangeValuePayment={onChangeValuePayment} />
                    ))}

                    <S.DivModalButtons>
                        {isSellEnded ? 
                        <S.ButtonPrint onClick={() => GeneratePDF()}><AiFillPrinter style={{ marginRight: 2 }} />Comprovante</S.ButtonPrint>
                        : ''}
                        {isSellEnded ? '' :
                        <S.ButtonEndSell onClick={() => handleSendtoApi(finallistapi)}><BsFillBagCheckFill style={{ marginRight: 2 }} /> Finalizar</S.ButtonEndSell>
                        }
                        </S.DivModalButtons>

                    <S.ButtonClose onClick={handleCloseModalConfirmSell}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonClose>

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
                            sx={{ border: '#fff', width: '100%', '& input': { color: Theme.DarkMode ? '#fff' : '', "& .MuiInputLabel-root": { color: 'green' } } }}
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