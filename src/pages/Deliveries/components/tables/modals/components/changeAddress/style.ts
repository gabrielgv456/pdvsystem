import styled from 'styled-components'


export const DivModal = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-end;
    flex-wrap: wrap;
`

export const LabelModal = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
@media screen and (max-width:600px){
    .TextField{
        width: 100%;
    }
    gap:10px;
    flex-direction:column 
}
`
