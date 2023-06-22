import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkModeProvider';
import * as S from "./style"
import { MdMarkEmailRead } from 'react-icons/md';
import { useState, useContext } from 'react';
import { FcIdea } from 'react-icons/fc'
import { IoCloseSharp } from 'react-icons/io5'
import { AuthContext } from '../../../../contexts/Auth/AuthContext';
import { BsPatchCheckFill } from 'react-icons/bs';
import { useApi } from '../../../../hooks/useApi';
import { useMessageBoxContext } from '../../../../contexts/MessageBox/MessageBoxContext';

interface validateEmailProps {
    isModalValidateEmailOpen: boolean,
    setIsModalValidateEmailOpen: (value: boolean) => void,
    setisSuccessModalValidateEmailOpen: (value: boolean) => void,
    email: string
}

export const ModalValidateEmail = (props: validateEmailProps) => {
    const Theme = useDarkMode();
    const { codEmailValidate,idUser } = useContext(AuthContext)
    const { validateMail } = useApi();
    const {MessageBox} = useMessageBoxContext()

    const VerifyCode = async () => {
        if (inputCode === codEmailValidate) {
            try {
                const dataValidateMail = await validateMail(idUser)
                if (dataValidateMail.success) {      
                    props.setIsModalValidateEmailOpen(false)
                    props.setisSuccessModalValidateEmailOpen(true)   
                } else {
                    throw new Error('Falha ao concluir validação de e-mail!')
                }
            } catch (error: any) {
                MessageBox('error',error.message)
            }
        } else {
            MessageBox('error','Código de verificação incorreto!');
        }
    }


    const [inputCode, setInputCode] = useState('')
    return (
        <Modal open={props.isModalValidateEmailOpen} onClose={() => props.setIsModalValidateEmailOpen(false)}>
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
                border: Theme.DarkMode ? '1px solid silver' : 'none',
                boxShadow: 24, p: 4,
                borderRadius: 5, backgroundColor: 'var(--AppBar)', color: '#fff',
                outline: 'none'

            }}
            >
                <S.ButtonClose onClick={() => props.setIsModalValidateEmailOpen(false)}><b><IoCloseSharp size="22.5" /></b></S.ButtonClose>
                <S.Container>
                    Digite o código de verificação enviado para o e-mail {props.email} :
                    <S.LabelTip>
                        <FcIdea size={15} />
                        Verique também sua caixa de Spam.
                    </S.LabelTip>
                    <S.LabelMail>
                        <MdMarkEmailRead size="28" />
                        <S.Input placeholder='******' value={inputCode} onChange={(e) => setInputCode(e.target.value)} maxLength={6} />
                    </S.LabelMail>
                    <S.ButtonConfirm onClick={() => VerifyCode()}>Confirmar</S.ButtonConfirm>
                </S.Container>

            </Box>

        </Modal>
    )
}

interface SuccessModalValidateEmailProps {
    setisSuccessModalValidateEmailOpen: (value: boolean) => void,
    isSuccessModalValidateEmailOpen: boolean
}

export const SuccessModalValidateEmail = (props: SuccessModalValidateEmailProps) => {
    const Theme = useDarkMode();
    return (
        <Modal open={props.isSuccessModalValidateEmailOpen} >
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
                //bgcolor: Theme.DarkMode ? 'var(--backgroundDarkMode2)' : 'background.paper',

                border: Theme.DarkMode ? '1px solid silver' : '',
                boxShadow: 24, p: 4,
                borderRadius: 5,
                backgroundColor: 'var(--AppBar)',
                color: '#fff',
                outline: 'none'
            }}
            >
                <S.ButtonClose onClick={() => props.setisSuccessModalValidateEmailOpen(false)}><b><IoCloseSharp size="22.5" /></b></S.ButtonClose>
                <S.Container>
                    <S.labelSucess>
                        <BsPatchCheckFill className='btnSuccess' size="70" />
                        Parabéns, e-mail validado com Sucesso!
                    </S.labelSucess>
                    <S.ButtonConfirm onClick={() => props.setisSuccessModalValidateEmailOpen(false)}>Realizar 1º acesso</S.ButtonConfirm>
                </S.Container>
            </Box>
        </Modal>
    )
}