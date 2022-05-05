import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API
});

export const useApi = () => ({
    validateToken: async (token: string) => {
        
        const response = await api.post('/validate', { token });
        console.log(response.data)
        return response.data;
        {/*return {
            user: { id: 3, name: 'José', email: 'jose@gmail.com' }
        };*/}
    },
    signin: async (email: string, password: string) => {
        const response = await api.post('/signin', { email, password });
        console.log(response.data)
        return response.data;
        
        {/*user: { id: 3, name: 'José', email: 'jose@gmail.com' },
            token: '123456789'*/}
    
    },
    logout: async () => {
        return { status: true };
        const response = await api.post('/logout');
        console.log(response.data)
        return response.data;
    }
});