import { TextField } from '@mui/material'
import * as S from './style'
import { Dispatch, SetStateAction } from 'react'
import { sharedTaxGroupReqType } from '@shared/api/fiscal/CreatePutTaxGroup'

type PropsTabPrincipalTaxGroupType = {
    dataAddEditTaxGroup: sharedTaxGroupReqType
    setDataAddEditTaxGroup: Dispatch<SetStateAction<sharedTaxGroupReqType>>
}

export const TabPrincipalTaxGroup = (props: PropsTabPrincipalTaxGroupType) => {

    function handleChangeData<T extends keyof sharedTaxGroupReqType['taxGroup']>(
        property: T, value: sharedTaxGroupReqType['taxGroup']['description']) {
        props.setDataAddEditTaxGroup(prevState => {
            return {
                ...prevState,
                taxGroup: {
                    ...prevState.taxGroup,
                    [property]: value
                }
            }
        })
    }

    return (

        <S.Container>
            <S.SectionContainer style={{ marginTop: 0 }}>
                <TextField
                    id="outlined-basic"
                    value={props.dataAddEditTaxGroup.taxGroup.description}
                    onChange={(e) => handleChangeData('description', e.target.value)}
                    title='Descrição do Grupo de Tributação'
                    label="Descrição"
                    variant="outlined"
                    sx={{ flex: '1 1 200px' }}
                />

            </S.SectionContainer>

        </S.Container>
    )
}