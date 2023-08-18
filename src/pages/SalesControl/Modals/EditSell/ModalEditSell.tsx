import * as S from "./style"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useDarkMode } from "../../../../contexts/DarkMode/DarkModeProvider";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import {SellersandClientsType} from "../../index"
import { MuiBox } from "../../../../components/box/muiBox";


interface ModalEditSellProps {
    ismodalEditSellOpen: boolean,
    idselltoEdit: number,
    setismodalEditSellOpen: (value: boolean) => void,
    defaultSendtoApi: () => void;
    sellers: SellersandClientsType[]
    clients : SellersandClientsType[]
    sellerfiltered : SellersandClientsType | null;
    clientfiltered : SellersandClientsType | null;
}



export const ModalEditSell = (props: ModalEditSellProps) => {

    const Theme = useDarkMode()
    const handleCloseModalEditSell = () => {
        props.setismodalEditSellOpen(false)
        props.defaultSendtoApi()
    }
    
    const [inputSeller, setinputSeller] = useState<SellersandClientsType | null > (null)
    const [inputClient, setinputClient] = useState<SellersandClientsType | null > (null)
    
        
    useEffect(()=>{
        setinputSeller(props.sellerfiltered)
    },[props.sellerfiltered])

    useEffect(()=>{
        setinputClient(props.clientfiltered)
    },[props.sellerfiltered])

    return (

        <Modal open={props.ismodalEditSellOpen} onClose={handleCloseModalEditSell}>
            <MuiBox desktopWidth={500} mobileWidthPercent="80%" >
                <div style={{ display: 'flex', flexDirection: "column", gap: '15px', padding: '10px', alignItems: 'center' }}>
                    <Autocomplete
                        value={inputSeller}
                        onChange={(event: any, newValue: SellersandClientsType | null) => setinputSeller(newValue)}
                        autoComplete
                        includeInputInList
                        options={props.sellers.filter(seller => seller.active)}
                        getOptionLabel={(option) => option.name}
                        sx={{ width: "100%" }}
                        noOptionsText="Nenhum resultado"
                        renderInput={(params) => <TextField {...params} label="Vendedor" />}
                    />
            
               <Autocomplete
                        value={inputClient}
                        onChange={(event: any, newValue: SellersandClientsType | null) => setinputClient(newValue)}
                        autoComplete
                        includeInputInList
                        options={props.clients}
                        getOptionLabel={(option) =>
                            (option.name)
                                .concat(" - ")
                                .concat(option.cpf)
                                .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "($1.$2.$3-$4)")

                        }
                        sx={{ width: "100%" }}
                        noOptionsText="Nenhum resultado"
                        renderInput={(params) => <TextField {...params} label="Cliente" />}
                    />

                    <S.ButtonProductModal isDarkMode={Theme.DarkMode} >
                        <AiOutlineEdit size="22" />
                        <b>FINALIZAR EDIÇÃO</b>
                    </S.ButtonProductModal>

                </div>
                <S.ButtonCloseModal isDarkMode={Theme.DarkMode} onClick={handleCloseModalEditSell}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonCloseModal>
            </MuiBox>
        </Modal>
    )
}