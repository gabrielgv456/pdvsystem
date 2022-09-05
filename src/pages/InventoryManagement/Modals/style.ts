import styled from "styled-components"
import {darken} from "polished"

interface DarkModeProps {
    isDarkMode: boolean;
}

export const DivFooter = styled.div <DarkModeProps>`
    width: 100%;
    padding:20px 0px 0px 0px;
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

export const ButtonCloseModal = styled.button <DarkModeProps>`
color: ${props => (props.isDarkMode ? '#fff' : '#000')};
text-decoration: none;
border: none;
background: none;
&:hover{
    color: ${darken(0.02, 'gray')}
}
`