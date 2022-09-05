import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import * as S from "./style"
import { AuthContext } from '../../../../../../contexts/Auth/AuthContext';
import { useContext, useState } from "react";
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkModeProvider';
import { TextField } from '@mui/material';
import { RiAdminLine } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai';

interface indextoModalMasterKeyProps {
    setisModalDeleteSellerOpen:(value:boolean)=>void;
    setisModalMasterKeyOpen:(value:boolean)=>void;
    isModalMasterKeyOpen: boolean;
}

export const ModalMasterKeyDeleteSeller = (props: indextoModalMasterKeyProps) => {

    const [inputMasterKey, setinputMasterKey] = useState("")
    const auth = useContext(AuthContext)
    const Theme = useDarkMode()

    function handleVerifyMasterKey() {
        if (inputMasterKey === auth.masterkey) {
            handleCloseModalMasterKey()
            setinputMasterKey("")
            props.setisModalDeleteSellerOpen(true)
        }
        else {
            alert('Senha de Administrador incorreta!')
        }
    }

    function handleCloseModalMasterKey() {
        props.setisModalMasterKeyOpen(false)
    }


    return (

        <Modal open={props.isModalMasterKeyOpen} onClose={handleCloseModalMasterKey}>
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
                    <h3 style={{ alignSelf: 'center' }}>Acesso Restrito</h3>
                    <label style={{ display: 'flex', alignItems: 'center' }}>
                        <RiAdminLine size="32" color='#485059' style={{ marginRight: 5 }} />
                        <TextField
                            value={inputMasterKey}
                            onChange={(e) => setinputMasterKey(e.target.value)}
                            type="password"

                            label="Senha de administrador"
                            variant="filled"
                            sx={{ width: '80%', borderRadius: '0 !important' }} />

                        <S.ButtonRestrictAcessModal onClick={handleVerifyMasterKey}>OK</S.ButtonRestrictAcessModal>
                    </label>
                </S.DivRestrictAcessModal>
                <S.ButtonCloseModal isDarkMode={Theme.DarkMode} onClick={handleCloseModalMasterKey}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonCloseModal>
            </Box>
        </Modal>

    )
}