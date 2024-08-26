
import * as S from "./style"
import { useDarkMode } from '../../../../contexts/DarkMode/DarkModeProvider';
import MuiTableDeliveries, { DataDeliveryTableType } from "../../components/tables/muiDeliveryTable";
import { DateFormatWeek } from "../../../../utils/utils";
import { sharedDeliveriesSuccess } from "@shared/api/deliveries/findDeliveries";

interface DeliveriesProps {
    Deliveries: sharedDeliveriesSuccess[]
    searchDeliveries: () => void
}


export const TabDoneDeliveries = ({ Deliveries, searchDeliveries }: DeliveriesProps) => {
    const Theme = useDarkMode();
    const rows: Array<DataDeliveryTableType> = [];
    Deliveries.map(delivery => {
        rows.push({
            itemSell: String(delivery.itemSell.id),
            sell: String(delivery.itemSell.sell.codRef),
            client: delivery.client?.name ?? 'Não informado',
            address: delivery.address.addressStreet + ', ' + delivery.address.addressNumber + ', ' + delivery.address.addressNeighborhood + ', ' + (delivery.address.city?.name ?? '') + ' - ' + (delivery.address.city?.state.uf ?? ''),
            product: delivery.itemSell.descriptionProduct,
            scheduledDate: DateFormatWeek(delivery.scheduledDate),
            deliveredDate: DateFormatWeek(delivery.deliveredDate)
        })
    })

    return (
        //  <S.Container isDarkMode={Theme.DarkMode}>
        //      <S.Main isDarkMode={Theme.DarkMode}> 
        <>
            <MuiTableDeliveries width="100%" Deliveries={Deliveries} rows={rows} searchDeliveries={searchDeliveries} type='Done' />
        </>
        //     </S.Main> 
        //  </S.Container>

    )
}


