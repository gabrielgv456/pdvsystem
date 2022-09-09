import React from 'react';
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

export const AreaChart = () => {

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

    const labels = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Valor',
                data: labels.map((value,index) => 
                index === 0 ?  10000 :
                index === 1 ?  11000 :
                index === 2 ?  12000 :
                index === 3 ?  13000 :
                index === 4 ?  14000 :
                index === 5 ?  15000 :
                index === 6 ?  16000 :
                0 
                ),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            
            
        ],
    };

    return (
        <Line options={options} data={data} />
    )
}
