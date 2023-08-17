
import * as S from "./style"
import { useDarkMode } from '../../../../contexts/DarkMode/DarkModeProvider';
import MuiTableDeliveries from "../../../../components/tables/muiDeliveryTable";
import { DeliveriesReturnApiProps } from "../..";

interface DeliveriesProps {
    Deliveries: DeliveriesReturnApiProps[]
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
    const rows: Array<Data> = [];
    Deliveries.map(delivery => {
        rows.push({
            itemSell: String(delivery.itemSell.id),
            sell: String(delivery.itemSell.sell.codRef),
            client: delivery.client?.name ?? 'Não informado',
            address: delivery.address.addressStreet + ', ' + delivery.address.addressNumber + ', ' + delivery.address.addressNeighborhood + ', ' + delivery.address.addressCity + ' - ' + delivery.address.addressState,
            product: delivery.itemSell.descriptionProduct,
            scheduledDate: new Date(delivery.scheduledDate).toLocaleString('pt-BR', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
                weekday: 'long'
            })
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


