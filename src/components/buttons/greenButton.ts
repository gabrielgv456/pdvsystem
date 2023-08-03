import styled from 'styled-components'
import {darken} from 'polished'

export const GreenButton = styled.button  `
    //display: flex;
    //align-items: center;
    //justify-content: center;
    //width: max-content;
    //font-family: Arial, Helvetica, sans-serif;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    border:none;
    min-width: max-content;
    border-radius: 5px;
    padding: 0.7rem;
    background-color: var(--Green);
    color: #fff;
    transition: background-color 0.2s;
    &:hover{
        background-color:${darken(0.02,'#33CC95')}
    }
`