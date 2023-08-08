import styled from "styled-components";
import { darken } from 'polished'

interface DarkModeProps {
    isDarkMode: boolean;
}

export const SectionMConfirmSell = styled.section`
    flex-direction: column;
    display: flex;
    gap:5px;
`
export const labelSeller = styled.label`
display: flex; 
width: 100%; 
align-items: flex-end; 
justify-content: space-around;
@media screen and (max-width:930px) {
        width:100%;
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

export const DivInputs = styled.div`
width: 100%; 
margin-bottom: 5px;
display: block;
justify-content: space-between;
@media screen and (max-width:930px) {
        display: block;
    }
`

export const PHeaderModal = styled.section`
    font-size: 1.1rem;
    padding: 7px 0 7px 0;
    @media screen and (max-width:930px) {
        font-size: 1rem;
    }
`

export const labelClient = styled.label`
display: flex; 
width: 100%; 
align-items: flex-end; 
justify-content: space-around;
@media screen and (max-width:930px) {
        width:100%;
    }
`

export const DivModalButtons = styled.div`
    padding-top: 2rem;
    display: flex;
    justify-content: space-evenly;
`

export const InputModal = styled.input`
    border: 1px solid silver;
    border-radius: 5px;
`
export const ButtonSellEnded = styled.label`
    color: var(--Green);
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

export const LabelDeliveryIconsModal = styled.div <DarkModeProps>`
    cursor:pointer;
    display:flex;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
    height: 50px;
   
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
    .deliveryIcon{
	-webkit-animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
    @-webkit-keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(1000px);
            transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(1000px);
            transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
}

    @media screen and (max-width:930px) {
        flex-wrap: wrap;
    }
`
export const ButtonPrint = styled.button`
    background-color: #007fff;
    border-radius: 13px;
    font-size:18px;
    width:9rem;
     min-width: max-content;
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