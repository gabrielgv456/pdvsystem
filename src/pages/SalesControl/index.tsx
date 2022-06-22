import {Link} from 'react-router-dom'
import { AuthContext } from "../../contexts/Auth/AuthContext";
import * as S from "./style"
import {SiMicrosoftexcel} from "react-icons/si"
import {RiMoneyDollarCircleFill} from "react-icons/ri"
import {BsFileEarmarkPdf, BsFillBagFill} from "react-icons/bs"
import { useDarkMode } from '../../contexts/DarkMode/DarkModeProvider';
import {FaShoppingCart} from "react-icons/fa"
import {Listagem} from './ListSales/ListSales'
import {useState, useContext,  KeyboardEvent, useEffect} from "react"
import { scopedCssBaselineClasses } from '@mui/material';
import { useApi } from '../../hooks/useApi';




export const SalesControl = () => {

    interface SellsProductsReceiveApi {
        id:number;
        storeId: number,
        sellId:number;
        idProduct:number;
        quantity: number,
        valueProduct: number;
        totalValue: number;
        descriptionProduct: string;
        created_at: Date;
     };

    interface Item {
        id:number;
        storeId: number,
        sellValue:number;
        valuePayment:number;
        created_at: Date;
    };

        const atualdata = ReturnData()
        const auth = useContext(AuthContext);
        const [InitialDate, setInitialDate] = useState(atualdata);
        const [FinalDate, setFinalDate] = useState(atualdata);
        const [listSells, setListSells] = useState<Item[]>([]);
        const [listSellsProducts, setListSellsProducts] = useState<SellsProductsReceiveApi[]>([]);
        const sumSells = listSells.length
        const sumItens = listSellsProducts.map(item => item.quantity).reduce((prev, curr) => prev + curr, 0);
        const sumCash = listSells.map(item => item.sellValue).reduce((prev, curr) => prev + curr, 0);
        const sumCashFormated = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sumCash)

        const {findSells} = useApi()    
        const dataToSendApi = {userId:auth.idUser,InitialDate,FinalDate}


        useEffect(()=>{ 
            const defaultSendtoApi = async () => {
            
            const data = await findSells(dataToSendApi)
            await setListSells(data.sells)
            await setListSellsProducts(data.sellsproducts)
            
            
        }
        defaultSendtoApi()
    },[])

    function ReturnData () {
        let data = new Date();
        let day = String(data.getDate()).padStart(2, '0');
        let mes = String(data.getMonth() + 1).padStart(2, '0');
        let year = data.getFullYear();
        const CurrentData = year + '-' + mes + '-' + day;
    
        return (CurrentData)
    }
        const handleSendtoApi = async () => {
            const data = await findSells(dataToSendApi)
            setListSells(data.sells)
            setListSellsProducts(data.sellsproducts)
        }
          const handleKeyUP = (e: KeyboardEvent) => {
            if(e.code === 'Enter' && InitialDate !== ''){
                
            }
        }

    function handleRemoveTask (id:number) {
        let filteredtasks= listSells.filter(list => list.id !== id )
        setListSells(filteredtasks)
    }
    const Theme = useDarkMode();

    return (
        <S.Container isDarkMode={Theme.DarkMode}>
            <S.Header>
            <S.Box><label>Data Inicial</label><S.Input isDarkMode={Theme.DarkMode} type="date" value={InitialDate} onChange={(e) =>setInitialDate(e.target.value)}></S.Input></S.Box>
            <S.Box><label>Data Final</label><S.Input isDarkMode={Theme.DarkMode} type="date" value={FinalDate} onChange={(e) =>setFinalDate(e.target.value)}></S.Input></S.Box>
                <S.DivSearch><S.Button onClick={handleSendtoApi} >Buscar</S.Button>
                    <label style={{display:'flex',position:'absolute',gap:3,right:'2%'}}>
                        <S.ButtonExcel title='Exportar para Excel'><SiMicrosoftexcel size="18"/></S.ButtonExcel>
                        <S.ButtonPdf title='Exportar para PDF'><BsFileEarmarkPdf size="18"/></S.ButtonPdf>
                    </label>
                </S.DivSearch>
        </S.Header>
        <S.SubHeader>
            <S.BoxResume isDarkMode={Theme.DarkMode}>
                <FaShoppingCart size="45" color="var(--AppBar)"/>

                <label>
                    <section>Total Vendas</section>
                    <S.SectionValuesBoxResume>{sumSells}</S.SectionValuesBoxResume>
                </label>

            </S.BoxResume>

            <S.BoxResume isDarkMode={Theme.DarkMode}>
                <RiMoneyDollarCircleFill size="45" color="var(--AppBar)"/>
                <label>
                    <section>Receita Vendas</section>
                    <S.SectionValuesBoxResume>{sumCashFormated}</S.SectionValuesBoxResume>
                    </label>
            </S.BoxResume>

            <S.BoxResume isDarkMode={Theme.DarkMode}>
                <BsFillBagFill size="45" color="var(--AppBar)"/>
                <label>
                    <section>Itens Vendidos</section>
                    <S.SectionValuesBoxResume>{sumItens}</S.SectionValuesBoxResume>
                </label>
            </S.BoxResume>

            

        </S.SubHeader>
     {listSells.length != 0 ? 
        <S.DivMenu isDarkMode={Theme.DarkMode}> 
      <label style={{width:25}}>&nbsp;</label> 
      <S.LabelDate>Data</S.LabelDate>
      <S.LabelQuantaty>Qtd</S.LabelQuantaty>
      <S.LabelItem isDarkMode={Theme.DarkMode}>Descrição</S.LabelItem> 
      <S.LabelValue>Valor</S.LabelValue>
      <label style={{width:41}}> &nbsp;</label>
      </S.DivMenu>
      : 
      <S.DivMenuNotSells isDarkMode={Theme.DarkMode}> 
      <h2>Que pena, nenhuma venda econtrada 🙁 </h2>
      </S.DivMenuNotSells>
      }
        {listSells.map((item)=>(
    <Listagem key={item.id} item={item} handleRemoveTask={handleRemoveTask} listSellsProducts={listSellsProducts}/>
))}
        </S.Container>
       
    )
}