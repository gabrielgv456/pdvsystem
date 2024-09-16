import { useState, createContext, ReactNode, useContext } from "react"

type LayoutProps = {
    actualPage: typeActualPage;
    setActualPage: (newState: typeActualPage) => void;

}

export type typeActualPage = 'Página Inicial' | 'Realizar Vendas' | 'Controle de Vendas' | 'Entregas' | 'Balanço Financeiro' | 'Pessoas' | 'Gestão de Estoque' | 'Ajustes' | 'Fiscal'
export const descriptionPages: typeActualPage[] = ['Página Inicial', 'Realizar Vendas', 'Controle de Vendas', 'Entregas', 'Balanço Financeiro', 'Fiscal', 'Gestão de Estoque', 'Pessoas', 'Ajustes']

type ChildrenProps = {
    children: ReactNode
}

const LayoutContext = createContext({} as LayoutProps)

export const LayoutProvider = ({ children }: ChildrenProps) => {
    const [actualPage, setActualPage] = useState<typeActualPage>('Página Inicial')

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



