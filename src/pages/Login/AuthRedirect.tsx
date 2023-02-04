import { useContext , ReactNode} from "react";
import { Login } from "../../pages/Login";
import {AuthContext} from "../../contexts/Auth/AuthContext"
import { useNavigate } from "react-router-dom";
import LayoutDefault from "../Layout";

export const AuthRedirect = ({ children }: { children: ReactNode }) => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();


    if (auth.user) {
        return <LayoutDefault/>
       
    } else{
        return <Login />    }
}