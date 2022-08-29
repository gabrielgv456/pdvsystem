import styled from "styled-components";
import { darken } from 'polished'

interface DarkModeProps {
    isDarkMode:boolean;
}
interface ActiveProps {
    isDarkMode:boolean;
    isClientActive:boolean;
}


export const Container = styled.div <ActiveProps>`
    text-decoration:${props => (props.isClientActive? '' : 'line-through' )} ;
    opacity: ${props => (props.isClientActive? '' : '0.6' )};
    min-width: min-content;
    padding:20px;
    width:100%;
    display: flex;
    align-items: center;
    justify-content: space-between; 
    font-size: 0.85rem;
    box-shadow: rgba(58, 53, 65, 0.1) 0px 1px 0px 0px;
    &:hover{
        background-color: ${props => (props.isDarkMode ? 'var(--backgroundDarkMode2)' : '#f7f7f8')};
    }
   
`

export const LabelNumber = styled.label `
    color:#5fcd0e;
    display: flex;
    width: 15%;
    color:#485059;
    min-width: min-content;
`

export const LabelMail= styled.label `
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color:#5fcd0e;
    max-width: 20%;
    min-width:20%;
    color:#485059;
    
`
export const LabelCpf = styled.label <DarkModeProps>`
    border-radius: 10px;
    padding: 5px;
    display: flex;
    width:15%;
    min-width: min-content;
    color: ${props => (props.isDarkMode ? '#485059' : '#3c454e')};
`

export const LabelNameClient = styled.label <DarkModeProps>`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 25%;
    max-width: 25%;
    color: ${props => (props.isDarkMode ? '#485059' : '#3c454e')};
    
`


export const ButtonEdit= styled.button `
    text-decoration: none;
    background: none;
    border:none;
    color:gold;
`
export const ButtonInfo = styled.button `
    text-decoration: none;
    color:var(--Blue);
    background: none;
    border:none;
    display: flex;
    justify-content: center;
    min-width: min-content;
    width:min-content;
`

export const ButtonTrash = styled.button `
    text-decoration: none;
    color:red;
    background: none;
    border:none;
    display: flex;
    justify-content: center;
    min-width: min-content;
    width:min-content;
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
export const DivDeleteClientModal = styled.div ` 
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
export const ButtonYesDeleteClientModal = styled.button `
    background:var(--Green);
    border:none;
    border-radius:5px;
    padding:10px 25px;
    color:#fff;
    &:hover{
        background: ${darken(0.02, '#33CC95')}
    }
`
export const ButtonNoDeleteClientModal = styled.button `
    background:none;
    border:none;
    border-radius:5px;
    padding:10px 25px;
    color:#7d888d;
    &:hover{
        background:#f0f0f0;
        
    }
`