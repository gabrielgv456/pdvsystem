import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkModeProvider';
import * as S from "./style"
import { AiOutlineClose } from 'react-icons/ai';
import { BsCheckCircle } from 'react-icons/bs';
import { MuiBox } from '../../../../../components/box/muiBox';
import { DefaultButtonCloseModal, DefaultIconCloseModal } from '../../../../../components/buttons/closeButtonModal';

interface indextomodalSucessClient {
    setisModalSucessOpen: (value: boolean) => void;
    isModalSucessOpen: boolean;
    handleContinueAddingClients: () => void;
}

export const ModalSuccessClient = (props: indextomodalSucessClient) => {

    const Theme = useDarkMode()

    function handleCloseModalSucess() {
        props.setisModalSucessOpen(false)
    }

    return (

        <Modal open={props.isModalSucessOpen} onClose={handleCloseModalSucess}>
            <MuiBox desktopWidth={500} mobileWidthPercent='80%'>
                <S.DivModalSucess>
                    <h3 style={{ alignSelf: 'center' }}>Cliente adicionado com sucesso!</h3>
                    <BsCheckCircle color="var(--Green)" size="50" className="IconSucess" />
                    <div style={{ display: 'flex', marginTop: '30px', gap: '5px' }}>
                        <S.ButtonAddSucessClientModal onClick={props.handleContinueAddingClients}><b>Continuar adicionando</b></S.ButtonAddSucessClientModal>
                        <S.ButtonExitSucessClientModal onClick={handleCloseModalSucess}><b>Sair</b></S.ButtonExitSucessClientModal>
                    </div>
                </S.DivModalSucess>
                <DefaultButtonCloseModal onClick={handleCloseModalSucess}>
                    <DefaultIconCloseModal />
                </DefaultButtonCloseModal>
            </MuiBox>
        </Modal>
    )
}