import { useContext, useState, KeyboardEvent, useEffect } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import * as S from "./style"
import { useDarkMode } from '../../contexts/DarkMode/DarkModeProvider';
import { FaCheckCircle } from "react-icons/fa"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ListSell } from "./ListSell/ListSell";
import { useApi } from "../../hooks/useApi";
import { RiAddCircleFill } from "react-icons/ri";
import { useMessageBoxContext } from "../../contexts/MessageBox/MessageBoxContext";
import { ModalCheckOut, typesPayment } from "./Modals/CheckOut";
import { Box } from "@mui/material";
import { useLayout } from "../../contexts/Layout/layoutContext";

interface ProductsTypeReturnApi {
    id: number;
    name: string;
    value: number;
    active: boolean;
    quantity: number;
    cost: number;
    urlImage: string | null

}
export type ProductsTypeOptions = ProductsTypeReturnApi & { firstLetter: string }


export interface ProductsType {
    name: string;
    id: number;
    totalvalue: number;
    initialvalue: number;
    quantity: number;
    totalCost: number;
    initialCost: number,
    discountValue: number | null,
    discountPercent: number | null,
    totalDiscount: number | null,
    urlImage: string | null
};

export interface MethodsType {
    id: number;
    type: typesPayment;
    value: number;
    valueFormated: string;
};

export const Sell = () => {

    const { setActualPage } = useLayout();
    setActualPage('Realizar Vendas')
    const auth = useContext(AuthContext);
    const Theme = useDarkMode();
    const { findProductsToSell } = useApi();
    const [Products, setProducts] = useState<ProductsTypeReturnApi[]>([])
    const [NoFilteredProducts, setNoFilteredProducts] = useState<ProductsTypeReturnApi[]>([])
    const { MessageBox } = useMessageBoxContext()
    // const [isClientNecessary, setisClientNecessary] = useState(false)
    // const [isSellerNecessary, setisSellerNecessary] = useState(false)
    const [textInput, setTextInput] = useState('')

    useEffect(() => {
        const Productsresult = async () => {
            const data = await findProductsToSell(auth.idUser);
            setNoFilteredProducts(data.listProducts)
        }
        Productsresult();
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

    async function handleSelectItem(newValue: ProductsTypeOptions | null) {
        setinputProducts(newValue)
        handleAddProduct(newValue)
    }


    // FUNCTIONS FOR PAYMENT METHODS //




    //FUNCTIONS FOR PRODUCTS LIST//

    const [listProducts, setListProducts] = useState<ProductsType[]>([])
    const [inputProducts, setinputProducts] = useState<ProductsTypeOptions | null>(null)


    const handleAddProduct = async (newProduct: ProductsTypeOptions | undefined | null) => {

        let newList = [...listProducts]
        const newItem = newProduct ?? inputProducts

        if (newItem) {
            let verifyexistsProduct = newList.some((item) => item.id === newItem.id)
            if (verifyexistsProduct) {
                if (window.confirm("Produto já incluso, deseja inserir mais uma unidade?")) {
                    handleEditItem(newItem.id, 0, 1, 'add')
                }
            } else {
                newList.push({
                    name: newItem.name,
                    id: newItem.id,
                    quantity: 1,
                    initialvalue: newItem.value,
                    totalvalue: newItem.value,
                    initialCost: newItem.cost,
                    totalCost: newItem.cost,
                    urlImage: newItem.urlImage,
                    discountPercent: null,
                    discountValue: null,
                    totalDiscount: null
                })
                setListProducts(newList)
            }
        }
        setinputProducts(null)
    }

    function handleRemoveItem(id: number) {
        let filtereditems = listProducts.filter(list => list.id !== id)
        setListProducts(filtereditems)
    }

    function handleEditItem(id: number, item: number, quantity: number, type: 'add' | 'change') {
        let verifyQuantityProducts = Products.find(product => product.id === id)

        quantity = quantity === 0 ? 1 : quantity
        let newList = [...listProducts]
        for (let i in newList) {
            if (newList[i].id === id) {
                if (type === 'add') {
                    if (verifyQuantityProducts !== undefined && newList[i].quantity < verifyQuantityProducts.quantity) {
                        newList[i].quantity = newList[i].quantity + quantity
                        newList[i].totalvalue = newList[i].totalvalue + newList[i].initialvalue
                        newList[i].totalCost = newList[i].totalCost + newList[i].initialCost
                        newList[i].totalDiscount = (newList[i].totalDiscount ?? 0) + (newList[i].discountValue ?? 0)
                        newList[i].totalDiscount = newList[i].totalDiscount ?? 0 > 0 ? newList[i].totalDiscount : null
                    }
                    else {
                        MessageBox('info', `Saldo máximo do produto atingido! Estoque disponivel: ${verifyQuantityProducts?.quantity}`)
                    }
                } if (type === 'change') {
                    if (verifyQuantityProducts !== undefined && quantity <= verifyQuantityProducts.quantity) {
                        newList[i].totalvalue = quantity * (newList[i].totalvalue / newList[i].quantity)
                        newList[i].totalCost = quantity * (newList[i].totalCost / newList[i].quantity)
                        newList[i].totalDiscount = quantity * (newList[i].discountValue ?? 0)
                        newList[i].totalDiscount = newList[i].totalDiscount ?? 0 > 0 ? newList[i].totalDiscount : null
                        newList[i].quantity = quantity;
                    }
                    else {
                        MessageBox('info', `Saldo máximo do produto atingido! Estoque disponivel: ${verifyQuantityProducts?.quantity}`)
                    }
                }
            }
        }
        setListProducts(newList)

    }

    function handleDiscount(id: number, valueDiscount: number | null, percentDiscount: number) {
        let newList = [...listProducts]
        for (let i in newList) {
            if (newList[i].id === id) {
                newList[i].discountPercent = percentDiscount
                newList[i].discountValue = valueDiscount
                newList[i].totalDiscount = valueDiscount ? valueDiscount * newList[i].quantity : null
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
                newList[i].totalCost = newList[i].totalCost - newList[i].initialCost
                newList[i].totalDiscount = (newList[i].totalDiscount ?? 0) - (newList[i].discountValue ?? 0)
            }
        }
        setListProducts(newList)

    }
    // const handleKeyUP = (e: KeyboardEvent) => {

    //     if (e.code === 'Enter' || e.code === 'NumpadEnter' && inputProducts) {

    //         handleAddProduct()
    //     }
    // }
    const [isModalConfirmSellOpen, setisModalConfirmSellOpen] = useState(false);

    function handleOpenModalConfirmSell() {
        if (listProducts.length > 0) {
            setisModalConfirmSellOpen(true)
        }
    }

    const [listMethods, setMethods] = useState<MethodsType[]>([])
    const sumquantity = listProducts.map(item => item.quantity).reduce((prev, curr) => prev + curr, 0);
    const sumDiscount = (listProducts.map(item => item.totalDiscount ?? 0).reduce((prev, curr) => prev + curr, 0))
    const sumDiscountFormated = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sumDiscount);
    const sumvalue = parseFloat(((listProducts.map(item => item.totalvalue).reduce((prev, curr) => prev + curr, 0)) - sumDiscount).toFixed(2));
    const sumvalueformated = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sumvalue);
    const sumpayvalue = listMethods.filter(item => Number.isNaN(item.value) === false).map(item => item.value).reduce((prev, curr) => prev + curr, 0);
    const calculatemissvalue = sumvalue - sumpayvalue
    let formatedmissvalue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(calculatemissvalue).replace('-', "")
    const [needReturnCash, setNeedReturnCash] = useState('N')
    const sumCost = listProducts.map(item => item.totalCost).reduce((prev, curr) => prev + curr, 0);


    useEffect(() => {
        if (sumvalue - sumpayvalue < 0) { setNeedReturnCash('Y') };
        if (sumvalue - sumpayvalue === 0) { setNeedReturnCash('OK') };
        if (sumvalue - sumpayvalue > 0) { setNeedReturnCash('N') };

    }, [formatedmissvalue])

    //const finallistapi = JSON.stringify({Products: {...listProducts}, Payment: {...listMethods}})

    return (
        <>

            <S.Container isDarkMode={Theme.DarkMode}>
                <S.Header isDarkMode={Theme.DarkMode}>
                    <S.Box>
                        <Autocomplete
                            value={inputProducts}
                            onChange={(event: any, newValue: ProductsTypeOptions | null) => handleSelectItem(newValue)}
                            inputValue={textInput}
                            onInputChange={(e, newValue) => setTextInput(newValue)}
                            noOptionsText={"Nenhum Resultado"}
                            clearOnBlur={true}
                            clearOnEscape={true}
                            onOpen={() => textInput.length > 3 && setTextInput('')}
                            options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                            groupBy={(option) => option?.firstLetter ?? ''}
                            getOptionLabel={(option) => option?.name ?? ''}
                            sx={{ boxShadow: 'rgba(58, 53, 65, 0.1) 0px 1px 2px 0px', border: '#fff', width: '100%', '& input': { color: Theme.DarkMode ? '#fff' : '', "& .MuiInputLabel-root": { color: 'green' } } }}
                            renderOption={(props, option) => (

                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                    {option?.urlImage &&
                                        <img
                                            loading="lazy"
                                            width="20"
                                            srcSet={`${option.urlImage} 2x`}
                                            src={option.urlImage}
                                            alt=""
                                        />}
                                    {option?.name ?? ''}
                                </Box>
                            )}
                            renderInput={(params) => <TextField {...params}

                                sx={{ borderColor: '#fff' }}
                                //onKeyUp={handleKeyUP}
                                onSelect={() => handleAddProduct}
                                label="Selecione um produto"
                                autoFocus />}
                        />
                    </S.Box>
                    <S.Button onClick={() => handleAddProduct}>
                        <RiAddCircleFill size="25" />
                    </S.Button>
                </S.Header>
                <S.Main>
                    {listProducts.length > 0 &&
                        <S.DivList>
                            {listProducts.map((item) => (
                                <ListSell
                                    key={item.name}
                                    item={item}
                                    handleRemoveItem={handleRemoveItem}
                                    handleEditItem={handleEditItem}
                                    handleRemoveOneItem={handleRemoveOneItem}
                                    handleDiscount={handleDiscount}
                                />
                            ))}</S.DivList>
                    }
                    <S.Checkout isDarkMode={Theme.DarkMode}>
                        <label>Quantidade de itens: {sumquantity}</label>
                        <label>Desconto Total: {sumDiscountFormated}</label>
                        <label>Valor Total:</label>
                        <S.TotalValue>
                            {sumvalueformated}
                        </S.TotalValue>
                        <S.DivConfirmSell>
                            <S.Button onClick={handleOpenModalConfirmSell}><FaCheckCircle size="80" /></S.Button>
                            <S.LabelConfirm onClick={handleOpenModalConfirmSell}>Ir para o Check-out</S.LabelConfirm>
                        </S.DivConfirmSell>
                    </S.Checkout>

                </S.Main>
            </S.Container>

            <ModalCheckOut
                listMethods={listMethods}
                setMethods={setMethods}
                isModalConfirmSellOpen={isModalConfirmSellOpen}
                setisModalConfirmSellOpen={setisModalConfirmSellOpen}
                needReturnCash={needReturnCash}
                setListProducts={setListProducts}
                setinputProducts={setinputProducts}
                setNeedReturnCash={setNeedReturnCash}
                sumvalue={sumvalue}
                sumpayvalue={sumpayvalue}
                sumCost={sumCost}
                listProducts={listProducts}
                formatedmissvalue={formatedmissvalue}
                calculatemissvalue={calculatemissvalue}
                sumvalueformated={sumvalueformated}
                sumquantity={sumquantity}
                sumDiscount={sumDiscount}
            />
        </>
    )
}