import { useContext, ReactNode } from "react";
import { Login } from "../../pages/Login";
import { AuthContext } from "../../contexts/Auth/AuthContext"

import LayoutDefault from "../Layout";
import { LoadingSpinner } from "../../spinners";

export const AuthRedirect = ({ children }: { children: ReactNode }) => {
    const auth = useContext(AuthContext);
    //const navigate = useNavigate();
   

    if (auth.isLoading) {
        return <div style={{display:'flex',height:'100vh',width:'100%',flexDirection:'column',justifyContent:'center',alignItems:'center',}}><LoadingSpinner/></div>
    } else {
        if (auth.user) {
            return <LayoutDefault />

        } else {
            return <Login />
        }
    }
}