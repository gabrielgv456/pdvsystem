import {useNavigate} from 'react-router-dom'

import { useEffect, useState } from 'react'
import * as S from './style'
import notfound_image from '../../images/notfound.png'

export const NotFound = () => {

    const navigate = useNavigate()
    const [contador, setContador] = useState(5)

    useEffect(() => {
        setTimeout(() => setContador(contador-1), 1000)
    }, [contador])
    useEffect(( ) => {
        setTimeout(() => navigate("/"), 5000)
     },[])

     

    return (
        <>
        <S.Container>
            <img src={notfound_image} width="350px"/>
        <p className='p_title_notfound'>Ops, essa página não existe</p>
        <S.Button onClick={() => {navigate("/")}}> <b>Voltar ao início</b></S.Button>
        <p className='p_redirect_notfound'>Você será redirecionado em {contador}</p>
        </S.Container>

        </>
    )
}