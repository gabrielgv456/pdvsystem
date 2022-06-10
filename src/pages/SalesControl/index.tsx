import {Link} from 'react-router-dom'
import { AuthContext } from "../../contexts/Auth/AuthContext";
import * as S from "./style"
import { useDarkMode } from '../../contexts/DarkMode/DarkModeProvider';
import {Listagem} from './ListSales/ListSales'
import {useState, useContext,  KeyboardEvent, useEffect} from "react"
import { scopedCssBaselineClasses } from '@mui/material';
import { useApi } from '../../hooks/useApi';




export const SalesControl = () => {
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
        const [list, setList] = useState<Item[]>([]);
        const {findSells} = useApi()    
        const dataToSendApi = {userId:auth.idUser,InitialDate,FinalDate}


        useEffect(()=>{ 
            const defaultSendtoApi = async () => {
            
            const data = await findSells(dataToSendApi)
            setList(data)
            
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
            setList(data)
        }
          const handleKeyUP = (e: KeyboardEvent) => {
            if(e.code === 'Enter' && InitialDate !== ''){
                
            }
        }

    function handleRemoveTask (id:number) {
        let filteredtasks= list.filter(list => list.id !== id )
        console.log(filteredtasks)
        setList(filteredtasks)
    }
    const Theme = useDarkMode();

    return (
        <S.Container isDarkMode={Theme.DarkMode}>
        <S.Header>
        <S.Box><label>Data Inicial</label><S.Input type="date" value={InitialDate} onChange={(e) =>setInitialDate(e.target.value)}></S.Input></S.Box>
        <S.Box><label>Data Final</label><S.Input type="date" value={FinalDate} onChange={(e) =>setFinalDate(e.target.value)}></S.Input></S.Box>
        <S.DivSearch><S.Button onClick={handleSendtoApi} >Pesquisar</S.Button></S.DivSearch>
        </S.Header>
        <S.DivMenu isDarkMode={Theme.DarkMode}> 
      <label style={{width:25}}>&nbsp;</label> 
      <S.LabelDate>Data</S.LabelDate>
      <S.LabelItem isDarkMode={Theme.DarkMode}>Descrição</S.LabelItem> 
      <S.LabelQuantaty>Qtd</S.LabelQuantaty>
      <S.LabelValue>Valor</S.LabelValue>
      <label style={{width:21}}> &nbsp;</label>
      </S.DivMenu>
        {list.map((item)=>(
    <Listagem key={item.id} item={item} handleRemoveTask={handleRemoveTask}/>
))}
        </S.Container>
       
    )
}