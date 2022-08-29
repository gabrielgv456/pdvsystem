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
    align-items: center;
    justify-content: space-between; 
    gap:5px;
    @media screen and (max-width: 930px) {
        padding: 10px;
        font-size: 0.9rem;
    }
`

export const ButtonPrint= styled.button `
    text-decoration: none;
    background: none;
    border:none;
    color:#007fff;
`
export const ButtonEdit= styled.button `
    text-decoration: none;
    background: none;
    border:none;
    color:gold;
`

export const ButtonTrash = styled.button `
     text-decoration: none;
    background: none;
    border:none;
    color:red;
    cursor: pointer;
`
export const LabelItem = styled.label<DarkModeProps>`
    font-size: 0.85rem;
`
export const DivListItens = styled.div<DarkModeProps> `
    
    display: flex;
    flex-direction: column;
    color: ${props => (props.isDarkMode ? 'white' : '')};
    width: 25%;
    max-width:25%;
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
export const DivListQuantity = styled.div `
    display: flex;
    flex-direction: column;
    width: 3%;
`
export const LabelNameSeller = styled.label `
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 15%;
    min-width: 15%;
`
export const LabelValue= styled.label `

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 10%;
    min-width: 10%;
`
export const LabelDate = styled.label `
    width: 10%;
    min-width: min-content;
`
export const LabelQuantaty = styled.label `
    font-size: 0.8rem;
`