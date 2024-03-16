import { useEffect, useContext, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useApi } from '../../../../hooks/useApi';
import { AuthContext } from '../../../../contexts/Auth/AuthContext';
import { useMessageBoxContext } from '../../../../contexts/MessageBox/MessageBoxContext';
import { BarChartType } from '../../interfaces';
import * as type from './interfaces'

export const BarChart = (props: type.barChartProps) => {

    const { MessageBox } = useMessageBoxContext()
    const auth = useContext(AuthContext)
    const [labels, setLabels] = useState([""])
    const { findBarChartData } = useApi()

    useEffect(() => {
        const searchApiData = async () => {
            try {
                const dataBar = await findBarChartData(auth.idUser, 3)
                if (dataBar.Success) {
                    props.setdataBarChart(dataBar.content)
                }
                else {
                    MessageBox('warning', 'Falha ao buscar dados do grafico de Barras')
                }
            }
            catch (error) {
                MessageBox('warning', (error as Error).message)
            }
        }
        searchApiData()
    }, [])

    useEffect(() => {
        async function updateMonths() {
            if (!props.dataBarChart) { return }
            await addMonths(props.dataBarChart)
        }
        updateMonths()
    }, [props.dataBarChart])

    async function addMonths(dataBarChart: BarChartType[]) {

        const month: string[] = [];
        dataBarChart.map((data) => {
            switch (data.month) {
                case 1:
                    month.push('Janeiro');
                    break;
                case 2:
                    month.push('Fevereiro')
                    break;
                case 3:
                    month.push('Março')
                    break;
                case 4:
                    month.push('Abril')
                    break;
                case 5:
                    month.push('Maio')
                    break;
                case 6:
                    month.push('Junho')
                    break;
                case 7:
                    month.push('Julho')
                    break;
                case 8:
                    month.push('Agosto')
                    break;
                case 9:
                    month.push('Setembro')
                    break;
                case 10:
                    month.push('Outubro')
                    break;
                case 11:
                    month.push('Novembro')
                    break;
                case 12:
                    month.push('Dezembro')
                    break;
            }
        }
        )
        setLabels(month)
    }

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            //title: {
            //    display: true,
            //     text: 'Comparativo Mensal',
            // },
        },
    };

    const data = {
        labels,
        datasets: [

            {
                label: 'Ticket Médio',
                data: props.dataBarChart ? props.dataBarChart.map((data) => data.medTicket) : [],
                backgroundColor: '#064699',

            },
            {
                label: 'Faturamento Total',
                data: props.dataBarChart ? props.dataBarChart.map((data) => data.sumSells) : [],
                backgroundColor: '#3181ed',
            },
            {
                label: 'Lucro Total',
                data: props.dataBarChart ? props.dataBarChart.map((data) => data.totalProfit) : [],
                backgroundColor: '#33CC95',
            },
        ],
    };
    return (
        <>
            <Bar options={options} data={data} />
        </>
    )

}