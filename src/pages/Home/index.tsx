import * as S from "./style"
import * as type from './interfaces'
import { useDarkMode } from '../../contexts/DarkMode/DarkModeProvider';
import sellers from "../../images/sellers.png"
import { BarChart } from './Graphs/Bar';
import { DoughnutChart } from './Graphs/Doughnut';
import { AreaChart } from './Graphs/Area';
import { RadarChart } from './Graphs/Radar';
import { BestSellers } from './Components/BestSellers';
import { HorizontalChart } from './Graphs/Horizontal';
import { MenuMui } from "../../components/menuSelect/muiMenu";
import { useApi } from "../../hooks/useApi";
import { useState } from "react";



export const Home = () => {

    const Theme = useDarkMode();
    const [dataDoughnutChart, setdataDoughnutChart] = useState<type.DoughnutChartType | null>(null)
    const [periodDoughnutChart, setPeriodDoughnutChart] = useState<string>('Este mês')

    const [dataBarChart, setdataBarChart] = useState<type.BarChartType[] | null>(null)
    const [periodBarChart, setPeriodBarChart] = useState<string>('Últimos 3 meses')

    const [dataAreaChart, setdataAreaChart] = useState<type.AreaChartType[]>([])
    const [periodAreaChart, setPeriodAreaChart] = useState<string>('Últimos 3 dias')

    const [dataHorizontalChart, setdataHorizontalChart] = useState<type.HorizontalChartType[]>([])
    const [periodHorizontalChart, setPeriodHorizontalChart] = useState<string>('Este mês')

    const [dataRadarChart, setdataRadarChart] = useState<type.RadarChartType[]>([])
    const [periodRadarChart, setPeriodRadarChart] = useState<string>('Este mês')

    const {
        findDoughnutChartData,
        findBarChartData,
        findAreaChartData,
        findHorizontalChartData,
        findRadarChartData
    } = useApi()

    return (

        <S.Container isDarkMode={Theme.DarkMode}>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', alignItems: 'center' }}>
                <S.Box isDarkMode={Theme.DarkMode} widthBox="60%" >
                    <S.HeaderBox >
                        <S.LabelTopHeader><b>Comparativo Mensal</b>
                            <S.labelPeriod>
                                <MenuMui
                                    selectedPeriod={periodBarChart}
                                    options={[
                                        {
                                            option: 'Últimos 3 meses',
                                            value: 3,
                                            action: findBarChartData,
                                            state: setdataBarChart,
                                            stateOption: setPeriodBarChart
                                        },
                                        {
                                            option: 'Últimos 6 meses',
                                            value: 6,
                                            action: findBarChartData,
                                            state: setdataBarChart,
                                            stateOption: setPeriodBarChart
                                        },
                                        {
                                            option: 'Últimos 12 meses',
                                            value: 12,
                                            action: findBarChartData,
                                            state: setdataBarChart,
                                            stateOption: setPeriodBarChart
                                        }
                                    ]} />
                            </S.labelPeriod>
                        </S.LabelTopHeader>
                        <S.LabelsubHeader>em reais (R$)</S.LabelsubHeader>
                    </S.HeaderBox>

                    <div style={{ width: '100%', padding: 10 }}>
                        <BarChart dataBarChart={dataBarChart} setdataBarChart={setdataBarChart} />
                    </div>
                </S.Box>
                <S.Box isDarkMode={Theme.DarkMode} widthBox="30%">
                    <S.HeaderBox >
                        <S.LabelTopHeader> <b>Vendas por Gênero</b>
                            <S.labelPeriod>
                                <MenuMui
                                    selectedPeriod={periodDoughnutChart}
                                    options={[{
                                        option: 'Este mês',
                                        value: 1,
                                        action: findDoughnutChartData,
                                        state: setdataDoughnutChart,
                                        stateOption: setPeriodDoughnutChart,
                                    },
                                    {
                                        option: 'Últimos 3 meses',
                                        value: 3,
                                        action: findDoughnutChartData,
                                        state: setdataDoughnutChart,
                                        stateOption: setPeriodDoughnutChart
                                    },
                                    {
                                        option: 'Últimos 6 meses',
                                        value: 6,
                                        action: findDoughnutChartData,
                                        state: setdataDoughnutChart,
                                        stateOption: setPeriodDoughnutChart
                                    },
                                    {
                                        option: 'Últimos 12 meses',
                                        value: 12,
                                        action: findDoughnutChartData,
                                        state: setdataDoughnutChart,
                                        stateOption: setPeriodDoughnutChart
                                    }
                                    ]} />
                            </S.labelPeriod>
                        </S.LabelTopHeader>
                        <S.LabelsubHeader>em quantidade </S.LabelsubHeader>
                    </S.HeaderBox>
                    <div style={{ width: '100%', padding: 10 }}>
                        <DoughnutChart dataDoughnutChart={dataDoughnutChart} setdataDoughnutChart={setdataDoughnutChart} />
                    </div>
                </S.Box>

            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', alignItems: 'center' }}>
                <S.Box isDarkMode={Theme.DarkMode} widthBox="50%">
                    <S.HeaderBox >
                        <S.LabelTopHeader><b>Vendas Diárias</b>
                            <S.labelPeriod>
                                <MenuMui
                                    selectedPeriod={periodAreaChart}
                                    options={[{
                                        option: 'Últimos 3 dias',
                                        value: 3,
                                        action: findAreaChartData,
                                        state: setdataAreaChart,
                                        stateOption: setPeriodAreaChart,
                                    },
                                    {
                                        option: 'Últimos 7 dias',
                                        value: 7,
                                        action: findAreaChartData,
                                        state: setdataAreaChart,
                                        stateOption: setPeriodAreaChart,
                                    },
                                    {
                                        option: 'Últimos 15 dias',
                                        value: 15,
                                        action: findAreaChartData,
                                        state: setdataAreaChart,
                                        stateOption: setPeriodAreaChart,
                                    }
                                    ]}
                                />
                            </S.labelPeriod>
                        </S.LabelTopHeader>
                        <S.LabelsubHeader>em reais (R$)</S.LabelsubHeader>
                    </S.HeaderBox>
                    <div style={{ width: '100%', padding: 10 }}>
                        <AreaChart dataAreaChart={dataAreaChart} setdataAreaChart={setdataAreaChart} />
                    </div>
                </S.Box>
                <S.Box isDarkMode={Theme.DarkMode} widthBox='40%'>
                    <S.HeaderBox style={{ flexDirection: 'row', backgroundColor: 'var(--Green)', borderRadius: '5px 5px 0px 0px', color: '#fff', fontSize: '0.95rem', justifyContent: "space-between", height: '3rem' }}>
                        Melhores Vendedores do mês
                        <img src={sellers} style={{ width: '130px', height: '130px', marginTop: '-65px', zIndex: 2 }} />
                    </S.HeaderBox>
                    <div style={{ width: '100%', padding: 10 }}>
                        <BestSellers />
                    </div>
                </S.Box>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', marginBottom: 30, alignItems: 'center' }}>
                <S.Box isDarkMode={Theme.DarkMode} widthBox="60%" >
                    <S.HeaderBox >
                        <S.LabelTopHeader><b>Produtos mais vendidos</b>
                            <S.labelPeriod>
                                <MenuMui
                                    selectedPeriod={periodHorizontalChart}
                                    options={[{
                                        option: 'Este mês',
                                        value: 1,
                                        action: findHorizontalChartData,
                                        state: setdataHorizontalChart,
                                        stateOption: setPeriodHorizontalChart,
                                    },
                                    {
                                        option: 'Últimos 3 meses',
                                        value: 3,
                                        action: findHorizontalChartData,
                                        state: setdataHorizontalChart,
                                        stateOption: setPeriodHorizontalChart
                                    },
                                    {
                                        option: 'Últimos 6 meses',
                                        value: 6,
                                        action: findHorizontalChartData,
                                        state: setdataHorizontalChart,
                                        stateOption: setPeriodHorizontalChart
                                    },
                                    {
                                        option: 'Últimos 12 meses',
                                        value: 12,
                                        action: findHorizontalChartData,
                                        state: setdataHorizontalChart,
                                        stateOption: setPeriodHorizontalChart
                                    }
                                    ]} />
                            </S.labelPeriod></S.LabelTopHeader>
                        <S.LabelsubHeader>em quantidade</S.LabelsubHeader>
                    </S.HeaderBox>
                    <div style={{ width: '100%', padding: 10 }}>
                        <HorizontalChart dataHorizontalChart={dataHorizontalChart} setdataHorizontalChart={setdataHorizontalChart} />
                    </div>
                </S.Box>
                <S.Box isDarkMode={Theme.DarkMode} widthBox='30%'>
                    <S.HeaderBox >
                        <S.LabelTopHeader><b>Transações por Método</b>
                            <S.labelPeriod>
                                <MenuMui
                                    selectedPeriod={periodRadarChart}
                                    options={[
                                        {
                                            option: 'Últimos 3 meses',
                                            value: 3,
                                            action: findRadarChartData,
                                            state: setdataRadarChart,
                                            stateOption: setPeriodRadarChart
                                        },
                                        {
                                            option: 'Últimos 6 meses',
                                            value: 6,
                                            action: findRadarChartData,
                                            state: setdataRadarChart,
                                            stateOption: setPeriodRadarChart
                                        },
                                        {
                                            option: 'Últimos 12 meses',
                                            value: 12,
                                            action: findRadarChartData,
                                            state: setdataRadarChart,
                                            stateOption: setPeriodRadarChart
                                        }
                                    ]} />
                            </S.labelPeriod>
                        </S.LabelTopHeader>
                        <S.LabelsubHeader>em quantidade</S.LabelsubHeader>
                    </S.HeaderBox>
                    <div style={{ width: '100%', padding: 10 }}>
                        <RadarChart dataRadarChart={dataRadarChart} setdataRadarChart={setdataRadarChart} />
                    </div>
                </S.Box>
            </div>


        </S.Container>



    )
}