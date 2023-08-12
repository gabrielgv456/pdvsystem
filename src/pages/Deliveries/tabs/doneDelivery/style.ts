import {darken} from 'polished'

import styled from "styled-components";

interface DarkModeProps {
    isDarkMode:boolean;
}

export const Container = styled.div<DarkModeProps> `
    font-family: 'Poppins', sans-serif;
    width: 100%;
    min-height: 82vh;
    border: 0px solid;
    color: ${props => (props.isDarkMode ? 'white' : '')};
  
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




