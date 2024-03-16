import React, { useContext, useEffect, useState } from 'react';
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
import { AuthContext } from '../../../../contexts/Auth/AuthContext';
import { useApi } from '../../../../hooks/useApi';
import { useMessageBoxContext } from '../../../../contexts/MessageBox/MessageBoxContext';
import * as type from './interfaces'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const HorizontalChart = (props: type.HorizontalChartProps) => {

    const auth = useContext(AuthContext)
    const { findHorizontalChartData } = useApi()
    const { MessageBox } = useMessageBoxContext()
    useEffect(() => {
        const SearchDatafindTopSellingProducts = async () => {
            try {
                const result = await findHorizontalChartData(auth.idUser, 1)
                if (!result.Success) { throw new Error(result.erro ?? '') }
                props.setdataHorizontalChart(result.content)
            }
            catch (error) {
                MessageBox('warning', `Erro ao consultar dados do gráfico horizontal ${(error as Error).message}`)
            }
        }
        SearchDatafindTopSellingProducts();
    }, [])

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

    const labels = ['']

    const data = {
        labels,
        datasets:
            props.dataHorizontalChart.map((value, index) => ({
                label: value.productName.substring(0, 12) + ' ...',
                data: [value.quantity],
                borderColor: index === 0 ? '#5e38a3' :
                    index === 1 ? '#2d5b8f' :
                        index === 2 ? '#5484ac' :
                            index === 3 ? '#e96090' :
                                index === 4 ? '#f1b445' : '',

                backgroundColor: index === 0 ? '#7d57c2' :
                    index === 1 ? '#559ae9' :
                        index === 2 ? '#9fd1f9' :
                            index === 3 ? '#e96090' :
                                index === 4 ? '#f1b445' : '',
            }))

    };


    return (
        <Bar options={options} data={data} />
    )
}
