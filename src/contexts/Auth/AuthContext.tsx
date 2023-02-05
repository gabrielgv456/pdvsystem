import { createContext } from 'react';
import { User } from '../../types/User';

export type AuthContextType = {
    user: User | null;
    signin: (email: string, password: string) => Promise<boolean>;
    signout: () => void;
    isUserValid: boolean;
    idUser: number;
    masterkey: string;
    isLoading:boolean;
}

export const AuthContext = createContext<AuthContextType>(null!);