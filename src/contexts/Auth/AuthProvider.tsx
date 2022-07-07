import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { User } from "../../types/User";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<User | null>(null);
    const [idUser, setidUser] = useState(0)
    const [isUserValid, setUserValid] = useState(false)
    const [masterkey,setmasterkey] = useState("")
    const api = useApi();

    useEffect(() => {
        const validateToken = async () => {
            console.log("validate")
            const storageData = localStorage.getItem('authToken');
            if (storageData) {
                const data = await api.validateToken(storageData);
                if (data.user) {
                    setUser(data.user);
                    setToken(data.token);
                    setidUser(data.user.id);
                    setmasterkey(data.user.masterkey)
                    console.log(data.masterkey)
                }
                if (data.valid) {
                    setUserValid(true);
                }
                if (!data.valid) {
                    setUserValid(false)
                }
            }
        }
        validateToken();
    }, []);

    const signin = async (email: string, password: string) => {
        const data = await api.signin(email, password);
        if (data.user && data.token ) {
            console.log(data.user.id)
            setUser(data.user);
            setToken(data.token);
            setidUser(data.user.id);
            setmasterkey(data.user.masterkey)
            setUserValid(true)
            return true;
        }
        return false;
    }

    const signout = async () => {
        console.log("signout está sendo executada.");
        setUser(null);
        setToken('');
        await api.logout();
    }

    const setToken = async (token: string) => {
       await localStorage.setItem('authToken', token);
    }

    return (
        <AuthContext.Provider value={{ user, idUser, signin, signout, isUserValid, masterkey }}>
            {children}
        </AuthContext.Provider>
    );
}