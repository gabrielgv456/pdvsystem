import { darken } from 'polished'

import styled from "styled-components";

interface DarkModeProps {
    isDarkMode: Boolean;
}

export const Container = styled.div<DarkModeProps> `
    font-family: 'Poppins', sans-serif;
    width: 100%;
    min-height: calc(100vh - 64px);
    border: 0px solid;
    color: ${props => (props.isDarkMode ? 'white' : '')};
    border-radius: 8px 8px 0 0;
    background-color: ${props => (props.isDarkMode ? 'var(--backgroundDarkMode2)' : 'var(--backgroundsilver)')}; 
    padding: 24px;
  
`
export const SubHeader = styled.div`
    flex-wrap: wrap;
    display: flex;
    width: 100%;
    height: min-content;
    justify-content:space-around;
    
    

`

export const BoxResumeGroup = styled.div`
    display: flex;
    width: 50%;
    justify-content: space-around;
    flex-wrap: wrap;
    @media screen and (max-width:900px) {
        width: 100%;
  }
`
export const BoxResume = styled.label <DarkModeProps>`
    display: flex;
    width:45% ;
    padding: 1rem;
    background-color: #fff;
    border-radius: 5px;
    //background-color: ${props => (props.isDarkMode ? 'var(--backgroundDarkMode)' : '#fff')};
    background: ${(props) => (props.isDarkMode ? 'linear-gradient(315deg, #343537 0%, #343537 18%, var(--backgroundDarkMode) 10%, var(--backgroundDarkMode) 100%)' : 'linear-gradient(315deg, #f9f8f9 0%, #f9f8f9 18%, #fff 10%, #fff 100%)')};
    justify-content: space-around;
    align-items: center;
    margin-bottom: 1rem;
    margin-top: 1.5rem;
    flex-wrap: wrap;
    box-shadow: rgba(58, 53, 65, 0.1) 0px 2px 10px 0px;
    @media screen and (max-width: 930px) {
        font-size: 0.8rem;
        flex-direction: column;
        padding: 0.5rem;
       // min-width: 200px;
    }
    
`
export const SectionValuesBoxResume = styled.section`
    font-size: 2rem;
    display: flex;
    justify-content: center;
    @media screen and (max-width: 930px) {
        font-size: 1rem;
    }
`
export const Header = styled.div<DarkModeProps>`
    gap: 5px ;
    width: 70%;
    height: min-content;
    display:flex;
    justify-content: center;
    margin: 0 auto;
    margin-top:-23px;
    background-color: ${props => (props.isDarkMode ? 'var(--backgroundDarkMode)' : '#fff')} ;
    border-radius: 0 0 20px 20px;
    padding:0.5rem 0 1rem 0;
    box-shadow: rgba(58, 53, 65, 0.1) 0px 2px 10px 0px;
    max-width:max-content;
    @media screen and (max-width:930px) {
        width:90%
    }
`


export const Box = styled.div`
    width: 35%;
    height: min-content;
    padding: 10px;
    border-radius: 5px;
    @media screen and (max-width:930px) {
      padding:0;
      width:30%;  
    }
    
    `
export const DivSearch = styled.div`
    align-self: flex-end;
    align-items: flex-end;
    gap:50px;
    display: flex;
    width: max-content;
    height: min-content;
    padding: 10px;
    border-radius: 5px;
    @media screen and (max-width:930px){
        gap:0px;
        padding:0
    }
    `
export const Input = styled.input <DarkModeProps> `
    background-color: ${props => (props.isDarkMode ? 'var(--backgroundInputDarkMode)' : '')};
    border: solid silver ${props => (props.isDarkMode ? '0px' : '1px')};
    color: ${props => (props.isDarkMode ? '#fff' : '')};
    border-radius: 5px;
    width: 100%;
    height:1.8rem;

`
export const Button = styled.button`

font-family: 'Poppins', sans-serif;
    width: min-content;
    height: min-content;
    background: var(--Green);
    color: #fff;
    padding: 5px 18px 5px 18px;
    background-color: #34cc96;
    border-radius: 5px;
    font-size: 0.9rem;
    border:none;
    transition: background-color 0.2s;
    &:hover{
        background-color: ${darken(0.02, '#34cc96')}
    }
`
export const ButtonExcel = styled.button`

    width: min-content;
    height: min-content;
    background: #1f6e43;
    padding: 0.3rem;
    border-radius: 5px;
    font-size: 0.9rem;
    border:none;
    color:#fff;
    transition: background-color 0.2s;
    &:hover{
        background-color: ${darken(0.02, '#1f6e43')}
    }
`
export const ButtonPdf = styled.button`

    width: min-content;
    height: min-content;
    background: #ad0b00;
    padding: 0.3rem;
    border-radius: 5px;
    font-size: 0.9rem;
    border:none;
    color:#fff;
    transition: background-color 0.2s;
    &:hover{
        background-color: ${darken(0.02, '#ad0b00')}
    }
`
export const DivMenu = styled.div <DarkModeProps>`
    padding: 0 20px 0 20px;
    margin: 10px 0 2px 0px;
    width:100%;
    display: flex;
    justify-content: space-between; 
    color: gray;
    gap:5px;
`
export const DivMenuNotSells = styled.div <DarkModeProps>`
    padding: 10px 20px 0 20px;
    margin: 10px 0 2px 0px;
    width:100%;
    display: flex;
    justify-content: center; 
    color: gray;
    gap:5px;
`
export const LabelItem = styled.label<DarkModeProps>`
    color: gray;
    width: 25%;
    max-width:25%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    @media screen and (max-width: 590px) {
    max-width:12ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    }
    @media screen and (max-width: 930px) {
    max-width:15ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    }
`
export const LabelValue = styled.label`
    width: 10%;
`
export const LabelDate = styled.label`
    width: 10%;
    min-width: min-content;
`
export const LabelQuantaty = styled.label`
    width: 3%;
`
