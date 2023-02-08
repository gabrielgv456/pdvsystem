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
    /* min-width: min-content; */
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
    @media screen and (max-width:930px) {
        font-size: 0.7rem;
        padding:5px;
    }
   
`

export const LabelNumber = styled.label `
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color:#5fcd0e;
    width: 15%;
    color:#485059;
    @media screen and (max-width:930px) {
        display: none;
    }
    
`

export const LabelMail= styled.label `
    display: flex;
    color:#5fcd0e;
    width: 20%;
    /* min-width:20%; */
    color:#485059;
    @media screen and (max-width:930px) {
       display: none;
    }
`
export const bMail= styled.b `
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;  
  
    /* min-width:100%;  */
`

export const LabelCpf = styled.label <DarkModeProps>`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width:15%;
    color: ${props => (props.isDarkMode ? '#485059' : '#3c454e')};
`

export const LabelNameClient = styled.label <DarkModeProps>`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 25%;
    color: ${props => (props.isDarkMode ? '#485059' : '#3c454e')};
    
`


export const ButtonEdit= styled.button `
    text-decoration: none;
    background: none;
    border:none;
    color:gold;
    width:min-content;
`
export const ButtonInfo = styled.button `
    text-decoration: none;
    color:var(--Blue);
    background: none;
    border:none;
    display: flex;
    justify-content: center;
    /* min-width: min-content; */
    width:min-content;
`

export const ButtonTrash = styled.button `
    text-decoration: none;
    color:red;
    background: none;
    border:none;
    display: flex;
    justify-content: center;
    /* min-width: min-content; */
    width:min-content;
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


