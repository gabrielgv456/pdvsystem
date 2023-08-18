
import * as S from "./style"
import { useDarkMode } from '../../../../contexts/DarkMode/DarkModeProvider';
import MuiTableDeliveries, { DataDeliveryTableType } from "../../components/tables/muiDeliveryTable";
import { DeliveriesReturnApiProps } from "../..";
import { DateFormatWeek } from "../../../../utils/utils";

interface DeliveriesProps {
    Deliveries: DeliveriesReturnApiProps[],
    searchDeliveries: () => void
}
interface Data {
    itemSell: string
    sell: string,
    client: string,
    address: string,
    product: string,
    scheduledDate: string
}

export const TabPendingDeliveries = ({ Deliveries, searchDeliveries }: DeliveriesProps) => {
    const Theme = useDarkMode();
    const rows: Array<DataDeliveryTableType> = [];
    Deliveries.map(delivery => {
        rows.push({
            itemSell: String(delivery.itemSell.id),
            sell: String(delivery.itemSell.sell.codRef),
            client: delivery.client?.name ?? 'Não informado',
            address: delivery.address.addressStreet + ', ' + delivery.address.addressNumber + ', ' + delivery.address.addressNeighborhood + ', ' + delivery.address.addressCity + ' - ' + delivery.address.addressState,
            product: delivery.itemSell.descriptionProduct,
            scheduledDate: DateFormatWeek(delivery.scheduledDate),
            deliveredDate: DateFormatWeek(delivery.deliveredDate)
        })
    })

    return (
        //  <S.Container isDarkMode={Theme.DarkMode}>
        //      <S.Main isDarkMode={Theme.DarkMode}> 
        <>
            <MuiTableDeliveries width="100%" Deliveries={Deliveries} rows={rows} searchDeliveries={searchDeliveries} type='Pending' />
        </>
        //     </S.Main> 
        //  </S.Container>

    )
}


