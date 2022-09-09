import bronze from "../../../../images/bronze.png"
import silver from "../../../../images/silver.png"
import gold from "../../../../images/gold.png"
import * as S from "./style"

export const BestSellers = () => {

    const sellers = ['Maria de Fatima Bernardes da Silva Ferreira', 'Miranda Gomes Naves', 'Rafael Neves Dias', 'Stefany Honorio Sandi']

    return (
        <>
            {sellers.map((seller,index) => 
                <S.DivContainer>
                    <div style={{width:'10%'}}>
                        {index === 0 && <img src={gold} width="35" height="45"></img>}
                        {index === 1 && <img src={silver} width="35" height="45"></img>}
                        {index === 2 && <img src={bronze} width="35" height="45"></img>}
                    </div>
                    <div style={{width:'40%', maxWidth:'40%',overflow: 'hidden', textOverflow: 'ellipsis',whiteSpace: 'nowrap'}}>
                        {seller}
                    </div>
                    <div style={{width:'20%'}}>
                        1200
                    </div>
                    <div style={{width:'20%'}}>
                        8000
                    </div>
                </S.DivContainer>
            )}
        </>
    )
}