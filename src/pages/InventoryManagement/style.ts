import styled from "styled-components";

interface DarkModeProps {
    isDarkMode:Boolean;
}

export const Container = styled.div<DarkModeProps> `
    background-color:  ${props => (props.isDarkMode ? 'var(--backgroundDarkMode2)' : 'var(--background);')};
    color: ${props => (props.isDarkMode ? 'white' : '')};
`
