import { TypeDeliveries } from "../../pages/Deliveries";
import { AddressSharedType } from "./shared/address";
import { ClientSharedType } from "./shared/client";
import { ItensSellSharedType } from "./shared/ItensSell"


type Sell = {
    id: number;
    codRef: number | null;
    storeId: number;
    sellerId: number | null;
    clientId: number | null;
    created_at: Date;
    sellValue: number;
    discountValue: number | null;
    valuePayment: number;
    deleted: boolean;
    cost: number | null;
};
type itemSell = ItensSellSharedType & {
    sell: Sell
}
export type ResultDeliveryType = {
    id: number;
    storeId: number;
    itemSellId: number;
    clientId: number | null;
    addressId: number;
    productId: number;
    sellId: number;
    status: TypeDeliveries;
    scheduledDate: Date;
    deliveredDate: Date | null;
    onDeliveryPayValue: number | null;
    created_at: Date;
    address: AddressSharedType;
    client: ClientSharedType;
    itemSell: itemSell;
};

export type findDeliveriesType = {
    Success: boolean;
    Erro?: string,
    resultDeliveries: ResultDeliveryType[];
};
