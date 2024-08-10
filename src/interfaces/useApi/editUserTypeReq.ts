export type editUserTypeReq = {
    storeId: number;
    name: string | null;
    cnpj: string | null;
    phone: string | null;
    cellPhone: string | null;
    addressId: number | null,
    addressCep: string | null;
    addressStreet: string | null;
    addressNumber: string | null;
    addressNeighborhood: string | null;
    addressCityId: number | null;
    fantasyName: string | null;
    ie: string | null;
    email: string
};
