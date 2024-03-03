import { useState } from "react"
import { useDarkMode } from "../../../../contexts/DarkMode/DarkModeProvider"
import * as S from "./style"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { BsArrowDownLeftCircle, BsArrowUpRightCircle } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { MuiBox } from "../../../../components/box/muiBox";
import { DefaultButtonCloseModal, DefaultIconCloseModal } from "../../../../components/buttons/closeButtonModal";
import { TransactionsProductsReturnApi } from "../../interfaces";

interface indextoModalTransactionsProducts {
    dataTransactionsProductsReturnApi: TransactionsProductsReturnApi[];
    isModalTransactionsProductsOpen: boolean;
    setisModalTransactionsProductsOpen: (value: boolean) => void;
}


export const ModalTransactionsProducts = (props: indextoModalTransactionsProducts) => {

    // START PAGINATION//
    const [ItensPerPage, SetItensPerPage] = useState(10)
    const [atualPage, SetAtualPage] = useState(0)
    const Pages = Math.ceil(props.dataTransactionsProductsReturnApi.length / ItensPerPage)
    const StartIndex = atualPage * ItensPerPage
    const EndIndex = StartIndex + ItensPerPage
    const paginedTransactionsReturnApi = props.dataTransactionsProductsReturnApi.slice(StartIndex, EndIndex)
    //END PAGINATION//
    const Theme = useDarkMode()

    function handleCloseModalTransactionsProducts() {
        SetAtualPage(0)
        props.setisModalTransactionsProductsOpen(false)
    }
    const EditItensPerPage = (ItensPerPage: number) => {
        SetItensPerPage(ItensPerPage)
        SetAtualPage(0)
    }

    return (
        <Modal open={props.isModalTransactionsProductsOpen} onClose={handleCloseModalTransactionsProducts}>
            <MuiBox desktopWidth={500} mobileWidthPercent="80%">
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#48505e', fontSize: '0.9rem', marginBottom: '10px' }}>
                    <div style={{ width: '20px' }}></div>
                    <div style={{ width: '40%', display: 'flex', justifyContent: 'center' }}>Data</div>
                    <div style={{ width: '40%', display: 'flex', justifyContent: 'center' }}>Descrição</div>
                    <div style={{ width: '10%', display: 'flex', justifyContent: 'center' }}>Qtd</div>
                    <div style={{ width: '10%', display: 'flex', justifyContent: 'center' }}>Saldo</div>
                </div>
                {paginedTransactionsReturnApi.map((transaction) => (
                    <div>
                        {transaction.type === 'E' &&
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'green', fontSize: '0.9rem' }}>
                                <div style={{ width: '20px' }}><BsArrowUpRightCircle size="20" /></div>
                                <div style={{ width: '40%', display: 'flex', justifyContent: 'center' }}>{new Date(transaction.created_at).toLocaleString('pt-BR', { timeZone: 'UTC' })}</div>
                                <div style={{ width: '40%' }}>{transaction.description}</div>
                                <div style={{ width: '10%', display: 'flex', justifyContent: 'center' }}>{transaction.quantity}</div>
                                <div style={{ width: '10%', display: 'flex', justifyContent: 'center' }}>{transaction.totalQuantity}</div>
                            </div>
                        }
                        {transaction.type === 'S' &&
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'red', fontSize: '0.9rem' }}>
                                <div style={{ width: '20px' }}><BsArrowDownLeftCircle size="20" /></div>
                                <div style={{ width: '40%', display: 'flex', justifyContent: 'center' }}>{new Date(transaction.created_at).toLocaleString('pt-BR', { timeZone: 'UTC' })}</div>
                                <div style={{ width: '40%' }}>{transaction.description}</div>
                                <div style={{ width: '10%', display: 'flex', justifyContent: 'center' }}>{transaction.quantity}</div>
                                <div style={{ width: '10%', display: 'flex', justifyContent: 'center' }}>{transaction.totalQuantity}</div>
                            </div>
                        }

                    </div>
                ))}

                <S.DivFooter isDarkMode={Theme.DarkMode}>
                    <select value={ItensPerPage}
                        onChange={(e) => EditItensPerPage(Number(e.target.value))}
                        style={{ border: 'none', width: '40px', background: 'none', color: '#67636d' }}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                    </select>
                    <div style={{ fontSize: '0.85rem', color: '#67636d', display: 'flex', width: '35%', justifyContent: 'space-between', minWidth: 'max-content', alignItems: 'center' }}>
                        {Pages > 0 ? <label> Página {atualPage + 1} de {Pages}</label> : <label></label>}

                        <S.DivAlterPage>

                            {atualPage <= Pages && atualPage > 0 ?
                                <button style={{ border: 'none', background: 'none', margin: 0 }} onClick={(e) => SetAtualPage(atualPage - 1)}>
                                    <MdChevronLeft color='#4b535c' size="25" />
                                </button>
                                :
                                <button style={{ cursor: 'context-menu', border: 'none', background: 'none', margin: 0 }}>
                                    <MdChevronLeft color='#b8c0c9' size="25" />
                                </button>
                            }
                            {atualPage + 1 >= Pages ?
                                <button style={{ cursor: 'context-menu', border: 'none', background: 'none', margin: 0 }}>
                                    <MdChevronRight color='#b8c0c9' size="25" />
                                </button>
                                :
                                <button style={{ border: 'none', background: 'none', margin: 0 }} onClick={(e) => SetAtualPage(atualPage + 1)}>
                                    <MdChevronRight color='#4b535c' size="25" />
                                </button>
                            }
                        </S.DivAlterPage>
                    </div>

                </S.DivFooter>
                <DefaultButtonCloseModal onClick={handleCloseModalTransactionsProducts}>
                    <DefaultIconCloseModal />
                </DefaultButtonCloseModal>
            </MuiBox>
        </Modal>

    )

}