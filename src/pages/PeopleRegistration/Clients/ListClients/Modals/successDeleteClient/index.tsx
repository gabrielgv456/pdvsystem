import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import * as S from "./style"
import { BsCheckCircle } from 'react-icons/bs';
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkModeProvider';
import { AiOutlineClose } from 'react-icons/ai';
import { MuiBox } from '../../../../../../components/box/muiBox';
import { DefaultButtonCloseModal, DefaultIconCloseModal } from '../../../../../../components/buttons/closeButtonModal';


interface indexToModalDeleteClientProps {
    isModalSucessOpen: boolean;
    searchClient: () => void;
    setisModalSucessOpen: (value: boolean) => void;
}



export const ModalSuccessDeleteClient = (props: indexToModalDeleteClientProps) => {

    const Theme = useDarkMode()


    function handleCloseModalSucess() {
        props.searchClient()
        props.setisModalSucessOpen(false)
    }

    return (

        <Modal open={props.isModalSucessOpen} onClose={handleCloseModalSucess}>
            <MuiBox desktopWidth={500} mobileWidthPercent='80%' >
                <S.DivSuccessDeleteClientModal>
                    <h3 style={{ alignSelf: 'center' }}>Procedimento realizado com sucesso!</h3>
                    <BsCheckCircle color="var(--Green)" size="50" className="IconSucess" />
                </S.DivSuccessDeleteClientModal>
                <DefaultButtonCloseModal onClick={handleCloseModalSucess}>
                    <DefaultIconCloseModal />
                </DefaultButtonCloseModal>
            </MuiBox>
        </Modal>

    )
}