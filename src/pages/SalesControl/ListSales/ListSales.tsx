import * as S from "./style";
import { useDarkMode } from "../../../contexts/DarkMode/DarkModeProvider"
import { GeneratePDFSell } from "../../../components/pdfGenerator/GeneratePDFSell";
import { Sell, SellsProductsReceiveApi } from "../index"
import { HiOutlinePencilAlt } from "react-icons/hi";
import { AiFillPrinter } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useContext } from 'react'
import { AuthContext } from "../../../contexts/Auth/AuthContext";


interface Props {

   item: Sell;
   listSellsProducts: SellsProductsReceiveApi[];
   handleRemoveTask(id: number, sellValue: number): void;
   setismodalMasterkeyEditOpen: (value: boolean) => void;
   setidselltoEdit: (value: number) => void;
   SearchSellers: () => void;
   filterSellerandClient: (sellerId: number | null, clientId: number | null) => void;

}


export function Listagem(props: Props) {

   const Theme = useDarkMode();
   const { user } = useContext(AuthContext)
   const remove = () => {
      props.handleRemoveTask(props.item.id, props.item.sellValue)
   }

   const dataSellPrint = new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(props.item.created_at))
   const dataSell = new Date(props.item.created_at).toLocaleDateString('pt-br', {
      year: 'numeric',
      month: ('long' || 'short' || 'numeric'),
      weekday: ('long' || 'short'),
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'UTC'
   })
   //const gethoursSell_title = new Date(props.item.created_at).toLocaleString('pt-BR', { timeZone: 'UTC' })
   const searchvaluesthisSell = props.listSellsProducts.filter(item => item.sellId === props.item.id)
   const sumtotalValuethisSell = searchvaluesthisSell.map(item => item.totalValue).reduce((prev, curr) => prev + curr, 0);
   const sumtotalQuantitythisSell = searchvaluesthisSell.map(item => item.quantity).reduce((prev, curr) => prev + curr, 0);
   const sumtotalValuethisSellFormated = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sumtotalValuethisSell)


   const handlePrint = () => {
      GeneratePDFSell(sumtotalValuethisSellFormated, sumtotalQuantitythisSell, props.listSellsProducts.filter(item => item.sellId === props.item.id).map(item => { return { name: item.descriptionProduct, id: item.id, initialvalue: item.totalCost, quantity: item.quantity, totalvalue: item.totalValue } }), dataSellPrint, props.item.codRef, user)
   }
   const handleEdit = async () => {

      props.setidselltoEdit(props.item.id)
      props.filterSellerandClient(props.item.sellerId, props.item.clientId)
      props.setismodalMasterkeyEditOpen(true)

   }

   return (

      <S.Container isDarkMode={Theme.DarkMode}>
         <S.DivTitle>
            <S.DivTipo>
               {/* {dataSell} */}
               <label><b>{(props.item.codRef ? props.item.codRef + ' - ' : '')} </b> {dataSell}</label>
               <label>Total: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.item.sellValue)}</label>
            </S.DivTipo>
         </S.DivTitle>
         <S.DivContent>
            <S.ButtonEdit isDarkMode={Theme.DarkMode} title="Editar Venda" onClick={() => handleEdit()}><HiOutlinePencilAlt size="20" /></S.ButtonEdit>
            <S.span isDarkMode={Theme.DarkMode}>
               <S.bItem isDarkMode={Theme.DarkMode}>Qtd</S.bItem>
               <S.DivListQuantity>
                  {props.listSellsProducts.map((products) => (
                     products.sellId === props.item.id &&
                     <S.LabelQuantaty>{products.quantity}</S.LabelQuantaty>
                  ))}
               </S.DivListQuantity>
            </S.span>
            <S.span isDarkMode={Theme.DarkMode}>
               <S.bItem isDarkMode={Theme.DarkMode}>Produtos</S.bItem>
               <S.DivListItens isDarkMode={Theme.DarkMode}>
                  {props.listSellsProducts.map((products) => (
                     products.sellId === props.item.id &&
                     <S.LabelItem title={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(products.totalValue / products.quantity)} isDarkMode={Theme.DarkMode}>{products.descriptionProduct} </S.LabelItem>
                  ))}
               </S.DivListItens>
            </S.span>
            <S.span isDarkMode={Theme.DarkMode}>
               <S.bItem isDarkMode={Theme.DarkMode}>Preço Venda</S.bItem> <S.DivListItens isDarkMode={Theme.DarkMode}>
                  {props.listSellsProducts.map((products) => (
                     products.sellId === props.item.id &&
                     <S.LabelItem isDarkMode={Theme.DarkMode}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(products.totalValue)} </S.LabelItem>
                  ))}
               </S.DivListItens>
            </S.span>
            <S.span isDarkMode={Theme.DarkMode}>
               <S.bItem isDarkMode={Theme.DarkMode}>Custo</S.bItem> <S.DivListItens isDarkMode={Theme.DarkMode}>
                  {props.listSellsProducts.map((products) => (
                     products.sellId === props.item.id &&
                     <S.LabelItem isDarkMode={Theme.DarkMode}>{(products.totalCost || products.totalCost === 0) ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(products.totalCost) : '-'} </S.LabelItem>
                  ))}
               </S.DivListItens>
            </S.span>
            <S.span isDarkMode={Theme.DarkMode}>
               <S.bItem isDarkMode={Theme.DarkMode}>Cliente</S.bItem>
               <S.LabelItem isDarkMode={Theme.DarkMode}>{props.item.clientName ?? "Não informado"}</S.LabelItem>
            </S.span>
            <S.span isDarkMode={Theme.DarkMode}>
               <S.bItem isDarkMode={Theme.DarkMode}>Vendedor</S.bItem>
               <S.LabelItem isDarkMode={Theme.DarkMode}>{props.item.sellerName ?? "Não informado"}</S.LabelItem>
            </S.span>


            <S.ButtonPrint isDarkMode={Theme.DarkMode} title="Imprimir 2ª via Comprovante" onClick={handlePrint}><AiFillPrinter size="18" /></S.ButtonPrint>
            <S.ButtonTrash title="Estornar Venda" type="button" onClick={remove}><BsTrash size="16" /></S.ButtonTrash>

            {/* 
            <S.LabelDate title={gethoursSell_title}>{dataSell}</S.LabelDate>
            <S.DivListQuantity>
               {props.listSellsProducts.map((products) => (
                  products.sellId === props.item.id &&
                  <S.LabelQuantaty>{products.quantity}</S.LabelQuantaty>
                  ))}
            </S.DivListQuantity> 
 
               
            
            <S.DivListItens isDarkMode={Theme.DarkMode}>
               {props.listSellsProducts.map((products) => (
                  products.sellId === props.item.id &&
                  <S.LabelItem title={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(products.totalValue / products.quantity)} isDarkMode={Theme.DarkMode}>{products.descriptionProduct} </S.LabelItem>

               ))}
            </S.DivListItens>
            <S.LabelNameSeller>{props.item.clientName ?? "Não informado"}</S.LabelNameSeller>
            <S.LabelNameSeller>{props.item.sellerName ?? "Não informado"}</S.LabelNameSeller>
            <S.LabelValue>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.item.sellValue)}</S.LabelValue>
            <label>
               <S.ButtonPrint title="Imprimir 2ª via Comprovante" onClick={handlePrint}><AiFillPrinter size="18" /></S.ButtonPrint>
               <S.ButtonTrash title="Estornar Venda" type="button" onClick={remove}><BsTrash size="16" /></S.ButtonTrash>
            </label> */}
         </S.DivContent>
      </S.Container>

   )
}
