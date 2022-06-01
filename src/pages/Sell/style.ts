import styled from "styled-components";
import {darken} from 'polished'


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
    align-items: center;
    margin-bottom: 1.5rem;
`
export const Main = styled.div`
    display: flex;
    width: 100%;
   
    justify-content: space-around;
`
export const Checkout = styled.div<DarkModeProps>`
    width: 45%;
    height: min-content;
    background-color:${props => (props.isDarkMode ? 'var(--backgroundDarkMode)' : 'var(--background);')};
    box-shadow: ${props => (props.isDarkMode ? '' : '0px 0px 5px #CCC')}; 
    border: ${props => (props.isDarkMode ? '1px solid gray' : '')}; 
    border-radius: 10px;
    font-size: 1.3rem;
    padding:20px;
    margin: 0 0 5px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between; 
    gap:5px;
    @media screen and (max-width: 930px) {
        padding: 10px;}
`
export const DivConfirmSell = styled.div`
    margin-top: 2rem;
    align-items: center;
    display:flex;
    flex-direction: column;
`
export const TotalValue = styled.span `
    padding-top:2rem;
    margin: 0 auto;
    font-size: 3.5rem;
    
`
export const LabelConfirm = styled.label `
cursor:pointer;

`

export const DivList = styled.div`
width: 45%;

`

export const Label = styled.label`
    width: min-content;
`
export const Input = styled.input`
    width: 100%;
    border-radius: 5px;
    border: 1px solid silver;
    height:2rem;

`
export const Box = styled.div`
    width: 45%;
    height: min-content;
    padding: 10 10 0 10;
`
export const Button = styled.button `
    color: var(--Green);
    text-decoration: none;
    border: none;
    background: none;
    &:hover{
        color: ${darken(0.02,'#34cc96')}
    }
`
export const ButtonClose = styled.button `
    color: #000;
    text-decoration: none;
    border: none;
    background: none;
    &:hover{
        color: ${darken(0.02,'gray')}
    }
`
export const ButtonEndSell = styled.button `
    background-color: #34cc96;
    border-radius: 13px;
    font-size:18px;
    width:9rem;
    height:40px;
    //border:1px solid silver;
    border:none;
    cursor:pointer;
    color:#fff;
    padding:5px;
    transition: background-color 0.2s;
    &:hover{
        background-color: ${darken(0.02,'#34cc96')}
    }
`
export const ButtonPrint = styled.button `
    background-color: #007fff;
    border-radius: 13px;
    font-size:18px;
    width:9rem;
    height:40px;
    //border:1px solid silver;
    border:none;
    cursor:pointer;
    color:#fff;
    padding:5px;
    transition: background-color 0.2s;
    &:hover{
        background-color: ${darken(0.02,'#007fff')}
    }
`
// INICIA MODAL

export const DivModalButtons = styled.div `
    padding-top: 2rem;
    display: flex;
    justify-content: space-evenly;
`
export const DivModalIconsPayment = styled.div `
    font-size:0.7rem;
    display: flex;
    justify-content: space-around;
    padding-bottom: 1rem;
`
export const LabelIconsModal = styled.label `
    cursor:pointer;
    display:flex;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
`
export const InputModal = styled.input `
    border: 1px solid silver;
    border-radius: 5px;
`
// TERMINA MODAL