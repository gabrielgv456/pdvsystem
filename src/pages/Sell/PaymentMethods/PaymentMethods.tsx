import {FaMoneyBillWave} from "react-icons/fa"
import {AiFillPrinter, AiOutlineClose} from "react-icons/ai"
import {BsFillBagCheckFill, BsFillCreditCardFill, BsFillCreditCard2FrontFill} from "react-icons/bs"
import {MdPending} from 'react-icons/md'
import PixIcon from '@mui/icons-material/Pix';
import { useState } from "react";
import * as S from "./style"

interface PaymentMethodsProps {
    value: number [];

    //value: number;
    onChangeValuePayment: (newState: number) => void;
        item:
        {id: number;
        type:string;
        value:number;
        }
        isSellEnded: boolean;
    handleRemoveOneMethod(id:number, value:number):  void;
    handleEditMethod(id:number,value:number):  void;
    handleRemoveMethod(id:number):  void;
}

export const PaymentMethods = (props:PaymentMethodsProps) => {

    const MethodRemove = () => {
        props.handleRemoveMethod(props.item.id)
     }
     

     
    return (
        <>
            {props.item.type === 'money' && props.isSellEnded === false ?
            <S.DivPaymentMethods style={{borderRadius:5, backgroundColor:'#23591b'}}>
                <S.Label><FaMoneyBillWave size={25}/></S.Label>
                <S.Label>Dinheiro</S.Label>
                <S.Label>R$<S.InputModal type="number" min="0" value={props.item.value} onChange={(e) =>props.handleEditMethod(props.item.id, parseInt(e.target.value))}/></S.Label>
                <S.ButtonDelete onClick={MethodRemove}><AiOutlineClose size={10} /></S.ButtonDelete>
            </S.DivPaymentMethods> : 
            props.item.type === 'debitcard' && props.isSellEnded === false ?
            <S.DivPaymentMethods style={{borderRadius:5,backgroundColor:'#f1b917'}}>
                <S.Label><BsFillCreditCardFill size={25}/></S.Label>
                <S.Label>Cartão de Débito</S.Label>
                <S.Label>R$<S.InputModal type="number" min="0" value={props.item.value} onChange={(e) =>props.handleEditMethod(props.item.id, parseInt(e.target.value))}/></S.Label>
                <S.ButtonDelete onClick={MethodRemove}><AiOutlineClose size={10}/></S.ButtonDelete>
            </S.DivPaymentMethods> :
            props.item.type === 'creditcard' && props.isSellEnded === false ?
            <S.DivPaymentMethods style={{borderRadius:5,backgroundColor:'#da506e'}}>
                <S.Label><BsFillCreditCard2FrontFill size={25}/></S.Label>
                <S.Label>Cartão de Credito</S.Label>
                <S.Label>R$<S.InputModal type="number" min="0" value={props.item.value} onChange={(e) =>props.handleEditMethod(props.item.id, parseInt(e.target.value))}/></S.Label>
                <S.ButtonDelete onClick={MethodRemove}><AiOutlineClose size={10}/></S.ButtonDelete>
            </S.DivPaymentMethods>:
            props.item.type === 'pix' && props.isSellEnded === false ?
            <S.DivPaymentMethods style={{borderRadius:5,backgroundColor:'#5cbcb1'}}>
                <S.Label><PixIcon/></S.Label>
                <S.Label>PIX</S.Label>
                <S.Label>R$<S.InputModal type="number" min="0" value={props.item.value} onChange={(e) =>props.handleEditMethod(props.item.id, parseInt(e.target.value))}/></S.Label>
                <S.ButtonDelete onClick={MethodRemove}><AiOutlineClose size={10}/></S.ButtonDelete>
            </S.DivPaymentMethods>:
            props.item.type === 'others' && props.isSellEnded === false ?
            <S.DivPaymentMethods style={{borderRadius:5,backgroundColor:'#7a3c3c'}}>
                <S.Label><MdPending size={25}/></S.Label>
                <S.Label>Outros</S.Label>
                <S.Label>R$<S.InputModal type="number" min="0"  value={props.item.value} onChange={(e) =>props.handleEditMethod(props.item.id, parseInt(e.target.value))}/></S.Label>
                <S.ButtonDelete onClick={MethodRemove}><AiOutlineClose size={10}/></S.ButtonDelete>
            </S.DivPaymentMethods>
            : '' }
        </>
    )

}