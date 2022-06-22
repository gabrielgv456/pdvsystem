import { BsFillCreditCard2FrontFill, BsFillCreditCardFill } from "react-icons/bs";
import { FaMoneyBillWave } from "react-icons/fa";
import { MdPending } from "react-icons/md";
import { useDarkMode } from "../../../contexts/DarkMode/DarkModeProvider";
import PixIcon from '@mui/icons-material/Pix';
import * as S from "./style"

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
    
    return (
        
        <S.Container isDarkMode={Theme.DarkMode}>
        
          
        
        <S.LabelTypePayment>
            {props.item.typepayment === 'money' ?
            <FaMoneyBillWave title="Dinheiro" size={25} style={{color:'#23591b'}}/> :
            props.item.typepayment === 'debitcard' ?
            <BsFillCreditCardFill title="Cartão de Débito" size={25} style={{color:'#f1b917'}}/> :
            props.item.typepayment === 'creditcard' ?
            <BsFillCreditCard2FrontFill title="Cartão de Crédito" size={25} style={{color:'#da506e'}}/>:
            props.item.typepayment === 'pix' ?
            <label><PixIcon style={{color:'#5cbcb1'}}/> </label>:
            props.item.typepayment === 'others' ?
            <MdPending title="Outros" size={25} style={{color:'#7a3c3c'}} /> : ''
            }
        </S.LabelTypePayment>
        <S.LabelValue>
        <b>{formatedItemValue}</b>
        </S.LabelValue>
        <S.LabelDate >
        <b>{gethoursTransactions}</b>
        </S.LabelDate>
        </S.Container>


            )

}