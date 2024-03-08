import styled from "styled-components";

interface DarkModeProps {
    isDarkMode: Boolean;
}

export const Div = styled.div<DarkModeProps> `
    background-color:  ${props => (props.isDarkMode ? 'var(--backgroundDarkMode)' : 'var(--background);')};
    color: ${props => (props.isDarkMode ? 'white' : 'rgb(54, 65, 82);')};
    transition: width 0.5s ease;
    .ListItem,
    .SelectedItem {
    padding-top: 12px;
    padding-bottom: 12px;
    border-radius: 12px;
    margin: 5px 5px;
    max-width: 92%;
    -webkit-animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    @-webkit-keyframes slide-in-left {
        0% {
            -webkit-transform: translateX(-1000px);
                    transform: translateX(-1000px);
            opacity: 0;
        }
        100% {
            -webkit-transform: translateX(0);
                    transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slide-in-left {
        0% {
            -webkit-transform: translateX(-1000px);
                    transform: translateX(-1000px);
            opacity: 0;
        }
        100% {
            -webkit-transform: translateX(0);
                    transform: translateX(0);
            opacity: 1;
        }
    }
    &:hover {
        background-color: ${props => (props.isDarkMode ? 'var(--backgroundDarkMode2)' : 'rgb(237, 231, 246)')};
        color: rgb(94, 53, 177);
    }
    }

    .SelectedItem {
    background-color: ${props => (props.isDarkMode ? 'var(--backgroundDarkMode2)' : 'rgb(237, 231, 246)')};
    color: rgb(94, 53, 177);
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

    background-color:${props => (props.isDarkMode ? '#1e1f20' : 'rgb(237, 231, 246)')};
    border:none;
    height:120px;
    padding: 0;
    border-radius: 0px 7px 7px 0px;
    &:hover{
        //background-color:${props => (props.isDarkMode ? '#3a3a3e' : 'rgb(237, 231, 346)')} ;
        box-shadow: rgba(58, 53, 65, 0.1) 0px 2px 2px 0px;
    }
     @media screen and (max-width:600px) {
        display: none;
    }

`

export const DivCashierStatus = styled.div`
    background: var(--Green);
    width: max-content;
    border-radius: 5px;
    padding: 0.5rem;
    position:absolute;
    right:70px;
`

export const BNameLogo = styled.b <DarkModeProps>`
    font-size: 25px;
    color: ${props => (props.isDarkMode ? '#FFF' : '')}
`