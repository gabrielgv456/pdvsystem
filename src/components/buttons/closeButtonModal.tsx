import styled from 'styled-components'
import {darken} from 'polished'
import { IoMdCloseCircle } from 'react-icons/io'

export const DefaultButtonCloseModal = styled.button `
    text-decoration: none;
    border: none;
    color:red;
    background:none;
    &:hover{
        color: ${darken(0.02, 'red')}
    }
`

export const DefaultIconCloseModal = () => {

    return (
        <IoMdCloseCircle size='29' style={{ position: "absolute", right: -10, top: -10, backgroundColor: '#ffffff', boxShadow: '0px 0px 5px #bcbbbb', borderRadius: '50%', zIndex: 1 }} />
    )
}