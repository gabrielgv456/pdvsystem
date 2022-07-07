import { BsFillCreditCard2FrontFill, BsFillCreditCardFill } from "react-icons/bs";
import { FaMoneyBillWave } from "react-icons/fa";
import { MdPending } from "react-icons/md";
import { useDarkMode } from "../../../contexts/DarkMode/DarkModeProvider";
import PixIcon from '@mui/icons-material/Pix';
import * as S from "./style"
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { useState } from "react";

interface TransactionsReturnApiProps {
    item:{
    id: number,
    storeId: number,
    sellId: number,
    typepayment: string,
    value:number,
    created_at: Date
    }
}

export const ListTransactions = (props:TransactionsReturnApiProps) => {

    const Theme = useDarkMode();
    const gethoursTransactions = new Date(props.item.created_at).toLocaleString('pt-BR', { timeZone: 'UTC' })
    const formatedItemValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.item.value)
    const [isEyeOpen,setisEyeOpen] = useState(false)

    return (
        
        <S.Container isDarkMode={Theme.DarkMode}>
        
          
        
        
            {props.item.typepayment === 'money' ?
            <S.LabelTypePayment title="Dinheiro" style={{backgroundColor:'#bceeb4'}} isDarkMode={Theme.DarkMode}><FaMoneyBillWave size={25} style={{color:'#23591b'}}/></S.LabelTypePayment> :
            props.item.typepayment === 'debitcard' ?
            <S.LabelTypePayment title="Cartão de Débito" style={{backgroundColor:'#fcedc2'}} isDarkMode={Theme.DarkMode}><BsFillCreditCardFill  size={25} style={{color:'#f1b917'}}/></S.LabelTypePayment> :
            props.item.typepayment === 'creditcard' ?
            <S.LabelTypePayment title="Cartão de Crédito" style={{backgroundColor:'#fccbd6'}} isDarkMode={Theme.DarkMode}><BsFillCreditCard2FrontFill  size={25} style={{color:'#da506e'}}/></S.LabelTypePayment>:
            props.item.typepayment === 'pix' ?
            <S.LabelTypePayment title="Pix" style={{backgroundColor:'#c3f0eb'}} isDarkMode={Theme.DarkMode}><PixIcon style={{color:'#5cbcb1',width:25,height:25}}/></S.LabelTypePayment>:
            props.item.typepayment === 'others' ?
            <S.LabelTypePayment title="Outros" style={{backgroundColor:'#c5b4b4'}} isDarkMode={Theme.DarkMode}><MdPending  size={25} style={{color:'#7a3c3c'}} /></S.LabelTypePayment> : ''
            }
        
        
        <S.LabelValue isDarkMode={Theme.DarkMode}>
        <b>{formatedItemValue}</b>
        </S.LabelValue>
        <S.LabelDate >
        <b>{gethoursTransactions}</b>
        </S.LabelDate>
        <S.ButtonDescription  title="Detalhes" isEyeOpen={isEyeOpen}>
            <RiEyeCloseLine size="16" className="RiEyeCloseLine" onMouseOver={()=>(setisEyeOpen(true))} onMouseLeave={()=>(setisEyeOpen(false))}/>
            <RiEyeLine size="16" className="RiEyeLine"/>
        </S.ButtonDescription>
        </S.Container>


            )

}