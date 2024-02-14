import React, { useContext, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useApi } from '../../../../hooks/useApi';
import { AuthContext } from '../../../../contexts/Auth/AuthContext';
import { useMessageBoxContext } from '../../../../contexts/MessageBox/MessageBoxContext';
import * as type from './interfaces'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);


export const AreaChart = (props: type.AreaChartProps) => {

    const auth = useContext(AuthContext)
    const { findAreaChartData } = useApi()

    const { MessageBox } = useMessageBoxContext()

    useEffect(() => {
        const SearchDataAreaChart = async () => {
            try {
                const dataAreaChart = await findAreaChartData(auth.idUser, 3)
                if (dataAreaChart.Success) {
                    props.setdataAreaChart(dataAreaChart.content)
                } else {
                    MessageBox('warning', `Houve uma falha ao consultar dados do banco de dados: ${dataAreaChart.erro}`)
                }
            }
            catch (error: any) {
                MessageBox('warning', `Erro ao realizar requisição do gráfico de area ${error.message}`)
            }

        }
        SearchDataAreaChart();
    }, [])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            //title: {
            //  display: true,
            // text: 'Vendas Diárias',
            // },
        },
    };

    const labels = props.dataAreaChart.map(
        sell =>
            sell.nameDay[0].toLocaleUpperCase() + sell.nameDay.substring(1).split("-", 1)  // convert to uppercase   
    );

    const data = {
        labels,
        datasets: [

            {
                fill: true,
                label: 'Lucro',
                data: props.dataAreaChart.map((value, index) =>
                    index === 0 ? value.totalProfit :
                        index === 1 ? value.totalProfit :
                            index === 2 ? value.totalProfit :
                                index === 3 ? value.totalProfit :
                                    index === 4 ? value.totalProfit :
                                        index === 5 ? value.totalProfit :
                                            index === 6 ? value.totalProfit :
                                                0
                ),
                borderColor: '#33CC95',
                backgroundColor: '#33cc9449',
            },
            {
                fill: true,
                label: 'Faturamento',
                data: props.dataAreaChart.map((value, index) =>
                    index === 0 ? value.totalSells :
                        index === 1 ? value.totalSells :
                            index === 2 ? value.totalSells :
                                index === 3 ? value.totalSells :
                                    index === 4 ? value.totalSells :
                                        index === 5 ? value.totalSells :
                                            index === 6 ? value.totalSells :
                                                0
                ),
                borderColor: 'rgba(53, 162, 235, 0.984)',
                backgroundColor: 'rgba(53, 162, 235, 0.234)',
            },

            //borderColor: 'rgb(53, 162, 235)',
            // backgroundColor: 'rgba(53, 162, 235, 0.5)',

        ],
    };

    return (
        <Line options={options} data={data} />
    )
}
