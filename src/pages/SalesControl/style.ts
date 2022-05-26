import {darken} from 'polished'

import styled from "styled-components";

interface DarkModeProps {
    isDarkMode:Boolean;
}

export const Container = styled.div<DarkModeProps> `
    font-family: 'Poppins', sans-serif;
    width: 100%;
    min-height: 82vh;
    border: 0px solid;
    color: ${props => (props.isDarkMode ? 'white' : '')};
  
`
export const Header = styled.div`
    gap: 5px ;
    width: 100%;
    height: min-content;
    display:flex;
    justify-content: center;
`
export const Box = styled.div `
    width: 30%;
    height: min-content;
    padding: 10px;
    border-radius: 5px;
    `
    export const DivSearch = styled.div `
    align-self: flex-end;
    display: flex;
    width: min-content;
    height: min-content;
    padding: 10px;
    border-radius: 5px;
    `
export const Input = styled.input `
    border: 1px solid silver;
    border-radius: 5px;
    width: 100%;
    height:1.8rem;
`
export const Button = styled.button `

font-family: 'Poppins', sans-serif;
    width: 5.2rem;
    height: 2.2rem;
    background: var(--Green);
    color: #fff;
    padding: 5px;
    background-color: #34cc96;
    border-radius: 13px;
    font-size: 0.9rem;
    border:none;
    color:#fff;
    transition: background-color 0.2s;
    &:hover{
        background-color: ${darken(0.02,'#34cc96')}
    }
`

export const DivMenu = styled.div <DarkModeProps>`
    padding: 0 20px 0 20px;
    margin: 10px 0 2px 0px;
    width:100%;
    display: flex;
    justify-content: space-between; 
    color: gray;
    gap:5px;
`
export const LabelItem = styled.label<DarkModeProps>`
    color: gray;
    width: 40%;
    max-width:40%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    @media screen and (max-width: 590px) {
    max-width:12ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    }
    @media screen and (max-width: 930px) {
    max-width:15ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    }
`
export const LabelValue = styled.label `
    width: 11%;
`
export const LabelDate = styled.label `
    width: 10%;
    min-width: min-content;
`
export const LabelQuantaty = styled.label `
    width: 10%;
`
