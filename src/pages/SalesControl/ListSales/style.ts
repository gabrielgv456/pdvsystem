import styled from "styled-components";

type DarkModeProps = {
    isDarkMode: Boolean;
}
type buttonProps = { color: string } & DarkModeProps

export const Container = styled.div <DarkModeProps>`

    width: 100%;
    border-radius: 5px;
    margin-bottom: 10px;
    font-family: sans-serif;
    box-shadow: rgba(58, 53, 65, 0.1) 0px 1px 2px 0px;
    background-color: ${props => props.isDarkMode ? 'var(--DarkMode)' : '#fff'};
`
// export const Container = styled.div <DarkModeProps>`
//     background-color:${props => (props.isDarkMode ? 'var(--backgroundDarkMode)' : 'var(--background);')};
//     box-shadow: ${props => (props.isDarkMode ? '' : '0px 0px 5px #CCC')}; 
//     border: ${props => (props.isDarkMode ? '1px solid gray' : '')}; 
//     border-radius: 10px;
//     padding:20px;
//     margin: 0px 0 5px 0;
//     width:100%;
//     display: flex;
//     align-items: center;
//     justify-content: space-between; 
//     gap:5px;
//     @media screen and (max-width: 930px) {
//         padding: 10px;
//         font-size: 0.9rem;
//     }
// `

export const span = styled.span <DarkModeProps>`
    border-right: ${props => props.isDarkMode ? '0.1px solid var(--backgroundDarkMode)' : '0.1px solid #e8e8e8'} ;
    border: ${props => props.isDarkMode ? '0.1px solid var(--backgroundDarkMode)' : ''};
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
`

export const bItem = styled.b <DarkModeProps> `
    background-color: ${props => props.isDarkMode ? 'var(--backgroundDarkMode)' : '#efefef'} ;
    border-radius: 1px;
    width:100%;
    display: flex;
    justify-content: center;
    padding: 5px;
    font-size: 0.8rem;
    @media screen and (max-width:930px) {
        padding: 4px;
    }
`
export const DivTitle = styled.div`
    width: 100%;
    border-bottom: 1px solid silver;
    box-sizing: border-box;
    padding: 10px 10px 5px 10px;
    background-color: var(--Blue);
    color:#fff;
    border-radius: 5px 5px 0px 0px;
`

export const DivTipo = styled.div`
    display: flex;
    align-items:flex-end;
    justify-content: space-between;
    font-size: 0.8rem;
    
`
export const DivContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
`

export const Button = styled.button <buttonProps>`
    text-decoration: none;
    background: none;
    border:none;
    color:${props => props.color};
     border-right: ${props => props.isDarkMode ? '0.1px solid var(--backgroundDarkMode)' : '0.1px solid #e8e8e8'} ;
    border: ${props => props.isDarkMode ? '0.1px solid var(--backgroundDarkMode)' : ''};
`

export const LabelItem = styled.label<DarkModeProps>`
    height: 100%;
    max-width:200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    align-items: center;
    font-size: 0.85rem;
`
export const DivListItens = styled.div<DarkModeProps> `
    
    display: flex;
    flex-direction: column;
    color: ${props => (props.isDarkMode ? 'white' : '')};

`
export const DivListQuantity = styled.div`
    display: flex;
    flex-direction: column;
    width: 3%;
`
export const LabelNameSeller = styled.label`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 15%;
    min-width: 15%;
`
export const LabelValue = styled.label`

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 10%;
    min-width: 10%;
`
export const LabelDate = styled.label`
    width: 10%;
    min-width: min-content;
`
export const LabelQuantaty = styled.label`
    font-size: 0.8rem;
`