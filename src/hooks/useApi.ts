import axios from 'axios';
import { TypeDeliveriesRequest } from '../pages/Deliveries';
import { TypeChangeStatusDeliveriesRequest } from '../pages/Deliveries/components/tables/muiDeliveryTable';
import { typeRequestDeliveryAdressChange } from '../pages/Deliveries/components/tables/modals/components/changeAddress';
import { typeSetPaymentsonDelivery } from '../pages/Deliveries/components/tables/modals/modalDeliveryDone';
import { typeChangeForgotPassword } from '../pages/Login/Modals/validateEmail';
import { typeReqChangeFiscalParameters } from '../pages/Settings/tabs/FiscalParameters/interfaces';
import { addEditProductDataSend } from '../pages/InventoryManagement/Modals/AddEditProduct/interfaces';
import { uploadImageType } from '../components/uploadImage/interfaces';

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
        return response.data;
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
        return response.data
    },
    editClient: async (dataEditClient: object) => {
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
        return response.data
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
        return response.data
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
    deleteLogo: async (idUser: number) => {
        const response = await api.delete('/deleteLogo', { params: { storeId: idUser } })
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
    }
});