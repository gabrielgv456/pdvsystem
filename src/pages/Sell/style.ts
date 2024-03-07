import styled from "styled-components";
import { darken } from 'polished'


interface DarkModeProps {
    isDarkMode: boolean;
}
// interface NeedReturnCashProps {
//     needReturnCash: string;
// }



export const Container = styled.div<DarkModeProps> `
    font-family: 'Poppins', sans-serif;
    width: 100%;
    min-height: calc(100vh - 64px);
    border: 0px solid;
    color: ${props => (props.isDarkMode ? 'white' : '')};
    border-radius: 8px 8px 0 0;
    background-color: ${props => (props.isDarkMode ? 'var(--backgroundDarkMode2)' : 'var(--backgroundsilver)')}; 
    padding: 24px;
`
export const Header = styled.div<DarkModeProps>`
    gap: 5px ;
    width: 70%;
    height: min-content;
    display:flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-bottom: 2rem;
    background-color: ${props => (props.isDarkMode ?  'var(--backgroundDarkMode)': '#fff' )} ;
    border-radius: 0 0 20px 20px;
    box-shadow: rgba(58, 53, 65, 0.1) 0px 2px 10px 0px;
    padding: 1rem 0 1rem 0;
    margin-top: -23px;
    @media screen and (max-width:930px) {
        width:90%
    }
`


// export const Header = styled.div<DarkModeProps>`
//     margin: 0 auto;
   
//     padding: 0.5rem 0 1rem 0;
//     gap: 5px ;
//     width: 60%;
//     height: min-content;
//     display:flex;
//     justify-content: center;
//     align-items: flex-end;
//     margin-top: -23px;
    

// `

export const Main = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-around;
    @media screen and (max-width:599px) {
        flex-direction: column;
    }
`
export const Checkout = styled.div<DarkModeProps>`
    width: 45%;
    min-width: min-content;
    height: min-content;
    background-color:${props => (props.isDarkMode ? 'var(--backgroundDarkMode)' : 'var(--background);')};
    box-shadow: ${props => (props.isDarkMode ? '' : '0px 0px 5px #CCC')}; 
    border: ${props => (props.isDarkMode ? '1px solid gray' : '')}; 
    border-radius: 10px;
    font-size: 1.3rem;
    padding:20px;
    margin: 0 0 5px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between; 
    gap:5px;
    @media screen and (max-width:900px) {
        width: 100%;
        padding: 10px;
    }    
`
export const DivConfirmSell = styled.div`
    margin-top: 2rem;
    align-items: center;
    display:flex;
    flex-direction: column;
`
export const TotalValue = styled.span`
    padding-top:2rem;
    margin: 0 auto;
    font-size: 3.5rem;
    
`
export const LabelConfirm = styled.label`
cursor:pointer;

`

export const DivList = styled.div`
width: 45%;
@media screen and (max-width:900px) {
        width: 100%;
    }

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
    width: 70%;
    height: min-content;
    padding: 10 10 0 10;
`
export const Button = styled.button`
    color: var(--Green);
    text-decoration: none;
    border: none;
    background: none;
    &:hover{
        color: ${darken(0.02, '#34cc96')}
    }
`

