import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import * as S from "./style"
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkModeProvider';
import { AiOutlineClose } from 'react-icons/ai';
import { BsCheckCircle } from 'react-icons/bs';

interface listSellertoModalSucessOpenProps{
    searchSeller : () => void,
    setisModalSucessOpen : (value:boolean) => void
    isModalSucessOpen : boolean
}

export const ModalSuccessDeleteSellerOpen = (props: listSellertoModalSucessOpenProps) => {
    
    const Theme = useDarkMode()
    function handleCloseModalSucess() {
        props.searchSeller()
        props.setisModalSucessOpen(false)
    }

    return (

        <Modal open={props.isModalSucessOpen} onClose={handleCloseModalSucess}>
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
                <S.DivSuccessSellerModal>
                    <h3 style={{ alignSelf: 'center' }}>Procedimento realizado com sucesso!</h3>
                    <BsCheckCircle color="var(--Green)" size="50" className="IconSucess" />
                </S.DivSuccessSellerModal>
                <S.ButtonCloseModal isDarkMode={Theme.DarkMode} onClick={handleCloseModalSucess}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonCloseModal>
            </Box>
        </Modal>

    )
}