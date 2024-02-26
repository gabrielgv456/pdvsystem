import styled from 'styled-components'
import { lighten } from 'polished'

interface DragOverProps {
    dragOver: boolean
}

export const DivModalAddProduct = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
    max-height:60vh;
    overflow: auto;
    flex-wrap: wrap;
    padding: 8px 0 0 0;
    margin: 0px 0 15px 0;
    .InputSection {
        flex: 1 1 170px
    }
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