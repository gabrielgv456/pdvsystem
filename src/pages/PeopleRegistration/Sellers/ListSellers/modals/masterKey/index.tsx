import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import * as S from "./style"
import { AuthContext } from '../../../../../../contexts/Auth/AuthContext';
import { useContext, useState } from "react";
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkModeProvider';
import { TextField } from '@mui/material';
import { RiAdminLine } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai';
import { useMessageBoxContext } from '../../../../../../contexts/MessageBox/MessageBoxContext';
import { MuiBox } from '../../../../../../components/box/muiBox';
import { DefaultButtonCloseModal, DefaultIconCloseModal } from '../../../../../../components/buttons/closeButtonModal';

interface indextoModalMasterKeyProps {
    setisModalDeleteSellerOpen: (value: boolean) => void;
    setisModalMasterKeyOpen: (value: boolean) => void;
    isModalMasterKeyOpen: boolean;
}

export const ModalMasterKeyDeleteSeller = (props: indextoModalMasterKeyProps) => {

    const [inputMasterKey, setinputMasterKey] = useState("")
    const auth = useContext(AuthContext)
    const Theme = useDarkMode()
    const { MessageBox } = useMessageBoxContext()
    function handleVerifyMasterKey() {
        if (inputMasterKey === auth.masterkey) {
            handleCloseModalMasterKey()
            setinputMasterKey("")
            props.setisModalDeleteSellerOpen(true)
        }
        else {
            MessageBox('error', 'Senha de Administrador incorreta!')
        }
    }

    function handleCloseModalMasterKey() {
        props.setisModalMasterKeyOpen(false)
    }


    return (

        <Modal open={props.isModalMasterKeyOpen} onClose={handleCloseModalMasterKey}>
            <MuiBox desktopWidth={500} mobileWidthPercent='80%'>
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
                <DefaultButtonCloseModal onClick={handleCloseModalMasterKey}>
                    <DefaultIconCloseModal />
                </DefaultButtonCloseModal>
            </MuiBox>
        </Modal>

    )
}