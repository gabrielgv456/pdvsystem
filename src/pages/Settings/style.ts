import styled from "styled-components";

interface DarkModeProps{
    isDarkMode:boolean;
}

export const Container = styled.div<DarkModeProps> `
    background-color:${props => (props.isDarkMode ? 'var(--backgroundDarkMode)' : 'var(--background);')};
    color: ${props => (props.isDarkMode ? 'white' : '')};
    font-family: 'Poppins', sans-serif;
    border-radius: 10px;
    width: 100%;
    min-height: 82vh;
    padding: 25px;
    box-shadow: rgba(58, 53, 65, 0.1) 0px 2px 10px 0px;
    box-sizing: border-box;
    @media screen and (max-width:930px) {
        padding: 10px;
    }

`