import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {useEffect} from 'react'
import { useDarkMode } from '../../../../contexts/DarkMode/DarkModeProvider';

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = () => {

    useEffect(()=>{

    },[])

    const Theme = useDarkMode()

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            //title: {
            //    display: true,
             //   text: 'Vendas por Gênero',
           // },
        },
    };

    const data = {
        labels: ['Masculino', 'Feminino'],
        datasets: [
            {
                label: '# of Votes',
                data: [40,60],
                backgroundColor: [
                    '#409ae9',
                    '#7e57c2'
                ],
                borderColor:`${Theme.DarkMode ? '#29292b' : '#fff' }`
                
            },
        ],
    };

    

    return (
        <Doughnut data={data} options={options}/>
    )
}