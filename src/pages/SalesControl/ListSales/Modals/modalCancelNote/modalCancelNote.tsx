import { Modal, TextField } from "@mui/material"
import { SharedEventCancelNoteRequest } from "@shared/api/fiscal/EventCancelNote"
import { Dispatch, FormEvent, SetStateAction, useContext, useRef, useState } from "react"
import { MuiBox } from "src/components/box/muiBox"
import { DefaultButton } from "src/components/buttons/defaultButton"
import { AuthContext } from "src/contexts/Auth/AuthContext"
import { useMessageBoxContext } from "src/contexts/MessageBox/MessageBoxContext"
import { useApi } from "src/hooks/useApi"
import * as S from './style'
import { DefaultButtonCloseModal, DefaultIconCloseModal } from "src/components/buttons/closeButtonModal"
import { Sell } from "src/pages/SalesControl"
import { CircularProgressSpinner } from "src/spinners/progress/CircularProgressSpinner"

type ModalCancelNoteProps = {
    isModalOpen: boolean,
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
    sell: Sell
    searchSells: () => void
}

export const ModalCancelNote = (props: ModalCancelNoteProps) => {

    const { eventCancelNote } = useApi()
    const { MessageBox } = useMessageBoxContext()
    const { idUser } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const justificativa = useRef<HTMLInputElement>(null)

    const handleCancelNote = async (e: FormEvent<HTMLFormElement>) => {
        try {
            setIsLoading(true)
            e.preventDefault()
            const req = { idSell: props.sell.id, idUser, justificativa: justificativa.current?.value ?? '' }
            if (req.justificativa.length < 15) throw new Error('Informe uma justificativa com no mínimo 15 caracteres.')
            const res = await eventCancelNote(req)
            if (!res.Success) throw new Error(res.Erro ?? 'Erro desconhecido')
            MessageBox('success', 'Nota fiscal cancelada com sucesso.')
            props.setIsModalOpen(false)
            props.searchSells()
        } catch (error) {
            MessageBox('error', 'Ocorreu um falha ao cancelar a nota! ' + (error as Error).message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal open={props.isModalOpen} onClose={() => props.setIsModalOpen(false)}>
            <MuiBox desktopWidth={500} mobileWidthPercent="80%">
                <S.Container>
                    <S.Form onSubmit={(e) => handleCancelNote(e)}>
                        <span><b>Venda nº:</b> {props.sell.codRef}</span>
                        {isLoading ? <CircularProgressSpinner /> :
                            <>
                                <TextField
                                    type="text"
                                    inputRef={justificativa}
                                    id="outlined-basic"
                                    multiline
                                    rows={6}
                                    title='Percentual de redução da base de calculo ICMS'
                                    label="Justificativa cancelamento nota fiscal*"
                                    variant="outlined"
                                />
                                <DefaultButton selectedColor="--Green" type="submit"> Cancelar Nota </DefaultButton>
                            </>
                        }
                    </S.Form>
                </S.Container>
                <DefaultButtonCloseModal onClick={() => props.setIsModalOpen(false)}>
                    <DefaultIconCloseModal />
                </DefaultButtonCloseModal>
            </MuiBox>

        </Modal>
    )
}