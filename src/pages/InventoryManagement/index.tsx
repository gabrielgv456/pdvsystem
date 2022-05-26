
import {Link} from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import * as S from "./style"
import { useDarkMode } from '../../contexts/DarkMode/DarkModeProvider';




export const InventoryManagement = () => {
    const auth = useContext(AuthContext);
    const Theme = useDarkMode();

    return (
        <S.Container isDarkMode={Theme.DarkMode}>
        {auth.user?.name}
        InventoryManagement
        </S.Container>
       
    )
}