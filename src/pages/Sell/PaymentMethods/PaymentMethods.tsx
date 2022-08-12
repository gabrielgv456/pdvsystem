import { FaMoneyBillWave } from "react-icons/fa"
import { RiCloseCircleLine } from "react-icons/ri"
import { BsFillCreditCardFill, BsFillCreditCard2FrontFill } from "react-icons/bs"
import { MdPending } from 'react-icons/md'
import PixIcon from '@mui/icons-material/Pix';
import * as S from "./style"
import { CurrencyMaskWithOutRS } from "../../../masks/CurrencyMask";

interface PaymentMethodsProps {
    value: number[];

    //value: number;
    onChangeValuePayment: (newState: number) => void;

    item:
    {
        id: number;
        type: string;
        value: number;
        valueFormated: string;
    }
    isSellEnded: boolean;
    handleRemoveOneMethod(id: number, value: number): void;
    handleEditMethod(id: number, value: number, valueformated:string): void;
    handleRemoveMethod(id: number): void;
}

export const PaymentMethods = (props: PaymentMethodsProps) => {

    const MethodRemove = () => {
        props.handleRemoveMethod(props.item.id)
    }
    const changeValueInput = async (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {

        let formatvalue = e.target.value
        formatvalue = formatvalue.replace(/\D/g, "")
        formatvalue = formatvalue.replace(/(\d)(\d{2})$/, "$1.$2")
        let convertedvalue = (parseFloat(formatvalue))

        props.handleEditMethod(props.item.id, convertedvalue, e.target.value)
    }



    return (
        <>
            {props.item.type === 'money' && props.isSellEnded === false ?
                <S.DivPaymentMethods style={{ borderRadius: 5, backgroundColor: '#bceeb4', color: '#1f5018' }}>
                    <S.Label><FaMoneyBillWave size={25} /></S.Label>
                    <S.Label>Dinheiro</S.Label>
                    <S.Label ><label style={{backgroundColor:'#1f5018',padding:'0px 8px',color:'#fff', borderRadius:'3px 0px 0px 3px',height:'1.1rem'}}>R$</label><S.InputModal placeholder="0,00" maxLength={12}  value={props.item.valueFormated} onChange={(e) => changeValueInput(CurrencyMaskWithOutRS(e))} /></S.Label>
                    <S.ButtonDelete style={{ color: '#1f5018' }} onClick={MethodRemove}><RiCloseCircleLine size={20} /></S.ButtonDelete>
                </S.DivPaymentMethods> :
                props.item.type === 'debitcard' && props.isSellEnded === false ?
                    <S.DivPaymentMethods style={{ borderRadius: 5, backgroundColor: '#fcedc2', color: '#f1b917' }}>
                        <S.Label><BsFillCreditCardFill size={25} /></S.Label>
                        <S.Label>Cartão de Débito</S.Label>
                        <S.Label><label style={{backgroundColor:'#f1b917',padding:'0px 8px',color:'#fff', borderRadius:'3px 0px 0px 3px',height:'1.1rem'}}>R$</label><S.InputModal placeholder="0,00"   maxLength={12}  value={props.item.valueFormated} onChange={(e) => changeValueInput(CurrencyMaskWithOutRS(e))} /></S.Label>
                        <S.ButtonDelete style={{ color: '#f1b917' }} onClick={MethodRemove}><RiCloseCircleLine size={20} /></S.ButtonDelete>
                    </S.DivPaymentMethods> :
                    props.item.type === 'creditcard' && props.isSellEnded === false ?
                        <S.DivPaymentMethods style={{ borderRadius: 5, backgroundColor: '#fccbd6', color: '#da506e' }}>
                            <S.Label><BsFillCreditCard2FrontFill size={25} /></S.Label>
                            <S.Label>Cartão de Credito</S.Label>
                            <S.Label><label style={{backgroundColor:'#da506e',padding:'0px 8px',color:'#fff', borderRadius:'3px 0px 0px 3px',height:'1.1rem'}}>R$</label><S.InputModal placeholder="0,00"  maxLength={12} value={props.item.valueFormated} onChange={(e) => changeValueInput(CurrencyMaskWithOutRS(e))} /></S.Label>
                            <S.ButtonDelete style={{ color: '#da506e' }} onClick={MethodRemove}><RiCloseCircleLine size={20} /></S.ButtonDelete>
                        </S.DivPaymentMethods> :
                        props.item.type === 'pix' && props.isSellEnded === false ?
                            <S.DivPaymentMethods style={{ borderRadius: 5, backgroundColor: '#c3f0eb', color: '#5cbcb1' }}>
                                <S.Label><PixIcon /></S.Label>
                                <S.Label>PIX</S.Label>
                                <S.Label><label style={{backgroundColor:'#5cbcb1',padding:'0px 8px',color:'#fff', borderRadius:'3px 0px 0px 3px',height:'1.1rem'}}>R$</label><S.InputModal placeholder="0,00"  maxLength={12}  value={props.item.valueFormated} onChange={(e) =>  changeValueInput(CurrencyMaskWithOutRS(e))} /></S.Label>
                                <S.ButtonDelete style={{ color: '#5cbcb1' }} onClick={MethodRemove}><RiCloseCircleLine size={20} /></S.ButtonDelete>
                            </S.DivPaymentMethods> :
                            props.item.type === 'others' && props.isSellEnded === false ?
                                <S.DivPaymentMethods style={{ borderRadius: 5, backgroundColor: '#c5b4b4', color: '#7a3c3c' }}>
                                    <S.Label><MdPending size={25} /></S.Label>
                                    <S.Label>Outros</S.Label>
                                    <S.Label><label style={{backgroundColor:'#7a3c3c',padding:'0px 8px',color:'#fff', borderRadius:'3px 0px 0px 3px',height:'1.1rem'}}>R$</label><S.InputModal placeholder="0,00"  maxLength={12}  value={props.item.valueFormated} onChange={(e) =>  changeValueInput(CurrencyMaskWithOutRS(e))} /></S.Label>
                                    <S.ButtonDelete style={{ color: '#7a3c3c' }} onClick={MethodRemove}><RiCloseCircleLine size={20} /></S.ButtonDelete>
                                </S.DivPaymentMethods>
                                : ''}
        </>
    )

}