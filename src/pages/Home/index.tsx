import {Link} from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import * as S from "./style"
import { useDarkMode } from '../../contexts/DarkMode/DarkModeProvider';
import invite from "../../images/illustration_invite.png"



export const Home = () => {
    const auth = useContext(AuthContext);
    const Theme = useDarkMode();

    return (
        <S.Container isDarkMode={Theme.DarkMode}>
        <S.Box>Olá {auth.user?.name}, tudo bem?<img src={invite} style={{marginTop:'-40px'}}></img></S.Box>
        <S.Box></S.Box>
        <S.Box className='Box_Cashier'>Caixa Aberto</S.Box>
        </S.Container>
       
    )
}