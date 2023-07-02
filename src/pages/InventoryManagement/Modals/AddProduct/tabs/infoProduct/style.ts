import styled from 'styled-components'

interface DarkModeProps {
    isDarkMode: boolean
}

export const ButtonAddProductModal = styled.button <DarkModeProps> `
    flex-wrap: wrap;
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
export const DivModalAddProduct = styled.div `
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
    flex-wrap: wrap;
    margin: 0px 0 10px 0;
`