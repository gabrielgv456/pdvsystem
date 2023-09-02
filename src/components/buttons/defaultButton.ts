import styled from 'styled-components'
import {darken} from 'polished'

interface selectedColorProps {
    selectedColor: '--Green'|'--Blue'|'--Red'|'--Gold'|'--Orange'|'--Pink'|'--NoColor';
    padding?: string,
    borderRadius?:string,
    fontSize?:string
} 

export const DefaultButton = styled.button <selectedColorProps>  `
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    gap:5px;
    font-size: ${props=> props.fontSize ?? '1rem'};
    border:none;
    min-width: max-content;
    border-radius: ${props=>props.borderRadius ?? '5px'};
    padding: ${props=>props.padding ?? '0.7rem'};
    background-color: var(${props=>props.selectedColor});
    color: ${props=>props.selectedColor === '--NoColor' ? '#000' : '#fff'};
    transition: background-color 0.2s;
    &:hover{
        background-color:${props=>(darken(0.04,props.selectedColor === '--Green' ? '#33CC95' :
        props.selectedColor === '--Blue' ? '#437fff' : 
        props.selectedColor === '--Red' ? '#ff0000'  :
        props.selectedColor === '--Gold' ? 'gold' :
        props.selectedColor === '--Orange' ? '#f1b445' : 
        props.selectedColor === '--Pink' ? '#e96090' :
        props.selectedColor === '--NoColor' ? '#f0f0f0' :
        '' ))}

    }
`