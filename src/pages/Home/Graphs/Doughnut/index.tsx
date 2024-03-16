import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useEffect, useContext, useState } from 'react'
import { useDarkMode } from '../../../../contexts/DarkMode/DarkModeProvider';
import { AuthContext } from '../../../../contexts/Auth/AuthContext';
import { useApi } from '../../../../hooks/useApi';
import { useMessageBoxContext } from '../../../../contexts/MessageBox/MessageBoxContext';
import { DoughnutChartType } from '../../interfaces';

ChartJS.register(ArcElement, Tooltip, Legend);

interface propsDoughnutChart {
    setdataDoughnutChart: (newValue: DoughnutChartType) => void
    dataDoughnutChart: DoughnutChartType | null
}


export const DoughnutChart = (props: propsDoughnutChart) => {

    const auth = useContext(AuthContext)
    const { findDoughnutChartData } = useApi()

    const { MessageBox } = useMessageBoxContext()
    useEffect(() => {

        const SearchData = async () => {
            try {
                const dataDoughnut = await findDoughnutChartData(auth.idUser,1)
                if (dataDoughnut.Success) {
                    props.setdataDoughnutChart(dataDoughnut.content)
                }
                else {
                    throw new Error(dataDoughnut.erro ?? '')
                }
            }
            catch (error) {
                MessageBox('warning', 'Erro ao consultar dados do gráfico de rosca! ' + (error as Error).message)
            }
        }
        SearchData()
    }, [])

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
        labels: ['Masculino', 'Feminino', 'Não informado'],
        datasets: [
            {
                label: '# of Votes',
                data: [
                    props.dataDoughnutChart?.masculineGender ?? 0,
                    props.dataDoughnutChart?.femaleGender ?? 0,
                    props.dataDoughnutChart?.notInformedGender ?? 0
                ],
                backgroundColor: [

                    '#409ae9',
                    '#7e57c2',
                    '#f7f6f6',

                ],
                borderColor: `${Theme.DarkMode ? '#29292b' : '#fff'}`

            },
        ],
    };



    return (
        <>
            <Doughnut data={data} options={options} />
        </>
    )
}