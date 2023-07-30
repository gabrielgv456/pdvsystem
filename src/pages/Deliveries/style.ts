import {darken} from 'polished'

import styled from "styled-components";

interface DarkModeProps {
    isDarkMode:boolean;
}

export const Container = styled.div<DarkModeProps> `
    font-family: 'Poppins', sans-serif;
    width: 100%;
    min-height: 82vh;
    border: 0px solid;
    color: ${props => (props.isDarkMode ? 'white' : '')};
  
`
export const Header = styled.div<DarkModeProps>`
    margin: 0 auto;
    background-color: ${props => (props.isDarkMode ?  'var(--backgroundDarkMode)': '#fff' )} ;
    border-radius: 0 0 20px 20px;
    padding: 0.5rem 0.2rem 1rem 0.2rem;
    gap: 5px ;
    width: 70%;
    height: min-content;
    display:flex;
    justify-content: center;
    align-items: flex-end;
    margin-top: -23px;
    box-shadow: rgba(58, 53, 65, 0.1) 0px 2px 10px 0px;
    @media screen and (max-width:930px) {
        width: 90%;
    }

`

export const Box = styled.div `
width: 40%;
height: min-content;
padding: 10px;
border-radius: 5px;
`
    
export const Input = styled.input <DarkModeProps> `
    background-color: ${props=>(props.isDarkMode ? 'var(--backgroundInputDarkMode)':'')};
    border: solid silver ${props=>(props.isDarkMode ? '0px' : '1px')};
    color: ${props=>(props.isDarkMode ? '#fff' : '')};
    border-radius: 5px;
    width: 100%;
    height:1.8rem;

`
export const Button = styled.button `

font-family: 'Poppins', sans-serif;
    width: min-content;
    height:1.8rem;
    background: var(--Green);
    color: #fff;
    padding: 5px 18px 5px 18px;
    background-color: #34cc96;
    border-radius: 5px;
    margin-bottom: 10px;
    font-size: 0.9rem;
    align-items: center;
    display: flex;
    border:none;
    transition: background-color 0.2s;
    &:hover{
        background-color: ${darken(0.02,'#34cc96')}
    }
`
export const Main = styled.div <DarkModeProps>`
background-color:${props => (props.isDarkMode ? 'var(--backgroundDarkMode)' : 'var(--background);')};
//box-shadow: ${props => (props.isDarkMode ? '' : '0px 0px 5px #CCC')}; 
border: ${props => (props.isDarkMode ? '1px solid gray' : '')}; 
border-radius: 10px;
padding:10px 20px 10px 20px;
width:100%;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
box-shadow: rgba(58, 53, 65, 0.1) 0px 2px 10px 0px;

`




