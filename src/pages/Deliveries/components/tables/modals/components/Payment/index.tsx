import { BsFillCreditCard2FrontFill, BsFillCreditCardFill } from 'react-icons/bs'
import * as S from './style'
import { FaMoneyBillWave } from "react-icons/fa"
import { MdPending } from 'react-icons/md'
import PixIcon from '@mui/icons-material/Pix';

import { useState } from 'react';
import { MethodsType } from '../../../../../../Sell';
import { typesPayment } from '../../../../../../Sell/Modals/CheckOut';
import { PaymentMethods } from '../../../../../../Sell/PaymentMethods/PaymentMethods';

interface PaymentDeliveryProps {
    listMethods: MethodsType[]
    setMethods: (value: MethodsType[]) => void
    value: number[]
    setValue: (value: number[]) => void
}

export const PaymentDelivery = (props: PaymentDeliveryProps) => {

    const verifyifexistsMethod = (method: string) => {
        const existsMethod = props.listMethods.some((item) => item.type === method)
        return existsMethod
    }

    const handleAddMethod = (valuetype: typesPayment) => {
        const alreadyexistMethod = verifyifexistsMethod(valuetype)
        if (!alreadyexistMethod) {
            let newMethods = [...props.listMethods]
            newMethods.push({
                id: props.listMethods.length + 1,
                type: valuetype,
                value: 0,
                valueFormated: ""
            })
            props.setMethods(newMethods)
        }
    }

    function handleRemoveOneMethod(id: number, value: number) {

        let newMethods = [...props.listMethods]
        for (let i in newMethods) {
            if (newMethods[i].id === id) {
                newMethods[i].value = newMethods[i].value - 25
            }
        }
        props.setMethods(newMethods)
    }

    function handleEditMethod(id: number, value: number, valueformated: string) {
        let newMethods = [...props.listMethods]

        for (let i in newMethods) {
            if (newMethods[i].id === id) {
                newMethods[i].value = value
                newMethods[i].valueFormated = valueformated
            }
            props.setMethods(newMethods)
        }
    }

    function handleRemoveMethod(id: number) {
        let filteredmethods = props.listMethods.filter(method => method.id !== id)
        props.setMethods(filteredmethods)
    }

    function onChangeValuePayment(ValuePayment: number) {
        let newvalue = props.value
        newvalue.push(
            ValuePayment
        )
        props.setValue(newvalue)
    }


    return (
        <>
            <S.DivModalIconsPayment>
                <S.LabelIconsModal onClick={() => handleAddMethod('money')}  ><FaMoneyBillWave className="hoverbutton" size={25} style={{ color: '#23591b' }} />Dinheiro</S.LabelIconsModal>
                <S.LabelIconsModal onClick={() => handleAddMethod('debitcard')} ><BsFillCreditCardFill className="hoverbutton" size={25} style={{ color: '#f1b917' }} />Cartão de Débito</S.LabelIconsModal>
                <S.LabelIconsModal onClick={() => handleAddMethod('creditcard')} ><BsFillCreditCard2FrontFill className="hoverbutton" size={25} style={{ color: '#da506e' }} />Cartão de Crédito</S.LabelIconsModal>
                <S.LabelIconsModal onClick={() => handleAddMethod('pix')} ><PixIcon className="hoverbutton" style={{ color: '#5cbcb1' }} /> &nbsp; PIX &nbsp;</S.LabelIconsModal>
                <S.LabelIconsModal onClick={() => handleAddMethod('others')} ><MdPending className="hoverbutton" size={25} style={{ color: '#7a3c3c' }} />Outros</S.LabelIconsModal>
            </S.DivModalIconsPayment>
            <div>
                {props.listMethods.map((item) => (
                    <PaymentMethods key={item.id} isSellEnded={false} item={item} handleRemoveOneMethod={handleRemoveOneMethod} handleEditMethod={handleEditMethod} handleRemoveMethod={handleRemoveMethod}  />
                ))}
            </div>
        </>
    )
}