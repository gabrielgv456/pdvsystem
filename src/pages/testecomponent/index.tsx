import { useState } from "react"
import { useTestContext } from "../../contexts/VariableTest"

export const Test = () => {

const {Produtos,AddProdutos} = useTestContext()

return (
    <>
    {Produtos.map(
        (Produto) => (<p > {Produto}</p>)
    )}
    <button onClick={() => AddProdutos('Tenis')}>Add Produto</button>
    </>
)

}