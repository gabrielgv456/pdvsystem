import { ChangeEvent, useContext, useState, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import {HiOutlineMail} from 'react-icons/hi'
import {RiLock2Line} from 'react-icons/ri'
import * as S from './style'



export const Login = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailWrong, setEmailWrong] = useState(false)
    const [isPasswordWrong, setPasswordWrong] = useState(false)

    const handleVerifyInputEmail = () => {
        email.includes('@') ? setEmailWrong(false) : setEmailWrong(true)
        email.includes('.') ? setEmailWrong(false) : setEmailWrong(true)
        switch (email) {
            case '':
                setEmailWrong(true)
                break
        }
    }
    const handleVerifyInputPassword = () => {
        if (password.length<8){
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
        if (e.code === 'Enter'){
        email.includes('@') ? setEmailWrong(false) : setEmailWrong(true)
        email.includes('.') ? setEmailWrong(false) : setEmailWrong(true)
        switch (email) {
            case '':
                setEmailWrong(true)
                break
        }
        if (password.length<8){
            setPasswordWrong(true)
        }
        else {
            setPasswordWrong(false)
        }}
        if(e.code === 'Enter' && email !== '' && email.includes('@') && email.includes('.') && password !== '' && password.length>=8 ){
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
        if (password.length<8){
            setPasswordWrong(true)
        }
        else {
            setPasswordWrong(false)
        }
    
        if (email !== '' && email.includes('@') && email.includes('.') && password !== '' && password.length>=8) {
            const isLogged = await auth.signin(email, password);
            if (isLogged) {
                navigate('/home');
            } else {
                alert("Dados incorretos, verifique seu e-mail ou senha !");
            }
        }
    }

    return (
        <div>
            <S.Container>
                <S.BoxLogin>
                    <S.H2>Management Store</S.H2>
                    <S.Div>
                        <HiOutlineMail size={20} className="icon_login"/>
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
                        <RiLock2Line size={20} className="icon_login"/>
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
                    <S.Button onClick={handleLogin}>Login</S.Button>
                </S.BoxLogin>    

                <S.BoxBackgroundLogin>
                </S.BoxBackgroundLogin>
            </S.Container>
        </div>
    );
}