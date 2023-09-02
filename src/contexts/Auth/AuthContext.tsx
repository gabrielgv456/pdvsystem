import { createContext } from 'react';
import { User } from '../../types/User';

export type AuthContextType = {
    user: User | null;
    setUser: (value: User|null) => void
    signin: (email: string, password: string, setIsModalValidateOpen:(value:boolean)=>void) => Promise<string>;
    signout: () => void;
    isUserValid: boolean;
    idUser: number;
    masterkey: string;
    isLoading:boolean;
    codEmailValidate:string 
}

export const AuthContext = createContext<AuthContextType>(null!);