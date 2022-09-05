import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import * as S from "./style"
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkModeProvider';
import { AiOutlineClose } from 'react-icons/ai';
import { useApi } from '../../../../../../hooks/useApi';
import { useContext } from 'react';
import { AuthContext } from '../../../../../../contexts/Auth/AuthContext';

interface indextoDeleteSellerModal {
    isModalDeleteSellerOpen: boolean;
    setisModalDeleteSellerOpen: (value:boolean) => void;
    setisModalSucessOpen: (value:boolean) => void;
    idSeller: Number;
}

export const ModalDeleteSeller = (props: indextoDeleteSellerModal) => {

    const Theme = useDarkMode()
    const {deleteSeller} = useApi()
    const auth = useContext(AuthContext)
    
    function handleCloseModalDeleteSeller() {
        props.setisModalDeleteSellerOpen(false)
    }

    const handleDeleteSellerApi = async () => {
        const data = await deleteSeller({sellerId:props.idSeller, userId:auth.idUser})
        if (data.Success){
            props.setisModalDeleteSellerOpen(false)
            props.setisModalSucessOpen(true)
        }
        else {
            alert(data.erro)
        }
    }

    return (
        <Modal open={props.isModalDeleteSellerOpen} onClose={handleCloseModalDeleteSeller}>
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
                    <h3 style={{ alignSelf: 'center' }}>Deseja realmente excluir o vendedor?</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '40%' }}>
                        <S.ButtonYesDeleteSellerModal onClick={handleDeleteSellerApi}><b>SIM</b></S.ButtonYesDeleteSellerModal>
                        <S.ButtonNoDeleteSellerModal onClick={handleCloseModalDeleteSeller}><b>NÃO</b></S.ButtonNoDeleteSellerModal>
                    </div>
                </S.DivDeleteSellerModal>
                <S.ButtonCloseModal isDarkMode={Theme.DarkMode} onClick={handleCloseModalDeleteSeller}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonCloseModal>
            </Box>
        </Modal>

    )
}