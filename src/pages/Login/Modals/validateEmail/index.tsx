import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkModeProvider';
import * as S from "./style"
import { MdMarkEmailRead } from 'react-icons/md';
import { useState, useContext, KeyboardEvent } from 'react';
import { FcIdea } from 'react-icons/fc'
import { IoCloseSharp } from 'react-icons/io5'
import { AuthContext } from '../../../../contexts/Auth/AuthContext';
import { BsPatchCheckFill } from 'react-icons/bs';
import { useApi } from '../../../../hooks/useApi';
import { useMessageBoxContext } from '../../../../contexts/MessageBox/MessageBoxContext';
import { DefaultButtonCloseModal, DefaultIconCloseModal } from '../../../../components/buttons/closeButtonModal';
import { TypeValidateMail } from '../..';
import { RiLockPasswordLine } from 'react-icons/ri';

interface validateEmailProps {
    isModalValidateEmailOpen: boolean,
    setIsModalValidateEmailOpen: (value: boolean) => void,
    setisSuccessModalValidateEmailOpen: (value: boolean) => void,
    email: string,
    typeValidateMail: TypeValidateMail,
    setTypeValidateMail: (value: TypeValidateMail) => void
    codEmailValidate: string | null
}

export interface typeChangeForgotPassword {
    email: string
    newPass: string | null
    codEmailValidate: string | null
}

export const ModalValidateEmail = (props: validateEmailProps) => {
    const Theme = useDarkMode();
    const { idUser } = useContext(AuthContext)
    const { validateMail, changeForgotPassword, verifyCodeForgotPassword } = useApi();
    const { MessageBox } = useMessageBoxContext()
    const [inputCode, setInputCode] = useState('')
    const [newPass, setNewpass] = useState<{ newPass: string, confirmNewPass: string }>({ newPass: '', confirmNewPass: '' })
    const [isChangePass, setIsChangePass] = useState(false)

    const VerifyCode = async (codValidate: string | null) => {

        function successNewUser() {
            props.setIsModalValidateEmailOpen(false)
            props.setisSuccessModalValidateEmailOpen(true)
        }
        function successForgotPass() {
            MessageBox('success', 'Código confirmado com sucesso!')
            setIsChangePass(true)
        }

        async function validateNewUserEmail(codValidate: string | null) {
            if (inputCode === codValidate) {
                await validateMail(idUser)
            } else {
                throw new Error('Código de verificação incorreto!');
            }
        }

        try {
            const dataValidateMail = props.typeValidateMail === 'newUser' ?
                validateNewUserEmail(codValidate)
                :
                await verifyCodeForgotPassword({ email: props.email, codEmailValidate: inputCode })
            if (dataValidateMail.Success) {
                props.typeValidateMail === 'newUser' ?
                    successNewUser()
                    :
                    successForgotPass()
            } else {
                throw new Error('Falha ao concluir validação de e-mail! ' + (dataValidateMail.erro ?? ''))
            }
        } catch (error: any) {
            MessageBox('error', error.message)
        }

    }

    const changePassword = async () => {
        if (newPass.newPass.length < 8) {
            MessageBox('info', 'Nova senha precisa ter no mínimo 8 dígitos!')
            return
        }
        if (newPass.newPass !== newPass.confirmNewPass) {
            MessageBox('info', 'Senha e confirmação de senha não coincidem, corrija e tente novamente !')
            return
        }
        try {
            const result = await changeForgotPassword({ codEmailValidate: inputCode, email: props.email, newPass: (newPass.newPass ?? null) })
            if (!result.Success) {
                throw new Error('Falha ao alterar a senha! ' + (result.erro ?? ''))
            }
            props.setIsModalValidateEmailOpen(false)
            MessageBox('success', 'Senha alterada com sucesso, realize o acesso com a nova senha!')
            setIsChangePass(false)
            setInputCode('')
            setNewpass({ newPass: '', confirmNewPass: '' })
        } catch (error: any) {
            MessageBox('error', error.message)
        }
    }

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
                <DefaultButtonCloseModal onClick={() => props.setIsModalValidateEmailOpen(false)}><DefaultIconCloseModal /></DefaultButtonCloseModal>
                {!isChangePass ?
                    <S.Container>
                        Digite o código de verificação enviado para o e-mail {props.email} :
                        <S.LabelTip>
                            <FcIdea size={15} />
                            Verique também sua caixa de Spam.
                        </S.LabelTip>
                        <S.LabelMail>
                            <MdMarkEmailRead size="28" />
                            <S.Input placeholder='******' onKeyUp={(e: KeyboardEvent) => { if (e.code === 'Enter') VerifyCode(props.codEmailValidate) }} value={inputCode} onChange={(e) => setInputCode(e.target.value)} maxLength={6} />
                        </S.LabelMail>
                        <S.ButtonConfirm onClick={() => VerifyCode(props.codEmailValidate)}>Confirmar</S.ButtonConfirm>
                    </S.Container>
                    :
                    <S.Container>
                        Infome a nova senha:
                        <S.DivForgot>
                            <S.LabelForgot>
                                <RiLockPasswordLine size="28" />
                                <S.InputPass
                                    placeholder='Nova Senha'
                                    type='password' value={newPass.newPass}
                                    onChange={(e) => setNewpass({ ...newPass, newPass: e.target.value })} />
                            </S.LabelForgot>
                            <S.LabelForgot>
                                <RiLockPasswordLine size="28" />
                                <S.InputPass
                                    placeholder='Confirme a Nova Senha'
                                    type='password'
                                    onKeyUp={(e: KeyboardEvent) => { if (e.code === 'Enter') changePassword() }}
                                    value={newPass.confirmNewPass}
                                    onChange={(e) => setNewpass({ ...newPass, confirmNewPass: e.target.value })}
                                />
                            </S.LabelForgot>
                        </S.DivForgot>
                        <S.ButtonConfirm onClick={() => changePassword()}>Confirmar</S.ButtonConfirm>
                    </S.Container>
                }

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
                <DefaultButtonCloseModal onClick={() => props.setisSuccessModalValidateEmailOpen(false)}><DefaultIconCloseModal /></DefaultButtonCloseModal>
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