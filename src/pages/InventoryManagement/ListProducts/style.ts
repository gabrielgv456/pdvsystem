import styled from "styled-components";
import { darken } from 'polished'

interface DarkModeProps {
    isDarkMode:boolean;
}
interface ActiveProps {
    isDarkMode:boolean;
    isProductActive:boolean;
}


export const TrContainer = styled.tr <ActiveProps>`
    text-decoration:${props => (props.isProductActive? '' : 'line-through' )} ;
    opacity: ${props => (props.isProductActive? '' : '0.6' )};
    height: 60px;
    width:100%;
    font-size: 0.85rem;
    box-shadow: rgba(58, 53, 65, 0.1) 0px 1px 0px 0px;
    &:hover{
        background-color: ${props => (props.isDarkMode ? 'var(--backgroundDarkMode2)' : '#f7f7f8')};
    }
   @media screen and (max-width:930px) {
        font-size: 0.7rem;
    }
`

export const TdDate = styled.td `
    color:#485059;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    @media screen and (max-width:930px) {
        display: none;
    }
`
export const SpanStatus = styled.span <DarkModeProps>`
    border-radius: 10px;
    padding: 11px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    @media screen and (max-width:930px) {
        font-size: 0.5rem;
        padding: 0.5rem;
    }
`
export const TdValue = styled.td <DarkModeProps> `
    color: ${props => (props.isDarkMode ? '#485059' : '#3c454e')};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    //min-width: max-content;
`

export const imgProduct = styled.img`
   width: 35px;
   height: 'auto';
   padding-right: 5;
   @media screen and (max-width:930px){
      width:18px;
   }
`

export const TdNameProduct = styled.td <DarkModeProps>`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width:40ch;
    color: ${props => (props.isDarkMode ? '#485059' : '#3c454e')};
    @media screen and (max-width:930px){
        max-width:20ch;
    }
    
`
export const TdQuantity = styled.td <DarkModeProps>`
    text-align: center;
    color: ${props => (props.isDarkMode ? '#485059' : '#3c454e')};
`

export const TdEdit= styled.td `
    text-decoration: none;
    background: none;
    border:none;
    color:gold;

`
export const TdInfo = styled.td `
    text-decoration: none;
    color:var(--Blue);
    background: none;
    border:none;
    text-align: center;
    //min-width: min-content;
    
    //max-width: 5%;
`

export const TdTrash = styled.td `
    text-decoration: none;
    color:red;
    background: none;
    border:none;
    min-width: min-content;
    width:min-content;
    text-align: center;
`

export const DivModalProduct = styled.div `
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
    margin: 30px 0 30px 0;
`

export const ButtonProductModal = styled.button <DarkModeProps> `
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
    transition: background-color 0.2s;
    &:hover{
        background-color:${darken(0.02,'#33CC95')}
    }
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

export const DivRestrictAcessModal = styled.div ` 
    width: 100%;
    display: flex;
    flex-direction: column;
`
export const ButtonRestrictAcessModal = styled.button `
    border:none;
    border-radius: 0px 5px 5px 0;
    background-color: var(--Blue);
    color: #fff;
    width: 50px;
    height:55px;
   
`
export const DivDeleteProductModal = styled.div ` 
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
export const ButtonYesDeleteProductModal = styled.button `
    background:var(--Green);
    border:none;
    border-radius:5px;
    padding:10px 25px;
    color:#fff;
    &:hover{
        background: ${darken(0.02, '#33CC95')}
    }
`
export const ButtonNoDeleteProductModal = styled.button `
    background:none;
    border:none;
    border-radius:5px;
    padding:10px 25px;
    color:#7d888d;
    &:hover{
        background:#f0f0f0;
        
    }
`