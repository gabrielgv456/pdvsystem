
import { AuthContext } from "../../contexts/Auth/AuthContext";
import * as S from "./style"
import {RiMoneyDollarCircleFill} from "react-icons/ri"
import {BsFileEarmarkPdf, BsFillBagFill} from "react-icons/bs"
import { useDarkMode } from '../../contexts/DarkMode/DarkModeProvider';
import {FaSearch, FaShoppingCart} from "react-icons/fa"
import {Listagem} from './ListSales/ListSales'
import {useState, useContext,  KeyboardEvent, useEffect} from "react"
import { useApi } from '../../hooks/useApi';

// start imports menu MUI //
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ModalDelete } from './Modals/DeleteSell/ModalDelete';
import { ModalMasterKeyEdit, ModalMasterKeyDelete } from './Modals/MasterKey/MasterKeyModal';
import { ModalSuccess } from './Modals/Success/ModalSucess';
import { ModalEditSell } from './Modals/EditSell/ModalEditSell';
// end imports menu MUI //

export interface SellsProductsReceiveApi {
    id:number;
    storeId: number,
    sellId:number;
    idProduct:number;
    quantity: number,
    valueProduct: number;
    totalValue: number;
    descriptionProduct: string;
    created_at: Date;
 };

export interface Sell {
    id:number;
    storeId: number,
    clientName:string|null,
    sellerName:string|null,
    sellerId: number|null,
    clientId: number|null,
    sellValue:number;
    valuePayment:number;
    created_at: Date;
};
export interface SellersandClientsType {
    id: number ;
    name: string;
    cpf: string;
    active: boolean;
}

export const SalesControl = () => {

        const atualdata = ReturnData()
        const auth = useContext(AuthContext);
        const [InitialDate, setInitialDate] = useState(atualdata);
        const [FinalDate, setFinalDate] = useState(atualdata);
        const [listSells, setListSells] = useState<Sell[]>([]);
        const [listSellsProducts, setListSellsProducts] = useState<SellsProductsReceiveApi[]>([]);
        const sumSells = listSells.length
        const sumItens = listSellsProducts.map(item => item.quantity).reduce((prev, curr) => prev + curr, 0);
        const sumCash = listSells.map(item => item.sellValue).reduce((prev, curr) => prev + curr, 0);
        const sumCashFormated = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sumCash)
        const [ismodalDeleteOpen, setismodalDeleteOpen] = useState(false)
        const [ismodalMasterkeyEditOpen, setismodalMasterkeyEditOpen] = useState(false)
        const [ismodalMasterkeyDeleteOpen, setismodalMasterkeyDeleteOpen] = useState(false)
        const [ismodalSuccessOpen, setismodalSuccessOpen] = useState(false)
        const [ismodalEditSellOpen, setismodalEditSellOpen] = useState(false)
        const [idselltoEdit, setidselltoEdit] = useState(0)
        
        const {findSells, findSellers, findClients} = useApi()  
        const [sellers, setSellers] = useState<SellersandClientsType[]>([])
        const [clients, setClients] = useState<SellersandClientsType[]>([])  
        const [sellerfiltered, setsellerfiltered] = useState<SellersandClientsType | null>(null)
        const [clientfiltered, setclientfiltered] = useState<SellersandClientsType | null>(null)

        const dataToSendApi = {userId:auth.idUser,InitialDate,FinalDate}

        // Start params menu MUI //
        const options = ["Exportar como Excel", "Exportar como PDF"]
        const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
        const open = Boolean(anchorEl);
        const handleClick = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };
        const handleExportExcel = () => {
            alert("excel")
            handleClose()
        }
        const handleExportPDF = () => {
            alert("PDF")
            handleClose()
        }
        const defaultSendtoApi = async () => {
            
            const data = await findSells(dataToSendApi)
            await setListSells(data.sells)
            await setListSellsProducts(data.sellsproducts)}
        // End parms menu MUI//

        useEffect(()=>{ 
            defaultSendtoApi()
        },[])

    function ReturnData () {
        let data = new Date();
        let day = String(data.getDate()).padStart(2, '0');
        let mes = String(data.getMonth() + 1).padStart(2, '0');
        let year = data.getFullYear();
        const CurrentData = year + '-' + mes + '-' + day;
    
        return (CurrentData)
    }
        const handleSendtoApi = async () => {
            if (InitialDate > FinalDate) {
                alert('ERRO: Data inicial maior do que a data final!')
            } 
            else {
                const data = await findSells(dataToSendApi)
                setListSells(data.sells)
                setListSellsProducts(data.sellsproducts)
                SearchSellers()
                
            }
        }
          const handleKeyUP = (e: KeyboardEvent) => {
            if(e.code === 'Enter' && InitialDate !== ''){
                
            }
        }
    
    const [valueSellModal, setvalueSellModal] = useState(0)
    const [idSellDeleteModal, setidSellDeleteModal] = useState(0)
    const [listProductstoModifyQntFiltered, setlistProductstoModifyQntFiltered] = useState<SellsProductsReceiveApi[]>([])



    async function handleRemoveTask (id: number, sellValue:number)  {
        setvalueSellModal(sellValue)
        setidSellDeleteModal(id)
        const filter = listSellsProducts.filter(product=>product.sellId === id)
        setlistProductstoModifyQntFiltered(filter)
        setismodalMasterkeyDeleteOpen(true)
        //defaultSendtoApi();
        
    }
    async function SearchSellers() {
        const resultSellers = await findSellers(auth.idUser)
        if(resultSellers.Success){
            setSellers(resultSellers.findSellers)
        }
        else{
            alert(`ERRO: ${resultSellers.erro}`)
        }
        const resultClients = await findClients(auth.idUser)
        if(resultClients.Success){
            setClients(resultClients.findClients)
        }
        else {
            alert(`ERRO: ${resultClients.erro}`)
        }
    }
    async function filterSellerandClient (idSellertoEdit:number|null,idClienttoEdit:number|null) {
        
        const filterseller = (sellers.find(seller=>seller.id === idSellertoEdit))
        
        if (filterseller !== undefined) {
            setsellerfiltered( filterseller )
        }
        
        const filterclient = (clients.find(client=>client.id === idClienttoEdit))

        if (filterclient !== undefined) {
            setclientfiltered(filterclient)
        }
        
    }
    
    const Theme = useDarkMode();

    return (
        <S.Container isDarkMode={Theme.DarkMode}>
            <S.Header isDarkMode={Theme.DarkMode}>
            <S.Box><label>Data Inicial</label><S.Input isDarkMode={Theme.DarkMode} type="date" value={InitialDate} onChange={(e) =>setInitialDate(e.target.value)}></S.Input></S.Box>
            <S.Box><label>Data Final</label><S.Input isDarkMode={Theme.DarkMode} type="date" value={FinalDate} onChange={(e) =>setFinalDate(e.target.value)}></S.Input></S.Box>
                <S.DivSearch><S.Button onClick={handleSendtoApi} ><FaSearch size="13" /></S.Button>
                    <label style={{display:'flex', marginBottom:"-3px"}}>
                        <div>
                            <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls={open ? 'long-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                id="long-menu"
                                MenuListProps={{
                                'aria-labelledby': 'long-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                style: {
                                    maxHeight: 48 * 4.5,
                                    width: '20ch',
                                },
                                }}
                            >
                                {options.map((option, index) => (
                                <MenuItem
                                    key={option}
                                    selected={option === 'Pyxis'}
                                    onClick={index === 0 ? handleExportExcel :
                                                index === 1 ? handleExportPDF :
                                                    handleClose
                                    }
                                >
                                    {option}
                                </MenuItem>
                                ))}
                            </Menu>
                        </div>
                    </label>
                </S.DivSearch>
        </S.Header>
        <S.SubHeader>
            <S.BoxResume isDarkMode={Theme.DarkMode}>
                <FaShoppingCart size="2.5rem" color="var(--AppBar)"/>

                <label>
                    <section>Total Vendas</section>
                    <S.SectionValuesBoxResume>{sumSells}</S.SectionValuesBoxResume>
                </label>

            </S.BoxResume>

            <S.BoxResume isDarkMode={Theme.DarkMode}>
                <RiMoneyDollarCircleFill size="2.5rem" color="var(--AppBar)"/>
                <label>
                    <section>Receita Vendas</section>
                    <S.SectionValuesBoxResume>{sumCashFormated}</S.SectionValuesBoxResume>
                    </label>
            </S.BoxResume>

            <S.BoxResume isDarkMode={Theme.DarkMode}>
                <BsFillBagFill size="2.5rem" color="var(--AppBar)"/>
                <label>
                    <section>Itens Vendidos</section>
                    <S.SectionValuesBoxResume>{sumItens}</S.SectionValuesBoxResume>
                </label>
            </S.BoxResume>

            

        </S.SubHeader>
     {listSells.length !== 0 ? 
       ''
      : 
      <S.DivMenuNotSells isDarkMode={Theme.DarkMode}> 
        <h2>Que pena, nenhuma venda econtrada 🙁 </h2>
      </S.DivMenuNotSells>
      }
        {listSells.map((item)=>(
            <Listagem 
            SearchSellers={SearchSellers}
            filterSellerandClient={filterSellerandClient}
            key={item.id} 
            item={item} 
            handleRemoveTask={handleRemoveTask} 
            listSellsProducts={listSellsProducts} 
            setismodalMasterkeyEditOpen={setismodalMasterkeyEditOpen}
            setidselltoEdit = {setidselltoEdit}
           
            />
        ))}

        <ModalMasterKeyDelete
        ismodalMasterkeyOpen={ismodalMasterkeyDeleteOpen} 
        setismodalMasterkeyOpen={setismodalMasterkeyDeleteOpen} 
        setismodalDeleteOpen={setismodalDeleteOpen}
        />

        <ModalDelete 
        ismodalDeleteOpen={ismodalDeleteOpen} 
        setismodalDeleteOpen={setismodalDeleteOpen} 
        setismodalSuccessOpen={setismodalSuccessOpen} 
        valueSellModal={valueSellModal} 
        idSellDeleteModal={idSellDeleteModal} 
        listProductstoModifyQntFiltered={listProductstoModifyQntFiltered}
        defaultSendtoApi={defaultSendtoApi}
        />

        <ModalSuccess 
        isModalSuccessOpen={ismodalSuccessOpen} 
        setisModalSuccessOpen={setismodalSuccessOpen}
        />
        
        <ModalMasterKeyEdit
        ismodalMasterkeyOpen={ismodalMasterkeyEditOpen} 
        setismodalMasterkeyOpen={setismodalMasterkeyEditOpen} 
        setismodalEditOpen={setismodalEditSellOpen}
        />

        <ModalEditSell 
        ismodalEditSellOpen={ismodalEditSellOpen} 
        setismodalEditSellOpen={setismodalEditSellOpen}
        defaultSendtoApi={defaultSendtoApi}
        idselltoEdit={idselltoEdit}
        sellers={sellers}
        clients={clients}
        clientfiltered = {clientfiltered}
        sellerfiltered = {sellerfiltered}
        />

        </S.Container>
       
    )
}