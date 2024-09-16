import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import * as S from './style'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useDarkMode } from 'src/contexts/DarkMode/DarkModeProvider'

type PaginatedFooterProps = {
    data: any[],
    setPaginatedData?: Dispatch<SetStateAction<any[] | null>>
}

export const PaginatedFooter = ({ data, setPaginatedData }: PaginatedFooterProps) => {

    const [ItensPerPage, SetItensPerPage] = useState(10)
    const [atualPage, SetAtualPage] = useState(0)

    const Pages = Math.ceil(data.length / ItensPerPage)
    const StartIndex = atualPage * ItensPerPage
    const EndIndex = StartIndex + ItensPerPage
    const paginedData = data.slice(StartIndex, EndIndex)

    const Theme = useDarkMode()

    const EditItensPerPage = (ItensPerPage: number) => {
        SetItensPerPage(ItensPerPage)
        SetAtualPage(0)
    }

    useEffect(() => {
        if (setPaginatedData)
            setPaginatedData(paginedData)
    }, [data, atualPage, ItensPerPage])

    return (
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
    )

}