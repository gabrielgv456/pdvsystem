import { useContext } from "react";
import {createContext, useState, ReactNode} from "react"

interface CreateContextProps {
    Produtos: String [];
    name: String;
    AddProdutos: (produto: string) => void;
}

type ChildrenProps = {
    children: ReactNode 
}
//const [test,setTest] = useState('VARIAVEL')

const TestContext = createContext({} as CreateContextProps)

export const TestProvider = ({children}:ChildrenProps) => {

    const [test,setTest] = useState(['blusa','camisa','calça'])

    const FunctionAddProducts = (produto: string) => { 

        let newvalue = test
        newvalue.push(
            produto
        )
        setTest(newvalue)


    }

    return(
        <TestContext.Provider value={{
            Produtos:test,
            name:'sdasads', 
            AddProdutos: FunctionAddProducts
        }}>

            {children}
        </TestContext.Provider>
    )

}

export const useTestContext = () => {
    const context = useContext(TestContext)
    return context
}