import styled from "styled-components";

export const Label = styled.label `
    font-size:0.85rem;
    width:33%;
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (max-width:930px) {
        font-size: 0.7rem;
        width:40%
    }
`
export const InputModal = styled.input `
    
    height:1.1rem;
    width:5.5rem;
    outline: none;
    border:none;
    border-radius: 0px 3px 3px 0px;
    border-bottom: 1px solid #fff;
    background: #fff;
`

export const DivPaymentMethods = styled.div `
    padding: 5px;
    width: 100%;
    color: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
	margin-top:3px;
    box-shadow: rgba(58, 53, 65, 0.1) 0px 2px 10px 0px;
    

`
export const ButtonDelete = styled.button `
    text-decoration: none;
    border: none;
    background: none;
`