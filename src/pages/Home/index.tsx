import { Link } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import * as S from "./style"
import { useDarkMode } from '../../contexts/DarkMode/DarkModeProvider';
import invite from "../../images/illustration_invite.png"
import { LoadingSpinner } from '../../spinners';
import { BarChart } from './Graphs/Bar';
import { DoughnutChart } from './Graphs/Doughnut';
import { AreaChart } from './Graphs/Area';
import { RadarChart } from './Graphs/Radar';



export const Home = () => {
    const auth = useContext(AuthContext);
    const Theme = useDarkMode();

    return (

        <S.Container isDarkMode={Theme.DarkMode}>
            <div style={{display:'flex', justifyContent:'space-around', marginBottom:10, flexWrap:'wrap'}}>
            <S.Box widthBox="50%">
                <BarChart />
            </S.Box>
            <S.Box widthBox="30%">
                <DoughnutChart />
            </S.Box>
            
            </div>
            <div style={{display:'flex', justifyContent:'space-around',flexWrap:'wrap', marginBottom:10}}>
            <S.Box widthBox="50%">
                <AreaChart/>
            </S.Box>
            <S.Box widthBox='40%'>
                <RadarChart/>
            </S.Box>
            </div>
            <div style={{display:'flex', justifyContent:'space-around',flexWrap:'wrap'}}>
            <S.Box widthBox="50%">
                Olá {auth.user?.name}, tudo bem?<img src={invite} style={{ marginTop: '-40px' }}></img>
                </S.Box>    

                <S.Box widthBox="20%" className='Box_Cashier'><LoadingSpinner></LoadingSpinner> Caixa Aberto</S.Box>
            </div>

        </S.Container>



    )
}