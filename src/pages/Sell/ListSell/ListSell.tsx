import { BsTrash } from 'react-icons/bs'
import { IoMdRemoveCircleOutline, IoMdAddCircleOutline } from 'react-icons/io'
import * as S from "./style";
import { useDarkMode } from "../../../contexts/DarkMode/DarkModeProvider"

interface Props {

   item: {
      id: number;
      name: string;
      totalvalue: number;
      quantity: number;
   },
   handleRemoveItem(id: number): void;
   handleEditItem(id: number, item: number, quantity: number, type: 'add' | 'change'): void;
   handleRemoveOneItem(id: number, item: number): void;
}
//handleRemoveTask:(arg0:number) =>  void;


export function ListSell(props: Props) {

   const Theme = useDarkMode();
   const itemTotalValueFormated = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.item.totalvalue)


   const remove = () => {
      props.handleRemoveItem(props.item.id)
   }
   const ItemAdd = (quantity: number, type: 'add' | 'change') => {
      props.handleEditItem(props.item.id, props.item.quantity, quantity, type)
   }
   const ItemRemove = () => {
      props.handleRemoveOneItem(props.item.id, props.item.quantity)
   }
   return (
      <>

         <S.Container isDarkMode={Theme.DarkMode}>
            <S.DivButtonsAddRemove>
               <S.LabelQuantaty><input style={{ width: '30px', border: 0, outline: 'none', color:Theme.DarkMode?'white':'', backgroundColor: Theme.DarkMode? 'var(--backgroundDarkMode)':''}} value={props.item.quantity} onChange={(e) => ItemAdd(Number(e.target.value), 'change')}></input></S.LabelQuantaty>
               <S.ButtonAdd onClick={() => ItemAdd(1, 'add')}><IoMdAddCircleOutline size="20" /></S.ButtonAdd>
               {props.item.quantity > 1 ?
                  <S.ButtonRemove onClick={ItemRemove}><IoMdRemoveCircleOutline size="20" /></S.ButtonRemove>
                  : ''}
            </S.DivButtonsAddRemove>
            <S.LabelItem isDarkMode={Theme.DarkMode}>{props.item.name}</S.LabelItem>
            <S.LabelValue>{itemTotalValueFormated}</S.LabelValue>
            <S.ButtonTrash type="button" onClick={remove}><BsTrash size="16" /></S.ButtonTrash>
         </S.Container>

      </>
   )
}
   // //onClick={() => handleRemoveTask(item.id)}>