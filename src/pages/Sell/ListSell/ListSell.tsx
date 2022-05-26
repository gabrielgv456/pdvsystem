import {useEffect, useState} from "react"
import { BsTrash } from 'react-icons/bs'
import {HiOutlinePencilAlt} from 'react-icons/hi'
import {IoMdRemoveCircleOutline, IoMdAddCircleOutline} from 'react-icons/io'
import * as S from "./style";
import {useDarkMode} from "../../../contexts/DarkMode/DarkModeProvider"

interface Props{

  item:{
      id:number;
      name: string;
      value?:number;
      quantity: number;
      date?: string;
   },
   handleRemoveTask(id:number):  void;
   handleRemoveItem(id:number, item:number):  void;
}
//handleRemoveTask:(arg0:number) =>  void;


export function ListSell (props:Props) {
   const Theme = useDarkMode();

const remove= () =>{
  props.handleRemoveTask(props.item.id)
}
const ItemRemove = () => {
   props.handleRemoveItem(props.item.quantity,props.item.id)
}
   return (
      <>
      
      <S.Container isDarkMode={Theme.DarkMode}>
         <S.DivButtonsAddRemove>
         <S.LabelQuantaty>{props.item.quantity}</S.LabelQuantaty>
         {props.item.quantity > 1 ? 
         <S.ButtonRemove onClick={ItemRemove} ><IoMdRemoveCircleOutline size="20"/></S.ButtonRemove>
         : ''}
         <S.ButtonAdd><IoMdAddCircleOutline size="20"/></S.ButtonAdd> 
         </S.DivButtonsAddRemove>
         <S.LabelItem  isDarkMode={Theme.DarkMode}>{props.item.name}</S.LabelItem>
         <S.LabelValue>R${props.item.value}</S.LabelValue>
         <S.ButtonTrash type="button" onClick={remove}><BsTrash size="16"/></S.ButtonTrash>
      </S.Container>
     
      </>
   )}
   // //onClick={() => handleRemoveTask(item.id)}>