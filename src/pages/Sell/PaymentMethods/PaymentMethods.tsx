import {FaMoneyBillWave} from "react-icons/fa"
import {AiFillPrinter, AiOutlineClose} from "react-icons/ai"
import {BsFillBagCheckFill, BsFillCreditCardFill, BsFillCreditCard2FrontFill} from "react-icons/bs"
import PixIcon from '@mui/icons-material/Pix';

import * as S from "./style"

interface PaymentMethodsProps {
        item:
        {id: number;
        type:string;
        value:number;
        cash?: number;
        debitcard?:number;
        creditcard?:number;
        pix?: number;
        others?: number;}

    handleRemoveOneMethod(id:number, value:number):  void;
    handleEditMethod(id:number,value:number):  void;
    handleRemoveMethod(id:number,value:number):  void;
}

export const PaymentMethods = (props:PaymentMethodsProps) => {
    return (
        <>
            {props.item.type === 'cash' ?
            <S.DivPaymentMethods style={{backgroundColor:'#23591b'}}>
                <S.Label><FaMoneyBillWave size={25}/></S.Label>
                <S.Label>Dinheiro</S.Label>
                <S.Label>R$<S.InputModal/></S.Label>
            </S.DivPaymentMethods> : 
            props.item.type === 'debitcard' ?
            <S.DivPaymentMethods style={{backgroundColor:'#f1b917'}}>
                <S.Label><BsFillCreditCardFill size={25}/></S.Label>
                <S.Label>Cartão de Débito</S.Label>
                <S.Label>R$<S.InputModal/></S.Label>
            </S.DivPaymentMethods> :
            props.item.type === 'creditcard' ?
            <S.DivPaymentMethods style={{backgroundColor:'#da506e'}}>
                <S.Label><BsFillCreditCard2FrontFill size={25}/></S.Label>
                <S.Label>Cartão de Credito</S.Label>
                <S.Label>R$<S.InputModal/></S.Label>
            </S.DivPaymentMethods>:
            props.item.type === 'pix' ?
            <S.DivPaymentMethods style={{backgroundColor:'#5cbcb1'}}>
                <S.Label><PixIcon/></S.Label>
                <S.Label>PIX</S.Label>
                <S.Label>R$<S.InputModal/></S.Label>
            </S.DivPaymentMethods>:
            props.item.type === 'others' ?
            <S.DivPaymentMethods style={{backgroundColor:'#7a3c3c'}}>
                <S.Label><BsFillCreditCardFill size={25}/></S.Label>
                <S.Label>Outros</S.Label>
                <S.Label>R$<S.InputModal/></S.Label>
            </S.DivPaymentMethods>
            : ''}
        </>
    )

}