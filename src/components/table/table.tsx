import { useDarkMode } from 'src/contexts/DarkMode/DarkModeProvider'
import * as S from './style'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { PaginatedFooter } from 'src/components/paginate/footerPaginate/paginatedFooter'
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'

type rowsType = { columns: { component: ReactNode }[], active: boolean, alignment?: 'left' | 'right' | 'center' }[]

export const DefaultTable = (props: { headers: string[], rows: rowsType }, setData: Dispatch<SetStateAction<any[] | null>>) => {

    const { DarkMode } = useDarkMode()
    const [paginedRows, setPaginedRows] = useState<rowsType | null>(props.rows)

    return (
        <S.Table>
            <S.THead isDarkMode={DarkMode}>
                <tr>
                    {props.headers.map((item, index) => (
                        <S.Th key={index}>{item}</S.Th>
                    ))}
                </tr>
            </S.THead>

            <tbody>

                {paginedRows?.map(item => (
                    <S.TrBody isActive={item.active ?? false} isDarkMode={DarkMode} style={{ textAlign: item.alignment ?? 'left' }}>
                        {item.columns.map((Column, index) => { return (<S.TdBody key={index} isDarkMode={DarkMode} ><b>{Column.component}</b></S.TdBody>) })}
                    </S.TrBody>
                ))}

            </tbody>

            <S.TFootListClients isDarkMode={DarkMode}>
                <tr>
                    <td colSpan={props.headers.length} style={{ padding: 20 }}>
                        {(props.rows && paginedRows) &&
                            <PaginatedFooter data={props.rows} setPaginatedData={setPaginedRows} />
                        }
                    </td>
                </tr>

            </S.TFootListClients>

        </S.Table>

    )
}