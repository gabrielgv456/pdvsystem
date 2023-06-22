import {useState,createContext, ReactNode,useContext} from 'react';


interface CreateContextProps {
    MessageBox: (type:'error'|'warning'|'info'|'success',message: string) => void;
    openSuccess:boolean;
    setOpenSuccess:(data:boolean)=>void;
    openError:boolean;
    setOpenError:(data:boolean)=>void;
    openWarning:boolean;
    setOpenWarning:(data:boolean)=>void
    openInfo:boolean;
    setOpenInfo:(data:boolean)=>void,
    message:string
}

type ChildrenProps = {
    children: ReactNode 
}

const MessageBoxContext = createContext({} as CreateContextProps)

export const MessageBoxProvider = ({children}:ChildrenProps) => {

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError,setOpenError] = useState(false)
    const [openWarning,setOpenWarning] = useState(false)
    const [openInfo,setOpenInfo] = useState(false)
    const [message,setMessage] = useState('')

    const FunctionMessageBox = (type:'error'|'warning'|'info'|'success',info: string) => { 
        switch (type) {
            case 'success':               
                setOpenError(false)
                setOpenWarning(false)
                setOpenInfo(false)
                setOpenSuccess(true)
                break;
            case 'error':             
                setOpenWarning(false)
                setOpenInfo(false)
                setOpenSuccess(false)
                setOpenError(true)
                break;
            case 'info':
                setOpenError(false)
                setOpenWarning(false)         
                setOpenSuccess(false)
                setOpenInfo(true)
                break;
            case 'warning':
                setOpenError(false)      
                setOpenInfo(false)
                setOpenSuccess(false)
                setOpenWarning(true) 
                break;           
        } 
        setMessage(info)
    }

    return(
        <MessageBoxContext.Provider value={{
            MessageBox: FunctionMessageBox,
            openSuccess,
            openError,
            openWarning,
            openInfo,
            message,
            setOpenError,
            setOpenInfo,
            setOpenSuccess,
            setOpenWarning
        }}>

            {children}
        </ MessageBoxContext.Provider>
    )

}

export const useMessageBoxContext = () => {
    const context = useContext( MessageBoxContext)
    return context
}