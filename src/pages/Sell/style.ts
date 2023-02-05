import styled from "styled-components";
import { darken } from 'polished'


interface DarkModeProps {
    isDarkMode: boolean;
}
interface NeedReturnCashProps {
    needReturnCash: string;
}



export const Container = styled.div<DarkModeProps> `
    font-family: 'Poppins', sans-serif;
    width: 100%;
    min-height: 82vh;
    border: 0px solid;
    color: ${props => (props.isDarkMode ? 'white' : '')};
`
export const Header = styled.div<DarkModeProps>`
    gap: 5px ;
    width: 70%;
    height: min-content;
    display:flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-bottom: 2rem;
    background-color: ${props => (props.isDarkMode ?  'var(--backgroundDarkMode)': '#fff' )} ;
    border-radius: 0 0 20px 20px;
    box-shadow: rgba(58, 53, 65, 0.1) 0px 2px 10px 0px;
    padding: 1rem 0 1rem 0;
    margin-top: -23px;
`
// export const Header = styled.div<DarkModeProps>`
//     margin: 0 auto;
   
//     padding: 0.5rem 0 1rem 0;
//     gap: 5px ;
//     width: 60%;
//     height: min-content;
//     display:flex;
//     justify-content: center;
//     align-items: flex-end;
//     margin-top: -23px;
    

// `

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
export const TotalValue = styled.span`
    padding-top:2rem;
    margin: 0 auto;
    font-size: 3.5rem;
    
`
export const LabelConfirm = styled.label`
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
    width: 70%;
    height: min-content;
    padding: 10 10 0 10;
`
export const Button = styled.button`
    color: var(--Green);
    text-decoration: none;
    border: none;
    background: none;
    &:hover{
        color: ${darken(0.02, '#34cc96')}
    }
`
export const ButtonClose = styled.button <DarkModeProps>`
    color: ${props => (props.isDarkMode ? '#fff' : '#000')};
    text-decoration: none;
    border: none;
    background: none;
    &:hover{
        color: ${darken(0.02, 'gray')}
    }
`
export const ButtonEndSell = styled.button`
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
        background-color: ${darken(0.02, '#34cc96')}
    }
`
export const ButtonPrint = styled.button`
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
        background-color: ${darken(0.02, '#007fff')}
    }
`
// INICIA MODAL

export const DivModalButtons = styled.div`
    padding-top: 2rem;
    display: flex;
    justify-content: space-evenly;
`
export const DivModalIconsPayment = styled.div`
    font-size:0.8rem;
    display: flex;
    justify-content: space-around;
    padding-bottom: 1rem;
    .hoverbutton {
        width: 25px;
        height: 25px;
    }
    .hoverbutton:hover{
        width: 30px;
        height:30px;
    }
    
`
export const LabelIconsModal = styled.div <DarkModeProps>`
    cursor:pointer;
    display:flex;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
    height: 50px;
`
export const PHeaderModal = styled.p`
    font-size: 1.1rem;
`

export const InputModal = styled.input`
    border: 1px solid silver;
    border-radius: 5px;
`
export const ButtonSellEnded = styled.label`
    color: var(--Green);
`
export const LabelSellEnded = styled.label`
    font-size:1.1rem;
    display:flex;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    transition: 3s ease-in;
    .HiBadgeCheck{
    -webkit-animation: bounce-in-top 1.1s both;
        animation: bounce-in-top 1.1s both;
                
    @-webkit-keyframes bounce-in-top {
    0% {
        -webkit-transform: translateY(-500px);
                transform: translateY(-500px);
        -webkit-animation-timing-function: ease-in;
                animation-timing-function: ease-in;
        opacity: 0;
    }
    38% {
        -webkit-transform: translateY(0);
                transform: translateY(0);
        -webkit-animation-timing-function: ease-out;
                animation-timing-function: ease-out;
        opacity: 1;
    }
    55% {
        -webkit-transform: translateY(-65px);
                transform: translateY(-65px);
        -webkit-animation-timing-function: ease-in;
                animation-timing-function: ease-in;
    }
    72% {
        -webkit-transform: translateY(0);
                transform: translateY(0);
        -webkit-animation-timing-function: ease-out;
                animation-timing-function: ease-out;
    }
    81% {
        -webkit-transform: translateY(-28px);
                transform: translateY(-28px);
        -webkit-animation-timing-function: ease-in;
                animation-timing-function: ease-in;
    }
    90% {
        -webkit-transform: translateY(0);
                transform: translateY(0);
        -webkit-animation-timing-function: ease-out;
                animation-timing-function: ease-out;
    }
    95% {
        -webkit-transform: translateY(-8px);
                transform: translateY(-8px);
        -webkit-animation-timing-function: ease-in;
                animation-timing-function: ease-in;
    }
    100% {
        -webkit-transform: translateY(0);
                transform: translateY(0);
        -webkit-animation-timing-function: ease-out;
                animation-timing-function: ease-out;
    }
    }
    @keyframes bounce-in-top {
    0% {
        -webkit-transform: translateY(-500px);
                transform: translateY(-500px);
        -webkit-animation-timing-function: ease-in;
                animation-timing-function: ease-in;
        opacity: 0;
    }
    38% {
        -webkit-transform: translateY(0);
                transform: translateY(0);
        -webkit-animation-timing-function: ease-out;
                animation-timing-function: ease-out;
        opacity: 1;
    }
    55% {
        -webkit-transform: translateY(-65px);
                transform: translateY(-65px);
        -webkit-animation-timing-function: ease-in;
                animation-timing-function: ease-in;
    }
    72% {
        -webkit-transform: translateY(0);
                transform: translateY(0);
        -webkit-animation-timing-function: ease-out;
                animation-timing-function: ease-out;
    }
    81% {
        -webkit-transform: translateY(-28px);
                transform: translateY(-28px);
        -webkit-animation-timing-function: ease-in;
                animation-timing-function: ease-in;
    }
    90% {
        -webkit-transform: translateY(0);
                transform: translateY(0);
        -webkit-animation-timing-function: ease-out;
                animation-timing-function: ease-out;
    }
    95% {
        -webkit-transform: translateY(-8px);
                transform: translateY(-8px);
        -webkit-animation-timing-function: ease-in;
                animation-timing-function: ease-in;
    }
    100% {
        -webkit-transform: translateY(0);
                transform: translateY(0);
        -webkit-animation-timing-function: ease-out;
                animation-timing-function: ease-out;
    }
}}

`
// TERMINA MODAL