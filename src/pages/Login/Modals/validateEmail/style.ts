import styled from "styled-components";
import { darken } from 'polished'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap:2rem;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 1.1rem;
    font-family: 'Poppins',sans-serif;
    border:none;
    outline: none;
`
export const LabelMail = styled.div `
    display: flex;
    gap:10px;
    align-items: center; 
`
export const LabelForgot = styled.div `
    display: flex;
    gap:10px;
    align-items: center; 
    justify-content: center;
    width: 100%;
`
export const LabelTip = styled.div `
    font-size:0.75rem;
    display: flex;
    justify-content: center;
    gap:5px;
`
export const Input = styled.input`
    border-radius: 5px;
    border: none;
    height: 2.5rem;
    text-align: center;
    font-size: 1rem;
    letter-spacing: 10px;
`
export const InputPass = styled.input`
    border-radius: 5px;
    border: none;
    height: 2.5rem;
    text-align: center;
    width: 60%;
    font-size: 1rem;
`
export const DivForgot = styled.div `
width: 100%;
    display: flex;
    flex-direction: column;
    gap:5px
`
export const ButtonClose = styled.button`
    background-color: #fff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    position: absolute;
    color: gray;
    top:-10px;
    right:-8px;
    font-size: 0.9rem;
    border: 1px solid var(--AppBar);
    &:hover{
        background-color:  ${darken(0.02, `#fff`)};
        color: #000;
    }
`
export const ButtonConfirm = styled.button`
    background-color: var(--Green);
    border-radius: 5px;
    color: #fff;
    padding: 0.7rem;
    font-size: 1rem;
    border:none;
    width: max-content;
    &:hover{
        background-color: ${darken(0.02, `#33CC95`)}
    }
`
export const labelSucess = styled.label `
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:8px;
    .btnSuccess{
	-webkit-animation: rotate-in-hor 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: rotate-in-hor 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
    @-webkit-keyframes rotate-in-hor {
    0% {
        -webkit-transform: rotateX(360deg);
                transform: rotateX(360deg);
        opacity: 0;
    }
    100% {
        -webkit-transform: rotateX(0deg);
                transform: rotateX(0deg);
        opacity: 1;
    }
    }
    @keyframes rotate-in-hor {
    0% {
        -webkit-transform: rotateX(360deg);
                transform: rotateX(360deg);
        opacity: 0;
    }
    100% {
        -webkit-transform: rotateX(0deg);
                transform: rotateX(0deg);
        opacity: 1;
    }
}

`