import * as S from "./style"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { AiOutlineClose } from "react-icons/ai";
import { useContext, useState } from "react";
import { useDarkMode } from "../../../../contexts/DarkMode/DarkModeProvider";
import { AuthContext } from "../../../../contexts/Auth/AuthContext";
import { useApi } from "../../../../hooks/useApi";
import { useMessageBoxContext } from "../../../../contexts/MessageBox/MessageBoxContext";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { MuiBox } from "../../../../components/box/muiBox";


interface ModalDeleteProps {
    ismodalDeleteOpen: boolean,
    setismodalDeleteOpen: (value: boolean) => void,
    setismodalSuccessOpen: (value: boolean) => void,
    defaultSendtoApi: () => void,
    valueSellModal: number;
    idSellDeleteModal: number;
    listProductstoModifyQntFiltered: {
        id: number;
        storeId: number,
        sellId: number;
        idProduct: number;
        quantity: number,
        valueProduct: number;
        totalValue: number;
        descriptionProduct: string;
        created_at: Date;
    }[];
}

interface type {
    id: number,
    descricao: string
}

export const ModalDelete = (props: ModalDeleteProps) => {

    const Theme = useDarkMode();
    const auth = useContext(AuthContext);
    const { deleteSell } = useApi()
    const [isCheckBoxChecked, setisCheckBoxChecked] = useState(true)
    const { MessageBox } = useMessageBoxContext()
    const [selectedType, setSelectedType] = useState<type | null>(null)
    const options: type[] = [
        { id: 1, descricao: 'INTERNO - Remover recebimento realizado' },
        { id: 2, descricao: `SAÍDA - Lançar uma saída no caixa de ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.valueSellModal)} em dinheiro na data de hoje` },

    ]

    async function handleCloseModalDelete() {
        props.setismodalDeleteOpen(false)
        setisCheckBoxChecked(true)
    }
    async function handleSendtoApi() {
        try {
            if (!selectedType?.id) { throw new Error('Selecione o tipo de estorno!') }
            const data = await deleteSell({
                SellId: props.idSellDeleteModal,
                UserId: auth.idUser,
                Products: props.listProductstoModifyQntFiltered,
                AddExitTransaction: selectedType?.id === 2,
                removeTransaction: selectedType?.id === 1,
                SellValue: props.valueSellModal
            })

            if (data.Success) {
                props.setismodalSuccessOpen(true)
                props.setismodalDeleteOpen(false)
                props.defaultSendtoApi()

            } else if (!data.Sucess) {
                throw new Error('Falha ao realizar estorno! ' + data.erro)
            }
        } catch (error: any) {
            MessageBox('error', error.message)
        }

    }

    return (

        <>

            <Modal open={props.ismodalDeleteOpen} onClose={handleCloseModalDelete}>
                <MuiBox desktopWidth={500} mobileWidthPercent="80%">
                    <S.DivDeleteProductModal>
                        <h3 style={{ alignSelf: 'center', marginBottom: '25px' }}>Deseja realmente estornar a venda?</h3>
                        <span style={{ fontSize: '0.85rem', width: '90%' }}>
                            <Autocomplete
                                value={selectedType}
                                onChange={(event: any, newValue: type | null) => {
                                    setSelectedType(newValue);
                                }}
                                noOptionsText="Não encontrado"
                                id="controllable-states-demo"
                                options={options}
                                getOptionLabel={(option) => (option.descricao)}
                                sx={{ width: '100%' }}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        label="Selecione o tipo de estorno *"
                                    />
                                } />
                            {/* <input type="checkbox" checked={isCheckBoxChecked} onChange={(e) => setisCheckBoxChecked(e.target.checked)}></input>
                            Lançar uma saída no caixa de {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.valueSellModal)} em dinheiro, caso desmarcado será efetuado exclusão do caix. */}
                        </span>
                        <span style={{ marginTop: "15px", fontSize: "0.7rem" }}>
                            <b>Lembrete:</b> Saldo será retornado automaticamente para o estoque
                        </span>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '40%', marginTop: 30 }}>
                            <S.ButtonYesDeleteModal onClick={handleSendtoApi} ><b>SIM</b></S.ButtonYesDeleteModal>
                            <S.ButtonNoDeleteModal onClick={handleCloseModalDelete}><b>NÃO</b></S.ButtonNoDeleteModal>
                        </div>
                    </S.DivDeleteProductModal>
                    <S.ButtonCloseModal isDarkMode={Theme.DarkMode} onClick={handleCloseModalDelete}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonCloseModal>
                </MuiBox>
            </Modal>
        </>
    )
}