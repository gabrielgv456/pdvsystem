import { IoMdRemoveCircleOutline, IoMdAddCircleOutline } from 'react-icons/io'
import * as S from "./style";
import { useDarkMode } from "../../../contexts/DarkMode/DarkModeProvider"
import { useState } from 'react'
import { ModalDiscount } from '../Modals/Discount';
import { ProductsType } from '..';

export interface ListSellProps {
   item: ProductsType;
   handleRemoveItem(id: number): void;
   handleEditItem(id: number, item: number, quantity: number, type: 'add' | 'change'): void;
   handleRemoveOneItem(id: number, item: number): void;
   handleDiscount(id: number, discountValue: number | null, discountPercent: number): void
}

export function ListSell(props: ListSellProps) {

   const Theme = useDarkMode();
   const itemTotalValueFormated = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.item.totalvalue)
   const [isModalDiscountOpen, setIsModalDiscountOpen] = useState(false)

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
      <S.Container isDarkMode={Theme.DarkMode}>
         <S.DivButtonsAddRemove>
            <S.LabelQuantaty><input style={{ width: '30px', border: 0, outline: 'none', color: Theme.DarkMode ? 'white' : '', backgroundColor: Theme.DarkMode ? 'var(--backgroundDarkMode)' : '' }} value={props.item.quantity} onChange={(e) => ItemAdd(Number(e.target.value), 'change')}></input></S.LabelQuantaty>
            <S.ButtonAdd title='Adicionar um item' onClick={() => ItemAdd(1, 'add')}><S.IconAddItem /></S.ButtonAdd>
            {props.item.quantity > 1 ?
               <S.ButtonRemove title='Remover um item' onClick={ItemRemove}><S.IconRemoveItem /></S.ButtonRemove>
               : ''}
         </S.DivButtonsAddRemove>
         <S.LabelItem isDarkMode={Theme.DarkMode}>{props.item.name}</S.LabelItem>
         <div style={{ display: 'flex', minWidth: 'min-content', alignItems: 'center', flexDirection: 'column' }}>
            <S.LabelValue applyDiscount={props.item.discountValue}>
               {itemTotalValueFormated}
            </S.LabelValue>
            {(props.item.discountValue && props.item.discountValue > 0) ?
               new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.item.totalvalue - (props.item.totalDiscount ?? 0)) : ''
            }
         </div>
         <S.DivDiscount onClick={() => setIsModalDiscountOpen(true)}>
            <S.DivDiscountShadow applyDiscount={props.item.discountValue}>
               <S.DivIconDiscount applyDiscount={props.item.discountValue}>
                  <S.IconDiscount title='Conceder desconto' applyDiscount={props.item.discountValue} />
               </S.DivIconDiscount>
               <S.DivContentValueDiscount applyDiscount={props.item.discountValue}>
                  R${props.item.discountValue}
               </S.DivContentValueDiscount>
               <S.DivContentPercentDiscount applyDiscount={props.item.discountValue}>
                  {props.item.discountPercent}%
               </S.DivContentPercentDiscount>
            </S.DivDiscountShadow>
         </S.DivDiscount>
         <S.ButtonTrash type="button" onClick={remove}>
            <S.IconTrash title='Exluir produto' />
         </S.ButtonTrash>
         <ModalDiscount
            isModalDiscountOpen={isModalDiscountOpen}
            setIsModalDiscountOpen={setIsModalDiscountOpen}
            props={props}
         />
      </S.Container>
   )
}