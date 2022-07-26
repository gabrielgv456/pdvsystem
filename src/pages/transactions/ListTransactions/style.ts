import styled from "styled-components";
import { darken } from 'polished'

interface DarkModeProps {
    isDarkMode:boolean;
}
interface EyeProps {
    isEyeOpen:boolean;
}
interface TypeTransactionProps {
    isDarkMode:boolean;
    typeTransction: string;
}


export const Container = styled.div <DarkModeProps>`
    min-width: min-content;
    padding:10px;
    width:90%;
    display: flex;
    align-items: center;
    justify-content: space-between; 
    font-size: 0.85rem;
    box-shadow: rgba(58, 53, 65, 0.1) 0px 1px 0px 0px;
    &:hover{
        background-color: ${props => (props.isDarkMode ? 'var(--backgroundDarkMode2)' : '#f7f7f8')};
    }
   
`

export const LabelDate = styled.label `
    color:#5fcd0e;
    display: flex;
    justify-content: center;
    width: 30%;
    color:#485059;
    min-width: min-content;
`
export const LabelValue = styled.label <TypeTransactionProps>`
    background-color:${props => (
        props.isDarkMode ? 'var(--backgroundDarkMode)' : 
        props.typeTransction === 'exit' ? '#ffe2e1' : '#eaf9e0'
        )};
    border-radius: 10px;
    padding: 5px;
    color: ${props => (props.typeTransction === 'exit' ?  '#b82338' : '#4daf42' )} ;
    display: flex;
    justify-content: center;
    width:20%;
    min-width: min-content;
`
export const LabelTypePayment = styled.label <DarkModeProps> `
    background-color:${props => (props.isDarkMode ? 'var(--backgroundDarkMode)' : '#eaf9e0')};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items:center;
    width:50px;
    height: 50px;
    min-width: min-content;
    min-height: min-content;
`
export const ButtonDescription = styled.button <EyeProps>`
    background: none;
    border:none;
    display: flex;
    justify-content: center;
    min-width: min-content;
    width:10%;
    .RiEyeCloseLine{
        color:#5cbcb1;
        display: ${(props)=>(props.isEyeOpen ? 'none' : '')}
    }
    .RiEyeLine{
        color:#5cbcb1;
        display:${(props)=>(props.isEyeOpen ? '' : 'none')}
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