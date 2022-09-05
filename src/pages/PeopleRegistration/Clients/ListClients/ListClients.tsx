import { BsCheckCircle, BsTrash } from "react-icons/bs";
import { useDarkMode } from "../../../../contexts/DarkMode/DarkModeProvider";
import * as S from "./style"
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useContext, useState } from "react";
import { useApi } from "../../../../hooks/useApi";
import { AuthContext } from "../../../../contexts/Auth/AuthContext";
import { RiWhatsappLine } from "react-icons/ri";
import { ModalEditClient } from "./Modals/editClient";
import { ClientsReturnApiProps } from '../index'
import { ModalDeleteClient } from "./Modals/deleteClient";
import { ModalSuccessDeleteClient } from "./Modals/successDeleteClient";
import { MdOutlineMail } from "react-icons/md";

interface ListClientsProps {
    client: ClientsReturnApiProps;
    created_at: Date;
    searchClient: () => void;
}



export const ListClients = (props: ListClientsProps) => {


    const { deleteClient } = useApi()
    const auth = useContext(AuthContext)
    const Theme = useDarkMode();
    const [isModalEditClientOpen, setisModalEditClientOpen] = useState(false);
    const [inputMasterKey, setinputMasterKey] = useState("")
    const [isModalDeleteClientOpen, setisModalDeleteClientOpen] = useState(false)
    const [isModalSucessOpen, setisModalSucessOpen] = useState(false)
    const cpfcnpjFormated = props.client.cpf.length === 11 ? props.client.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4") : props.client.cpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5")
    const cellFormated =  props.client.cellNumber !== null && props.client.cellNumber.replace(/(\d{2})(\d{5})(\d{4})/g, "($1)$2-$3")
    const telFormated = props.client.phoneNumber !== null ? props.client.phoneNumber.replace(/(\d{2})(\d{4})(\d{4})/g, "($1)$2-$3") : ""
    const linkwhatsapp = `https://wa.me/55${props.client.cellNumber}`
    const linkmailto = `mailto:${props.client.email}`

    
   
   
    const handleDeleteClientApi = async () => {
        const data = await deleteClient({ clientId: props.client.id, storeId: auth.idUser })
        if (data.Success) {
            setisModalDeleteClientOpen(false)
            setisModalSucessOpen(true)
        }
        else {
            alert(data.erro)
        }


    }





    return (
        <>
            <S.Container isDarkMode={Theme.DarkMode} isClientActive={props.client.active}>

                <S.ButtonEdit onClick={() => setisModalEditClientOpen(true)} title="Editar Produto"><HiOutlinePencilAlt size="20" /></S.ButtonEdit>

                <S.LabelNameClient isDarkMode={Theme.DarkMode}>
                    <b>{props.client.name}</b>
                </S.LabelNameClient>

                <S.LabelCpf isDarkMode={Theme.DarkMode}>
                    <b>{cpfcnpjFormated}</b>
                </S.LabelCpf>
                
                <S.LabelNumber >
                {props.client.cellNumber &&
                    <>
                    <a href={linkwhatsapp} target="blank"><RiWhatsappLine color="#47c254" size="18"/></a>

                    &nbsp;

                    <b>{cellFormated}</b>
         
                    </>
                }
                </S.LabelNumber>
                <S.LabelMail >
                {props.client.email &&
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <a href={linkmailto}  ><MdOutlineMail color="#85cdc5" size="18"/></a>

                    &nbsp;
                    
                    <S.bMail>{props.client.email}</S.bMail>

                    
                    </div>
                }
                </S.LabelMail>
                


                <S.ButtonTrash onClick={() => setisModalDeleteClientOpen(true)} title="Excluir Produto" ><BsTrash size="16" /></S.ButtonTrash>

            </S.Container>

            
            <ModalSuccessDeleteClient
                 isModalSucessOpen = {isModalSucessOpen}
                 searchClient = {props.searchClient}
                 setisModalSucessOpen = {setisModalSucessOpen}
            />

            <ModalEditClient
                client={props.client}
                isModalEditClientOpen={isModalEditClientOpen}
                setisModalEditClientOpen={setisModalEditClientOpen}
                setisModalSucessOpen={setisModalSucessOpen}
            />

            <ModalDeleteClient 
                handleDeleteClientApi={handleDeleteClientApi}
                setisModalDeleteClientOpen = {setisModalDeleteClientOpen}
                isModalDeleteClientOpen = {isModalDeleteClientOpen}
            />
        </>
    )
}
