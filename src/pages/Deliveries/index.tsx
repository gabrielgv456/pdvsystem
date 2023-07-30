import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import * as S from "./style"
import { useDarkMode } from '../../contexts/DarkMode/DarkModeProvider';
import { FaSearch } from 'react-icons/fa';
import { useApi } from '../../hooks/useApi';
import { useMessageBoxContext } from "../../contexts/MessageBox/MessageBoxContext";
import { ReturnData } from "../../utils/utils";

export interface DeliveriesReturnApiProps {

}

export interface TypeDeliveriesRequest {
    FinalDate: string,
    InitialDate: string,
    userID: number
}

export const Deliveries = () => {

    const auth = useContext(AuthContext);
    const Theme = useDarkMode();
    const { findDeliveries } = useApi()
    const atualdata = ReturnData()
    const [DeliveriesReturnApi, setDeliveriesReturnApi] = useState<DeliveriesReturnApiProps[]>([])
    const [InitialDate, setInitialDate] = useState(atualdata)
    const [FinalDate, SetFinalDate] = useState(atualdata)
    const datafindDeliveries = { FinalDate, InitialDate, userID: auth.idUser }
    const { MessageBox } = useMessageBoxContext()



    useEffect(() => {
        searchDeliveries()
    }, [])



    const searchDeliveries = async () => {
        try {
            if (InitialDate > FinalDate) {
                throw new Error('Data inicial maior do que a final!')
            }
            const data = await findDeliveries(datafindDeliveries)
            if (!data.success) {
                throw new Error('Falha ao consultar entregas! ' + (data.erro ?? ''))
            }
            setDeliveriesReturnApi(data)

        } catch (error: any) {
            MessageBox('warning', error.message)
        }
    }


    return (
        <S.Container isDarkMode={Theme.DarkMode}>
            <S.Header isDarkMode={Theme.DarkMode}>
                <S.Box><label>Data Inicial</label><S.Input value={InitialDate} onChange={(e) => setInitialDate(e.target.value)} isDarkMode={Theme.DarkMode} type="date"></S.Input ></S.Box>
                <S.Box><label>Data Final</label><S.Input value={FinalDate} onChange={(e) => SetFinalDate(e.target.value)} isDarkMode={Theme.DarkMode} type="date"></S.Input></S.Box>
                <S.Button onClick={searchDeliveries}><FaSearch size="13" /></S.Button>
            </S.Header>

            <S.Main isDarkMode={Theme.DarkMode}>

            </S.Main>
        </S.Container>

    )
}


