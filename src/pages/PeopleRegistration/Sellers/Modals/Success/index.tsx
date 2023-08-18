import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkModeProvider';
import * as S from "./style"
import { AiOutlineClose } from 'react-icons/ai';
import { BsCheckCircle } from 'react-icons/bs';
import { MuiBox } from '../../../../../components/box/muiBox';

interface indextomodalSucessSeller {
    setisModalSucessOpen: (value:boolean) => void;
    isModalSucessOpen : boolean;
    handleContinueAddingSellers: () => void;
}

export const ModalSuccessSeller = (props:indextomodalSucessSeller) => {

    const Theme = useDarkMode()

    function handleCloseModalSucess() {
        props.setisModalSucessOpen(false)
    }

    return (

        <Modal open={props.isModalSucessOpen} onClose={handleCloseModalSucess}>
            <MuiBox desktopWidth={500} mobileWidthPercent='80%'>
                <S.DivModalSucess>
                    <h3 style={{ alignSelf: 'center' }}>Vendedor adicionado com sucesso!</h3>
                    <BsCheckCircle color="var(--Green)" size="50" className="IconSucess" />
                    <div style={{ display: 'flex', marginTop: '30px', gap: '5px' }}>
                        <S.ButtonAddSucessSellerModal onClick={props.handleContinueAddingSellers}><b>Continuar adicionando</b></S.ButtonAddSucessSellerModal>
                        <S.ButtonExitSucessSellerModal onClick={handleCloseModalSucess}><b>Sair</b></S.ButtonExitSucessSellerModal>
                    </div>
                </S.DivModalSucess>
                <S.ButtonCloseModal isDarkMode={Theme.DarkMode} onClick={handleCloseModalSucess}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonCloseModal>
            </MuiBox>
        </Modal>
    )
}