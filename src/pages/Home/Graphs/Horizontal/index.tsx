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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface HorizontalChartType {
    idProduct: number,
    quantity: number,
    productName: string
}

export const HorizontalChart = () => {

    const auth = useContext(AuthContext)
    const { findTopSellingProducts } = useApi()
    const [topSellingProducts, setTopSellingProducts] = useState<HorizontalChartType[]>([])
    const {MessageBox} = useMessageBoxContext()
    useEffect(() => {
        const SearchDatafindTopSellingProducts = async () => {
            try {
                const datafindTopSellingProducts = await findTopSellingProducts(auth.idUser)
                if (datafindTopSellingProducts.Success) {
                    setTopSellingProducts(datafindTopSellingProducts.topSellingProducts)
                }
                else {
                    MessageBox('warning',`Erro ao consultar dados do gráfico horizontal ${datafindTopSellingProducts.erro}`)
                }
            }
            catch (error:any) {
                MessageBox('warning',`Erro ao consultar dados do gráfico horizontal ${error.message}`)
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
            topSellingProducts.map((value,index)=>({
                label: value.productName.substring(0,12) + ' ...',
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
