import { createContext } from 'react';
import { SharedUser } from '@shared/api/login/validate';

export type AuthContextType = {
    user: SharedUser | null;
    setUser: (value: SharedUser|null) => void
    signin: (email: string, password: string, setIsModalValidateOpen:(value:boolean)=>void) => Promise<string>;
    signout: () => void;
    isUserValid: boolean;
    idUser: number;
    masterkey: string;
    isLoading:boolean;
    codEmailValidate:string 
}

export const AuthContext = createContext<AuthContextType>(null!);