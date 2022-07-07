import {Link} from 'react-router-dom'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import TextField from '@mui/material/TextField';
import * as S from "./style"
import { useDarkMode } from '../../contexts/DarkMode/DarkModeProvider';
import { BsArrowDownCircle, BsArrowUpCircle, BsFillBagFill } from 'react-icons/bs';
import { RiFileList3Line, RiMoneyDollarCircleFill, RiMoneyDollarCircleLine } from 'react-icons/ri';
import { FaAngleLeft, FaAngleRight, FaSearch, FaShoppingCart, FaUserAstronaut } from 'react-icons/fa';
import { AiOutlineLeft, AiOutlineRight, AiOutlineSearch } from 'react-icons/ai';
import { useApi } from '../../hooks/useApi';
import { ListTransactions } from './ListTransactions/ListTransactions';
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiTrendingDown, HiTrendingUp } from 'react-icons/hi';
import { MdAddTask, MdChevronLeft, MdChevronRight } from 'react-icons/md';

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
    const [TransactionsReturnApi,setTransactionsReturnApi] = useState<TransactionsReturnApiProps[]>([])
    const [isOpenExtractDetails,setisOpenExtractDetails] = useState(true)
    const [isOpenExits, setisOpenExists] = useState(false)
    const [isOpenEntries, setisOpenEntries] = useState(false)
    const [InitialDate,setInitialDate] = useState(atualdata)
    const [FinalDate,SetFinalDate] = useState(atualdata)
    const [ItensPerPageExtract,SetItensPerPageExtract] = useState(10)
    const [atualPageExtract, SetAtualPageExtract] = useState(0)
    const PagesExtract = Math.ceil(TransactionsReturnApi.length / ItensPerPageExtract )
    const StartIndexExtract = atualPageExtract * ItensPerPageExtract
    const EndIndexExtract = StartIndexExtract + ItensPerPageExtract
    const paginedTransactionsReturnApi = TransactionsReturnApi.slice(StartIndexExtract,EndIndexExtract)
    const datafindTransactions = {FinalDate,InitialDate,userID:auth.idUser}
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
     const EditItensPerPage = (ItensPerPage:number) => {
        SetItensPerPageExtract(ItensPerPage)
        SetAtualPageExtract(0)
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
            <S.DivOptions isDarkMode={Theme.DarkMode}>
                <S.ButtonExtract  onClick={OpenExtract} isDarkMode={Theme.DarkMode} isOpenExtractDetails={isOpenExtractDetails}>
                    <b> EXTRATO DETALHADO</b>
                    <RiFileList3Line size="1rem"/>
                </S.ButtonExtract>
                
                <S.ButtonExits onClick={OpenAddExits} isDarkMode={Theme.DarkMode} isOpenExits={isOpenExits}>
                    
                    <b> ADICIONAR DESPESA</b>
                    <HiTrendingDown size="1rem"/>
                </S.ButtonExits>

                <S.ButtonEntries onClick={OpenEntries} isDarkMode={Theme.DarkMode} isOpenEntries={isOpenEntries}>
                    
                    <b> ADICIONAR ENTRADA </b> 
                    <HiTrendingUp size="1rem"/>
                </S.ButtonEntries>
                
            </S.DivOptions>
            <S.DivExtract>
        
            {isOpenExtractDetails ? 
            <> 
                <h3>Extrato Detalhado</h3> 
                <S.DivTitleExtract isDarkMode={Theme.DarkMode}>
                    <label style={{width:'50px', display:'flex',justifyContent:'center'}}><b>Tipo</b></label>
                    <label style={{width:'20%', display:'flex',justifyContent:'center'}}><b>Valor</b></label>
                    <label style={{width:'30%', display:'flex',justifyContent:'center'}}><b>Horário</b></label>
                    <label style={{width:'10%', display:'flex',justifyContent:'center'}}><b>Info</b></label>
                    
                </S.DivTitleExtract>
            </>
                
                
                : 
                isOpenExits ? <h3> Adicionar Despesa</h3> : 
                    isOpenEntries ? <h3>Adicionar Entrada</h3> : 
                        ''}

            { isOpenExtractDetails &&
                paginedTransactionsReturnApi.map((item) => (
                <ListTransactions key={item.id} item={item}></ListTransactions>
            )) 
            
        } 
        {isOpenExtractDetails && TransactionsReturnApi.length === 0 ? 
            <h5 style={{color:'#485059',marginTop:'5%'}}>Nenhum resultado encontrado</h5>
            : ''}
        { isOpenExtractDetails &&
                <S.DivFooterExtract isDarkMode={Theme.DarkMode}>
                    <select value={ItensPerPageExtract} 
                    onChange={(e) => EditItensPerPage(Number(e.target.value))} 
                    style={{border:'none',width:'40px',background:'none',color:'#67636d'}}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={10000}>*</option>
                    </select>
                        <div style={{fontSize: '0.85rem',color:'#67636d',display:'flex', width:'35%', justifyContent:'space-between', minWidth:'max-content',alignItems:'center'}}>
                        {PagesExtract > 0 ? <label> Página {atualPageExtract+1} de {PagesExtract}</label> : <label></label>}
                        
                        <S.DivAlterPage>
                        
                        {atualPageExtract <= PagesExtract && atualPageExtract > 0 ? 
                            <button style={{border:'none', background:'none', margin:0}} onClick={(e) => SetAtualPageExtract(atualPageExtract-1)}>
                            <MdChevronLeft color='#4b535c' size="25" />
                            </button>
                        :
                        <button style={{cursor:'context-menu', border:'none', background:'none', margin:0}}>
                            <MdChevronLeft color='#b8c0c9'size="25"/>
                        </button>
                        }
                        {atualPageExtract+1 >= PagesExtract ? 
                            <button style={{cursor:'context-menu', border:'none', background:'none', margin:0}}>
                                <MdChevronRight color='#b8c0c9' size="25"/>
                            </button>
                            :
                            <button style={{border:'none', background:'none', margin:0}} onClick={(e) => SetAtualPageExtract(atualPageExtract+1)}>
                                <MdChevronRight color='#4b535c' size="25"/>
                            </button>
                        }
                        </S.DivAlterPage>
                        </div>
                        
                </S.DivFooterExtract>
                }
            
         
            

        { isOpenExits &&
            <S.DivExits>
            
            <TextField id="outlined-basic" label="Descrição" variant="outlined" className="TextField"/>
            <TextField id="outlined-basic" label="Valor" variant="outlined" className="TextField"/>
            <S.ButtonAddExit><MdAddTask size="40"/></S.ButtonAddExit>
            </S.DivExits>
        }


        { isOpenEntries &&
        <S.DivExits>
            
        <TextField id="outlined-basic" label="Descrição" variant="outlined" className="TextField"/>
        <TextField id="outlined-basic" label="Valor" variant="outlined" className="TextField"/>
        <S.ButtonAddEntry><MdAddTask size="40"/></S.ButtonAddEntry>
        </S.DivExits>
        }    


            </S.DivExtract>

            </S.Main>
        </S.Container>
       
    )
}