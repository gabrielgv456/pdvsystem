import * as S from "./style";
import { useDarkMode } from "../../../contexts/DarkMode/DarkModeProvider"
import { GeneratePDFSell } from "../../../components/pdfGenerator/GeneratePDFSell";
import { Sell, SellsProductsReceiveApi } from "../index"
import { HiOutlinePencilAlt } from "react-icons/hi";
import { AiFillPrinter } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useContext, useState } from 'react'
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import NfeIcon from '../../../images/nfe.svg'
import { createFiscalNoteType } from "../../Sell/Modals/CheckOut";
import { useApi } from "../../../hooks/useApi";
import { useMessageBoxContext } from "../../../contexts/MessageBox/MessageBoxContext";
import { TbFileTypeXml, TbFileTypePdf } from "react-icons/tb";
import { downloadXMLFile } from "../../../utils/utils";
import { MenuMui } from "src/components/menuSelect/muiMenu";
import { MdCancel } from "react-icons/md";
import { ModalCancelNote } from "./Modals/modalCancelNote/modalCancelNote";
import { ModalFiscalEvents } from "./Modals/modalFiscalEvents/modalFiscalEvents";
import { LuFileSearch } from "react-icons/lu";


interface Props {

   item: Sell;
   listSellsProducts: SellsProductsReceiveApi[];
   handleRemoveTask(id: number, sellValue: number): void;
   setismodalEditSellOpen: (value: boolean) => void;
   setidselltoEdit: (value: number) => void;
   SearchSellers: () => void;
   filterSellerandClient: (sellerId: number | null, clientId: number | null) => void;
   searchSells: () => void;
}


export function Listagem(props: Props) {

   const Theme = useDarkMode();
   const { user, idUser } = useContext(AuthContext)
   const { createFiscalNote, getXmlFiscalNote } = useApi()
   const { MessageBox } = useMessageBoxContext()
   const [isModalCancelNoteOpen, setIsModalCancelNoteOpen] = useState(false)
   const [isModalFiscalEventsOpen, setIsModalFiscalEventsOpen] = useState(false)
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
   const sumTotalDiscountThisSell = searchvaluesthisSell.map(item => item.totalDiscount).reduce((prev, curr) => prev + curr, 0);




   const handlePrint = () => {
      GeneratePDFSell(sumTotalDiscountThisSell, sumtotalValuethisSell, sumtotalValuethisSellFormated, sumtotalQuantitythisSell, props.listSellsProducts.filter(item => item.sellId === props.item.id).map(item => { return { name: item.descriptionProduct, id: item.id, initialvalue: item.totalCost, quantity: item.quantity, totalvalue: item.totalValue, totalDiscount: item.totalDiscount } }), dataSellPrint, props.item.codRef, user)
   }
   const handleEdit = async () => {

      props.setidselltoEdit(props.item.id)
      props.filterSellerandClient(props.item.sellerId, props.item.clientId)
      props.setismodalEditSellOpen(true)

   }

   const handleCreateFiscalNote = async (data: createFiscalNoteType) => {
      try {
         const ok = window.confirm('Deseja emitir a nota fiscal?')
         if (!ok) return
         const result = await createFiscalNote(data)
         if (result.erro) throw new Error(result.erro)
         if (!result.danfe) throw new Error('Falha ao gerar danfe!')
         const base64 = await fetch(`data:application/pdf;base64,${result.danfe}`)
         const blob = await base64.blob();
         const url = URL.createObjectURL(blob);
         window.open(url, '_blank')
         props.searchSells()
      } catch (error) {
         MessageBox('error', (error as Error).message, 100000)
      }
   }

   const handleGetXml = async (sellId: number) => {
      try {
         const result = await getXmlFiscalNote(sellId)
         if (!result.Success) throw new Error(result.Erro ?? 'Erro Desconhecido')
         console.log(result)
         downloadXMLFile(result.xml, result.keyNF)
      } catch (error) {
         MessageBox('error', 'Ocorreu uma falha ao baixar o XML! ' + (error as Error).message)
      }
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
            <S.Button color="gold" isDarkMode={Theme.DarkMode} title="Editar Venda" onClick={() => handleEdit()}><HiOutlinePencilAlt size="20" /></S.Button>
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
                     <S.LabelItem title={products.descriptionProduct} isDarkMode={Theme.DarkMode}>{products.descriptionProduct} </S.LabelItem>
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
               <S.bItem isDarkMode={Theme.DarkMode}>Desconto</S.bItem> <S.DivListItens isDarkMode={Theme.DarkMode}>
                  {props.listSellsProducts.map((products) => (
                     products.sellId === props.item.id &&
                     <S.LabelItem isDarkMode={Theme.DarkMode}>{(products.totalDiscount || products.totalDiscount === 0) ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(products.totalDiscount) : '-'} </S.LabelItem>
                  ))}
               </S.DivListItens>
            </S.span>
            <S.span isDarkMode={Theme.DarkMode}>
               <S.bItem isDarkMode={Theme.DarkMode}>Cliente</S.bItem>
               <S.LabelItem isDarkMode={Theme.DarkMode}>{props.item.client?.name ?? "Não informado"}</S.LabelItem>
            </S.span>
            <S.span isDarkMode={Theme.DarkMode}>
               <S.bItem isDarkMode={Theme.DarkMode}>Vendedor</S.bItem>
               <S.LabelItem isDarkMode={Theme.DarkMode}>{props.item.seller?.name ?? "Não informado"}</S.LabelItem>
            </S.span>
            {(user?.plans?.fiscalAccess ?? false) && (
               props.item.existsFiscalNote ?
                  <>
                     <S.Button color="#e85100" isDarkMode={Theme.DarkMode} title="Visualizar DANFE Nota Fiscal" onClick={() => handleCreateFiscalNote({ sellId: props.item.id, userId: idUser })}><TbFileTypePdf size={22} /></S.Button>
                     <S.Button color="green" isDarkMode={Theme.DarkMode} title="Baixar XML Nota Fiscal" onClick={() => handleGetXml(props.item.id)}><TbFileTypeXml size={22} /></S.Button>
                  </>
                  :
                  <S.Button color="" isDarkMode={Theme.DarkMode} title="Emitir Nota Fiscal" onClick={() => handleCreateFiscalNote({ sellId: props.item.id, userId: idUser })}><img src={NfeIcon} style={{ width: 40 }} /></S.Button>
            )
            }
            <S.Button color="#007fff" isDarkMode={Theme.DarkMode} title="Imprimir 2ª via Comprovante" onClick={handlePrint}><AiFillPrinter size="18" /></S.Button>
            <S.Button color="red" isDarkMode={Theme.DarkMode} title="Estornar Venda" type="button" onClick={remove}><BsTrash size="16" /></S.Button>
            {(user?.plans?.fiscalAccess ?? false) && (

               // apenas exibe abaixo se tiver acesso fiscal
               <MenuMui
                  selected=""
                  sizeIcon={18}
                  options={[
                     {
                        option: 'Cancelar Nota Fiscal',
                        icon: <MdCancel size={22} color="red" />,
                        actionGeneric: () => setIsModalCancelNoteOpen(true)
                     },
                     {
                        option: 'Eventos Nota Fiscal',
                        icon: <LuFileSearch size={22} color="#437fff" />,
                        actionGeneric: () => setIsModalFiscalEventsOpen(true)
                     }
                  ].filter((_item, index) => index === 0 ? props.item.existsFiscalNote : true)} />
            )
            }
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
         <ModalCancelNote sell={props.item} isModalOpen={isModalCancelNoteOpen} setIsModalOpen={setIsModalCancelNoteOpen} searchSells={props.searchSells} />
         <ModalFiscalEvents sellId={props.item.id} isModalOpen={isModalFiscalEventsOpen} setIsModalOpen={setIsModalFiscalEventsOpen} />
      </S.Container>

   )
}
