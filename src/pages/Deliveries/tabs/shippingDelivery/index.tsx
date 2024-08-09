
import * as S from "./style"
import { useDarkMode } from '../../../../contexts/DarkMode/DarkModeProvider';
import MuiTableDeliveries, { DataDeliveryTableType } from "../../components/tables/muiDeliveryTable";
import { DateFormatWeek } from "../../../../utils/utils";
import { ResultDeliveryType } from "../../../../interfaces/useApi/findDeliveries";

interface DeliveriesProps {
    Deliveries: ResultDeliveryType[]
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

export const TabShippingDeliveries = ({ Deliveries, searchDeliveries }: DeliveriesProps) => {
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
        }
        )
    })

    return (
        //  <S.Container isDarkMode={Theme.DarkMode}>
        //      <S.Main isDarkMode={Theme.DarkMode}> 
        <>
            <MuiTableDeliveries width="100%" Deliveries={Deliveries} rows={rows} searchDeliveries={searchDeliveries} type='Shipping' />
        </>
        //     </S.Main> 
        //  </S.Container>

    )
}


