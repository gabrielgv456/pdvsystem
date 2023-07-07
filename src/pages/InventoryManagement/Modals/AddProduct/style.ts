import styled from "styled-components";
import { darken } from "polished";

interface DarkModeProps{
    isDarkMode:boolean
}



export const ButtonCloseModal = styled.button <DarkModeProps>`
    color: ${props => (props.isDarkMode ? '#fff' : '#000')};
    text-decoration: none;
    border: none;
    background: none;
    &:hover{
        color: ${darken(0.02, 'gray')}
    }
`