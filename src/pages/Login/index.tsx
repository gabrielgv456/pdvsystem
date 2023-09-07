import { ChangeEvent, useContext, useState, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { HiOutlineMail } from 'react-icons/hi'
import { RiLock2Line } from 'react-icons/ri'
import * as S from './style'
import { ModalValidateEmail, SuccessModalValidateEmail } from "./Modals/validateEmail";
import { useMessageBoxContext } from "../../contexts/MessageBox/MessageBoxContext";
import { useApi } from "../../hooks/useApi";

export type TypeValidateMail = 'newPass' | 'newUser' |'changePass'| null

export const Login = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const { validateForgotPassword } = useApi()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailWrong, setEmailWrong] = useState(false)
    const [isPasswordWrong, setPasswordWrong] = useState(false)
    const [isModalValidateEmailOpen, setIsModalValidateEmailOpen] = useState(false)
    const [isSuccessModalValidateEmailOpen, setisSuccessModalValidateEmailOpen] = useState(false)
    const [typeValidateMail, setTypeValidateMail] = useState<TypeValidateMail>(null)
    const { MessageBox } = useMessageBoxContext()


    const handleVerifyInputEmail = () => {
        email.includes('@') ? setEmailWrong(false) : setEmailWrong(true)
        email.includes('.') ? setEmailWrong(false) : setEmailWrong(true)
        switch (email) {
            case '':
                setEmailWrong(true)
                break
        }
    }

    const handleForgotPass = async () => {
        try {
            if(!email) {
                throw new Error('Por favor, insira seu e-mail !')
            }
            if (!email.includes('@') || !email.includes('.')) { 
                throw new Error ('E-mail inválido, verifique e tente novamente !')
            }
            const result = await validateForgotPassword(email)
            if (!result.Success) {
                throw new Error('Falha ao enviar código de validação ! ' + (result.erro ?? ''))
            }
            setTypeValidateMail('newPass')
            setIsModalValidateEmailOpen(true)
        } catch (error: any) {
            MessageBox('warning', error.message)
        }
    }

    const handleVerifyInputPassword = () => {
        if (password.length < 8) {
            setPasswordWrong(true)
        }
        else {
            setPasswordWrong(false)
        }
    }

    const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }
    const handleKeyUP = (e: KeyboardEvent) => {
        if (e.code === 'Enter') {
            email.includes('@') ? setEmailWrong(false) : setEmailWrong(true)
            email.includes('.') ? setEmailWrong(false) : setEmailWrong(true)
            switch (email) {
                case '':
                    setEmailWrong(true)
                    break
            }
            if (password.length < 8) {
                setPasswordWrong(true)
            }
            else {
                setPasswordWrong(false)
            }
        }
        if (e.code === 'Enter' && email !== '' && email.includes('@') && email.includes('.') && password !== '' && password.length >= 8) {
            handleLogin();
        }
    }

    const handleLogin = async () => {
        email.includes('@') ? setEmailWrong(false) : setEmailWrong(true)
        email.includes('.') ? setEmailWrong(false) : setEmailWrong(true)
        switch (email) {
            case '':
                setEmailWrong(true)
                break
        }
        if (password.length < 8) {
            setPasswordWrong(true)
        }
        else {
            setPasswordWrong(false)
        }

        if (email !== '' && email.includes('@') && email.includes('.') && password !== '' && password.length >= 8) {
            try {
                const isLogged = await auth.signin(email, password, setIsModalValidateEmailOpen);
                if (isLogged === 'true') {
                    navigate('/home');
                } else if (isLogged === 'invalidMail') {
                    setTypeValidateMail('newUser')
                    setIsModalValidateEmailOpen(true)
                } else if (isLogged === 'false') {
                    MessageBox('error', "Dados incorretos, verifique seu e-mail ou senha !");
                }
            }
            catch (error: any) {
                MessageBox('warning', "Falha de conexão com servidor remoto" + error.message)
            }
        }
    }

    return (
        <div>
            <S.Container>
                <S.BoxLogin>
                    <S.H2>Safyra®</S.H2>
                    <S.Div>
                        <HiOutlineMail size={20} className="icon_login" />
                        <S.InputMail
                            type="text"
                            value={email}
                            onChange={handleEmailInput}
                            placeholder="Digite seu e-mail"
                            onKeyUp={handleKeyUP}
                            onBlur={handleVerifyInputEmail}
                            isEmailWrong={isEmailWrong}
                        />
                    </S.Div>
                    <S.Div>
                        <RiLock2Line size={20} className="icon_login" />
                        <S.InputPassword
                            type="password"
                            value={password}
                            onChange={handlePasswordInput}
                            placeholder="Digite sua senha"
                            onKeyUp={handleKeyUP}
                            onBlur={handleVerifyInputPassword}
                            isPasswordWrong={isPasswordWrong}
                        />
                    </S.Div>
                    <S.SectionForgot onClick={() => handleForgotPass()}>Esqueceu a senha ?</S.SectionForgot>
                    <S.Button onClick={handleLogin}>Login</S.Button>
                </S.BoxLogin>

                <S.BoxBackgroundLogin>
                </S.BoxBackgroundLogin>
            </S.Container>

            <ModalValidateEmail
                isModalValidateEmailOpen={isModalValidateEmailOpen}
                setIsModalValidateEmailOpen={setIsModalValidateEmailOpen}
                setisSuccessModalValidateEmailOpen={setisSuccessModalValidateEmailOpen}
                typeValidateMail={typeValidateMail}
                email={email}
                setTypeValidateMail={setTypeValidateMail}
                codEmailValidate={auth.codEmailValidate}
            />
            <SuccessModalValidateEmail
                isSuccessModalValidateEmailOpen={isSuccessModalValidateEmailOpen}
                setisSuccessModalValidateEmailOpen={setisSuccessModalValidateEmailOpen}
            />
        </div>
    );
}