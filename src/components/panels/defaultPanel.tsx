import { Children, ReactNode } from 'react'
import * as S from './style'
import { MdWarning } from "react-icons/md";
import { MdInfo } from "react-icons/md";
import { MdError } from 'react-icons/md';



export const DefaultPanel = (props: { type: S.PanelType, children: ReactNode }) => {
    return (
        <S.Panel type={props.type}>
            {props.type === 'warning' && <MdWarning size={22} />}
            {props.type === 'info' && <MdInfo size={22} />}
            {props.type === 'error' && <MdError size={22} />}
            {props.children}
        </S.Panel>

    )
}