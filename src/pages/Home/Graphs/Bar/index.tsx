import React, { useEffect, useContext, useState } from 'react';
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
import { useApi } from '../../../../hooks/useApi';
import { AuthContext } from '../../../../contexts/Auth/AuthContext';


interface dataBarType {
    sumSells: number,
    month: number,
    medTicket: number
}

export const BarChart = () => {

    async function addMonths(dataBarChart: dataBarType[]) {

        const month : string[]= [];

        dataBarChart.map((data) => {
            console.log(data.month)
            switch (data.month) {
                case 1:
                    month.push('Janeiro');
                    break;
                case 2:
                    month.push('Fevereiro')
                    break;
                case 3:
                    month.push('Março')
                    break;
                case 4:
                    month.push('Abril')
                    break;
                case 5:
                    month.push('Maio')
                    break;
                case 6:
                    month.push('Junho')
                    break;
                case 7:
                    month.push('Junho')
                    break;
                case 8:
                    month.push('Agosto')
                    break;
                case 9:
                    month.push('Setembro')
                    break;
                case 10:
                    month.push('Outubro')
                    break;
                case 11:
                    month.push('Novembro')
                    break;
                case 12:
                    month.push('Dezembro')
                    break;
            }
        }
        )
        return month
    }

    useEffect(() => {
        const searchApiData = async () => {
            try {
                const dataBar = await findBarChartData(auth.idUser)
                if (dataBar.Success) {
                    setdataBar(dataBar.dataBarChart)
                    const returnMonths = await addMonths(dataBar.dataBarChart)
                    setLabels(returnMonths)
                }
                else {
                    alert('Falha ao buscar dados do grafico de Barras')
                }
            }
            catch (error) {
                alert(error)
            }
        }
        searchApiData()
    }, [])

    const [labels,setLabels] = useState([""])
    const [dataBar, setdataBar] = useState<dataBarType[]>([])
    const { findBarChartData } = useApi()
    const auth = useContext(AuthContext)

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





    const data = {
        labels,
        datasets: [

            {
                label: 'Ticket Médio',
                data: dataBar.map((data) => data.medTicket),
                backgroundColor: '#064699',

            },
            {
                label: 'Valor Total',
                data: dataBar.map((data) => data.sumSells),
                backgroundColor: '#3181ed',
            },
        ],
    };
    return (
        <>
            <Bar options={options} data={data} />
        </>
    )

}