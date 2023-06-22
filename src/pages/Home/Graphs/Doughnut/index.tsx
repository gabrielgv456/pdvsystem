import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {useEffect, useContext, useState} from 'react'
import { useDarkMode } from '../../../../contexts/DarkMode/DarkModeProvider';
import { AuthContext } from '../../../../contexts/Auth/AuthContext';
import { useApi } from '../../../../hooks/useApi';
import { useMessageBoxContext } from '../../../../contexts/MessageBox/MessageBoxContext';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartType {
    femaleGender: number;
	masculineGender: number;
	notInformedGender: number;
}

export const DoughnutChart = () => {

    const auth = useContext(AuthContext)
    const {findDoughnutChartData} = useApi()
    const [dataDoughnutChart,setdataDoughnutChart] = useState<DoughnutChartType | null>(null)
    const {MessageBox} = useMessageBoxContext()
    useEffect(()=>{
        
        const SearchData = async () => {
            try{
                const dataDoughnut = await findDoughnutChartData(auth.idUser)
                if (dataDoughnut.Success) {
                    setdataDoughnutChart(dataDoughnut.doughnutData)
                }
                else {
                    MessageBox('warning',dataDoughnut.erro)
                }
            }
            catch (error){
                MessageBox('warning','Erro ao consultar dados do gráfico de rosca !' + error)
            }
        }
        SearchData()
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
        labels: ['Masculino','Feminino','Não informado'],
        datasets: [
            {
                label: '# of Votes',
                data: [
                    dataDoughnutChart?.masculineGender ?? 0,
                    dataDoughnutChart?.femaleGender ?? 0,
                    dataDoughnutChart?.notInformedGender ?? 0
                ],
                backgroundColor: [
                    
                    '#409ae9',
                    '#7e57c2',
                    '#cacaca',
                    
                ],
                borderColor:`${Theme.DarkMode ? '#29292b' : '#fff' }`
                
            },
        ],
    };

    

    return (
        <>
        <Doughnut data={data} options={options}/>
        </>
    )
}