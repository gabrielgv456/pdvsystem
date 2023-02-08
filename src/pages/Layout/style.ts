import styled from "styled-components";

interface DarkModeProps {
    isDarkMode:Boolean;
}

export const Div = styled.div<DarkModeProps> `
    background-color:  ${props => (props.isDarkMode ? 'var(--backgroundDarkMode)' : 'var(--background);')};
    color: ${props => (props.isDarkMode ? 'white' : '')};
    .ListItemText{
        font-family: 'Poppins' !important;
    }
    .Icons{
        color: ${props => (props.isDarkMode ? 'var(--iconDarkMode)' : '')};
    }
    .ListItem{
        &:hover{
            background-color: ${props => (props.isDarkMode ? 'var(--backgroundDarkMode2)' : '')};
        }
    }
`

export const DivSwitch = styled.div<DarkModeProps> `
    //background:${props => (props.isDarkMode ? 'var(--backgroundDarkMode)' : 'var(--background);')};
    display:flex;
    width:100%;
    justify-content: center;
    align-items:center;
    position: absolute;
    bottom: 0;
   
    
`
export const ButtonRetract = styled.button <DarkModeProps>`

    background:none;
    border:${props => (props.isDarkMode ? '1px solid #2b2c2e' : '1px solid #e0e0e0')}; 
    background-color:${props => (props.isDarkMode ? '#1e1f20' :'#fff')};
    height:90px;
    padding: 0;
    border-radius: 0px 7px 7px 0px;
    &:hover{
        background-color:${props => (props.isDarkMode ? '#3a3a3e' :'#edf4fb')} ;
        box-shadow: rgba(58, 53, 65, 0.1) 0px 2px 30px 0px;
    }
     @media screen and (max-width:600px) {
        display: none;
    }

`

export const DivCashierStatus = styled.div `
    background: var(--Green);
    width: max-content;
    border-radius: 5px;
    padding: 0.5rem;
    position:absolute;
    right:70px;
`

export const BNameLogo = styled.b <DarkModeProps>`
    font-size: 28px;
    color: ${props=>(props.isDarkMode ? '#FFF' : '')}
`