import { lighten } from "polished"
import styled from "styled-components"

interface DragOverProps {
    dragOver: boolean
}

export const DivPicture = styled.div`
    display: flex;
    flex-wrap: wrap;
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
    background: ${props => props.dragOver ? lighten(0.42, '#33CC95') : 'none'};
    gap:5px;
    transition: background-color 0.2s;
    &:hover{
        background:${lighten(0.42, '#33CC95')};
    }
`

export const labelRecomendationsImg = styled.label `
    font-size: 0.7rem;
    color:rgb(102, 112, 133);
    max-width: 230px;

`
export const ButtonDeletar = styled.button `
    font-family: Poppins,sans-serif;
    background: none;
    border: none;
    border-radius: 6px;
    padding: 7px;
    &:hover{
        background-color: #f5f5f5;
    }
`

export const ButtonChangeImg = styled.button `
    border: 1px solid var(--Green);

    color: var(--Green);
    padding: 7px;
    border-radius: 6px;
    background: none;
    transition: background-color 0.2s;
    &:hover{
        background:${lighten(0.42, '#33CC95')};
    }
`