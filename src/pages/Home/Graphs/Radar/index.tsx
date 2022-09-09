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

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export const RadarChart = () => {

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
        labels: [ 'Dinheiro', 'PIX','Cartão de Crédito', 'Cartão de Débito', 'Outros'],
        datasets: [
            {
                label: 'Quantidade Vendas Mensal',
                data: [10, 7, 15, 10, 10],
                backgroundColor: '#4a2da31f',
                borderColor: '#4a2da3',
                borderWidth: 1,
            },
        ],
    };


    return (
        <Radar data={data} options={options}/>
    )

}
