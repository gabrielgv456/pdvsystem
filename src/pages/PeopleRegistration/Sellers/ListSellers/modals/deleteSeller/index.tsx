import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import * as S from "./style"
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkModeProvider';
import { AiOutlineClose } from 'react-icons/ai';
import { useApi } from '../../../../../../hooks/useApi';
import { useContext } from 'react';
import { AuthContext } from '../../../../../../contexts/Auth/AuthContext';
import { useMessageBoxContext } from '../../../../../../contexts/MessageBox/MessageBoxContext';
import { MuiBox } from '../../../../../../components/box/muiBox';
import { DefaultButtonCloseModal, DefaultIconCloseModal } from '../../../../../../components/buttons/closeButtonModal';

interface indextoDeleteSellerModal {
    isModalDeleteSellerOpen: boolean;
    setisModalDeleteSellerOpen: (value: boolean) => void;
    setisModalSucessOpen: (value: boolean) => void;
    idSeller: Number;
}

export const ModalDeleteSeller = (props: indextoDeleteSellerModal) => {

    const Theme = useDarkMode()
    const { deleteSeller } = useApi()
    const auth = useContext(AuthContext)
    const { MessageBox } = useMessageBoxContext()
    function handleCloseModalDeleteSeller() {
        props.setisModalDeleteSellerOpen(false)
    }

    const handleDeleteSellerApi = async () => {
        const data = await deleteSeller({ sellerId: props.idSeller, userId: auth.idUser })
        if (data.Success) {
            props.setisModalDeleteSellerOpen(false)
            props.setisModalSucessOpen(true)
        }
        else {
            MessageBox('error', data.erro)
        }
    }

    return (
        <Modal open={props.isModalDeleteSellerOpen} onClose={handleCloseModalDeleteSeller}>
            <MuiBox desktopWidth={500} mobileWidthPercent='80%'>
                <S.DivDeleteSellerModal>
                    <h3 style={{ alignSelf: 'center' }}>Deseja realmente excluir o vendedor?</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '40%' }}>
                        <S.ButtonYesDeleteSellerModal onClick={handleDeleteSellerApi}><b>SIM</b></S.ButtonYesDeleteSellerModal>
                        <S.ButtonNoDeleteSellerModal onClick={handleCloseModalDeleteSeller}><b>NÃO</b></S.ButtonNoDeleteSellerModal>
                    </div>
                </S.DivDeleteSellerModal>
                <DefaultButtonCloseModal onClick={handleCloseModalDeleteSeller}>
                    <DefaultIconCloseModal />
                </DefaultButtonCloseModal>
            </MuiBox>
        </Modal>

    )
}