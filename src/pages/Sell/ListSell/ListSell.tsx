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
      totalvalue:number;
      quantity: number;
   },
   handleRemoveItem(id:number):  void;
   handleEditItem(id:number, item:number):  void;
   handleRemoveOneItem(id:number, item:number):  void;
}
//handleRemoveTask:(arg0:number) =>  void;


export function ListSell (props:Props) {
   const Theme = useDarkMode();

const remove= () =>{
  props.handleRemoveItem(props.item.id)
}
const ItemAdd = () => {
   props.handleEditItem(props.item.id,props.item.quantity)
}
const ItemRemove = () => {
   props.handleRemoveOneItem(props.item.id,props.item.quantity)
}
   return (
      <>
      
      <S.Container isDarkMode={Theme.DarkMode}>
         <S.DivButtonsAddRemove>
         <S.LabelQuantaty>{props.item.quantity}</S.LabelQuantaty>
         {props.item.quantity > 1 ? 
         <S.ButtonRemove onClick={ItemRemove}><IoMdRemoveCircleOutline size="20"/></S.ButtonRemove>
         : ''}
         <S.ButtonAdd onClick={ItemAdd}><IoMdAddCircleOutline size="20"/></S.ButtonAdd> 
         </S.DivButtonsAddRemove>
         <S.LabelItem  isDarkMode={Theme.DarkMode}>{props.item.name}</S.LabelItem>
         <S.LabelValue>R${props.item.totalvalue}</S.LabelValue>
         <S.ButtonTrash type="button" onClick={remove}><BsTrash size="16"/></S.ButtonTrash>
      </S.Container>
     
      </>
   )}
   // //onClick={() => handleRemoveTask(item.id)}>