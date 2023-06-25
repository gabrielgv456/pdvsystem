import styled from "styled-components";
import {lighten,darken}from 'polished'

interface DragOverProps{
    dragOver: boolean
}


export const Container = styled.div `
    display: flex;
    width: 100%;
    flex-direction: column;
`

export const DivForm = styled.div `
    width: 100%;
    display: flex;
    flex-direction: column;
    gap:10px;
    margin-bottom: 10px;
`
export const DivPicture = styled.div`
    display: flex;
    flex-wrap: wrap;
`
export const labelRecomendationsImg = styled.label `
    font-size: 0.7rem;
    color:rgb(102, 112, 133);
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

export const labelChangeImg = styled.label <DragOverProps>`
    font-size: 0.9rem;
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
export const DivChangePass = styled.div `
    display: flex;
    width: 100%;
    margin-top: 15px;
    gap:15px;
    flex-wrap: wrap;
    
`