import bronze from "../../../../images/bronze.png"
import silver from "../../../../images/silver.png"
import gold from "../../../../images/gold.png"
import * as S from "./style"
import { useApi } from "../../../../hooks/useApi"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../../contexts/Auth/AuthContext"
import { useDarkMode } from "../../../../contexts/DarkMode/DarkModeProvider"

interface BestSellersType {
    id: number,
	name: string,
	totalValueSell: number,
	totalItensSell: number
}

export const BestSellers = () => {

    const {findBestSellersChartData}= useApi()
    const auth = useContext(AuthContext)
    const [sellers,setSellers] = useState<BestSellersType[]>([])
    const [consulted,setConsulted] = useState(false)
    const Theme = useDarkMode()

    useEffect(()=>{
        const searchDataBestSellers = async () => {
            const dataBestSellers = await findBestSellersChartData(auth.idUser)
            if (dataBestSellers.Success){
                setSellers(dataBestSellers.bestSellers)
                setConsulted(true)
            }
            else {
                alert(`Falha ao buscar dados dos melhores vendedores! Erro: ${dataBestSellers.erro}`)
            }
        }
        searchDataBestSellers();
    },[])
    

    return (
        <>
            {
            sellers.length === 0 && consulted ? 
                <S.DivContainer isDarkMode={Theme.DarkMode}>Nenhum vendedor encontrado no Ranking</S.DivContainer>
            :
            sellers.map((seller,index) => 
                <S.DivContainer isDarkMode={Theme.DarkMode}>
                    <div style={{width:'10%'}}>
                        {index === 0 && <img src={gold} width="35" height="45"></img>}
                        {index === 1 && <img src={silver} width="35" height="45"></img>}
                        {index === 2 && <img src={bronze} width="35" height="45"></img>}
                    </div>
                    <div style={{width:'40%', maxWidth:'40%',overflow: 'hidden', textOverflow: 'ellipsis',whiteSpace: 'nowrap'}}>
                        {seller.name}
                    </div>
                    <div style={{width:'20%'}}>
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(seller.totalValueSell)}
                    </div>
                    <div style={{width:'20%', display:'flex',justifyContent:'center'}}>
                        {seller.totalItensSell}
                    </div>
                </S.DivContainer>
            )}
        </>
    )
}