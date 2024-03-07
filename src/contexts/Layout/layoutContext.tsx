import { useState, createContext, ReactNode, useContext } from "react"

type LayoutProps = {
    actualPage: string;
    setActualPage: (newState: string) => void;

}
type ChildrenProps = {
    children: ReactNode
}

const LayoutContext = createContext({} as LayoutProps)

export const LayoutProvider = ({ children }: ChildrenProps) => {
    const [actualPage, setActualPage] = useState('Página Inicial')

    return (
        <LayoutContext.Provider value={{ actualPage, setActualPage }}>
            {children}
        </LayoutContext.Provider>
    )
}

export function useLayout() {
    const contextLayout = useContext(LayoutContext);
    return contextLayout;
}



