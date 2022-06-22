import {Link} from 'react-router-dom'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import TextField from '@mui/material/TextField';
import * as S from "./style"
import { useDarkMode } from '../../contexts/DarkMode/DarkModeProvider';
import { BsArrowDownCircle, BsArrowUpCircle, BsFillBagFill } from 'react-icons/bs';
import { RiFileList3Line, RiMoneyDollarCircleFill, RiMoneyDollarCircleLine } from 'react-icons/ri';
import { FaSearch, FaShoppingCart, FaUserAstronaut } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { useApi } from '../../hooks/useApi';
import { ListTransactions } from './ListTransactions/ListTransactions';
import { HiTrendingDown, HiTrendingUp } from 'react-icons/hi';
import { MdAddTask } from 'react-icons/md';

interface TransactionsReturnApiProps {
    id: number,
    storeId: number,
    sellId: number,
    typepayment: string,
    value:number,
    created_at: Date
}


export const Transactions = () => {

    const auth = useContext(AuthContext);
    const Theme = useDarkMode();
    const {findTransactions} = useApi()
    const atualdata = ReturnData()
    const [isOpenExtractDetails,setisOpenExtractDetails] = useState(true)
    const [isOpenExits, setisOpenExists] = useState(false)
    const [isOpenEntries, setisOpenEntries] = useState(false)
    const [InitialDate,setInitialDate] = useState(atualdata)
    const [FinalDate,SetFinalDate] = useState(atualdata)
    const datafindTransactions = {FinalDate,InitialDate,userID:auth.idUser}
    const [TransactionsReturnApi,setTransactionsReturnApi] = useState<TransactionsReturnApiProps[]>([])
    const sumValueTransactions = TransactionsReturnApi.map(item => item.value).reduce((prev, curr) => prev + curr, 0);
    const sumValueTransactionsFormated =  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sumValueTransactions)
    const sumExitsTransactionsFormated =  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(0)
    const totalTransactionsFormated =  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sumValueTransactions-0)
    
    useEffect(()=>{
        searchTransactions()
    },[])

    function ReturnData () {
        let data = new Date();
        let day = String(data.getDate()).padStart(2, '0');
        let mes = String(data.getMonth() + 1).padStart(2, '0');
        let year = data.getFullYear();
        const CurrentData = year + '-' + mes + '-' + day;
    
        return (CurrentData)
    }

    const searchTransactions = async () => {
        const data = await findTransactions(datafindTransactions)
        setTransactionsReturnApi(data)
    }

    const OpenAddExits = () => {
       setisOpenExtractDetails(false)
       setisOpenEntries(false)
       setisOpenExists(true)
    }
    const OpenExtract = () => {
        setisOpenExtractDetails(true)
        setisOpenEntries(false)
        setisOpenExists(false)
     }
     const OpenEntries = () => {
        setisOpenExtractDetails(false)
        setisOpenEntries(true)
        setisOpenExists(false)
     }

    return (
        <S.Container isDarkMode={Theme.DarkMode}>
        <S.Header>
        <S.Box><label>Data Inicial</label><S.Input value={InitialDate} onChange={(e) =>setInitialDate(e.target.value)} isDarkMode={Theme.DarkMode} type="date"></S.Input ></S.Box>
        <S.Box><label>Data Final</label><S.Input value={FinalDate} onChange={(e) => SetFinalDate(e.target.value)} isDarkMode={Theme.DarkMode} type="date"></S.Input></S.Box>
        <S.Button onClick={searchTransactions}><FaSearch size="13"/></S.Button>

        </S.Header>
        <S.SubHeader>
            <S.BoxResume isDarkMode={Theme.DarkMode}> 
                <S.labelBoxResume>
                    <section>Entradas</section>
                    <S.SectionValuesBoxResume>{sumValueTransactionsFormated}</S.SectionValuesBoxResume>
                </S.labelBoxResume>
                <S.labelBoxResume2>
                    <BsArrowUpCircle size="1.3rem" color="var(--Green)"/>
                </S.labelBoxResume2>
            </S.BoxResume>

            <S.BoxResume isDarkMode={Theme.DarkMode}>
                <S.labelBoxResume>
                    <section>Saídas</section>
                    <S.SectionValuesBoxResume>{sumExitsTransactionsFormated}</S.SectionValuesBoxResume>
                </S.labelBoxResume>
                <S.labelBoxResume2>
                    <BsArrowDownCircle size="1.3rem" color="#ff0000"/>
                </S.labelBoxResume2>
            </S.BoxResume>

            <S.BoxResume isDarkMode={Theme.DarkMode} style={{backgroundColor:'var(--Green)'}}>
                <S.labelBoxResume style={{color:'#fff'}}>
                    <section>Total</section>
                    <S.SectionValuesBoxResume>{totalTransactionsFormated}</S.SectionValuesBoxResume>
                </S.labelBoxResume>
                <S.labelBoxResume2>
                    <RiMoneyDollarCircleLine size="1.6rem" color="#fff"/>
                </S.labelBoxResume2>
            </S.BoxResume>
        
            

        </S.SubHeader>
            <S.Main isDarkMode={Theme.DarkMode}>
            <S.DivOptions>
                <S.ButtonExtract onClick={OpenExtract} isOpenExtractDetails={isOpenExtractDetails}>
                    <b> EXTRADO DETALHADO</b>
                    <RiFileList3Line size="1rem"/>
                </S.ButtonExtract>
                
                <S.ButtonExits onClick={OpenAddExits} isOpenExits={isOpenExits}>
                    
                    <b> ADICIONAR DESPESA</b>
                    <HiTrendingDown size="1rem"/>
                </S.ButtonExits>

                <S.ButtonEntries onClick={OpenEntries} isOpenEntries={isOpenEntries}>
                    
                    <b> ADICIONAR ENTRADA </b> 
                    <HiTrendingUp size="1rem"/>
                </S.ButtonEntries>
                
            </S.DivOptions>
            <S.DivExtract>
        
            {isOpenExtractDetails ?  
                <h3>Extrato Detalhado</h3> : 
                isOpenExits ? <h3> Adicionar Despesa</h3> : 
                    isOpenEntries ? <h3>Adicionar Entrada</h3> : 
                        ''}

            { isOpenExtractDetails ? 
                TransactionsReturnApi.map((item) => (
                <ListTransactions key={item.id} item={item}></ListTransactions>
            )) : ''
        } 

        { isOpenExits ? 
            <S.DivExits>
            
            <TextField id="outlined-basic" label="Descrição" variant="outlined" className="TextField"/>
            <TextField id="outlined-basic" label="Valor" variant="outlined" className="TextField"/>
            <S.ButtonAddExit><MdAddTask size="40"/></S.ButtonAddExit>
            </S.DivExits>
            : ''}


        { isOpenEntries ? 
        <S.DivExits>
            
        <TextField id="outlined-basic" label="Descrição" variant="outlined" className="TextField"/>
        <TextField id="outlined-basic" label="Valor" variant="outlined" className="TextField"/>
        <S.ButtonAddEntry><MdAddTask size="40"/></S.ButtonAddEntry>
        </S.DivExits>
        : ''}    


            </S.DivExtract>

            </S.Main>
        </S.Container>
       
    )
}