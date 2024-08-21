import { BsTrash } from "react-icons/bs";
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io";
import { TbDiscount } from "react-icons/tb";
import styled from "styled-components";

interface DarkModeProps {
  isDarkMode: boolean;
}

interface DiscountProps {
  applyDiscount: number | null;
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
    align-items: center;
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

export const DivButtonsAddRemove = styled.div`
display: flex;
width: 48px;
align-items: flex-start;
height: 24px;

`
export const ButtonRemove = styled.button`
    width: 21px;
    text-decoration: none;
    background: none;
    border:none;
    color:gold;
    padding: 0;
`
export const ButtonAdd = styled.button`
    width: 22px; 
    text-decoration: none;
    background: none;
    border:none;
    color:var(--Green);
    padding: 0;
`
export const ButtonTrash = styled.button`
    width: 18px;
    text-decoration: none;
    background: none;
    border:none;
    color:red;
`
export const IconDiscount = styled(TbDiscount) <DiscountProps> `
  width: 22px;
  height: 22px;
  color: #FFA500;
  &:hover{   
    width: ${props => props.applyDiscount ? '' : '24px'};
    height: ${props => props.applyDiscount ? '' : '24px'};
  }
`
export const DivDiscount = styled.div`
  justify-content: flex-start;
  width: 15%;
  display: flex;
  cursor:pointer;
  height: 24px;

`
export const DivIconDiscount = styled.div <DiscountProps> `
  display: flex;
  align-items: center;
  border: ${props => props.applyDiscount ? '1px solid  #FFA500' : ''};
  border-radius: 6px 0px 0px 6px;
  padding: 1px;
  background-color: ${props => props.applyDiscount ? '#ffefd1' : ''};
`

export const IconTrash = styled(BsTrash) `
  width: 16px;
  height: 16px;
  &:hover{   
    width:  17px;
    height: 17px;
  }
`

export const IconAddItem = styled(IoMdAddCircleOutline) `
  width: 20px;
  height: 20px;
  &:hover{   
    width:  21px;
    height: 21px;
  }
`

export const IconRemoveItem = styled(IoMdRemoveCircleOutline) `
  width: 20px;
  height: 20px;
  &:hover{   
    width:  21px;
    height: 21px;
  }
`

export const DivContentPercentDiscount = styled.div <DiscountProps>`
  display: ${props => props.applyDiscount ? 'flex' : 'none'};
  background-color: #FFA500;
  color:#fff;
  align-items: center;
  border: 1px solid  #FFA500;
  border-left: none;
  border-radius: 0px 6px 6px 0px;
  padding: 0px 5px 0px 5px;
  @media screen and (max-width:600px){
    padding: 0px 2px 0px 2px;
  }
`

export const DivDiscountShadow = styled.div <DiscountProps>`
  display: flex;
  border-radius: 6px;
  &:hover{
    box-shadow: ${props => props.applyDiscount ? 'rgba(0, 0, 0, 0.12) 0px 6px 16px' : ''};
  }
`
export const DivContentValueDiscount = styled.div <DiscountProps>`
  display: none;
  align-items: center;
  border: 1px solid  #FFA500;
  border-left: none;
  padding: 0px 5px 0px 5px;
  @media screen and (max-width:600px){
    padding: 0px 2px 0px 2px;
  }
`
export const LabelItem = styled.label<DarkModeProps>`
    color: ${props => (props.isDarkMode ? 'white' : '')};
    width: 40%;
    max-width:40%;
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
export const LabelValue = styled.label <DiscountProps>`
    display: flex;
    align-items: center;
    font-size: ${props=>props.applyDiscount ? '0.6rem' :''};
    text-decoration:${props => (props.applyDiscount? 'line-through' : ''  )} ;
    opacity: ${props => (props.applyDiscount? '0.6' : '' )};
`

export const LabelQuantaty = styled.section`
    width: 10%;
    min-width: min-content;
    margin-right: 0.3rem;
`