import styled from "styled-components";

interface DarkModeProps {
    isDarkMode:boolean
}

export const DivContainer = styled.div <DarkModeProps>`
    padding:10px;
    display:flex;
    justify-content:space-around;
    align-items:center;
    gap:5px;
    border-bottom: 1px solid #eaecf0;

    &:hover{
        background-color: ${props=>(props.isDarkMode? '' : '#fafafb')};
    }
`

