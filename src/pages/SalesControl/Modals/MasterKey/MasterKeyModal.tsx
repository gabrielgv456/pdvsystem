import * as S from "./style"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useDarkMode } from "../../../../contexts/DarkMode/DarkModeProvider";
import { AuthContext } from "../../../../contexts/Auth/AuthContext";
import { useContext , useState} from "react";
import TextField from '@mui/material/TextField';
import { RiAdminLine } from "react-icons/ri";
import { AiOutlineClose} from "react-icons/ai";


interface ModalMasterKeyEditProps {
    ismodalMasterkeyOpen:boolean;
    setismodalMasterkeyOpen: (value:boolean) => void;
    setismodalEditOpen: (vaalue:boolean) => void;
}

export const ModalMasterKeyEdit = (props: ModalMasterKeyEditProps) => {
   
const auth = useContext(AuthContext)
const Theme = useDarkMode()
const [inputMasterKey,setinputMasterKey] = useState("")

const handleCloseModalMasterKey = async () => {
    props.setismodalMasterkeyOpen(false)
}

async function handleVerifyMasterKey(){
    if(inputMasterKey === auth.masterkey){
        setinputMasterKey("")
        handleCloseModalMasterKey()
        props.setismodalEditOpen(true)
        
        
    }
    else{
        alert('Senha de Administrador incorreta!')
    }
}

return (

    <Modal open={props.ismodalMasterkeyOpen} onClose={handleCloseModalMasterKey}>
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
)
}



interface ModalMasterKeyDeleteProps {
    ismodalMasterkeyOpen:boolean;
    setismodalMasterkeyOpen: (value:boolean) => void;
    setismodalDeleteOpen: (vaalue:boolean) => void;
}

export const ModalMasterKeyDelete = (props: ModalMasterKeyDeleteProps) => {
   
    const auth = useContext(AuthContext)
    const Theme = useDarkMode()
    const [inputMasterKey,setinputMasterKey] = useState("")
    
    const handleCloseModalMasterKey = async () => {
        props.setismodalMasterkeyOpen(false)
    }
    
    async function handleVerifyMasterKey(){
        if(inputMasterKey === auth.masterkey){
            setinputMasterKey("")
            handleCloseModalMasterKey()
            props.setismodalDeleteOpen(true)
            
            
        }
        else{
            alert('Senha de Administrador incorreta!')
        }
    }
    
    return (
    
        <Modal open={props.ismodalMasterkeyOpen} onClose={handleCloseModalMasterKey}>
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
    )
    }