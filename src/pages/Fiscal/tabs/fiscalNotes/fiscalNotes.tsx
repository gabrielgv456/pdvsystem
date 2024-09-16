import { sharedFiscalNote } from "@shared/api/fiscal/getFiscalNotes"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "src/contexts/Auth/AuthContext"
import { useMessageBoxContext } from "src/contexts/MessageBox/MessageBoxContext"
import { useApi } from "src/hooks/useApi"
import { CircularProgressSpinner } from "src/spinners/progress/CircularProgressSpinner"
import * as S from './style'
import { DefaultTable } from "src/components/table/table"
import { formatCurrencyNew } from "src/masks/CurrencyMask"

export const TabFiscalNotes = () => {

    useEffect(() => {
        async function fiscalNotes() {
            try {
                const result = await getFiscalNotes(idUser)
                if (!result.Success) throw new Error(result.erro ?? 'Erro desconhecido')
                setFiscalNotes(result.fiscalNotes)
            } catch (error) {
                MessageBox('error', 'Ocorreu uma falha ao buscar as notas fiscais!' + (error as Error).message)
            } finally {
                setIsLoading(false)
            }
        }
        fiscalNotes()
    }, [])

    const [fiscalNotes, setFiscalNotes] = useState<sharedFiscalNote[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const { getFiscalNotes } = useApi()
    const { idUser } = useContext(AuthContext)
    const { MessageBox } = useMessageBoxContext()

    return (
        <S.Container>
            {isLoading ?
                <CircularProgressSpinner /> :
                (fiscalNotes &&
                    <DefaultTable headers={['Nº', 'Status', 'Modelo', 'Chave', 'Protocolo', 'Valor']}

                        rows={fiscalNotes.map(item => {
                            return {
                                active: true,
                                alignment: 'center',
                                columns: [
                                    { component: item.numberNF },
                                    { component: <b style={{ color: item.statusNFId === 1 ? 'green' : item.statusNFId === 2 ? 'red' : '' }}>{item.statusNF.description}</b> },
                                    { component: item.modelNF.description },
                                    { component: item.keyNF },
                                    { component: item.protocol },
                                    { component: formatCurrencyNew(item.totalAmount) }

                                ]
                            }
                        })}


                    />)
            }
        </S.Container>
    )
}