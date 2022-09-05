import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import * as S from "./style"

import { AiOutlineClose } from 'react-icons/ai';
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkModeProvider';
import { AuthContext } from '../../../../../../contexts/Auth/AuthContext';
import { useContext } from 'react';

interface indextoModalDeleteClient {
    setisModalDeleteClientOpen: (value: boolean) => void;
    isModalDeleteClientOpen: boolean;
    handleDeleteClientApi: () => void;
}

export const ModalDeleteClient = (props: indextoModalDeleteClient) => {

    const Theme = useDarkMode()
    const auth = useContext(AuthContext)

    function handleCloseModalDeleteClient() {
        props.setisModalDeleteClientOpen(false)
    }
    return (
        <Modal open={props.isModalDeleteClientOpen} onClose={handleCloseModalDeleteClient}>
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
                <S.DivDeleteClientModal>
                    <h3 style={{ alignSelf: 'center' }}>Deseja realmente excluir o cliente?</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '40%' }}>
                        <S.ButtonYesDeleteClientModal onClick={props.handleDeleteClientApi}><b>SIM</b></S.ButtonYesDeleteClientModal>
                        <S.ButtonNoDeleteClientModal onClick={handleCloseModalDeleteClient}><b>NÃO</b></S.ButtonNoDeleteClientModal>
                    </div>
                </S.DivDeleteClientModal>
                <S.ButtonCloseModal isDarkMode={Theme.DarkMode} onClick={handleCloseModalDeleteClient}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonCloseModal>
            </Box>
        </Modal>

    )
}