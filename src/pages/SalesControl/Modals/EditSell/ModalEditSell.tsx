import * as S from "./style"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useDarkMode } from "../../../../contexts/DarkMode/DarkModeProvider";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from "react";
import TextField from '@mui/material/TextField';



interface ModalEditSellProps {
    ismodalEditSellOpen : boolean,
    setismodalEditSellOpen : (value:boolean) => void,
    defaultSendtoApi: () => void
}
interface inputAutoCompleteType {
    label: string,
    id: number
}

export const ModalEditSell= (props:ModalEditSellProps) => {

    const Theme = useDarkMode()
    const handleCloseModalEditSell = () =>{
        props.setismodalEditSellOpen(false)
        props.defaultSendtoApi ()
    }
    const [inputSeller,setinputSeller] = useState<inputAutoCompleteType | null>({ label: 'Vendedor não identificado ', id: 99 })
    const [inputClient,setinputClient] = useState<inputAutoCompleteType | null>({ label: 'Consumidor não identificado ', id: 99 })
    const sellers =  [
        { label: 'João', id: 1 },
        { label: 'Maria', id: 2 },
      ]
    const clients = [
        { label: 'João', id: 1 },
        { label: 'Maria', id: 2 },
    ]

    return (

        <Modal open={props.ismodalEditSellOpen} onClose={handleCloseModalEditSell}>
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
                    <div style={{display:'flex', flexDirection:"column", gap:'15px',padding:'10px', alignItems:'center'}}>
                        <Autocomplete
                        value={inputSeller}
                        onChange={(event: any, newValue: inputAutoCompleteType | null) => setinputSeller(newValue)}
                        disablePortal
                        options={sellers}
                        sx={{ width: "100%" }}
                        renderInput={(params) => <TextField {...params} label="Vendedor" />}
                        /> 
                        

                        <Autocomplete
                        value={inputClient}
                        onChange={(event: any, newValue: inputAutoCompleteType | null) => setinputClient(newValue)}
                        disablePortal
                        options={clients}
                        sx={{ width: "100%" }}
                        renderInput={(params) => <TextField {...params} label="Cliente" />}
                        /> 

                        <S.ButtonProductModal  isDarkMode={Theme.DarkMode} >
                            <AiOutlineEdit size="22"/>
                            <b>FINALIZAR EDIÇÃO</b>
                        </S.ButtonProductModal>
                        
                    </div>
                    <S.ButtonCloseModal  isDarkMode={Theme.DarkMode} onClick={handleCloseModalEditSell}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonCloseModal>
                </Box>
            </Modal>
    )
}