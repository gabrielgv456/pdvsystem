import * as S from "./style"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { AiOutlineClose } from "react-icons/ai";
import { useContext, useState } from "react";
import { useDarkMode } from "../../../../contexts/DarkMode/DarkModeProvider";
import { AuthContext } from "../../../../contexts/Auth/AuthContext";
import { useApi } from "../../../../hooks/useApi";

interface ModalDeleteProps {
    ismodalDeleteOpen : boolean,
    setismodalDeleteOpen : (value:boolean) => void,
    setismodalSuccessOpen: (value:boolean) => void,
    defaultSendtoApi: () => void,
    valueSellModal: number;
    idSellDeleteModal: number;
    listProductstoModifyQntFiltered : {
        id:number;
        storeId: number,
        sellId:number;
        idProduct:number;
        quantity: number,
        valueProduct: number;
        totalValue: number;
        descriptionProduct: string;
        created_at: Date;
    }[];
}

export const ModalDelete = (props : ModalDeleteProps) => {

    const Theme = useDarkMode();
    const auth = useContext(AuthContext);
    const {deleteSell} = useApi()
    const [isCheckBoxChecked,setisCheckBoxChecked] = useState(true)

    async function handleCloseModalDelete() {
        props.setismodalDeleteOpen(false)
        setisCheckBoxChecked(true)
    }
    async function handleSendtoApi() {
        const data = await deleteSell({
             SellId: props.idSellDeleteModal,
             UserId: auth.idUser, 
             Products: props.listProductstoModifyQntFiltered, 
             AddExitTransaction: isCheckBoxChecked ,
             SellValue: props.valueSellModal
            })

        if (data.Success) {
            props.setismodalSuccessOpen(true)
            props.setismodalDeleteOpen(false)
            props.defaultSendtoApi()

        } else if (!data.Sucess) {
            alert(`ERRO:${data.erro}`)
        }

    }

    return (

        <>
        
    <Modal open={props.ismodalDeleteOpen} onClose={handleCloseModalDelete}>
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: {
                        xs: '80%', // phone
                        sm: '80%', // tablets
                        md: 500, // small laptop
                        lg: 500, // desktop
                        xl: 500 // large screens
                    },
                    //width: '80%',
                    bgcolor: Theme.DarkMode ? 'var(--backgroundDarkMode2)' : 'background.paper',
                    color: Theme.DarkMode ? '#ffffff' : '#000',
                    border: Theme.DarkMode ? '1px solid silver' : '',
                    boxShadow: 24, p: 4,
                }}
                >   
                    <S.DivDeleteProductModal>
                            <h3 style={{alignSelf:'center',marginBottom:'25px'}}>Deseja realmente estornar a venda?</h3>
                            <span style={{fontSize:'0.85rem'}}>
                                <input type="checkbox" checked={isCheckBoxChecked} onChange={(e)=>setisCheckBoxChecked(e.target.checked)}></input>
                                Lançar uma saída no caixa de {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.valueSellModal)} em dinheiro
                            </span>
                            <span style={{marginTop:"15px", fontSize:"0.7rem"}}>
                                <b>Lembrete:</b> Saldo será retornado automaticamente para o estoque
                            </span>  
                            <div style={{display:'flex',justifyContent:'space-between', width:'40%', marginTop:30}}>
                                <S.ButtonYesDeleteModal onClick={handleSendtoApi} ><b>SIM</b></S.ButtonYesDeleteModal> 
                                <S.ButtonNoDeleteModal onClick={handleCloseModalDelete}><b>NÃO</b></S.ButtonNoDeleteModal>
                            </div>
                        </S.DivDeleteProductModal>  
                    <S.ButtonCloseModal isDarkMode={Theme.DarkMode} onClick={handleCloseModalDelete}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonCloseModal>
                </Box>
            </Modal>
        </>
    )
}