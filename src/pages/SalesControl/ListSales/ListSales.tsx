import {useEffect, useState} from "react"
import { BsTrash } from 'react-icons/bs'
import {HiOutlinePencilAlt} from 'react-icons/hi'
import * as S from "./style";
import {useDarkMode} from "../../../contexts/DarkMode/DarkModeProvider"

interface Props{

  item:{
      id:number;
      name?: string;
      value?:number;
      quantity?: number;
      date?: string;
   },
   handleRemoveTask(id:number):  void;
}
//handleRemoveTask:(arg0:number) =>  void;


export function Listagem (props:Props) {
   const Theme = useDarkMode();

const remove= () =>{
  props.handleRemoveTask(props.item.id)
}
   const newLocal = props.item.id;
   //console.log(props.item)
   return (
      <>
      
      <S.Container isDarkMode={Theme.DarkMode}>
         <S.ButtonEdit><HiOutlinePencilAlt size="20"/></S.ButtonEdit>
         <S.LabelDate>{props.item.date}</S.LabelDate>
         <S.LabelItem  isDarkMode={Theme.DarkMode}>{props.item.name}</S.LabelItem>
         <S.LabelQuantaty>{props.item.quantity}</S.LabelQuantaty>
         <S.LabelValue>R${props.item.value}</S.LabelValue>
         <S.ButtonTrash type="button" onClick={remove}><BsTrash size="16"/></S.ButtonTrash>
      </S.Container>
     
      </>
   )}
   // //onClick={() => handleRemoveTask(item.id)}>