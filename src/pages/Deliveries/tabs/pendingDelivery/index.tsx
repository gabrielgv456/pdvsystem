
import * as S from "./style"
import { useDarkMode } from '../../../../contexts/DarkMode/DarkModeProvider';
import MuiTable from "../../../../components/tables/muiTable";

export const TabPendingDeliveries = () => {
    const Theme = useDarkMode();
    return (
        //  <S.Container isDarkMode={Theme.DarkMode}>
        //      <S.Main isDarkMode={Theme.DarkMode}> 
                <MuiTable width="100%" />
        //     </S.Main> 
        //  </S.Container>

    )
}


