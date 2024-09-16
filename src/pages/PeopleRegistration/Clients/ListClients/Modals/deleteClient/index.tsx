import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import * as S from "./style"

import { AiOutlineClose } from 'react-icons/ai';
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkModeProvider';
import { AuthContext } from '../../../../../../contexts/Auth/AuthContext';
import { useContext, useState } from 'react';
import { MuiBox } from '../../../../../../components/box/muiBox';
import { DefaultButtonCloseModal, DefaultIconCloseModal } from '../../../../../../components/buttons/closeButtonModal';
import { useApi } from 'src/hooks/useApi';
import { useMessageBoxContext } from 'src/contexts/MessageBox/MessageBoxContext';
import { BsCheckCircle } from 'react-icons/bs';

interface indextoModalDeleteClient {
    handleCloseModalDeleteClient: () => void;
    isModalDeleteClientOpen: boolean;
    clientId: number
    searchClients: () => void;
}

export const ModalDeleteClient = (props: indextoModalDeleteClient) => {

    const { MessageBox } = useMessageBoxContext()
    const { deleteClient } = useApi()
    const auth = useContext(AuthContext)
    const [isSuccess, setIsSuccess] = useState(false)


    const handleDeleteClientApi = async (clientId: number) => {
        const data = await deleteClient({ clientId, storeId: auth.idUser })
        if (data.Success) {
            setIsSuccess(true)
            props.searchClients()
        }
        else {
            MessageBox('error', data.erro)
        }
    }

    return (
        <Modal open={props.isModalDeleteClientOpen} onClose={props.handleCloseModalDeleteClient}>
            <MuiBox desktopWidth={500} mobileWidthPercent='80%'>
                <S.DivDeleteClientModal>
                    {isSuccess ?

                        <>
                            <h3 style={{ alignSelf: 'center' }}>Procedimento realizado com sucesso!</h3>
                            <BsCheckCircle color="var(--Green)" size="50" className="IconSucess" />
                        </>
                        :
                        <>
                            <h3 style={{ alignSelf: 'center' }}>Deseja realmente excluir o cliente?</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '40%' }}>
                                <S.ButtonYesDeleteClientModal onClick={() => handleDeleteClientApi(props.clientId)}><b>SIM</b></S.ButtonYesDeleteClientModal>
                                <S.ButtonNoDeleteClientModal onClick={props.handleCloseModalDeleteClient}><b>NÃO</b></S.ButtonNoDeleteClientModal>
                            </div>
                        </>
                    }
                </S.DivDeleteClientModal>
                <DefaultButtonCloseModal onClick={props.handleCloseModalDeleteClient}>
                    <DefaultIconCloseModal />
                </DefaultButtonCloseModal>
            </MuiBox>
        </Modal>

    )
}