import { useContext, useState, KeyboardEvent} from "react";
//import Modal from "react-modal"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { AuthContext } from "../../contexts/Auth/AuthContext";
import * as S from "./style"
import { useDarkMode } from '../../contexts/DarkMode/DarkModeProvider';
import {MdLibraryAdd, MdPending} from "react-icons/md"
import {AiFillPrinter, AiOutlineClose} from "react-icons/ai"
import {FaCheckCircle, FaMoneyBillWave} from "react-icons/fa"
import {BsFillBagCheckFill, BsFillCreditCardFill, BsFillCreditCard2FrontFill} from "react-icons/bs"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ListSell } from "./ListSell/ListSell";
import PixIcon from '@mui/icons-material/Pix';
import { PaymentMethods } from "./PaymentMethods/PaymentMethods";



export const Sell  = () => {

    interface ProductsType {
        name: string;
        id:number;
        value:number;
        quantity: number;
    };
    interface MethodsType {
        id: number;
        type:string;
        value: number;
        cash?: number;
        debitcard?:number;
        creditcard?:number;
        pix?: number;
        others?: number;
    };

    const auth = useContext(AuthContext);
    const Theme = useDarkMode();
    const [inputValue, setInputValue] = useState('');
    
    const Products = [
        {name:'Camisa Mc Pf Oxford Color',value:'10',quantity:'2'},
        {name:'Bermuda Casual Pf Iron Continuo',value:'20',quantity:'3'},
        {name:'Share Jaqueta Trucker Indigo Bandana',value:'30',quantity:'4'},
        {name:'Moletom Pica Pau Bordado Ouro',value:'40',quantity:'1'},
    ]
    const options = Products.map((option) => {
        const firstLetter = option.name[0].toUpperCase();
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          ...option,
        };
      });

      // FUNCTIONS FOR PAYMENT METHODS //

    const [listMethods, setMethods] = useState<MethodsType[]>([])

    const handleAddMethod = (valuetype:string) => {
        let newMethods = [...listMethods]
        newMethods.push({
            id: listMethods.length + 1,
            cash:10,
            type:valuetype,
            value: 10,
           
        })
         setMethods(newMethods)   
       
    }
    function handleRemoveMethod (id:number) {
        let filteredmethods= listMethods.filter(method => method.id !== id )
        
        setMethods(filteredmethods)
    }
    function handleEditMethod (id:number,value:number) {
        let newMethods = [...listMethods]
        for(let i in newMethods){if(newMethods[i].id === id){
            newMethods[i].value = newMethods[i].value+25
        }}
        setMethods(newMethods)  
           
        }
    function handleRemoveOneMethod (id:number,value:number) {
        let newMethods = [...listMethods]
        for(let i in newMethods){if(newMethods[i].id === id){
            newMethods[i].value = newMethods[i].value-25
        }}
        setMethods(newMethods) 
           
        }

    //FUNCTIONS FOR PRODUCTS LIST//

    const [listProducts, setListProducts] = useState<ProductsType[]>([])
    const handleAddProduct = () => {
        let newList = [...listProducts]
        newList.push({
            name:inputValue,
            id: listProducts.length + 1,
            quantity:1,
            value:25,
           
        })
         setListProducts(newList)   
       
    }
    function handleRemoveItem (id:number) {
        let filteredtasks= listProducts.filter(list => list.id !== id )
        
        setListProducts(filteredtasks)
    }
    function handleEditItem (id:number,item:number) {
        let newList = [...listProducts]
        for(let i in newList){if(newList[i].id === id){
            newList[i].quantity = newList[i].quantity+1
            newList[i].value = newList[i].value+25
        }}
        setListProducts(newList) 
        console.log(listProducts)  
           
        }
    function handleRemoveOneItem (id:number,item:number) {
        let newList = [...listProducts]
        for(let i in newList){if(newList[i].id === id){
            newList[i].quantity = newList[i].quantity-1
            newList[i].value = newList[i].value-25
        }}
        setListProducts(newList) 
        console.log(listProducts)  
           
        }
    const handleKeyUP = (e: KeyboardEvent) => {
        console.log(e.code)
        if(e.code === 'Enter' || e.code ==='NumpadEnter' && inputValue !== ''){
            
            handleAddProduct()
        }
    }
    const [isModalConfirmSellOpen, setisModalConfirmSellOpen] = useState(false);
    function handleOpenModalConfirmSell() {
        if(inputValue){
        setisModalConfirmSellOpen(true)}
    }
    function handleCloseModalConfirmSell() {
        setisModalConfirmSellOpen(false)
    }
     
        
        const sumquantity = listProducts.map(item => item.quantity).reduce((prev, curr) => prev + curr, 0);
        const sumvalue = listProducts.map(item => item.value).reduce((prev, curr) => prev + curr, 0);
        const sumvalueformated = new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL'}).format(sumvalue);

    return (
        <>
        <Modal open={isModalConfirmSellOpen} onClose={handleCloseModalConfirmSell}>
      <Box sx={{position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 500,
                bgcolor: Theme.DarkMode?'var(--backgroundDarkMode2)':'background.paper',
                color: Theme.DarkMode?'#ffffff':'#000',
                border: Theme.DarkMode?'1px solid silver':'',
                boxShadow: 24, p: 4,}}>
            <S.ButtonClose onClick={handleCloseModalConfirmSell}><AiOutlineClose style={{position:"absolute", right:10, top: 10}}/></S.ButtonClose>      
            Total: {sumvalueformated}
            <p>Qual será a forma de pagamento?</p>
            <S.DivModalIconsPayment>
                <S.LabelIconsModal onClick={() => handleAddMethod('cash')}><FaMoneyBillWave size={25}/>Dinheiro</S.LabelIconsModal>
                <S.LabelIconsModal onClick={() => handleAddMethod('debitcard')}><BsFillCreditCardFill size={25}/>Cartão de Débito</S.LabelIconsModal>
                <S.LabelIconsModal onClick={() => handleAddMethod('creditcard')}><BsFillCreditCard2FrontFill size={25}/>Cartão de Crédito</S.LabelIconsModal>
                <S.LabelIconsModal onClick={() => handleAddMethod('pix')}><PixIcon />PIX</S.LabelIconsModal>
                <S.LabelIconsModal onClick={() => handleAddMethod('others')}><MdPending size={25}/>Outros</S.LabelIconsModal>
            </S.DivModalIconsPayment>
            {listMethods.map((item)=>(
                <PaymentMethods key={item.id} item={item} handleRemoveOneMethod={handleRemoveOneMethod} handleEditMethod={handleEditMethod} handleRemoveMethod={handleRemoveMethod} />
            ))}
            
            <S.DivModalButtons>
            <S.ButtonPrint><AiFillPrinter style={{marginRight:2}}/>Comprovante</S.ButtonPrint>
            <S.ButtonEndSell><BsFillBagCheckFill style={{marginRight:2}}/> Finalizar</S.ButtonEndSell>
            </S.DivModalButtons>
        
      </Box>
   </Modal>
        
        <S.Container isDarkMode={Theme.DarkMode}>
        <S.Header>
            <S.Box>
                <Autocomplete
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                    }}
                    id="grouped-demo"
                    noOptionsText={"Nenhum Resultado"}
                    options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    groupBy={(option) => option.firstLetter}
                    getOptionLabel={(option) => option.name}
                    sx={{border:'#fff', width: '100%', '& input':{color:Theme.DarkMode?'#fff':'', "& .MuiInputLabel-root": {color: 'green'}}}}
                    renderInput={(params) => <TextField {...params} 
                    sx={{borderColor:'#fff'}}
                    onKeyUp={handleKeyUP}
                    label="Selecione um produto" 
                    autoFocus/>}
                />
            </S.Box>
            <S.Button onClick={handleAddProduct}>
                <MdLibraryAdd size="25"/>
            </S.Button>
        </S.Header>
        <S.Main>
            <S.DivList>
        {listProducts.map((item)=>(
            <ListSell key={item.name} item={item} handleRemoveItem={handleRemoveItem} handleEditItem={handleEditItem} handleRemoveOneItem={handleRemoveOneItem}/>
               
        ))}</S.DivList>
        <S.Checkout isDarkMode={Theme.DarkMode}>
            <label>Qtd: {sumquantity}</label>
            <label>Valor Total:</label>
            <S.TotalValue>
                {sumvalueformated}
            </S.TotalValue>
        <S.DivConfirmSell>
        <S.Button onClick={handleOpenModalConfirmSell}><FaCheckCircle size="80"/></S.Button>
        <S.LabelConfirm onClick={handleOpenModalConfirmSell}>Confirmar Venda</S.LabelConfirm>
        </S.DivConfirmSell>
        </S.Checkout>
        
        </S.Main>
        

        
        </S.Container>
        </>
    )
}