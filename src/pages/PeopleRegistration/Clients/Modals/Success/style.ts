import styled from 'styled-components'
import {darken} from 'polished'

interface DarkModeProps {
    isDarkMode: boolean;
}

export const DivModalSucess = styled.div ` 
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .IconSucess{
        -webkit-animation: rotate-in-ver 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	    animation: rotate-in-ver 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
    @-webkit-keyframes rotate-in-ver {
  0% {
    -webkit-transform: rotateY(-360deg);
            transform: rotateY(-360deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateY(0deg);
            transform: rotateY(0deg);
    opacity: 1;
  }
}
@keyframes rotate-in-ver {
  0% {
    -webkit-transform: rotateY(-360deg);
            transform: rotateY(-360deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateY(0deg);
            transform: rotateY(0deg);
    opacity: 1;
  }
}
@keyframes tracking-in-expand-fwd {
  0% {
    letter-spacing: -0.5em;
    -webkit-transform: translateZ(-700px);
            transform: translateZ(-700px);
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
    opacity: 1;
  }
}

    `
export const ButtonCloseModal = styled.button <DarkModeProps>`
color: ${props => (props.isDarkMode ? '#fff' : '#000')};
text-decoration: none;
border: none;
background: none;
&:hover{
    color: ${darken(0.02, 'gray')}
}
`

export const ButtonExitSucessClientModal = styled.button `
    background:none;
    border:none;
    border-radius:5px;
    padding:10px 25px;
    color:#7d888d;
    &:hover{
        background:#f0f0f0;
        
    }
`

export const ButtonAddSucessClientModal = styled.button `
    background:var(--Green);
    border:none;
    border-radius:5px;
    padding:10px 25px;
    color:#fff;
    &:hover{
        background: ${darken(0.02, '#33CC95')}
    }
`
