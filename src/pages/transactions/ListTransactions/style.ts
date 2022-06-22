import styled from "styled-components";

interface DarkModeProps {
    isDarkMode:Boolean;
}

export const Container = styled.div <DarkModeProps>`
    min-width: min-content;
    background-color:${props => (props.isDarkMode ? 'var(--backgroundDarkMode)' : '#eaf9e0')};
    border: ${props => (props.isDarkMode ? '1px solid gray' : '')}; 
    border-radius: 20px;
    padding:5px;
    margin: 0px 0 4px 0;
    width:80%;
    display: flex;
    align-items: center;
    justify-content: space-between; 
    font-size: 0.85rem;
    box-shadow: rgba(58, 53, 65, 0.1) 0px 1px 2px 0px;

   
`

export const LabelDate = styled.label `
    color:#5fcd0e;
    display: flex;
    justify-content: center;
    width: 40%;
    min-width: min-content;
`
export const LabelValue = styled.label`
    color:#5fcd0e;
    display: flex;
    justify-content: center;
    width:30%;
    min-width: min-content;
`
export const LabelTypePayment = styled.label `
    display: flex;
    justify-content: center;
    width:30%;
    min-width: min-content;
`
