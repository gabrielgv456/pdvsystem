import {Link} from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import * as S from "./style"
import { useDarkMode } from '../../contexts/DarkMode/DarkModeProvider';




export const Transactions = () => {
    const auth = useContext(AuthContext);
    const Theme = useDarkMode();

    return (
        <S.Container isDarkMode={Theme.DarkMode}>
        <S.Header>
        <S.Box><label>Data Inicial</label><S.Input type="date"></S.Input></S.Box>
        <S.Box><label>Data Final</label><S.Input type="date"></S.Input></S.Box>
        <S.DivSearch><S.Button>Pesquisar</S.Button></S.DivSearch>
        </S.Header>
        </S.Container>
       
    )
}