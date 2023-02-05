import { useContext } from "react";
import { Login } from "../../pages/Login";
import { AuthContext } from "./AuthContext";
import { LoadingSpinner } from "../../spinners";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const auth = useContext(AuthContext);
    if (auth.isLoading) {
        return <div style={{ display: 'flex', height: '100vh', width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}><LoadingSpinner /></div>
    } else {
        if (!auth.isUserValid) {
            return <Login />

        } else {

            return children;
        }
    }
}