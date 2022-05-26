import {Link} from 'react-router-dom'
import { AuthContext } from "../../contexts/Auth/AuthContext";
import * as S from "./style"
import { useDarkMode } from '../../contexts/DarkMode/DarkModeProvider';
import {Listagem} from './ListSales/ListSales'
import {useState, useContext,  KeyboardEvent} from "react"
import { scopedCssBaselineClasses } from '@mui/material';




export const SalesControl = () => {
    interface Item {
        id:number;
        name: string;
        value:number;
        quantity: number;
        date: string;
    };
    
        const [InitialDate, setInitialDate] = useState('');
        const [FinalDate, setFinalDate] = useState('');
        const [list, setList] = useState<Item[]>([{id:1,name:'Camisa basi dasd fdfsdfsd fsdfsdfsdfd',value:30,date:'15/05/2022',quantity:2},{id:1,name:'Camisa basi dasd fdfsdfsd fsdfsdfsdfd',value:10,date:'19/05/2022',quantity:2}]);
    
   
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
        <S.Box><label>Data Inicial</label><S.Input type="date" onChange={(e) =>setInitialDate(e.target.value)}></S.Input></S.Box>
        <S.Box><label>Data Final</label><S.Input type="date" onChange={(e) =>setFinalDate(e.target.value)}></S.Input></S.Box>
        <S.DivSearch><S.Button >Pesquisar</S.Button></S.DivSearch>
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