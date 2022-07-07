
import {Link} from 'react-router-dom'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import * as S from "./style"
import { useDarkMode } from '../../contexts/DarkMode/DarkModeProvider';
import { MdAdd, MdChevronLeft, MdChevronRight, MdFileDownloadDone } from 'react-icons/md';
import { ListProducts } from './ListProducts/ListProducts';
import { useApi } from '../../hooks/useApi';
import { IoMdAdd } from 'react-icons/io';
import { BsSearch } from 'react-icons/bs';
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
}

export const InventoryManagement = () => {
    const {findProducts} = useApi()
    const {addProducts} = useApi()
    const auth = useContext(AuthContext);
    const Theme = useDarkMode();
    const [ProductsReturnApi,setProductsReturnApi] = useState<ProductsReturnApiProps[]>([])
    const [ItensPerPageExtract,SetItensPerPageExtract] = useState(10)
    const [atualPageExtract, SetAtualPageExtract] = useState(0)
    const [isModalAddProductOpen, setisModalAddProductOpen] = useState(false);
    const [isModalEditProductOpen, setisModalEditProductOpen] = useState(false);
    const [isModalTransactionsProductsOpen, setisModalTransactionsProductsOpen] = useState(false);
    const [isModalMasterKeyOpen, setisModalMasterKeyOpen] = useState(false)
    const [isProductCreated, setisProductCreated] = useState(false)
    const [inputProductsModalName,setinputProductsModalName] = useState("")
    const [inputMasterKey, setinputMasterKey] = useState("")
    const [inputProductsModalValue,setinputProductsModalValue] = useState(0)
    const [inputProductsModalQuantity,setinputProductsModalQuantity] = useState(0)
    const [isProductActiveModalAddProduct, setisProductActiveModalAddProduct] = useState(true)
    const PagesExtract = Math.ceil(ProductsReturnApi.length / ItensPerPageExtract )
    const StartIndexExtract = atualPageExtract * ItensPerPageExtract
    const EndIndexExtract = StartIndexExtract + ItensPerPageExtract
    const paginedTransactionsReturnApi = ProductsReturnApi.slice(StartIndexExtract,EndIndexExtract)
    const finaldataAddProductsToSendApi = {userId:auth.idUser, name:inputProductsModalName, value:inputProductsModalValue, quantity:inputProductsModalQuantity }
    
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

    function handleCloseModalEditProduct() {
        if(isProductCreated){
            setisModalEditProductOpen(false)
            
        } else {
            setisModalEditProductOpen(false)
        }
        
    }

    function handleCloseModalTransactionsProducts() {
        if(isProductCreated){
            setisModalTransactionsProductsOpen(false)
            
        } else {
            setisModalTransactionsProductsOpen(false)
        }
        
    }

    function handleCloseModalMasterKey() {
        if(isProductCreated){
            setisModalMasterKeyOpen(false)
            
        } else {
            setisModalMasterKeyOpen(false)
        }
        
    }

    const AddProductApi = async () => {
        const data = await addProducts(finaldataAddProductsToSendApi)
        console.log(data)
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
                    <input style={{border:"none",background:'none',borderRadius:'7px', width:'100%', height:'100%', outline:'none',fontSize:"1rem" }} placeholder="Localizar Produto..."></input>
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
                    isModalTransactionsProductsOpen={isModalTransactionsProductsOpen} 
                    setisModalTransactionsProductsOpen={setisModalTransactionsProductsOpen} 
                    isModalEditProductOpen={isModalEditProductOpen} 
                    setisModalEditProductOpen={setisModalEditProductOpen} 
                    isModalMasterKeyOpen={isModalMasterKeyOpen}
                    setisModalMasterKeyOpen={setisModalMasterKeyOpen}
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
                        label="Quantidade em Estoque" 
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




            <Modal open={isModalEditProductOpen} onClose={handleCloseModalEditProduct}>
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
                        label="Quantidade em Estoque" 
                        variant="outlined" 
                        sx={{width:'48%'}}/> 
                        </label>
                        <label>
                            Produto ativo 
                            <Switch checked={isProductActiveModalAddProduct} onChange={(e)=>{setisProductActiveModalAddProduct(e.target.checked)}}/>
                        </label>
                    </S.DivModalAddProduct>
                        <S.ButtonAddProductModal onClick={AddProductApi} isDarkMode={Theme.DarkMode} style={{margin: '0 auto'}}>
                            <AiOutlineEdit size="22"/>
                            <b>FINALIZAR EDIÇÃO</b>
                        </S.ButtonAddProductModal>
                        <S.ButtonCloseModal isDarkMode={Theme.DarkMode} onClick={handleCloseModalEditProduct}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonCloseModal>
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
                    <S.ButtonCloseModal isDarkMode={Theme.DarkMode} onClick={handleCloseModalTransactionsProducts}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonCloseModal>
                </Box>
            </Modal>




            <Modal open={isModalMasterKeyOpen} onClose={handleCloseModalMasterKey}>
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
                    <S.DivRestrictAcessModal>
                    <h3 style={{alignSelf:'center'}}>Acesso Restrito</h3>
                    <label style={{display:'flex',alignItems:'center',gap:'5px'}}>
                    <RiAdminLine size="32" color='#485059'/>
                     <TextField 
                       value={inputMasterKey}
                       onChange={(e)=>setinputMasterKey(e.target.value)}
                        type="password" 
                        id="outlined-basic" 
                        label="Senha de administrador" 
                        variant="outlined" 
                        sx={{width:'85%'}}/> 
                        <S.ButtonRestrictAcessModal>OK</S.ButtonRestrictAcessModal>
                        </label>

                    </S.DivRestrictAcessModal>
                    <S.ButtonCloseModal isDarkMode={Theme.DarkMode} onClick={handleCloseModalMasterKey}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonCloseModal>
                </Box>
            </Modal>

            


        </S.Container> 
        </>
    )
}