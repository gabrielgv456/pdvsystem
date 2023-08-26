import styled from "styled-components";
import { darken } from 'polished'

interface DarkModeProps {
    isDarkMode:Boolean;
}

export const Container = styled.div<DarkModeProps> `
    background-color:${props => (props.isDarkMode ? 'var(--backgroundDarkMode)' : 'var(--background);')};
    color: ${props => (props.isDarkMode ? 'white' : '')};
    font-family: 'Poppins', sans-serif;
    border-radius: 10px;
    width: 100%;
    min-height: 82vh;
    padding: 25px;
    box-shadow: rgba(58, 53, 65, 0.1) 0px 2px 10px 0px;
    box-sizing: border-box;
    @media screen and (max-width:930px) {
        padding: 10px;
    }

`
export const Header = styled.div`
    display: flex;
    justify-content:space-between;
    width: 100%;
    margin-bottom: 3%;
`
export const LabelSearchProduct = styled.label `
    display:flex;
    border:1px solid silver;
    border-radius:7px;
    width:40%;
    height:3.2rem;
    align-items:center;
    @media screen and (max-width:930px) {
        width: 50%;
    }
`
export const ButtonAddProduct = styled.button <DarkModeProps> `
    flex-wrap: wrap;
    display: flex;
    align-items: center;
    justify-content: center;
    gap:10px;
    width: 100%;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.8rem;
    border: 1px solid var(--Blue);
    border-radius: 5px;
    padding: 0.7rem;
    background-color: var(--Blue);
    color: #fff;
    &:hover{
        background-color: '#578dff';
    }
`

export const ButtonAddProductModal = styled.button <DarkModeProps> `
    flex-wrap: wrap;
    display: flex;
    align-items: center;
    justify-content: center;
    gap:10px;
    width: max-content;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.8rem;
    border:none;
    border-radius: 5px;
    padding: 0.7rem;
    background-color: var(--Green);
    color: #fff;
    &:hover{
        background-color: '#578dff';
    }
`
export const DivModalAddProduct = styled.div `
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
    margin: 30px 0 30px 0;
`
export const ButtonCloseModal = styled.button <DarkModeProps>`
    color: ${props => (props.isDarkMode ? '#fff' : '#000')};
    text-decoration: none;
    border: none;
    background: none;
    &:hover{
        color: ${darken(0.02, 'gray')}
    }
`
export const DivListProducts = styled.div `
    display: flex;
    align-items: center;
    flex-direction: column;
    width:100%;
    @media screen and (max-width: 550px) {
        width: 100%;
    }
`
export const DivTitleListProducts = styled.div <DarkModeProps>`
    //min-width: min-content;
    background-color:${props => (props.isDarkMode ? 'var(--backgroundDarkMode2)' : '#f4f6f8')};
    //border: ${props => (props.isDarkMode ? '1px solid gray' : '1px solid silver')}; 
    border-radius: 10px;
    color: #67636d;
    padding:10px;
    width:100%;
    display: flex;
    align-items: center;
    justify-content: space-between; 
    font-size: 0.85rem;
    box-shadow: rgba(58, 53, 65, 0.1) 0px 1px 2px 0px;
    @media screen and (max-width:930px) {
        padding: 5px;
         font-size: 0.7rem;
    }
    box-sizing: border-box;
`
export const DivFooterListProducts = styled.div <DarkModeProps>`
    background-color:${props => (props.isDarkMode ? 'var(--backgroundDarkMode2)' : '#f4f6f8')};
    width: 100%;
    padding:20px;
    border-radius: 0px 0px 20px 20px;
    display:flex;
    justify-content: space-between;

`
export const DivRightFooterProducts = styled.div `
 gap:5px;
 font-size: 0.85rem; 
 color: #67636d; 
 display: flex; 
 width: 47%; 
 justify-content: space-between; 
 min-width: max-content; 
 align-items: center;
@media screen and (max-width:930px) {
    font-size: 0.7rem;
}
`


export const DivAlterPage = styled.div `
    min-width: max-content;
    width: 10%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`
export const labelCriadoEm = styled.label `
    width:20%; 
    display:flex;
    @media screen and (max-width:930px) {
        display: none ;
    }
`
export const labelProduct = styled.label `
width:30%;
//display:flex;
@media screen and (max-width:930px){
        width: 15%;
    }
`
export const labelStatus = styled.label `
width:15%;
display:flex;
@media screen and (max-width:930px) {
    width:15%;
    }
`
export const labelQuantity = styled.label `
width:15%; 
display:flex;
justify-content:center;
@media screen and (max-width:930px){
        width: 5%;
    }
`
export const labelValue = styled.label `
width:10%; 
display:flex;
`
export const labelEdit = styled.label `
width:25px; 
//display:flex;
`
export const labelTrash = styled.label `
width:20px;
//display:flex
`

export const DivModalSucess = styled.div ` 
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .IconSucess{
        -webkit-animation: rotate-in-ver 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	    animation: rotate-in-ver 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
    @-webkit-keyframes rotate-in-ver {
  0% {
    -webkit-transform: rotateY(-360deg);
            transform: rotateY(-360deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateY(0deg);
            transform: rotateY(0deg);
    opacity: 1;
  }
}
@keyframes rotate-in-ver {
  0% {
    -webkit-transform: rotateY(-360deg);
            transform: rotateY(-360deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateY(0deg);
            transform: rotateY(0deg);
    opacity: 1;
  }
}
@keyframes tracking-in-expand-fwd {
  0% {
    letter-spacing: -0.5em;
    -webkit-transform: translateZ(-700px);
            transform: translateZ(-700px);
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
    opacity: 1;
  }
}

    `

export const ButtonAddSucessProductModal = styled.button `
    background:var(--Green);
    border:none;
    border-radius:5px;
    padding:10px 25px;
    color:#fff;
    &:hover{
        background: ${darken(0.02, '#33CC95')}
    }
`
export const ButtonExitSucessProductModal = styled.button `
    background:none;
    border:none;
    border-radius:5px;
    padding:10px 25px;
    color:#7d888d;
    &:hover{
        background:#f0f0f0;
        
    }
`





