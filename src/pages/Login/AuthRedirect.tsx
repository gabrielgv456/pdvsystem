import { useContext , ReactNode} from "react";
import { Login } from "../../pages/Login";
import {AuthContext} from "../../contexts/Auth/AuthContext"
import { useNavigate } from "react-router-dom";
import HomeSideBar from "../Home/Sidebar";

export const AuthRedirect = ({ children }: { children: ReactNode }) => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();


    if (auth.user) {
        return <HomeSideBar/>
       
    } else{
        return <Login />    }
}