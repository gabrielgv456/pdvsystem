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


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const HorizontalChart = () => {

    const options = {
        indexAxis: 'y' as const,
        scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              grid: {
                display: false
              }
            }
          },
        elements: {
            bar: {
                borderWidth: 0,
               
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,
            },
        },
    };

    const labels = [''];

    const data = {
        labels,
        datasets: [
            {
                label: 'Camisa basica de linho preto',
                data: labels.map(() => 100),
                borderColor: '#5e38a3',
                backgroundColor: '#7d57c2',

            },
            {
                label: 'Share Jaqueta de Linho',
                data: labels.map(() => 30),
                borderColor: '#2d5b8f',
                backgroundColor: '#559ae9',

            },
            {
                label: 'Blazer Luiza',
                data: labels.map(() => 20),
                borderColor: '#5484ac',
                backgroundColor: '#9fd1f9',

            },
            {
                label: 'Calça SlimCom Cinto Forrado',
                data: labels.map(() => 40),
                borderColor: '#e96090',
                backgroundColor: '#e96090',

            },
            {
                label: 'Moletom Pica Pau Bordado Ouro',
                data: labels.map(() => 80),
                borderColor: '#f1b445',
                backgroundColor: '#f1b445',

            },

            //{
            //  label: 'Dataset 2',
            //  data: labels.map(() => 100),
            //  borderColor: 'rgb(53, 162, 235)',
            //  backgroundColor: 'rgba(53, 162, 235, 0.5)',
            //},
        ],
    };


    return (
        <Bar options={options} data={data} />
    )
}
