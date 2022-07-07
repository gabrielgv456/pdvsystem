import { PropaneSharp } from '@mui/icons-material';
import {darken} from 'polished'

import styled from "styled-components";

interface DarkModeProps {
    isDarkMode:boolean;
}
interface ButtonisOpenEntries{
    isOpenEntries: boolean;  
    isDarkMode:boolean;
    
}
interface ButtonisOpenExtractDetails {
    isOpenExtractDetails:boolean;
    isDarkMode:boolean; 
}
interface ButtonisOpenExits {
    isOpenExits: boolean;
    isDarkMode:boolean;
}

export const Container = styled.div<DarkModeProps> `
    font-family: 'Poppins', sans-serif;
    width: 100%;
    min-height: 82vh;
    border: 0px solid;
    color: ${props => (props.isDarkMode ? 'white' : '')};
  
`
export const Header = styled.div`
    margin: 0 auto;
    background-color: #fff;
    border-radius: 0 0 20px 20px;
    padding: 0.5rem 0 1rem 0;
    gap: 5px ;
    width: 60%;
    height: min-content;
    display:flex;
    justify-content: center;
    align-items: flex-end;
    margin-top: -23px;
    box-shadow: rgba(58, 53, 65, 0.1) 0px 2px 10px 0px;

`
export const SubHeader = styled.div `
    display: flex;
    width: 100%;
    height: min-content;
    justify-content:space-around;
    
    

`
export const BoxResume = styled.label <DarkModeProps>`
    display: flex;
    width:30% ;
    padding: 1rem;
    background-color: #fff;
    border-radius: 5px;
    background-color: ${props=>(props.isDarkMode? 'var(--backgroundDarkMode)' :'#fff' )};
    align-items: center;
    margin-bottom: 1rem;
    margin-top: 1.5rem;
    flex-wrap: wrap;
    box-shadow: rgba(58, 53, 65, 0.1) 0px 2px 10px 0px;
    
    
`

export const SectionValuesBoxResume = styled.section `
    font-size: 2rem;
    
    @media screen and (max-width: 930px) {
        font-size: 0.9rem;
    }
`
export const labelBoxResume = styled.label `
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    @media screen and (max-width: 930px) {
        font-size: 0.8rem;
    }

`
export const labelBoxResume2 = styled.label `
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: flex-end;

`
export const Box = styled.div `
width: 40%;
height: min-content;
padding: 10px;
border-radius: 5px;
`
    
export const Input = styled.input <DarkModeProps> `
    background-color: ${props=>(props.isDarkMode ? 'var(--backgroundInputDarkMode)':'')};
    border: solid silver ${props=>(props.isDarkMode ? '0px' : '1px')};
    color: ${props=>(props.isDarkMode ? '#fff' : '')};
    border-radius: 5px;
    width: 100%;
    height:1.8rem;

`
export const Button = styled.button `

font-family: 'Poppins', sans-serif;
    width: min-content;
    height:1.8rem;
    background: var(--Green);
    color: #fff;
    padding: 5px 18px 5px 18px;
    background-color: #34cc96;
    border-radius: 5px;
    margin-bottom: 10px;
    font-size: 0.9rem;
    align-items: center;
    display: flex;
    border:none;
    transition: background-color 0.2s;
    &:hover{
        background-color: ${darken(0.02,'#34cc96')}
    }
`
export const Main = styled.div <DarkModeProps>`
background-color:${props => (props.isDarkMode ? 'var(--backgroundDarkMode)' : 'var(--background);')};
//box-shadow: ${props => (props.isDarkMode ? '' : '0px 0px 5px #CCC')}; 
border: ${props => (props.isDarkMode ? '1px solid gray' : '')}; 
border-radius: 10px;
padding:10px 20px 10px 20px;
width:100%;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
box-shadow: rgba(58, 53, 65, 0.1) 0px 2px 10px 0px;

`

export const DivExtract = styled.div `
    display: flex;
    align-items: center;
    flex-direction: column;
    width:60%;
    @media screen and (max-width: 550px) {
        width: 100%;
    }
`
export const DivTitleExtract = styled.div <DarkModeProps>`
    min-width: min-content;
    background-color:${props => (props.isDarkMode ? 'var(--backgroundDarkMode2)' : '#f4f6f8')};
    //border: ${props => (props.isDarkMode ? '1px solid gray' : '1px solid silver')}; 
    border-radius: 10px;
    color: #67636d;
    padding:10px;
    width:90%;
    display: flex;
    align-items: center;
    justify-content: space-between; 
    font-size: 0.85rem;
    box-shadow: rgba(58, 53, 65, 0.1) 0px 1px 2px 0px;
`
export const DivFooterExtract = styled.div <DarkModeProps>`
    background-color:${props => (props.isDarkMode ? 'var(--backgroundDarkMode2)' : '#f4f6f8')};
    width: 90%;
    padding:20px;
    border-radius: 0px 0px 20px 20px;
    display:flex;
    justify-content: space-between;

`
export const DivAlterPage = styled.div `
    min-width: max-content;
    width: 30%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`
export const DivOptions = styled.div <DarkModeProps>`
    flex-wrap: wrap;
    margin: 40px 0 40px 0;
    width: 40%;
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: center;
    border-right: ${(props)=>(props.isDarkMode ? '1px solid #48454a' : '1px solid #e0e3e6 ')};
    @media screen and (max-width: 550px) {
        width: 100%;
        border-right: none;
    }
`
export const ButtonEntries = styled.button  <ButtonisOpenEntries>`
    flex-wrap: wrap;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap:10px;
    width: 80%;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.8rem;
    border: 1px solid var(--Blue);
    border-radius: 5px;
    padding: 0.8rem;
    background-color: ${(props) => (
        props.isDarkMode === true && props.isOpenEntries === false  ? 'var(--backgroundDarkMode)' : 
        props.isDarkMode === false && props.isOpenEntries === true  ? 'var(--Blue)' :
        props.isOpenEntries && props.isDarkMode ? 'var(--Blue)':
        
        '#fff'
        
        ) };
    color: ${(props) => (
            props.isDarkMode === true && props.isOpenEntries === false  ? '#fff' : 
            props.isDarkMode === false && props.isOpenEntries === true  ? '#fff' :
            props.isDarkMode && props.isOpenEntries  ? '#fff':
            
            '#444444'
        ) };
    &:hover{
        background-color: ${(props) => (
        props.isDarkMode === true && props.isOpenEntries === false  ? 'var(--backgroundDarkMode2)' : 
        props.isDarkMode === false && props.isOpenEntries === true  ? '#578dff' : 
        props.isDarkMode &&  props.isOpenEntries ? '#578dff':
        
        '#e5eeff'
        ) };
    }
`

export const ButtonExits = styled.button  <ButtonisOpenExits>`
    flex-wrap: wrap;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap:10px;
    width: 80%;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.8rem;
    border: 1px solid var(--Blue);
    border-radius: 5px;
    padding: 0.8rem;
    background-color: ${(props) => (
        props.isDarkMode === true && props.isOpenExits === false  ? 'var(--backgroundDarkMode)' : 
        props.isDarkMode === false && props.isOpenExits === true  ? 'var(--Blue)' :
        props.isOpenExits && props.isDarkMode ? 'var(--Blue)':
        
        '#fff'
        
        ) };
    color: ${(props) => (
            props.isDarkMode === true && props.isOpenExits === false  ? '#fff' : 
            props.isDarkMode === false && props.isOpenExits === true  ? '#fff' :
            props.isDarkMode && props.isOpenExits  ? '#fff':
            
            '#444444'
        ) };
    &:hover{
        background-color: ${(props) => (
        props.isDarkMode === true && props.isOpenExits === false  ? 'var(--backgroundDarkMode2)' : 
        props.isDarkMode === false && props.isOpenExits === true  ? '#578dff' : 
        props.isDarkMode &&  props.isOpenExits ? '#578dff':
        
        '#e5eeff'
        ) };
    }
`
export const ButtonExtract = styled.button  <ButtonisOpenExtractDetails> `
    flex-wrap: wrap;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap:10px;
    width: 80%;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.8rem;
    border: 1px solid var(--Blue);
    border-radius: 5px;
    padding: 0.8rem;
    background-color: ${(props) => (
        props.isDarkMode === true && props.isOpenExtractDetails === false  ? 'var(--backgroundDarkMode)' : 
        props.isDarkMode === false && props.isOpenExtractDetails === true  ? 'var(--Blue)' :
        props.isOpenExtractDetails && props.isDarkMode ? 'var(--Blue)':
        
        '#fff'
        
        ) };
    color: ${(props) => (
            props.isDarkMode === true && props.isOpenExtractDetails === false  ? '#fff' : 
            props.isDarkMode === false && props.isOpenExtractDetails === true  ? '#fff' :
            props.isDarkMode && props.isOpenExtractDetails  ? '#fff':
            
            '#444444'
        ) };
    &:hover{
        background-color: ${(props) => (
        props.isDarkMode === true && props.isOpenExtractDetails === false  ? 'var(--backgroundDarkMode2)' : 
        props.isDarkMode === false && props.isOpenExtractDetails === true  ? '#578dff' : 
        props.isDarkMode &&  props.isOpenExtractDetails ? '#578dff':
        
        '#e5eeff'
        ) };
    }
`



export const DivExits = styled.div `
    width: 100%;
    padding: 0 10% 0 10% ;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:10px;
    & .TextField{
        width: 80%;
    }
`

export const ButtonAddExit = styled.button `
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    background-color: #d5181e;
    color: #fff;
    border:none;
    &:hover{
        background-color: ${darken(0.04,'#d5181e')}}
`

export const ButtonAddEntry = styled.button `
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    background-color: #00ab55;
    color: #fff;
    border:none;
    &:hover{
        background-color: ${darken(0.04,'#00ab55')}}

`