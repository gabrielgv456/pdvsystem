import {Link} from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import * as S from "./style"
import { useDarkMode } from '../../contexts/DarkMode/DarkModeProvider';




export const Home = () => {
    const auth = useContext(AuthContext);
    const Theme = useDarkMode();

    return (
        <S.Container isDarkMode={Theme.DarkMode}>
        <S.Box>Olá {auth.user?.name}, tudo bem?</S.Box>
        <S.Box></S.Box>
        <S.Box className='Box_Cashier'>Caixa Aberto</S.Box>
        </S.Container>
       
    )
}