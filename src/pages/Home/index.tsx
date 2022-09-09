import { Link } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import * as S from "./style"
import { useDarkMode } from '../../contexts/DarkMode/DarkModeProvider';
import invite from "../../images/illustration_invite.png"
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
                <S.Box widthBox="60%" >
                    <S.HeaderBox >
                        <b>Comparativo Mensal</b>
                        <S.LabelsubHeader>em reais (R$)</S.LabelsubHeader>
                    </S.HeaderBox>
                    <div style={{ width: '100%', padding: 10 }}>
                        <BarChart />
                    </div>
                </S.Box>
                <S.Box widthBox="30%">
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
                <S.Box widthBox="50%">
                    <S.HeaderBox >
                        <b>Vendas Diárias</b>
                        <S.LabelsubHeader>em reais (R$)</S.LabelsubHeader>
                    </S.HeaderBox>
                    <div style={{ width: '100%', padding: 10 }}>
                        <AreaChart />
                    </div>
                </S.Box>
                <S.Box widthBox='40%'>
                    <S.HeaderBox >
                        <b>Melhores Vendedores</b>
                    </S.HeaderBox>
                    <div style={{ width: '100%', padding: 10 }}>
                        <BestSellers/>
                    </div>
                </S.Box>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', marginBottom: 10 }}>
                <S.Box widthBox="50%">
                    <S.HeaderBox >
                        <b>Dados</b>
                        <S.LabelsubHeader>em reais (R$)</S.LabelsubHeader>
                    </S.HeaderBox>
                    <div style={{ width: '100%', padding: 10 }}>
                        
                    </div>
                </S.Box>
                <S.Box widthBox='40%'>
                    <S.HeaderBox >
                        <b>Transações por Método de Pagamento</b>
                    </S.HeaderBox>
                    <div style={{ width: '100%', padding: 10 }}>
                        <RadarChart />
                    </div>
                </S.Box>
            </div>



            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                <S.Box widthBox="50%">
                    Olá {auth.user?.name}, tudo bem?<img src={invite} style={{ marginTop: '-40px' }}></img>
                </S.Box>

                <S.Box widthBox="20%" className='Box_Cashier'><LoadingSpinner></LoadingSpinner> Caixa Aberto</S.Box>
            </div>

        </S.Container>



    )
}