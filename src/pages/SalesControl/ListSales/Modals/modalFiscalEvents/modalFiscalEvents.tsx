import { Modal } from "@mui/material"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { MuiBox } from "src/components/box/muiBox"
import * as S from './style'
import { DefaultButtonCloseModal, DefaultIconCloseModal } from "src/components/buttons/closeButtonModal"
import { useApi } from "src/hooks/useApi"
import { sharedGetFiscalEvents } from "@shared/api/fiscal/getFiscalEvents"
import { CircularProgressSpinner } from "src/spinners/progress/CircularProgressSpinner"
import { useMessageBoxContext } from "src/contexts/MessageBox/MessageBoxContext"
import { PaginatedFooter } from "src/components/paginate/footerPaginate/paginatedFooter"


type ModalCancelNoteProps = {
    isModalOpen: boolean,
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
    sellId: number
}

export const ModalFiscalEvents = (props: ModalCancelNoteProps) => {

    const { getFiscalEvents } = useApi()
    const [isLoading, setIsLoading] = useState(true)
    const { MessageBox } = useMessageBoxContext()
    const [fiscalEvents, setFiscalEvents] = useState<sharedGetFiscalEvents['fiscalEvents'] | null>(null)




    useEffect(() => {
        async function searchEvents() {
            try {
                const result = await getFiscalEvents(props.sellId)
                if (!result.Success) throw new Error(result.erro ?? 'Erro desconhecido')
                setFiscalEvents(result.fiscalEvents)
            } catch (error) {
                MessageBox('error', (error as Error).message)
            } finally {
                setIsLoading(false)
            }
        }
        searchEvents();
    }, [])

    return (

        <Modal open={props.isModalOpen} onClose={() => props.setIsModalOpen(false)} >
            <MuiBox desktopWidth={650} mobileWidthPercent="80%" >
                {isLoading ? <CircularProgressSpinner /> :
                    <S.Container>
                        <table >
                            <thead >
                                <tr >
                                    <th>Nº Nota Fiscal</th>
                                    <th>Tipo Evento</th>
                                    <th>Protocolo</th>
                                    <th>Horário</th>
                                </tr>
                            </thead>
                            <tbody >
                                {fiscalEvents?.map((event, index) =>
                                (
                                    <tr key={index}>
                                        <S.Td>{event.fiscalNote.numberNF}</S.Td>
                                        <S.Td>{event.fiscalEventType.description}</S.Td>
                                        <S.Td>{event.protocol}</S.Td>
                                        <S.Td>{new Date(event.createdAt).toLocaleString()}</S.Td>
                                    </tr>
                                )
                                )}
                            </tbody>
                        </table>
                        {fiscalEvents &&
                            <PaginatedFooter data={fiscalEvents} setData={setFiscalEvents} />
                        }
                    </S.Container>
                }
                <DefaultButtonCloseModal onClick={() => props.setIsModalOpen(false)}>
                    <DefaultIconCloseModal />
                </DefaultButtonCloseModal>

            </MuiBox>

        </Modal>
    )
}


