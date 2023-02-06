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
    max-width: 380px;
    flex-wrap: wrap;
    box-shadow: rgba(58, 53, 65, 0.1) 0px 2px 10px 0px;
   
`
export const Header = styled.div`
    display: flex;
    justify-content:space-between;
    width: 100%;
    margin-bottom: 3%;
`
export const LabelSearchClient = styled.label `
    display:flex;
    border:1px solid silver;
    border-radius:7px;
    width:40%;
    height:3.2rem;
    align-items:center;
`
export const ButtonAddClient = styled.button <DarkModeProps> `
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


export const ButtonCloseModal = styled.button <DarkModeProps>`
    color: ${props => (props.isDarkMode ? '#fff' : '#000')};
    text-decoration: none;
    border: none;
    background: none;
    &:hover{
        color: ${darken(0.02, 'gray')}
    }
`
export const DivListClients = styled.div `
    display: flex;
    align-items: center;
    flex-direction: column;
    width:100%;
    @media screen and (max-width: 550px) {
        width: 100%;
    }
   
`
export const DivTitleListClients = styled.div <DarkModeProps>`
    min-width: min-content;
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
        font-size: 0.7rem;
    }
`
export const DivFooterListClients = styled.div <DarkModeProps>`
    background-color:${props => (props.isDarkMode ? 'var(--backgroundDarkMode2)' : '#f4f6f8')};
    width: 100%;
    padding:20px;
    border-radius: 0px 0px 20px 20px;
    display:flex;
    justify-content: space-between;

`
export const DivAlterPage = styled.div `
    min-width: max-content;
    width: 25%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`







