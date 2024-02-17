import styled from 'styled-components'
import { lighten } from 'polished'

interface DarkModeProps {
    isDarkMode: boolean
}

interface DragOverProps{
    dragOver:boolean
}

export const ButtonAddProductModal = styled.button <DarkModeProps> `
    display: flex;
    align-items: center;
    justify-content: center;
    gap:10px;
    width: max-content;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.8rem;
    border:none;
    border-radius: 5px;
    padding: 0.7rem;
    background-color: var(--Green);
    color: #fff;
    &:hover{
        background-color: '#578dff';
    }
`
export const DivModalAddProduct = styled.div `
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
    margin: 0px 0 15px 0;
`

export const labelChangeImg = styled.label <DragOverProps>`
    font-size: 0.7rem;
    border: 1px solid var(--Green);
    align-items: center;
    flex-direction: column;
    display:flex;
    color: var(--Green);
    padding: 7px;
    border-radius: 6px;
    background: ${props=>props.dragOver? lighten(0.42, '#33CC95') :'none'};
    gap:5px;
    transition: background-color 0.2s;
    &:hover{
        background:${lighten(0.42, '#33CC95')};
    }
`
export const InputSection = styled.section `
    flex: 1 1 160px;
`