import styled from "styled-components";
import { darken } from 'polished'

interface DarkModeProps {
    isDarkMode:Boolean;
}

export const Container = styled.div<DarkModeProps> `
    color: ${props => (props.isDarkMode ? 'white' : '')};
    font-family: 'Poppins', sans-serif;
    border-radius: 10px;
    width: 100%;
    min-height: calc(100vh - 64px);
    flex-wrap: wrap;
    box-shadow: rgba(58, 53, 65, 0.1) 0px 2px 10px 0px;
    border-radius: 8px 8px 0 0;
    background-color: ${props => (props.isDarkMode ? 'var(--backgroundDarkMode2)' : 'var(--backgroundsilver)')}; 
    padding: 24px;
`

export const Content = styled.div<DarkModeProps> `
    background-color:${props => (props.isDarkMode ? 'var(--backgroundDarkMode)' : 'var(--background);')};
    border-radius: 10px;
    padding: 20px;
    overflow: auto;
`
export const Header = styled.div`
    display: flex;
    justify-content:space-between;
    width: 100%;
    margin-bottom: 3%;
    @media screen and (max-width:930px) {
        flex-direction: column;
        gap:5px;
    }
`
export const LabelSearchClient = styled.label `
    display:flex;
    border:1px solid silver;
    border-radius:7px;
    width:40%;
    height:3.2rem;
    align-items:center;
    @media screen and (max-width:930px) {
       width: 100%;
    }
    
`
export const ButtonAddClient = styled.button <DarkModeProps> `
    //flex-wrap: wrap;
    display: flex;
    align-items: center;
    justify-content: center;
    gap:0.2rem;
    width: 30%;
    //min-width: max-content;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.8rem;
    border: 1px solid var(--Blue);
    border-radius: 5px;
    padding: 0.8rem;
    background-color: var(--Blue);
    color: #fff;
     
    &:hover{
        background-color: '#578dff';
    }
    @media screen and (max-width:930px) {
        min-width: 0;
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
export const TableClients = styled.table `
    width:100%;
`
export const THeadClients = styled.thead <DarkModeProps>`
    background-color:${props => (props.isDarkMode ? 'var(--backgroundDarkMode2)' : '#f4f6f8')};
    //border: ${props => (props.isDarkMode ? '1px solid gray' : '1px solid silver')}; 
    border-radius: 10px;
    color: #67636d;
    padding:10px;
    width:100%;
    font-size: 0.85rem;
    box-shadow: rgba(58, 53, 65, 0.1) 0px 1px 2px 0px;
      @media screen and (max-width:930px) {
        font-size: 0.7rem;
    }
`
export const TFootListClients = styled.tfoot <DarkModeProps>`
    background-color:${props => (props.isDarkMode ? 'var(--backgroundDarkMode2)' : '#f4f6f8')};
    width: 100%;
    height: 70px;
    border-radius: 0px 0px 20px 20px;;

`
export const DivAlterPage = styled.div `
    min-width: max-content;
    width: 25%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`
export const ButtonEdit= styled.button `
    text-decoration: none;
    background: none;
    border:none;
    color:gold;
    width:min-content;
`
export const ThNomeRazao = styled.th `
     overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
export const DivLengthAjust = styled.div`
    max-width: 50ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    @media screen and (max-width:930px) {
        max-width: 18ch;
    }
`

export const ThCelular = styled.th `
    @media screen and (max-width:930px) {
        display: none;
    }
    

`
export const ThEmail = styled.th `
    @media screen and (max-width:930px) {
        display: none;
    }
`




