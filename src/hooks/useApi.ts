import axios from 'axios';
import { TypeDeliveriesRequest } from '../pages/Deliveries';
import { TypeChangeStatusDeliveriesRequest } from '../pages/Deliveries/components/tables/muiDeliveryTable';
import { typeRequestDeliveryAdressChange } from '../pages/Deliveries/components/tables/modals/components/changeAddress';
import { typeSetPaymentsonDelivery } from '../pages/Deliveries/components/tables/modals/modalDeliveryDone';
import { typeChangeForgotPassword } from '../pages/Login/Modals/validateEmail';
import { typeReqChangeFiscalParameters } from '../pages/Settings/tabs/FiscalParameters/interfaces';
import { addEditProductDataSend } from '../pages/InventoryManagement/Modals/AddEditProduct/interfaces';
import { uploadImageType } from '../components/uploadImage/interfaces';
import { createFiscalNoteType } from '../pages/Sell/Modals/CheckOut';
import { findClientsType } from '../interfaces/useApi/findClientsType';
import { editClientTypeReq } from '../interfaces/useApi/editClientTypeReq';
import { findDeliveriesType } from '../interfaces/useApi/findDeliveries';
import { findAbourCorporationType } from '../interfaces/useApi/findAboutCorporation';
import { validateTokenType } from '../interfaces/useApi/validateToken';

const api = axios.create({
    baseURL: process.env.REACT_APP_API,
    headers: {
        Authorization: 'Basic ' + process.env.REACT_APP_TOKEN_REST
    },
    validateStatus(status) {
        return true
    }
});


export const useApi = () => ({

    validateToken: async (token: string) => {
        const response = await api.post('/validate', { token });
        const result: validateTokenType = response.data
        return result;
    },
    signin: async (email: string, password: string) => {
        const response = await api.post('/signin', { email, password });
        return response.data;
    },
    validateMail: async (userId: number) => {
        const response = await api.post('/validatemail', { userId })
        return response.data
    },
    changePassword: async (data: object) => {
        const response = await api.patch('/changepass', { data })
        return response.data
    },
    logout: async (dataLogOutUser: object) => {
        const response = await api.post('/logout', { dataLogOutUser });
        return response.data;
    },
    addsell: async (sell: object) => {
        const response = await api.post('/addsell', { sell })
        return response.data
    },
    findProducts: async (userId: number) => {
        const response = await api.get('/products', { params: { userId } })
        return response.data
    },
    findSells: async (datafindSells: object) => {
        const response = await api.post('/findsells', { datafindSells })
        return response.data
    },
    findTransactions: async (datafindTransactions: object) => {
        const response = await api.post('/findtransactions', { datafindTransactions })
        return response.data
    },
    addProducts: async (dataAddProduct: addEditProductDataSend) => {
        const response = await api.post('/addproduct', { ...dataAddProduct })
        return response.data
    },
    editProducts: async (dataEditProduct: addEditProductDataSend) => {
        const response = await api.post('/editproduct', { ...dataEditProduct })
        return response.data
    },
    deleteProducts: async (dataDeleteProduct: object) => {
        const response = await api.post('/deleteproduct', { dataDeleteProduct })
        return response.data
    },
    findTransactionsProducts: async (dataFindTransactionsProduct: object) => {
        const response = await api.post('/findtransactionsproducts', { dataFindTransactionsProduct })
        return response.data
    },
    addTransactions: async (dataAddTransaction: object) => {
        const response = await api.post('/addtransaction', { dataAddTransaction })
        return response.data
    },
    deleteSell: async (dataDeleteSell: object) => {
        const response = await api.post('/deletesell', { dataDeleteSell })
        return response.data
    },
    findProductsToSell: async (userId: number) => {
        const response = await api.get('/productsToSell', { params: { userId } })
        return response.data
    },
    findSellers: async (userId: number) => {
        const response = await api.post('/findsellers', { userId })
        return response.data
    },
    addSeller: async (dataAddSeller: object) => {
        const response = await api.post('/addseller', { dataAddSeller })
        return response.data
    },
    editSeller: async (dataEditSeller: object) => {
        const response = await api.post('/editseller', { dataEditSeller })
        return response.data
    },
    deleteSeller: async (dataDeleteSeller: object) => {
        const response = await api.post('/deleteseller', { dataDeleteSeller })
        return response.data
    },
    findClients: async (userId: number) => {
        const response = await api.post('/findclients', { userId })
        const data: findClientsType = response.data
        return data
    },
    editClient: async (dataEditClient: editClientTypeReq) => {
        const response = await api.post('/editclient', { ...dataEditClient })
        return response.data
    },
    addClient: async (dataAddClient: object) => {
        const response = await api.post('/addclient', { ...dataAddClient })
        return response.data
    },
    deleteClient: async (dataDeleteClient: object) => {
        const response = await api.post('/deleteclient', { dataDeleteClient })
        return response.data
    },
    findBarChartData: async (userId: number, lastPeriod: number) => {
        const response = await api.get('/charts/bar', { params: { userId, lastPeriod } })
        return response.data
    },
    findDoughnutChartData: async (userId: number, lastPeriod: number) => {
        const response = await api.get('charts/doughnut', { params: { userId, lastPeriod } })
        return response.data
    },
    findAreaChartData: async (userId: number, lastPeriod: number) => {
        const response = await api.get('charts/area', { params: { userId, lastPeriod } })
        return response.data
    },
    findBestSellersChartData: async (userId: number) => {
        const response = await api.get('/charts/bestsellers', { params: { userId } })
        return response.data
    },
    findHorizontalChartData: async (userId: number, lastPeriod: number) => {
        const response = await api.get('/charts/topsellingproducts', { params: { userId, lastPeriod } })
        return response.data
    },
    findRadarChartData: async (userId: number, lastPeriod: number) => {
        const response = await api.get('/charts/radar', { params: { userId, lastPeriod } })
        return response.data
    },
    changeAboutCorporation: async (data: object) => {
        const response = await api.patch('/changeaboutcorporation', { data })
        return response.data
    },
    findAboutCorporation: async (userId: number) => {
        const response = await api.get(`/aboutCorporation?storeId=${userId}`)
        const result: findAbourCorporationType = response.data
        return result
    },
    findIcmsOptions: async () => {
        const response = await api.get('/findIcmsOptions')
        return response.data
    },
    findNCM: async () => {
        const response = await api.get('/listNCM')
        return response.data
    },
    findItemType: async () => {
        const response = await api.get('/listitemtype')
        return response.data
    },
    findCfop: async () => {
        const response = await api.get('/listCfop')
        return response.data
    },
    findDeliveries: async (data: TypeDeliveriesRequest) => {
        const response = await api.get('/deliveries', {
            params: {
                storeId: data.userID,
                initialDate: data.initialDate,
                finalDate: data.finalDate
            }
        })
        const result: findDeliveriesType = response.data
        return result
    },
    changeStatusDeliveries: async (dataChangeStatusDeliveries: TypeChangeStatusDeliveriesRequest) => {
        const response = await api.patch('/changeStatusDeliveries', { dataChangeStatusDeliveries })
        return response.data
    },
    changeAdressDelivery: async (dataChangeAddressDelivery: typeRequestDeliveryAdressChange) => {
        const response = await api.patch('/changeAddressDelivery', { dataChangeAddressDelivery })
        return response.data
    },
    setPaymentsonDelivery: async (dataSetPaymentsonDelivery: typeSetPaymentsonDelivery) => {
        const response = await api.post('/setPaymentonDelivery', { dataSetPaymentsonDelivery })
        return response.data
    },
    uploadFile: async (file: FormData, params: uploadImageType) => {
        const response = await api.post(`/uploadFile`, file, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }, params: {
                ...params
            }
        })
        return response.data
    },
    deleteFile: async (imageId: number, userId: number) => {
        const response = await api.delete('/deleteFile', { params: { imageId, userId } })
        return response.data
    },
    deleteLogo: async (idUser: number, module: string) => {
        const response = await api.delete('/deleteLogo', { params: { storeId: idUser, module } })
        return response.data
    },
    changeForgotPassword: async (dataChangeForgotPassword: typeChangeForgotPassword) => {
        const response = await api.post('/changeForgotPassword', { ...dataChangeForgotPassword })
        return response.data
    },
    validateForgotPassword: async (email: string) => {
        const response = await api.post('/validateForgotPassword', { email })
        return response.data
    }, verifyCodeForgotPassword: async (dataverifyCodeForgotPass: { email: string, codEmailValidate: string }) => {
        const response = await api.get('/verifyCodeForgotPassword', { params: { ...dataverifyCodeForgotPass } })
        return response.data
    }, getFiscalParameters: async (idUser: number) => {
        const response = await api.get('/fiscalParameters', { params: { storeId: idUser } })
        return response.data
    }, changeFiscalParameters: async (dataChangeFicalParameters: typeReqChangeFiscalParameters) => {
        const response = await api.post('/changeFiscalParameters', { ...dataChangeFicalParameters })
        return response.data
    }, createFiscalNote: async (dataCreateFiscalNote: createFiscalNoteType) => {
        const response = await api.post('/createSellFiscalNote',
            { ...dataCreateFiscalNote },
            { responseType: 'blob' })
        if (response.status !== 200) {
            const errorResponse = await response.data.text();
            const errorJson = JSON.parse(errorResponse);
            return errorJson
        }
        return response.data
    }, getCities: async (city?: string | null, ibge?: number | null) => {
        const response = await api.get('/cities', { params: { city, ibge } })
        return response.data
    }, getXmlFiscalNote: async (sellId: number) => {
        const response = await api.get('/getXmlFiscalNote', { params: { sellId } })
        return response.data
    }
});