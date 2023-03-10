import styled from "styled-components";

interface DarkModeProps {
    isDarkMode:boolean;
}
interface ActiveProps {
    isDarkMode:boolean;
    isSellerActive:boolean;
}


export const Container = styled.div <ActiveProps>`
    text-decoration:${props => (props.isSellerActive? '' : 'line-through' )} ;
    opacity: ${props => (props.isSellerActive? '' : '0.6' )};
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
    @media screen and (max-width:930px) {
        font-size: 0.7rem;
        padding:5px;
    }
   
`

export const LabelEmail = styled.label <DarkModeProps> `
    color: ${props => (props.isDarkMode ? '#485059' : '#3c454e')};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width:20%;
    @media screen and (max-width:930px){
        display: none;
    }
`
export const LabelCpf = styled.label <DarkModeProps>`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 5px;
    color: ${props => (props.isDarkMode ? '#485059' : '#3c454e')};
    width:15%;
    
`
export const LabelPhone = styled.label <DarkModeProps> `
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${props => (props.isDarkMode ? '#485059' : '#3c454e')};
    width:15%;
    @media screen and (max-width:930px) {
        display: none;
    }
    
    
`
export const LabelNameSeller = styled.label <DarkModeProps>`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${props => (props.isDarkMode ? '#485059' : '#3c454e')};
    width:25%;
    @media screen and (max-width:930px){
        width:20%;
    }
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



