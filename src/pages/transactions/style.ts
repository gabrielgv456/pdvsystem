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
    width: min-content;
    height: min-content;
    display:flex;
    margin: 0 auto;
`
export const Box = styled.div `
    width: min-content;
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
    width: 12rem;
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
