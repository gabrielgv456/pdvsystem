import styled from "styled-components";

interface DarkModeProps {
    isDarkMode: Boolean;
}
interface BoxProps {
    widthBox: string;
}

export const Container = styled.div<DarkModeProps> `
    width: 100%;
    min-height: 82vh;
    border: 0px solid;
    color: ${props => (props.isDarkMode ? 'white' : '')};
    .Box_Cashier{
        background: var(--Green);
        color: #fff;
    }
`
export const Box = styled.div<BoxProps> ` 
    box-shadow: rgba(58, 53, 65, 0.1) 0px 2px 10px 0px;
    display: flex;
    width: ${props => props.widthBox};
    //min-width: min-content;
    height: min-content;
    background: var(--background);
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    flex-direction:column;
`
export const HeaderBox = styled.div `
    padding:15px 30px 15px 30px ; 
    border-bottom: 1px solid #eaecf0;
    width: 100%;
    font-size:0.9rem;
    display: flex;
    flex-direction: column;
`

export const LabelsubHeader = styled.label `
    color: #abaac7;
    font-size: 0.7rem;
`