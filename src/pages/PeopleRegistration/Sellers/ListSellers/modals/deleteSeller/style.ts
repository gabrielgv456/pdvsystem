import styled from "styled-components"
import {darken} from "polished"

interface DarkModeProps {
    isDarkMode: boolean;
}

export const DivDeleteSellerModal = styled.div ` 
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    `

export const ButtonYesDeleteSellerModal = styled.button `
    background:var(--Green);
    border:none;
    border-radius:5px;
    padding:10px 25px;
    color:#fff;
    &:hover{
        background: ${darken(0.02, '#33CC95')}
    }
`


export const ButtonNoDeleteSellerModal = styled.button `
    background:none;
    border:none;
    border-radius:5px;
    padding:10px 25px;
    color:#7d888d;
    &:hover{
        background:#f0f0f0;
        
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
