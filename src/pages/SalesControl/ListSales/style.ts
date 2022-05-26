import styled from "styled-components";

interface DarkModeProps {
    isDarkMode:Boolean;
}

export const Container = styled.div <DarkModeProps>`
    background-color:${props => (props.isDarkMode ? 'var(--backgroundDarkMode)' : 'var(--background);')};
    box-shadow: ${props => (props.isDarkMode ? '' : '0px 0px 5px #CCC')}; 
    border: ${props => (props.isDarkMode ? '1px solid gray' : '')}; 
    border-radius: 10px;
    padding:20px;
    margin: 0px 0 5px 0;
    width:100%;
    display: flex;
    justify-content: space-between; 
    gap:5px;
    @media screen and (max-width: 930px) {
        padding: 10px;
    }
`


export const ButtonEdit= styled.button `
    text-decoration: none;
    background: none;
    border:none;
    color:gold;
    cursor: pointer;
`

export const ButtonTrash = styled.button `
     text-decoration: none;
    background: none;
    border:none;
    color:red;
    cursor: pointer;
`
export const LabelItem = styled.label<DarkModeProps>`
    color: ${props => (props.isDarkMode ? 'white' : '')};
    width: 40%;
    max-width:40%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    @media screen and (max-width: 590px) {
    max-width:12ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    }
    @media screen and (max-width: 930px) {
    max-width:15ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    }
`
export const LabelValue = styled.label `
    width: 10%;
`
export const LabelDate = styled.label `
    width: 10%;
    min-width: min-content;
`
export const LabelQuantaty = styled.label `
    width: 10%;
`