import styled from "styled-components";
import { darken } from "polished";

export const Container = styled.div `
    display: flex;
    width: 100%;
    flex-direction: column;
    gap:10px;
`

export const DivItemTrib = styled.div `
    display: flex;
    width: 100%;
    justify-content: space-around;
`
export const ButtonSave = styled.button  `
    align-self:flex-end;
    flex-wrap: wrap;
    display: flex;
    align-items: center;
    justify-content: center;
    gap:10px;
    width: max-content;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.85rem;
    border:none;
    border-radius: 5px;
    padding: 0.9rem;
    background-color: var(--Green);
    color: #fff;
    transition: background-color 0.2s;
    &:hover{
        background-color:${darken(0.02,'#33CC95')}
    }
`