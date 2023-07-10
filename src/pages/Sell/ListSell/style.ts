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
    margin: 0 0 5px 0;
    width:100%;
    display: flex;
    justify-content: space-between; 
    gap:5px;
    @media screen and (max-width: 930px) {
        padding: 10px;
    }
    -webkit-animation: tilt-in-top-1 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
animation: tilt-in-top-1 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
@-webkit-keyframes tilt-in-top-1 {
  0% {
    -webkit-transform: rotateY(30deg) translateY(-300px) skewY(-30deg);
            transform: rotateY(30deg) translateY(-300px) skewY(-30deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateY(0deg) translateY(0) skewY(0deg);
            transform: rotateY(0deg) translateY(0) skewY(0deg);
    opacity: 1;
  }
}
@keyframes tilt-in-top-1 {
  0% {
    -webkit-transform: rotateY(30deg) translateY(-300px) skewY(-30deg);
            transform: rotateY(30deg) translateY(-300px) skewY(-30deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateY(0deg) translateY(0) skewY(0deg);
            transform: rotateY(0deg) translateY(0) skewY(0deg);
    opacity: 1;
  }
}

`

export const DivButtonsAddRemove = styled.div `
display: flex;
width: 48px;
align-items: flex-start;

`
export const ButtonRemove= styled.button `
    text-decoration: none;
    background: none;
    border:none;
    color:gold;
    padding: 0;
`
export const ButtonAdd= styled.button `
    text-decoration: none;
    background: none;
    border:none;
    color:var(--Green);
    padding: 0;
`
export const ButtonTrash = styled.button `
     text-decoration: none;
    background: none;
    border:none;
    color:red;
`
export const LabelItem = styled.label<DarkModeProps>`
    color: ${props => (props.isDarkMode ? 'white' : '')};
    width: 45%;
    max-width:45%;
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
    width: 20%;
`

export const LabelQuantaty = styled.section `
    width: 10%;
    min-width: min-content;
    margin-right: 0.3rem;

`