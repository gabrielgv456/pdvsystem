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

interface radarChartType {
    typepayment: string,
    quantity: number
}

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export const RadarChart = () => {

    const auth = React.useContext(AuthContext)
    const { findRadarChartData } = useApi()
    const [radarChartdata, setRadarChartData] = React.useState<radarChartType[]>([])
    const {MessageBox} = useMessageBoxContext()

    React.useEffect(() => {
        const searchDataRadarChart = async () => {
            try {
                const dataRadarChart = await findRadarChartData(auth.idUser)
                if (dataRadarChart.Success) {
                    setRadarChartData(dataRadarChart.Payments)
                }
                else {
                    MessageBox('warning',`Erro ao consultar dados do gráfico radar! ${dataRadarChart.erro}`)
                }
            } catch (error:any) {
                MessageBox('warning',`Erro ao consultar dados do gráfico radar! ${error.message}`)
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
        labels: radarChartdata.map(payment=>payment.typepayment),
        //labels: ['Dinheiro', 'PIX', 'Cartão de Crédito', 'Cartão de Débito', 'Outros'],
        datasets: [
            {
                label: 'Quantidade de vendas',
                data: radarChartdata.map(payment=>payment.quantity),
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
