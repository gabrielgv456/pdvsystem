import styled from 'styled-components'
import {darken} from 'polished'

interface selectedColorProps {
    selectedColor: '--Green'|'--Blue'|'--Red'
} 

export const DefaultButton = styled.button <selectedColorProps>  `
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    border:none;
    min-width: max-content;
    border-radius: 5px;
    padding: 0.7rem;
    background-color: var(${props=>props.selectedColor});
    color: #fff;
    transition: background-color 0.2s;
    &:hover{
        background-color:${props=>(darken(0.02,props.selectedColor === '--Green' ? '#33CC95' :
        props.selectedColor === '--Blue' ? '#437fff' : '#ff0000' ))}
    }
`