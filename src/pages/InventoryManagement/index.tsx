
import {Link} from 'react-router-dom'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import * as S from "./style"
import { useDarkMode } from '../../contexts/DarkMode/DarkModeProvider';
import { MdAdd, MdChevronLeft, MdChevronRight, MdFileDownloadDone } from 'react-icons/md';
import { ListProducts } from './ListProducts/ListProducts';
import { useApi } from '../../hooks/useApi';
import { IoMdAdd } from 'react-icons/io';
import { BsArrowDownLeftCircle, BsArrowUpRightCircle, BsCheckCircle, BsSearch } from 'react-icons/bs';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';
import Switch from '@mui/material/Switch';
import { RiAdminLine } from 'react-icons/ri';



interface ProductsReturnApiProps{
    id: number;
    name: string;
    value: number;
    created_at:Date;
    active: boolean;
    quantity: number;
}
export interface TransactionsProductsReturnApi {
    type: string;
    description: string;
    created_at: Date;
    quantity: number;
    totalQuantity: number;
}
export const InventoryManagement = () => {
    const {addProducts, findProducts} = useApi()
    const auth = useContext(AuthContext);
    const Theme = useDarkMode();
    const [ProductsReturnApi,setProductsReturnApi] = useState<ProductsReturnApiProps[]>([])
    const [ItensPerPageExtract,SetItensPerPageExtract] = useState(10)
    const [atualPageExtract, SetAtualPageExtract] = useState(0)
    const [isModalAddProductOpen, setisModalAddProductOpen] = useState(false);
    const [isModalSucessOpen,setisModalSucessOpen] = useState(false);
    const [isModalTransactionsProductsOpen, setisModalTransactionsProductsOpen] = useState(false);
    const [isProductCreated, setisProductCreated] = useState(false)
    const [inputProductsModalName,setinputProductsModalName] = useState("")
    const [inputSearchProduct, setinputSearchProduct] = useState("")
    const inputSearchProductLowwer = inputSearchProduct.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    const [dataTransactionsProductsReturnApi, setdataTransactionsProductsReturnApi] = useState<TransactionsProductsReturnApi[]>([])
    const ProductsReturnApiFiltered = ProductsReturnApi.filter((product) => product.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(inputSearchProductLowwer))
    const [inputProductsModalValue,setinputProductsModalValue] = useState<number|null>(null)
    const [inputProductsModalQuantity,setinputProductsModalQuantity] = useState<number|null>(null)
    const [isProductActiveModalAddProduct, setisProductActiveModalAddProduct] = useState(true)
    const PagesExtract = Math.ceil(ProductsReturnApiFiltered.length / ItensPerPageExtract )
    const StartIndexExtract = atualPageExtract * ItensPerPageExtract
    const EndIndexExtract = StartIndexExtract + ItensPerPageExtract
    const paginedTransactionsReturnApi = ProductsReturnApiFiltered.slice(StartIndexExtract,EndIndexExtract)

    
    const finaldataAddProductsToSendApi = {
        userId:auth.idUser, 
        name:inputProductsModalName, 
        value:inputProductsModalValue, 
        quantity:inputProductsModalQuantity,
        active:isProductActiveModalAddProduct
     }
    
    useEffect(()=>{
        SearchProducts()
    },[])

    function handleOpenModalConfirmSell() {
            setisModalAddProductOpen(true)
        
    }
    function handleCloseModalAddProduct() {
        if(isProductCreated){
            setisModalAddProductOpen(false)
            
        } else {
            setisModalAddProductOpen(false)
        }
        
    }

    


    function handleCloseModalTransactionsProducts() {
        if(isProductCreated){
            setisModalTransactionsProductsOpen(false)
            
        } else {
            setisModalTransactionsProductsOpen(false)
        }
        
    }
    function handleCloseModalSucess() {
        SearchProducts()
        setisModalSucessOpen(false)
    }
    function handleContinueAddingProducts(){
        setisModalAddProductOpen(true)
        setisModalSucessOpen(false)
    }

    

    const AddProductApi = async () => {
        
        if (inputProductsModalName !== ""
            && inputProductsModalValue !== null
            && inputProductsModalValue > 0
            && inputProductsModalQuantity !== null
            && inputProductsModalQuantity > 0) {
                const data = await addProducts(finaldataAddProductsToSendApi)
                if (data.Sucess){
                    handleCloseModalAddProduct()
                    setinputProductsModalName("")
                    setinputProductsModalQuantity(null)
                    setinputProductsModalValue(null)
                    setisModalSucessOpen(true)
                }
                else {
                    alert(`ERRO: ${JSON.stringify(data)}`)
                }
                
            }
                
        else {
            alert('Insira todos dados corretamente!')
        }
    }
    
    
    const EditItensPerPage = (ItensPerPage:number) => {
        SetItensPerPageExtract(ItensPerPage)
        SetAtualPageExtract(0)
     }
    const SearchProducts = async () => {
        const data = await findProducts(auth.idUser)
        setProductsReturnApi(data.listProducts)
    }

    return (
        <>
        <S.Container isDarkMode={Theme.DarkMode}>
        

        

            <S.Header>
                <S.LabelSearchProduct>  
                    <BsSearch style={{margin:'15px', color:"#9eaab5"}} size="18"/>
                    <input 
                    value={inputSearchProduct} 
                    onChange={(e)=>setinputSearchProduct(e.target.value)} 
                    style={{
                        border:"none",
                        background:'none',
                        borderRadius:'7px', 
                        width:'100%', 
                        height:'100%', 
                        outline:'none',
                        fontSize:"1rem",
                        color:`${Theme.DarkMode ? '#fff' : '#000'}`
                    }} 
                    placeholder="Localizar Produto..."></input>
                </S.LabelSearchProduct>
                <label>
                    <S.ButtonAddProduct onClick={handleOpenModalConfirmSell} isDarkMode={Theme.DarkMode}>
                        <MdAdd size="22"/>
                        <b>NOVO PRODUTO</b>
                    </S.ButtonAddProduct>
                </label>
            </S.Header>


            <S.DivListProducts>
        
                <S.DivTitleListProducts isDarkMode={Theme.DarkMode}>
                    <label style={{width:'20px', display:'flex'}}></label>
                    <label style={{width:'30%', display:'flex'}}><b>Produto</b></label>
                    <label style={{width:'15%', display:'flex'}}><b>Status</b></label>
                    <label style={{width:'15%', display:'flex',justifyContent:'center'}}><b>Saldo</b></label>
                    <label style={{width:'10%', display:'flex'}}><b>Valor</b></label>
                    <label style={{width:'20%', display:'flex'}}><b>Criado em</b></label>
                    <label style={{width:'32px', display:'flex'}}></label>
                </S.DivTitleListProducts>
        
            
        
                {paginedTransactionsReturnApi.map((item) => (
                <ListProducts 
                    key={item.id} 
                    id={item.id} 
                    name={item.name} 
                    value={item.value}  
                    quantity={item.quantity}
                    active={item.active}
                    isModalTransactionsProductsOpen={isModalTransactionsProductsOpen} 
                    setisModalTransactionsProductsOpen={setisModalTransactionsProductsOpen} 
                    searchProduct={SearchProducts}
                    dataTransactionsProductsReturnApi = {dataTransactionsProductsReturnApi}
                    setdataTransactionsProductsReturnApi = {setdataTransactionsProductsReturnApi}
                    created_at={item.created_at}/>
                
                    )) 
                }
        
                {ProductsReturnApi.length === 0 && 
                <h5 style={{color:'#485059',marginTop:'5%'}}>Nenhum resultado encontrado</h5>
                }
    
                <S.DivFooterListProducts isDarkMode={Theme.DarkMode}>
                    <select value={ItensPerPageExtract} 
                    onChange={(e) => EditItensPerPage(Number(e.target.value))} 
                    style={{border:'none',width:'40px',background:'none',color:'#67636d'}}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={10000}>*</option>
                    </select>
                    <div style={{fontSize: '0.85rem',color:'#67636d',display:'flex', width:'20%', justifyContent:'space-between', minWidth:'max-content',alignItems:'center'}}>
                        {PagesExtract > 0 ? <label> Página {atualPageExtract+1} de {PagesExtract}</label> : <label></label>}
                        
                        <S.DivAlterPage>
                        
                            {atualPageExtract <= PagesExtract && atualPageExtract > 0 ? 
                                <button style={{border:'none', background:'none', margin:0}} onClick={(e) => SetAtualPageExtract(atualPageExtract-1)}>
                                    <MdChevronLeft color='#4b535c' size="25" />
                                </button>
                            :
                                <button style={{cursor:'context-menu', border:'none', background:'none', margin:0}}>
                                    <MdChevronLeft color='#b8c0c9'size="25"/>
                                </button>
                            }
                            {atualPageExtract+1 >= PagesExtract ? 
                                <button style={{cursor:'context-menu', border:'none', background:'none', margin:0}}>
                                    <MdChevronRight color='#b8c0c9' size="25"/>
                                </button>
                                :
                                <button style={{border:'none', background:'none', margin:0}} onClick={(e) => SetAtualPageExtract(atualPageExtract+1)}>
                                    <MdChevronRight color='#4b535c' size="25"/>
                                </button>
                            }
                        </S.DivAlterPage>
                    </div>
                    
                </S.DivFooterListProducts>
            </S.DivListProducts>

            {/******     Modals Start  *********/}

            <Modal open={isModalAddProductOpen} onClose={handleCloseModalAddProduct}>
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
                    //width: '80%',
                    bgcolor: Theme.DarkMode ? 'var(--backgroundDarkMode2)' : 'background.paper',
                    color: Theme.DarkMode ? '#ffffff' : '#000',
                    border: Theme.DarkMode ? '1px solid silver' : '',
                    boxShadow: 24, p: 4,
                }}
                >
                    <S.DivModalAddProduct>
                        <TextField 
                            value={inputProductsModalName}
                            onChange={(e) => setinputProductsModalName(e.target.value)} 
                            id="outlined-basic" 
                            label="Nome do Produto" 
                            variant="outlined" 
                            sx={{width:'90%'}}/>   
                        <label style={{display:'flex', justifyContent:'space-between',width:'90%'}}>
                        <TextField 
                        value={inputProductsModalValue}
                        onChange={(e) => setinputProductsModalValue(Number(e.target.value))} 
                        type="number" 
                        id="outlined-basic" 
                        label="Valor" 
                        variant="outlined" 
                        sx={{width:'48%'}}/> 

                        <TextField 
                        value={inputProductsModalQuantity}
                        onChange={(e) => setinputProductsModalQuantity(Number(e.target.value))} 
                        type="number" 
                        id="outlined-basic" 
                        label="Qtd em Estoque" 
                        variant="outlined" 
                        sx={{width:'48%'}}/> 
                        </label>
                        <label>
                            Produto ativo 
                            <Switch checked={isProductActiveModalAddProduct} onChange={(e)=>{setisProductActiveModalAddProduct(e.target.checked)}}/>
                        </label>
                    </S.DivModalAddProduct>
                        <S.ButtonAddProductModal onClick={AddProductApi} isDarkMode={Theme.DarkMode} style={{margin: '0 auto'}}>
                            <MdFileDownloadDone size="22"/>
                            <b>ADICIONAR PRODUTO</b>
                        </S.ButtonAddProductModal>
                        <S.ButtonCloseModal isDarkMode={Theme.DarkMode} onClick={handleCloseModalAddProduct}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonCloseModal>
                </Box>
            </Modal>




            





            <Modal open={isModalTransactionsProductsOpen} onClose={handleCloseModalTransactionsProducts}>
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
                    //width: '80%',
                    bgcolor: Theme.DarkMode ? 'var(--backgroundDarkMode2)' : 'background.paper',
                    color: Theme.DarkMode ? '#ffffff' : '#000',
                    border: Theme.DarkMode ? '1px solid silver' : '',
                    boxShadow: 24, p: 4,
                }}
                >
                    <div style={{display:'flex', justifyContent:'space-between', color:'#48505e', fontSize:'0.9rem', marginBottom:'10px'}}>
                                    <div style={{width:'20px'}}></div>
                                    <div style={{width:'40%', display:'flex', justifyContent:'center'}}>Data</div>
                                    <div style={{width:'40%', display:'flex', justifyContent:'center'}}>Descrição</div>
                                    <div style={{width:'10%', display:'flex',justifyContent:'center'}}>Qtd</div>
                                    <div style={{width:'10%', display:'flex',justifyContent:'center'}}>Saldo</div>
                    </div>
                    {dataTransactionsProductsReturnApi.map((transaction) =>(
                        <div>
                            {transaction.type === 'E' &&
                                <div style={{display:'flex', justifyContent:'space-between', color:'green', fontSize:'0.9rem'}}>
                                    <div style={{width:'20px'}}><BsArrowUpRightCircle size="20"/></div>
                                    <div style={{width:'40%', display:'flex', justifyContent:'center'}}>{new Date(transaction.created_at).toLocaleString('pt-BR', { timeZone: 'UTC' })}</div>
                                    <div style={{width:'40%'}}>{transaction.description}</div>
                                    <div style={{width:'10%', display:'flex',justifyContent:'center'}}>{transaction.quantity}</div>
                                    <div style={{width:'10%', display:'flex',justifyContent:'center'}}>{transaction.totalQuantity}</div>
                                </div>
                            }
                            {transaction.type === 'S' &&
                                <div style={{display:'flex', justifyContent:'space-between', color:'red', fontSize:'0.9rem'}}>
                                    <div style={{width:'20px'}}><BsArrowDownLeftCircle size="20"/></div>
                                    <div style={{width:'40%', display:'flex', justifyContent:'center'}}>{new Date(transaction.created_at).toLocaleString('pt-BR', { timeZone: 'UTC' })}</div>
                                    <div style={{width:'40%'}}>{transaction.description}</div>
                                    <div style={{width:'10%', display:'flex',justifyContent:'center'}}>{transaction.quantity}</div>
                                    <div style={{width:'10%', display:'flex',justifyContent:'center'}}>{transaction.totalQuantity}</div>
                                </div>
                            }
                            
                        </div>
                    ))}
                    
                    <S.ButtonCloseModal isDarkMode={Theme.DarkMode} onClick={handleCloseModalTransactionsProducts}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonCloseModal>
                </Box>
            </Modal>
            

            <Modal open={isModalSucessOpen} onClose={handleCloseModalSucess}>
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
                    //width: '80%',
                    bgcolor: Theme.DarkMode ? 'var(--backgroundDarkMode2)' : 'background.paper',
                    color: Theme.DarkMode ? '#ffffff' : '#000',
                    border: Theme.DarkMode ? '1px solid silver' : '',
                    boxShadow: 24, p: 4,
                }}
                >
                        <S.DivModalSucess>
                            <h3 style={{alignSelf:'center'}}>Produto adicionado com sucesso!</h3>
                            <BsCheckCircle color="var(--Green)" size="50" className="IconSucess"/>
                            <div style={{display:'flex',marginTop:'30px', gap:'5px'}}>
                            <S.ButtonAddSucessProductModal onClick={handleContinueAddingProducts}><b>Continuar adicionando</b></S.ButtonAddSucessProductModal> 
                            <S.ButtonExitSucessProductModal onClick={handleCloseModalSucess}><b>Sair</b></S.ButtonExitSucessProductModal>
                            </div>
                        </S.DivModalSucess>  
                    <S.ButtonCloseModal isDarkMode={Theme.DarkMode} onClick={handleCloseModalSucess}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonCloseModal>
                </Box>
            </Modal>



            


        </S.Container> 
        </>
    )
}