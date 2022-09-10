import { Link } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import * as S from "./style"
import { useDarkMode } from '../../contexts/DarkMode/DarkModeProvider';
import sellers from "../../images/sellers.png"
import { LoadingSpinner } from '../../spinners';
import { BarChart } from './Graphs/Bar';
import { DoughnutChart } from './Graphs/Doughnut';
import { AreaChart } from './Graphs/Area';
import { RadarChart } from './Graphs/Radar';
import { BestSellers } from './Components/BestSellers';


export const Home = () => {
    const auth = useContext(AuthContext);
    const Theme = useDarkMode();

    return (

        <S.Container isDarkMode={Theme.DarkMode}>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 40, flexWrap: 'wrap' }}>
                <S.Box isDarkMode={Theme.DarkMode} widthBox="60%" >
                    <S.HeaderBox >
                        <b>Comparativo Mensal</b>
                        <S.LabelsubHeader>em reais (R$)</S.LabelsubHeader>
                    </S.HeaderBox>
                    <div style={{ width: '100%', padding: 10 }}>
                        <BarChart />
                    </div>
                </S.Box>
                <S.Box isDarkMode={Theme.DarkMode} widthBox="30%">
                    <S.HeaderBox >
                        <b>Vendas por Gênero</b>
                        <S.LabelsubHeader>em quantidade </S.LabelsubHeader>
                    </S.HeaderBox>
                    <div style={{ width: '100%', padding: 10 }}>
                        <DoughnutChart />
                    </div>
                </S.Box>

            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', marginBottom: 10 }}>
                <S.Box isDarkMode={Theme.DarkMode} widthBox="50%">
                    <S.HeaderBox >
                        <b>Vendas Diárias</b>
                        <S.LabelsubHeader>em reais (R$)</S.LabelsubHeader>
                    </S.HeaderBox>
                    <div style={{ width: '100%', padding: 10 }}>
                        <AreaChart />
                    </div>
                </S.Box>
                <S.Box isDarkMode={Theme.DarkMode} widthBox='40%'>
                    <S.HeaderBox style={{flexDirection:'row',backgroundColor: 'var(--Green)',borderRadius: '5px 5px 0px 0px',color:'#fff', fontSize:'0.95rem',justifyContent:"space-between", height: '3rem'}}>
                        Melhores Vendedores
                        <img src={sellers} style={{width:'8rem',height:'8rem', marginTop: '-65px' }}/>
                    </S.HeaderBox>
                    <div style={{ width: '100%', padding: 10 }}>
                        <BestSellers/>
                    </div>
                </S.Box>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', marginBottom: 10 }}>
                <S.Box isDarkMode={Theme.DarkMode} widthBox="50%">
                    <S.HeaderBox >
                        <b>Produtos mais vendidos</b>
                        
                    </S.HeaderBox>
                    <div style={{ width: '100%', padding: 10 }}>
                        
                    </div>
                </S.Box>
                <S.Box isDarkMode={Theme.DarkMode} widthBox='40%'>
                    <S.HeaderBox >
                        <b>Transações por Método de Pagamento</b>
                        <S.LabelsubHeader>em quantidade</S.LabelsubHeader>
                    </S.HeaderBox>
                    <div style={{ width: '100%', padding: 10 }}>
                        <RadarChart />
                    </div>
                </S.Box>
            </div>


        </S.Container>



    )
}