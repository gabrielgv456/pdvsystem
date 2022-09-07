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

    const data = {
        labels: [ 'Dinheiro', 'PIX','Cartão de Crédito', 'Cartão de Débito', 'Outros'],
        datasets: [
            {
                label: 'Qtd Vendas Mensal',
                data: [10, 7, 15, 10, 10],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };


    return (
        <Radar data={data} />
    )

}
