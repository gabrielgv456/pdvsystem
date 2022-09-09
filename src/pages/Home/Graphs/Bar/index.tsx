import React from 'react';
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


export const BarChart = () => {

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

    const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'];

    const data = {
        labels,
        datasets: [
            
            {
                label: 'Ticket Médio',
                data: labels.map(() => 800 ),
                backgroundColor: '#064699',
                
            },
            {
                label: 'Valor Total',
                data: labels.map(() => 8000 ),
                backgroundColor: '#3181ed',
            },
        ],
    };
    return (
        <Bar options={options} data={data} />
)

}