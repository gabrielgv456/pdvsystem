import styled from "styled-components";
import {darken} from 'polished'

export const Container = styled.div `
width:100%;
height:100vh;
display:flex;
flex-direction:column;
justify-content: center;
align-items:center;
background-color: #f7f7f7;
font-family: 'Poppins', sans-serif;



    .p_title_notfound{
        font-size:35px;
        margin:0;
        margin-bottom:10px;
    }
    .p_redirect_notfound{
        font-size: 15px;
    }
`
   

export const Button = styled.button `
    background-color: #34cc96;
    border-radius: 13px;
    font-size:18px;
    width:200px;
    height:40px;
    //border:1px solid silver;
    border:none;
    cursor:pointer;
    color:#fff;
    padding:5px;
    transition: background-color 0.2s;
    &:hover{
        background-color: ${darken(0.02,'#34cc96')}
    }
   
`






