import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API,
    headers: {
        Authorization: 'Basic ' + process.env.REACT_APP_TOKEN_REST
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
    validateMail:async(userId:number) => {
        const response = await api.post('/validatemail',{userId})
        return response.data
    },
    changePassword:async(data:object) => {
        const response = await api.patch('/changepass', {data})
        return response.data
    },
    logout: async (dataLogOutUser: object) => {
        const response = await api.post('/logout', {dataLogOutUser});
        return response.data;
    },
    addsell: async (sell:object) => {
        const response = await api.post('/addsell', {sell})
        return response.data
    },
    findProducts: async (userId:number) => {
        const response = await api.post('/products',{userId})
        return response.data
    },
    findSells: async (datafindSells:object) => {
        const response = await api.post('/findsells', {datafindSells})
        return response.data
    },
    findTransactions: async (datafindTransactions:object) => {
        const response = await api.post('/findtransactions', {datafindTransactions})
        return response.data
    },
    addProducts: async (dataAddProduct:object) => {
        const response = await api.post('/addproduct', {dataAddProduct})
        return response.data
    },
    editProducts: async (dataEditProduct:object) => {
        const response = await api.post('/editproduct', {dataEditProduct})
        return response.data
    },
    deleteProducts: async (dataDeleteProduct:object) => {
        const response = await api.post('/deleteproduct', {dataDeleteProduct})
        return response.data
    },
    findTransactionsProducts: async (dataFindTransactionsProduct:object) => {
        const response = await api.post('/findtransactionsproducts', {dataFindTransactionsProduct})
        return response.data
    },
    addTransactions: async (dataAddTransaction:object) => {
        const response = await api.post('/addtransaction', {dataAddTransaction} )
        return response.data
    },
    deleteSell: async (dataDeleteSell:object) => {
        const response = await api.post('/deletesell', {dataDeleteSell})
        return response.data
    },
    findSellers: async (userId:number) => {
        const response = await api.post('/findsellers', {userId})
        return response.data
    },
    addSeller: async (dataAddSeller:object) => {
        const response = await api.post('/addseller', {dataAddSeller})
        return response.data
    },
    editSeller: async(dataEditSeller:object) => {
        const response = await api.post('/editseller',{dataEditSeller})
        return response.data
    },
    deleteSeller: async(dataDeleteSeller:object) => {
        const response = await api.post('/deleteseller',{dataDeleteSeller})
        return response.data
    },
    findClients: async (userId:number) => {
        const response = await api.post('/findclients', {userId})
        return response.data
    },
    editClient: async(dataEditClient:object) => {
        const response = await api.post('/editclient', {dataEditClient})
        return response.data
    },
    addClient: async(dataAddClient:object) => {
        const response = await api.post('/addclient', {dataAddClient})
        return response.data
    },
    deleteClient: async(dataDeleteClient:object) => {
        const response = await api.post('/deleteclient', {dataDeleteClient})
        return response.data
    },
    findBarChartData: async(userId:number) => {
        const response = await api.post('/charts/bar', {userId})
        return response.data
    },
    findDoughnutChartData: async(userId:number) => {
        const response = await api.post('charts/doughnut', {userId})
        return response.data
    },
    findAreaChartData: async(userId:number) => {
        const response = await api.post('charts/area', {userId})
        return response.data
    },
    findBestSellersChartData: async(userId:number) => {
        const response = await api.post('/charts/bestsellers',{userId})
        return response.data
    },
    findTopSellingProducts: async (userId:number) => {
        const response = await api.post('/charts/topsellingproducts',{userId})
        return response.data
    },
    findRadarChartData: async (userId:number) => {
        const response = await api.post('/charts/radar', {userId})
        return response.data
    },
    changeAboutCorporation: async(data:object) => {
        const response = await api.patch('/changeaboutcorporation', {data})
        return response.data
    },
    findAboutCorporation: async(userId:number) => {
        const response = await api.get(`/aboutCorporation?storeId=${userId}`)
        return response.data
    }
});