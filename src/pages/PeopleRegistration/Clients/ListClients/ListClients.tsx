import { BsCheckCircle, BsTrash } from "react-icons/bs";
import { useDarkMode } from "../../../../contexts/DarkMode/DarkModeProvider";
import * as S from "./style"
import { HiOutlinePencilAlt } from "react-icons/hi";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useContext, useState } from "react";
import TextField from '@mui/material/TextField';
import { AiOutlineClose } from "react-icons/ai";
import { useApi } from "../../../../hooks/useApi";
import { AuthContext } from "../../../../contexts/Auth/AuthContext";
import { RiAdminLine, RiWhatsappFill, RiWhatsappLine } from "react-icons/ri";

import { ModalEditClient } from "./Modals/editClient.tsx";
import { ClientsReturnApiProps } from '../index'

interface ListClientsProps {
    client: ClientsReturnApiProps;
    created_at: Date;
    searchClient: () => void;
}





export const ListClients = (props: ListClientsProps) => {


    const { deleteProducts } = useApi()
    const auth = useContext(AuthContext)
    const Theme = useDarkMode();
    const [isModalEditClientOpen, setisModalEditClientOpen] = useState(false);
    const [isModalMasterKeyOpen, setisModalMasterKeyOpen] = useState(false)
    const [inputMasterKey, setinputMasterKey] = useState("")
    const [isModalDeleteClientOpen, setisModalDeleteClientOpen] = useState(false)
    const [isModalSucessOpen, setisModalSucessOpen] = useState(false)
    const cpfcnpjFormated = props.client.cpf.length === 11 ? props.client.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4") : props.client.cpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5")
    const cellFormated =  props.client.cellNumber !== null && props.client.cellNumber.replace(/(\d{2})(\d{5})(\d{4})/g, "($1)$2-$3")
    const telFormated = props.client.phoneNumber !== null ? props.client.phoneNumber.replace(/(\d{2})(\d{4})(\d{4})/g, "($1)$2-$3") : ""
    const linkwhatsapp = `https://wa.me/55${props.client.cellNumber}`

    function handleCloseModalSucess() {
        props.searchClient()
        setisModalSucessOpen(false)
    }
    function handleCloseModalMasterKey() {
        setisModalMasterKeyOpen(false)
    }
    function handleCloseModalDeleteClient() {
        setisModalDeleteClientOpen(false)
    }
    function handleVerifyMasterKey() {
        if (inputMasterKey === auth.masterkey) {
            handleCloseModalMasterKey()
            setinputMasterKey("")
            setisModalDeleteClientOpen(true)
        }
        else {
            alert('Senha de Administrador incorreta!')
        }
    }
    const handleDeleteClientApi = async () => {
        const data = await deleteProducts({ id: props.client.id })
        if (data.Sucess) {
            setisModalDeleteClientOpen(false)
            setisModalSucessOpen(true)
        }
        else {
            alert(data.Erro)
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
                    <b>{cellFormated}</b>
                    &nbsp;
         
                    <a href={linkwhatsapp} target="blank"><RiWhatsappLine color="#47c254" size="18"/></a>
                    </>
                }
                </S.LabelNumber>
                <S.LabelMail >
                {props.client.email &&
                    <b>{props.client.email}</b>
                }
                </S.LabelMail>
                


                <S.ButtonTrash onClick={() => setisModalMasterKeyOpen(true)} title="Excluir Produto" ><BsTrash size="16" /></S.ButtonTrash>

            </S.Container>










            <Modal open={isModalMasterKeyOpen} onClose={handleCloseModalMasterKey}>
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
                    <S.DivRestrictAcessModal>
                        <h3 style={{ alignSelf: 'center' }}>Acesso Restrito</h3>
                        <label style={{ display: 'flex', alignItems: 'center' }}>
                            <RiAdminLine size="32" color='#485059' style={{ marginRight: 5 }} />
                            <TextField
                                value={inputMasterKey}
                                onChange={(e) => setinputMasterKey(e.target.value)}
                                type="password"

                                label="Senha de administrador"
                                variant="filled"
                                sx={{ width: '80%', borderRadius: '0 !important' }} />

                            <S.ButtonRestrictAcessModal onClick={handleVerifyMasterKey}>OK</S.ButtonRestrictAcessModal>
                        </label>
                    </S.DivRestrictAcessModal>
                    <S.ButtonCloseModal isDarkMode={Theme.DarkMode} onClick={handleCloseModalMasterKey}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonCloseModal>
                </Box>
            </Modal>

            <Modal open={isModalDeleteClientOpen} onClose={handleCloseModalDeleteClient}>
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
                    <S.DivDeleteClientModal>
                        <h3 style={{ alignSelf: 'center' }}>Deseja realmente excluir o produto?</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '40%' }}>
                            <S.ButtonYesDeleteClientModal onClick={handleDeleteClientApi}><b>SIM</b></S.ButtonYesDeleteClientModal>
                            <S.ButtonNoDeleteClientModal onClick={handleCloseModalDeleteClient}><b>NÃO</b></S.ButtonNoDeleteClientModal>
                        </div>
                    </S.DivDeleteClientModal>
                    <S.ButtonCloseModal isDarkMode={Theme.DarkMode} onClick={handleCloseModalDeleteClient}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonCloseModal>
                </Box>
            </Modal>



            <Modal open={isModalSucessOpen} onClose={handleCloseModalSucess}>
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
                    <S.DivDeleteClientModal>
                        <h3 style={{ alignSelf: 'center' }}>Procedimento realizado com sucesso!</h3>
                        <BsCheckCircle color="var(--Green)" size="50" className="IconSucess" />
                    </S.DivDeleteClientModal>
                    <S.ButtonCloseModal isDarkMode={Theme.DarkMode} onClick={handleCloseModalSucess}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonCloseModal>
                </Box>
            </Modal>


            <ModalEditClient
                client={props.client}
                isModalEditClientOpen={isModalEditClientOpen}
                setisModalEditClientOpen={setisModalEditClientOpen}
                setisModalSucessOpen={setisModalSucessOpen}
            />
        </>
    )
}
