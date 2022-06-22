import styled from "styled-components";

interface DarkModeProps {
    isDarkMode:Boolean;
}

export const Container = styled.div<DarkModeProps> `
    display: flex;
    width: 100%;
    min-height: 82vh;
    justify-content: space-around;
    align-items:center;
    border: 0px solid;
    color: ${props => (props.isDarkMode ? 'white' : '')};
    .Box_Cashier{
        background: var(--Green);
        color: #fff;
    }
`
export const Box = styled.div `
    box-shadow: rgba(58, 53, 65, 0.1) 0px 2px 10px 0px;
    display: flex;
    width: 15rem;
    height: 10rem;
    background: var(--background);
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    `