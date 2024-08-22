import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { User } from "../../types/User";
import { AuthContext } from "./AuthContext";
import { useMessageBoxContext } from "../MessageBox/MessageBoxContext";
import { SharedUser } from "@shared/api/validate";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<SharedUser | null>(null);
    const [idUser, setidUser] = useState(0)
    const [isUserValid, setUserValid] = useState(false)
    const [masterkey, setmasterkey] = useState("")
    const [codEmailValidate, setCodEmailValidate] = useState("")
    const api = useApi();
    const [isLoading, setIsLoading] = useState(true)
    const { MessageBox } = useMessageBoxContext()

    useEffect(() => {
        const validateToken = async () => {
            try {
                setIsLoading(true)
                const storageData = localStorage.getItem('authToken');
                if (storageData) {
                    const data = await api.validateToken(storageData);
                    if (data.error) throw new Error(data.error)
                    setUserValid(data.valid);
                    if (data.user) {
                        const user: SharedUser = data.user
                        setUser(user);
                        setToken(data.token);
                        setidUser(data.user.id);
                        setmasterkey(data.user.masterkey)
                    }
                }
                else { setUserValid(false) }
            } catch (error) {
                setUserValid(false)
                MessageBox('error', 'Erro ao validar acesso! ' + (error as Error).message)
            } finally {
                setIsLoading(false)
            }
        }
        validateToken();
    }, []);

    const signin = async (email: string, password: string) => {
        const data = await api.signin(email, password);
        if (data.user && data.token) {
            setCodEmailValidate(data.user.codEmailValidate)
            setidUser(data.user.id)
            if (!data.user.isEmailValid) {
                return 'invalidMail'
            } else {
                setUser(data.user);
                setToken(data.token);
                setmasterkey(data.user.masterkey)
                setUserValid(true)
                return 'true';
            }
        }
        return 'false';
    }

    const signout = async () => {
        setUser(null);
        setUserValid(false)
        setToken('');
        await api.logout({ userId: idUser });
    }

    const setToken = async (token: string) => {
        localStorage.setItem('authToken', token);
    }

    return (
        <AuthContext.Provider value={{ user, idUser, signin, signout, isUserValid, masterkey, isLoading, codEmailValidate, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}