import styled from 'styled-components'
import { darken } from 'polished'

interface DarkModeProps {
    isDarkMode : boolean
} 

export const Container = styled.div<DarkModeProps> `
    background-color:${props => (props.isDarkMode ? 'var(--backgroundDarkMode)' : 'var(--background);')};
    color: ${props => (props.isDarkMode ? 'white' : '')};
    font-family: 'Poppins', sans-serif;
    border-radius: 10px;
    width: 100%;
    min-height: calc(100vh - 64px);
    padding: 0px;
    box-shadow: rgba(58, 53, 65, 0.1) 0px 2px 10px 0px;
    box-sizing: border-box;
  

`

export const Input = styled.input <DarkModeProps> `
    background-color: ${props=>(props.isDarkMode ? 'var(--backgroundInputDarkMode)':'')};
    border: solid silver ${props=>(props.isDarkMode ? '0px' : '1px')};
    color: ${props=>(props.isDarkMode ? '#fff' : '')};
    border-radius: 5px;
    width: 100%;
    height:1.8rem;

`

export const Box = styled.div <DarkModeProps> `
width: 40%;
height: min-content;
padding: 10px;
border-radius: 5px;
color:${props=>props.isDarkMode ? '#fff' : '#000'}
`
export const Header = styled.div<DarkModeProps>`
    margin: 0 auto;
    color:'#fff';
    background-color: ${props => (props.isDarkMode ?  'var(--backgroundDarkMode)': '#fff' )} ;
    border-radius: 0 0 20px 20px;
    padding: 0.5rem 0.2rem 1rem 0.2rem;
    gap: 5px ;
    width: 70%;
    height: min-content;
    display:flex;
    justify-content: center;
    margin-bottom: 20px;
    align-items: flex-end;
    margin-top: -23px;
    box-shadow: rgba(58, 53, 65, 0.1) 0px 2px 10px 0px;
    @media screen and (max-width:930px) {
        width: 90%;
    }

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