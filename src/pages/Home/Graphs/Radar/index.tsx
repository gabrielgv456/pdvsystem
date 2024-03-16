import React from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { AuthContext } from '../../../../contexts/Auth/AuthContext';
import { useApi } from '../../../../hooks/useApi';
import { useMessageBoxContext } from '../../../../contexts/MessageBox/MessageBoxContext';
import * as type from './interfaces'


ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export const RadarChart = (props: type.RadarChartProps) => {

    const auth = React.useContext(AuthContext)
    const { findRadarChartData } = useApi()
    const { MessageBox } = useMessageBoxContext()

    React.useEffect(() => {
        const searchDataRadarChart = async () => {
            try {
                const dataRadarChart = await findRadarChartData(auth.idUser, 1)
                if (dataRadarChart.Success) {
                    props.setdataRadarChart(dataRadarChart.content)
                }
                else {
                    MessageBox('warning', `Erro ao consultar dados do gráfico radar! ${dataRadarChart.erro}`)
                }
            } catch (error) {
                MessageBox('warning', `Erro ao consultar dados do gráfico radar! ${(error as Error).message}`)
            }
        }
        searchDataRadarChart();
    }, [])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            //title: {
            //    display: true,
            //    text: 'Metodos de pagamento',
            //},
        },
    };

    const data = {
        labels: props.dataRadarChart.map(payment => payment.typepayment),
        //labels: ['Dinheiro', 'PIX', 'Cartão de Crédito', 'Cartão de Débito', 'Outros'],
        datasets: [
            {
                label: 'Quantidade de vendas',
                data: props.dataRadarChart.map(payment => payment.quantity),
                backgroundColor: '#4a2da31f',
                borderColor: '#4a2da3',
                borderWidth: 1,
            },
        ],
    };


    return (
        <Radar data={data} options={options} />
    )

}
