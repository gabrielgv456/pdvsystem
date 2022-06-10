import {useEffect, useState} from "react"
import { BsTrash } from 'react-icons/bs'
import {HiOutlinePencilAlt} from 'react-icons/hi'
import * as S from "./style";
import {useDarkMode} from "../../../contexts/DarkMode/DarkModeProvider"

interface Props{

  item:{
   id:number;
   storeId: number,
   sellValue:number;
   valuePayment:number;
   created_at: Date;
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
         <S.LabelDate>{props.item.created_at}</S.LabelDate>
         <S.LabelItem  isDarkMode={Theme.DarkMode}>{props.item.valuePayment}</S.LabelItem>
         <S.LabelQuantaty>{props.item.id}</S.LabelQuantaty>
         <S.LabelValue>R${props.item.sellValue}</S.LabelValue>
         <S.ButtonTrash type="button" onClick={remove}><BsTrash size="16"/></S.ButtonTrash>
      </S.Container>
     
      </>
   )}
   // //onClick={() => handleRemoveTask(item.id)}>