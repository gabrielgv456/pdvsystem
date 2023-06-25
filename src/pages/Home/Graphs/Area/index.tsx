import React, { useContext, useEffect, useState } from 'react';
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
import { useApi } from '../../../../hooks/useApi';
import { AuthContext } from '../../../../contexts/Auth/AuthContext';
import { useMessageBoxContext } from '../../../../contexts/MessageBox/MessageBoxContext';

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
interface AreaChartDataType{
    totalSells: number,
    day: number,
    nameDay: string,
}

export const AreaChart = () => {

    const auth = useContext(AuthContext)
    const {findAreaChartData} = useApi()
    const [areaChartData,setAreaChartData] = useState<AreaChartDataType[]>([])
    const {MessageBox} = useMessageBoxContext()

    useEffect(()=>{
        const SearchDataAreaChart = async () => {
            try {
                const dataAreaChart = await findAreaChartData(auth.idUser)
                if (dataAreaChart.Success){
                    setAreaChartData(dataAreaChart.SellsChartArea)
                } else {
                    MessageBox('warning',`Houve uma falha ao consultar dados do banco de dados: ${dataAreaChart.erro}`)
                }
            }
            catch (error:any)
            {
                MessageBox('warning',`Erro ao realizar requisição do gráfico de area ${error.message}`)
            }

        }
        SearchDataAreaChart();
    },[])

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

    const labels = areaChartData.map(
        sell=>
            sell.nameDay[0].toLocaleUpperCase() + sell.nameDay.substring(1).split("-",1)  // convert to uppercase   
        );

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Valor',
                data: areaChartData.map((value,index) => 
                index === 0 ?  value.totalSells :
                index === 1 ?  value.totalSells :
                index === 2 ?  value.totalSells :
                index === 3 ?  value.totalSells :
                index === 4 ?  value.totalSells :
                index === 5 ?  value.totalSells :
                index === 6 ?  value.totalSells :
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
