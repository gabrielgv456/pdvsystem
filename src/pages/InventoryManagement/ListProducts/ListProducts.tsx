import { BsFillCreditCard2FrontFill, BsFillCreditCardFill, BsInfoCircle, BsTrash } from "react-icons/bs";
import { FaMoneyBillWave } from "react-icons/fa";
import { MdPending } from "react-icons/md";
import { useDarkMode } from "../../../contexts/DarkMode/DarkModeProvider";
import PixIcon from '@mui/icons-material/Pix';
import * as S from "./style"
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import {BiTransfer} from "react-icons/bi"
import { useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";


interface ListProductsProps{
    id: number;
    name: string;
    value: number;
    created_at:Date;
    isModalEditProductOpen: boolean;
    isModalTransactionsProductsOpen: boolean;
    isModalMasterKeyOpen:boolean;
    setisModalEditProductOpen: (isModalEditProductOpen:boolean) => void;
    setisModalTransactionsProductsOpen:(isModalTransactionsProductsOpen:boolean) => void;
    setisModalMasterKeyOpen: (isModalMasterKeyOpen:boolean) => void;
}

export const ListProducts = (props:ListProductsProps) => {

    const Theme = useDarkMode();
    const gethoursTransactions = new Date(props.created_at).toLocaleString('pt-BR', { timeZone: 'UTC' })
    const formatedItemValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.value)
    const [isEyeOpen,setisEyeOpen] = useState(false)

    return (
        
        <S.Container isDarkMode={Theme.DarkMode}>

            <S.ButtonEdit onClick={() => props.setisModalEditProductOpen(true)} title="Editar Produto"><HiOutlinePencilAlt size="20" /></S.ButtonEdit>

            <S.LabelNameProduct isDarkMode={Theme.DarkMode}>
                <b>{props.name}</b>
            </S.LabelNameProduct>
            
            <S.LabelStatus style={{backgroundColor:'#eaf9e0',color:'#4daf42'}} isDarkMode={Theme.DarkMode}>
                <b>Em estoque</b>
            </S.LabelStatus>

            <S.LabelQuantity isDarkMode={Theme.DarkMode}>
                <b>1</b>
            </S.LabelQuantity>

            <S.LabelValue isDarkMode={Theme.DarkMode}>
            <b>{formatedItemValue}</b>
            </S.LabelValue>

            <S.LabelDate >
                <b>{gethoursTransactions}</b>
            </S.LabelDate>

            <S.ButtonInfo onClick={()=>props.setisModalTransactionsProductsOpen(true)} title="Movimentações"><BiTransfer size="16" /></S.ButtonInfo>
            <S.ButtonTrash onClick={()=>props.setisModalMasterKeyOpen(true)}  title="Excluir Produto" ><BsTrash size="16" /></S.ButtonTrash>
           
        </S.Container>


            )

}
