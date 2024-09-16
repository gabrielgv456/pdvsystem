import styled from "styled-components";

interface DarkModeProps {
    isDarkMode: boolean
}

export const Header = styled.div`
    display: flex;
    justify-content:space-between;
    width: 100%;
    margin-bottom: 3%;
`

export const DivSearch = styled.div`
    display:flex;
    border:1px solid silver;
    border-radius:7px;
    width:40%;
    height:3.2rem;
    align-items:center;
    @media screen and (max-width:930px) {
        width: 50%;
    }
`

export const InputSearch = styled.input<DarkModeProps>`
    border: none;
    background: none;
    border-radius: 7px;
    width: 100%;
    height: 100%;
    outline: none;
    font-size: 1rem;
    color: ${props => props.isDarkMode ? '#fff' : '#000'};
`

export const ButtonEdit= styled.button `
    text-decoration: none;
    background: none;
    border:none;
    color:gold;
    width:min-content;
`