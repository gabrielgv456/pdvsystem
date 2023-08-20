import { BsFillCreditCard2FrontFill, BsFillCreditCardFill } from "react-icons/bs";
import { FaMoneyBillWave } from "react-icons/fa";
import { MdPending } from "react-icons/md";
import { useDarkMode } from "../../../contexts/DarkMode/DarkModeProvider";
import PixIcon from '@mui/icons-material/Pix';
import * as S from "./style"
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { useState } from "react";
import { BiArrowFromBottom, BiArrowToBottom } from "react-icons/bi";
import Modal from '@mui/material/Modal';
import { AiOutlineClose } from "react-icons/ai";
import Box from '@mui/material/Box';
import { TransactionsReturnApiProps } from "../index"
import { MuiBox } from "../../../components/box/muiBox";
import { DefaultButtonCloseModal, DefaultIconCloseModal } from "../../../components/buttons/closeButtonModal";



export const ListTransactions = (props: { item: TransactionsReturnApiProps }) => {

    const Theme = useDarkMode();
    const gethoursTransactions = new Date(props.item.created_at).toLocaleString('pt-BR', { timeZone: 'UTC' })
    const formatedItemValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.item.value)
    const [isEyeOpen, setisEyeOpen] = useState(false)
    const [isModalInfoExtractOpen, setisModalInfoExtractOpen] = useState(false)
    const handleCloseModalInfoExtract = () => {
        setisModalInfoExtractOpen(false)
    }

    return (

        <S.Container isDarkMode={Theme.DarkMode}>

            {props.item.type === 'money' ?
                <S.LabelTypePayment title="Dinheiro" style={{ backgroundColor: '#bceeb4' }} isDarkMode={Theme.DarkMode}><FaMoneyBillWave size={25} style={{ color: '#23591b' }} /></S.LabelTypePayment> :
                props.item.type === 'debitcard' ?
                    <S.LabelTypePayment title="Cartão de Débito" style={{ backgroundColor: '#fcedc2' }} isDarkMode={Theme.DarkMode}><BsFillCreditCardFill size={25} style={{ color: '#f1b917' }} /></S.LabelTypePayment> :
                    props.item.type === 'creditcard' ?
                        <S.LabelTypePayment title="Cartão de Crédito" style={{ backgroundColor: '#fccbd6' }} isDarkMode={Theme.DarkMode}><BsFillCreditCard2FrontFill size={25} style={{ color: '#da506e' }} /></S.LabelTypePayment> :
                        props.item.type === 'pix' ?
                            <S.LabelTypePayment title="Pix" style={{ backgroundColor: '#c3f0eb' }} isDarkMode={Theme.DarkMode}><PixIcon style={{ color: '#5cbcb1', width: 25, height: 25 }} /></S.LabelTypePayment> :
                            props.item.type === 'others' ?
                                <S.LabelTypePayment title="Outros" style={{ backgroundColor: '#c5b4b4' }} isDarkMode={Theme.DarkMode}><MdPending size={25} style={{ color: '#7a3c3c' }} /></S.LabelTypePayment> :
                                props.item.type === 'exit_manual' ?
                                    <S.LabelTypePayment title="Saída Manual" style={{ backgroundColor: '#ffe2e1' }} isDarkMode={Theme.DarkMode}><BiArrowToBottom size={25} style={{ color: '#b82338' }} /></S.LabelTypePayment> :
                                    props.item.type === 'entry_manual' ?
                                        <S.LabelTypePayment title="Entrada Manual" style={{ backgroundColor: '#eaf9e0' }} isDarkMode={Theme.DarkMode}><BiArrowFromBottom size={25} style={{ color: '#4daf42' }} /></S.LabelTypePayment> :
                                        props.item.type === 'exit' ?
                                            <S.LabelTypePayment title="Estorno de venda" style={{ backgroundColor: '#ffe2e1' }} isDarkMode={Theme.DarkMode}><BiArrowToBottom size={25} style={{ color: '#b82338' }} /></S.LabelTypePayment> :
                                            props.item.type === 'exit_change' ?
                                                <S.LabelTypePayment title="Troco de venda" style={{ backgroundColor: '#ffe2e1' }} isDarkMode={Theme.DarkMode}><BiArrowToBottom size={25} style={{ color: '#b82338' }} /></S.LabelTypePayment>
                                                : ''

            }


            <S.LabelValue isDarkMode={Theme.DarkMode} typeTransction={props.item.type}>
                <b>{formatedItemValue}</b>
            </S.LabelValue>
            <S.LabelDate >
                <b>{gethoursTransactions}</b>
            </S.LabelDate>
            <S.ButtonDescription onClick={() => setisModalInfoExtractOpen(true)} title="Detalhes" isEyeOpen={isEyeOpen}>
                <RiEyeCloseLine size="16" className="RiEyeCloseLine" onMouseOver={() => (setisEyeOpen(true))} onMouseLeave={() => (setisEyeOpen(false))} />
                <RiEyeLine size="16" className="RiEyeLine" />
            </S.ButtonDescription>

            <Modal open={isModalInfoExtractOpen} onClose={handleCloseModalInfoExtract}>
                <MuiBox desktopWidth={500} mobileWidthPercent="80%">
                    {props.item.description}
                    <DefaultButtonCloseModal onClick={handleCloseModalInfoExtract}>
                        <DefaultIconCloseModal/>
                    </DefaultButtonCloseModal>
                </MuiBox>
            </Modal>
        </S.Container>
    )

}