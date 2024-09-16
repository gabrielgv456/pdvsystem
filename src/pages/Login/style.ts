import styled from "styled-components";
import {darken} from 'polished'
import background_login from '../../images/background_login.jpg'

interface isPasswordWrongWrongProps {
  isPasswordWrong:Boolean;
}
interface isEmailWrongProps {
  isEmailWrong:Boolean;
}

export const Container = styled.div `
    width:100%;
    height:100vh;
    display:flex;
    font-family: 'Poppins', sans-serif;
`
export const BoxLogin = styled.div `
    flex-grow:1;
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items:center;
    
    height:100vh;
    border-right: 1px solid silver;
    background-color: #fff;
    .icon_login{
        color: gray;
        padding-bottom: 15px;
        border-bottom: 1px solid silver;;

    }
    `
export const Div = styled.div `
    display:flex;
    align-items:flex-end;
`
export const SectionForgot = styled.section `
  display: flex;
  justify-content: flex-end;
  padding:10px;
  width:300px;
  font-size: 0.8rem;
  cursor: pointer;
  color: gray;
  &:hover{
    text-decoration: underline;
  }
`

export const InputMail = styled.input<isEmailWrongProps>`
    
    width:280px;
    height:28px;
    border: 0;
    border-bottom: 1px solid silver;
    outline:none;
    background-color:${props => (props.isEmailWrong ? `#ffd5d5` : `none`)};
    padding:10px;
    animation: ${props => (props.isEmailWrong ? 'treme 0.1s' : `none`)};
    animation-iteration-count: ${props => (props.isEmailWrong ? '3' : `none`)};; 
    @keyframes treme { 0% {margin-left: 0;} 25% {margin-left: 1px;} 50% {margin-left: 0;} 75% {margin-left: -1px;} 100% {margin-left: 0;} }
    &:focus{background-color: #f6f7f7;}
    & + input {margin-top:5px;}
`
export const InputPassword = styled.input<isPasswordWrongWrongProps>`
    
    width:280px;
    height:28px;
    border: 0;
    border-bottom: 1px solid silver;
    outline:none;
    background-color:${props => (props.isPasswordWrong ? '#ffd5d5' : `none`)};
    padding:10px;
    
    animation: ${props => (props.isPasswordWrong ? 'treme 0.1s' : `none`)};
    animation-iteration-count: ${props => (props.isPasswordWrong ? '3' : `none`)};; 
    @keyframes treme { 0% {margin-left: 0;} 25% {margin-left: 1px;} 50% {margin-left: 0;} 75% {margin-left: -1px;} 100% {margin-left: 0;} }


    &:focus{background-color: #f6f7f7;}
    & + input {margin-top:5px;}


    
`
export const H2 = styled.h2 `
    @-webkit-keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
@keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
	-webkit-animation: tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
	        animation: tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;

`

export const Button = styled.button `
    margin-top:15px;
    background-color: #7c04ac;
    border-radius: 13px;
    font-size:18px;
    width:100px;
    height:40px;
    //border:1px solid silver;
    border:none;
    cursor:pointer;
    color:#fff;
    padding:5px;
    transition: background-color 0.2s;
    &:hover{
        background-color: ${darken(0.02,'#7c04ac')}
    }
`

export const imgLogo = styled.img `
  width: auto;
  max-height: 75px;
  padding-bottom: 1rem;
`




export const BoxBackgroundLogin = styled.div `
    flex-grow:2;
    display:block;
    width:61%;
    height:100vh;
    background-position:bottom;
    background-size: cover;
    background-image:url(${background_login});
    @media screen and (max-width:600px){
      display:none;
    }
    
`
