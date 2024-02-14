import styled from "styled-components";

interface DarkModeProps {
    isDarkMode: Boolean;
}
interface BoxProps {
    widthBox: string;
    isDarkMode: Boolean;
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
    //flex-wrap: wrap;
    min-width: 300px;
    //min-width: min-content;
    height: min-content;
    background: ${props=>props.isDarkMode ? 'var(--backgroundDarkMode)' : '#fff'};
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    margin-bottom: 40px;
    @media screen and (max-width:599px) {
        min-width: 90%;
    }
`
export const HeaderBox = styled.div `
    padding:15px 10px 15px 30px ; 
    border-bottom: 1px solid #eaecf0;
    width: 100%;
    font-size:0.9rem;
    display: flex;
    
    flex-direction: column;
`

export const LabelTopHeader= styled.div `
    display: flex;
    justify-content: space-between;
`
export const labelPeriod = styled.div `
    color: var(--AppBar);
    font-size: 0.65rem;
`



export const LabelsubHeader = styled.label `
    color: #abaac7;
    font-size: 0.7rem;
`