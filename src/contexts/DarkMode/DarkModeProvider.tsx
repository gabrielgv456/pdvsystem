import {  createContext, ReactNode, useContext} from "react"
import {usePersistedDarkMode} from "../../hooks/usePersistedState"

type DarkModeProps = {
    DarkMode: boolean;
    setDarkMode: (newState: boolean) => void;
   
}
type ChildrenProps = {
 children: ReactNode 
}


const DarkModeContext = createContext({} as DarkModeProps)


export const DarkModeProvider = ({children} : ChildrenProps) => {  
    const [DarkMode,setDarkMode]= usePersistedDarkMode('Dark_Mode',false)
  
return (
    <DarkModeContext.Provider value={{ DarkMode, setDarkMode}}>
        {children}
    </DarkModeContext.Provider>
)
     }


export function useDarkMode(){
const contextDarkMode = useContext(DarkModeContext);  
return contextDarkMode;
}  

export function useDarkModeLocalStorage(){
    const LocalStorageDarkmodeString = localStorage.getItem('DarkMode')
    const LocalStorageDarkmode = (LocalStorageDarkmodeString === "true")
    return console.log( LocalStorageDarkmode)
}

