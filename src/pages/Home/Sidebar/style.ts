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
    background:${props => (props.isDarkMode ? 'var(--backgroundDarkMode)' : 'var(--background);')};
    display:flex;
    width:100%;
    justify-content: center;
    align-items:center;
    position:absolute;
    bottom:0px;
`
