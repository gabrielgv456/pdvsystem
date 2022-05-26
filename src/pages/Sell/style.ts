import styled from "styled-components";

interface DarkModeProps {
    isDarkMode:Boolean;
}

export const Container = styled.div<DarkModeProps> `
    font-family: 'Poppins', sans-serif;
    width: 100%;
    min-height: 82vh;
    border: 0px solid;
    color: ${props => (props.isDarkMode ? 'white' : '')};
`
export const Header = styled.div`
    gap: 5px ;
    width: 100%;
    height: min-content;
    display:flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5rem;
`
export const Main = styled.div`
    display: flex;
    width: 100%;
   
    justify-content: space-around;
`
export const Checkout = styled.div`
 width: 40%;
 background-color: red;
 height: min-content;
`
export const DivList = styled.div`
width: 40%;

`

export const Label = styled.label`
    width: min-content;
`
export const Input = styled.input`
    width: 100%;
    border-radius: 5px;
    border: 1px solid silver;
    height:2rem;

`
export const Box = styled.div`
    width: 45%;
    height: min-content;
    padding: 10 10 0 10;
`
export const Button = styled.button `
    color: var(--Green);
    text-decoration: none;
    border: none;
    background: none;
`