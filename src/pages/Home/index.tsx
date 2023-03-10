import * as S from "./style"
import { useDarkMode } from '../../contexts/DarkMode/DarkModeProvider';
import sellers from "../../images/sellers.png"
import { BarChart } from './Graphs/Bar';
import { DoughnutChart } from './Graphs/Doughnut';
import { AreaChart } from './Graphs/Area';
import { RadarChart } from './Graphs/Radar';
import { BestSellers } from './Components/BestSellers';
import { HorizontalChart } from './Graphs/Horizontal';



export const Home = () => {
    const Theme = useDarkMode();
    
    return (

        <S.Container isDarkMode={Theme.DarkMode}>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', alignItems:'center' }}>
                <S.Box isDarkMode={Theme.DarkMode} widthBox="60%" >
                    <S.HeaderBox >
                        <S.LabelTopHeader><b>Comparativo Mensal</b><S.labelPeriod>Últimos 6 meses</S.labelPeriod></S.LabelTopHeader>
                        <S.LabelsubHeader>em reais (R$)</S.LabelsubHeader>
                    </S.HeaderBox>
                    
                    <div style={{ width: '100%', padding: 10 }}>
                        <BarChart />
                    </div>
                </S.Box>
                <S.Box isDarkMode={Theme.DarkMode} widthBox="30%">
                    <S.HeaderBox >
                        <S.LabelTopHeader> <b>Vendas por Gênero</b><S.labelPeriod>Este Mês</S.labelPeriod></S.LabelTopHeader>
                        <S.LabelsubHeader>em quantidade </S.LabelsubHeader>
                    </S.HeaderBox>
                    <div style={{ width: '100%', padding: 10 }}>
                        <DoughnutChart />
                    </div>
                </S.Box>

            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', alignItems:'center'}}>
                <S.Box isDarkMode={Theme.DarkMode} widthBox="50%">
                    <S.HeaderBox >
                        <S.LabelTopHeader><b>Vendas Diárias</b><S.labelPeriod>Esta Semana</S.labelPeriod></S.LabelTopHeader>
                        <S.LabelsubHeader>em reais (R$)</S.LabelsubHeader>
                    </S.HeaderBox>
                    <div style={{ width: '100%', padding: 10 }}>
                        <AreaChart />
                    </div>
                </S.Box>
                <S.Box isDarkMode={Theme.DarkMode} widthBox='40%'>
                    <S.HeaderBox style={{flexDirection:'row',backgroundColor: 'var(--Green)',borderRadius: '5px 5px 0px 0px',color:'#fff', fontSize:'0.95rem',justifyContent:"space-between", height: '3rem'}}>
                        Melhores Vendedores
                        <img src={sellers} style={{width:'130px',height:'130px', marginTop: '-65px' , zIndex:2}}/>
                    </S.HeaderBox>
                    <div style={{ width: '100%', padding: 10 }}>
                        <BestSellers/>
                    </div>
                </S.Box>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', marginBottom: 30, alignItems:'center' }}>
                <S.Box isDarkMode={Theme.DarkMode} widthBox="60%" >
                    <S.HeaderBox >
                        <S.LabelTopHeader><b>Produtos mais vendidos</b><S.labelPeriod>Este Mês</S.labelPeriod></S.LabelTopHeader>
                        <S.LabelsubHeader>em quantidade</S.LabelsubHeader>
                    </S.HeaderBox>
                    <div style={{ width: '100%', padding: 10 }}>
                        <HorizontalChart/>
                    </div>
                </S.Box>
                <S.Box isDarkMode={Theme.DarkMode} widthBox='30%'>
                    <S.HeaderBox >
                        <S.LabelTopHeader><b>Transações por Método</b><S.labelPeriod>Este Mês</S.labelPeriod></S.LabelTopHeader>
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