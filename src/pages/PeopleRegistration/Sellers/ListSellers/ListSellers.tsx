import { BsCheckCircle, BsFillCreditCard2FrontFill, BsFillCreditCardFill, BsInfoCircle, BsTrash } from "react-icons/bs";
import { useDarkMode } from "../../../../contexts/DarkMode/DarkModeProvider";
import * as S from "./style"
import { HiOutlinePencilAlt } from "react-icons/hi";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useContext, useState } from "react";
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { useApi } from "../../../../hooks/useApi";
import { AuthContext } from "../../../../contexts/Auth/AuthContext";
import { RiAdminLine } from "react-icons/ri";
import {SellersReturnApiProps} from "../index"
import { ModalEditSeller } from "./modals/editSeller";


interface ListSellersProps{
    seller: SellersReturnApiProps;
    isModalTransactionsSellersOpen: boolean;
    setisModalTransactionsSellersOpen:(isModalTransactionsSellersOpen:boolean) => void;
    searchSeller: () => void;
}





export const ListSellers = (props:ListSellersProps) => {


    const {editSeller, deleteSeller} = useApi()
    const auth = useContext(AuthContext)
    const Theme = useDarkMode();
    const gethoursTransactions = new Date(props.seller.created_at).toLocaleString('pt-BR', { timeZone: 'UTC' })
    const [isModalEditSellerOpen, setisModalEditSellerOpen] = useState(false);
    const [isModalMasterKeyOpen, setisModalMasterKeyOpen] = useState(false)
    const [inputMasterKey, setinputMasterKey] = useState("")
    const [isModalDeleteSellerOpen,setisModalDeleteSellerOpen] = useState(false)
    const [isModalSucessOpen, setisModalSucessOpen] = useState(false)
    const [valueInputSellerName,setvalueInputSellerName]=useState(props.seller.name)
    const cpfFormated = props.seller.cpf.length === 11 ? props.seller.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4") : props.seller.cpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5")
    const cellFormated =  props.seller.cellNumber !== null && props.seller.cellNumber.replace(/(\d{2})(\d{5})(\d{4})/g, "($1)$2-$3")
    const finaldataEditSellersToSendApi = {
        id:props.seller.id,
        name:valueInputSellerName, 
        userId: auth.idUser
    }
    
    function handleCloseModalSucess() {
        props.searchSeller()
        setisModalSucessOpen(false)
    }
    function handleCloseModalMasterKey() {
            setisModalMasterKeyOpen(false)
    }
    function handleCloseModalDeleteSeller() {
        setisModalDeleteSellerOpen(false)
    }
    function handleVerifyMasterKey(){
        if(inputMasterKey === auth.masterkey){
            handleCloseModalMasterKey()
            setinputMasterKey("")
            setisModalDeleteSellerOpen(true)
        }
        else{
            alert('Senha de Administrador incorreta!')
        }
    }
    const handleDeleteSellerApi = async () => {
        const data = await deleteSeller({id:props.seller.id})
        if (data.Sucess){
            setisModalDeleteSellerOpen(false)
            setisModalSucessOpen(true)
        }
        else {
            alert(data.Erro)
        }
        
       
    }
    function handleCloseModalEditSeller() {
            setisModalEditSellerOpen(false)
    }
    const EditSellerApi = async () => {
        const data = await editSeller(finaldataEditSellersToSendApi)
        if (data.Sucess){
            setisModalEditSellerOpen(false)
            setisModalSucessOpen(true)
        }
        else {
            alert(data.Erro)
        }
        
    }
    
    

    return (
        <>
        <S.Container isDarkMode={Theme.DarkMode} isSellerActive={props.seller.active}>

            <S.ButtonEdit onClick={() => setisModalEditSellerOpen(true)} title="Editar Produto"><HiOutlinePencilAlt size="20" /></S.ButtonEdit>

            <S.LabelNameSeller isDarkMode={Theme.DarkMode}>
                <b>{props.seller.name}</b>
            </S.LabelNameSeller>

            
            <S.LabelCpf isDarkMode={Theme.DarkMode}>
                <b>{cpfFormated}</b>
            </S.LabelCpf>

            <S.LabelPhone isDarkMode={Theme.DarkMode}>
                <b>{cellFormated}</b>
            </S.LabelPhone>

            <S.LabelEmail isDarkMode={Theme.DarkMode}>
                <b>{props.seller.email}</b>
            </S.LabelEmail>

            
            <S.ButtonTrash onClick={()=>setisModalMasterKeyOpen(true)}  title="Excluir Produto" ><BsTrash size="16" /></S.ButtonTrash>
           
        </S.Container>


        <ModalEditSeller
        seller={props.seller}
        isModalEditSellerOpen={isModalEditSellerOpen}
        setisModalEditSellerOpen={setisModalEditSellerOpen}
        setisModalSucessOpen={setisModalSucessOpen}
        />






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
                    <label style={{display:'flex',alignItems:'center'}}>
                    <RiAdminLine size="32" color='#485059' style={{marginRight:5}}/>
                     <TextField 
                       value={inputMasterKey}
                       onChange={(e)=>setinputMasterKey(e.target.value)}
                        type="password" 
                        
                        label="Senha de administrador" 
                        variant="filled" 
                        sx={{width:'80%', borderRadius:'0 !important'}} /> 

                        <S.ButtonRestrictAcessModal onClick={handleVerifyMasterKey}>OK</S.ButtonRestrictAcessModal>
                        </label>
                    </S.DivRestrictAcessModal>
                    <S.ButtonCloseModal  isDarkMode={Theme.DarkMode} onClick={handleCloseModalMasterKey}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonCloseModal>
                </Box>
            </Modal>

            <Modal open={isModalDeleteSellerOpen} onClose={handleCloseModalDeleteSeller}>
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
                        <S.DivDeleteSellerModal>
                            <h3 style={{alignSelf:'center'}}>Deseja realmente excluir o produto?</h3>
                            <div style={{display:'flex',justifyContent:'space-between', width:'40%'}}>
                                <S.ButtonYesDeleteSellerModal onClick={handleDeleteSellerApi}><b>SIM</b></S.ButtonYesDeleteSellerModal> 
                                <S.ButtonNoDeleteSellerModal onClick={handleCloseModalDeleteSeller}><b>NÃO</b></S.ButtonNoDeleteSellerModal>
                            </div>
                        </S.DivDeleteSellerModal>            
                    <S.ButtonCloseModal isDarkMode={Theme.DarkMode} onClick={handleCloseModalDeleteSeller}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonCloseModal>
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
                        <S.DivDeleteSellerModal>
                            <h3 style={{alignSelf:'center'}}>Procedimento realizado com sucesso!</h3>
                            <BsCheckCircle color="var(--Green)" size="50" className="IconSucess"/>
                        </S.DivDeleteSellerModal>  
                    <S.ButtonCloseModal isDarkMode={Theme.DarkMode} onClick={handleCloseModalSucess}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonCloseModal>
                </Box>
            </Modal>







        </>




            )

}
