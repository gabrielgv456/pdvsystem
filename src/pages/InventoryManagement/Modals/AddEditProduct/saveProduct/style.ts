import styled from "styled-components"


interface DarkModeProps {
    isDarkMode: boolean
}


export const ButtonAddProductModal = styled.button <DarkModeProps> `
    display: flex;
    align-items: center;
    justify-content: center;
    gap:10px;
    width: max-content;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.8rem;
    border:none;
    border-radius: 5px;
    padding: 0.7rem;
    background-color: var(--Green);
    color: #fff;
    &:hover{
        background-color: '#578dff';
    }
`