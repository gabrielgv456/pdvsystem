import styled from "styled-components";

interface DarkModeProps{
    isDarkMode:boolean;
}

export const Container = styled.div<DarkModeProps> `
    color: ${props => (props.isDarkMode ? 'white' : '')};
    font-family: 'Poppins', sans-serif;
    width: 100%;
    min-height: calc(100vh - 64px);
    padding: 0px;
    box-shadow: rgba(58, 53, 65, 0.1) 0px 2px 10px 0px;
    box-sizing: border-box;
    border-radius: 8px 8px 0 0;
    background-color: ${props => (props.isDarkMode ? 'var(--backgroundDarkMode2)!important' : 'var(--backgroundsilver)!important;')}; 
    padding: 24px;

`

export const Content = styled.div<DarkModeProps> `
    background-color:${props => (props.isDarkMode ? 'var(--backgroundDarkMode)' : 'var(--background);')};
    border-radius: 10px;
`