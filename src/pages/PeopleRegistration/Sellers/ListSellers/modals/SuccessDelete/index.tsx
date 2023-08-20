import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import * as S from "./style"
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkModeProvider';
import { AiOutlineClose } from 'react-icons/ai';
import { BsCheckCircle } from 'react-icons/bs';
import { MuiBox } from '../../../../../../components/box/muiBox';
import { DefaultButtonCloseModal, DefaultIconCloseModal } from '../../../../../../components/buttons/closeButtonModal';

interface listSellertoModalSucessOpenProps {
    searchSeller: () => void,
    setisModalSucessOpen: (value: boolean) => void
    isModalSucessOpen: boolean
}

export const ModalSuccessDeleteSellerOpen = (props: listSellertoModalSucessOpenProps) => {

    const Theme = useDarkMode()
    function handleCloseModalSucess() {
        props.searchSeller()
        props.setisModalSucessOpen(false)
    }

    return (

        <Modal open={props.isModalSucessOpen} onClose={handleCloseModalSucess}>
            <MuiBox desktopWidth={500} mobileWidthPercent='80%'>
                <S.DivSuccessSellerModal>
                    <h3 style={{ alignSelf: 'center' }}>Procedimento realizado com sucesso!</h3>
                    <BsCheckCircle color="var(--Green)" size="50" className="IconSucess" />
                </S.DivSuccessSellerModal>
                <DefaultButtonCloseModal onClick={handleCloseModalSucess}>
                    <DefaultIconCloseModal />
                </DefaultButtonCloseModal>
            </MuiBox>
        </Modal>

    )
}