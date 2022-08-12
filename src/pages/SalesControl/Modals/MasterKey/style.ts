import styled from "styled-components"
import {darken} from "polished"

interface DarkModeProps {
    isDarkMode: boolean,
}

export const DivRestrictAcessModal = styled.div ` 
    width: 100%;
    display: flex;
    flex-direction: column;
`
export const ButtonRestrictAcessModal = styled.button `
    border:none;
    border-radius: 0px 5px 5px 0;
    background-color: var(--Blue);
    color: #fff;
    width: 50px;
    height:55px;
   
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