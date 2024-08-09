export type ItensSellSharedType = {
    id: number;
    storeId: number;
    sellId: number;
    idProduct: number;
    deleted: boolean;
    quantity: number;
    valueProduct: number;
    totalValue: number;
    descriptionProduct: string;
    costProduct: number | null;
    totalCost: number | null;
    discount: number | null;
    totalDiscount: number | null;
    created_at: Date;
}