import { useContext, useEffect, useState } from 'react'
import * as S from './style'
import * as type from './interfaces'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { FormatPercent } from '../../../../utils/utils'
import { useApi } from '../../../../hooks/useApi'
import { AuthContext } from '../../../../contexts/Auth/AuthContext'
import { useMessageBoxContext } from '../../../../contexts/MessageBox/MessageBoxContext'

export const TabFiscalParameters = () => {

    useEffect(() => {
        loadFiscalParameters()
    }, [])

    const { getFiscalParameters, changeFiscalParameters } = useApi()
    const { idUser } = useContext(AuthContext)
    const { MessageBox } = useMessageBoxContext()
    const [regimeOptions, setRegimeOptions] = useState<type.typeOptions[]>([])
    const [selectedRegimeOptions, setSelectedRegimeOptions] = useState<type.typeOptions | null>(null)
    const [crtOptions, setCrtOptions] = useState<type.typeOptions[]>([])
    const [selectedCrtOptions, setSelectedCrtOptions] = useState<type.typeOptions | null>(null)
    const [cstPisOptions, setCstPisOptions] = useState<type.typeOptions[]>([])
    const [selectedCstPisOptions, setSelectedCstPisOptions] = useState<type.typeOptions | null>(null)
    const [cstCofinsOptions, setCstCofinsOptions] = useState<type.typeOptions[]>([])
    const [selectedCstCofinsOptions, setSelectedCstCofinsOptions] = useState<type.typeOptions | null>(null)
    const idsZeroAliquot = [3, 4, 5, 6, 7, 8, 9, 99]
    const [fiscalParameters, setFiscalParameters] = useState<type.typeFiscalParameters>({
        taxCrtId: null,
        taxRegimeId: null,
        taxCstPisId: null,
        taxCstPisAliquot: null,
        taxCstCofinsId: null,
        taxCstCofinsAliquot: null
    })

    async function loadFiscalParameters() {
        try {
            const result = await getFiscalParameters(idUser)
            if (!result.Success) { throw new Error(result.Erro ?? '') }
            setFiscalParameters(result.fiscalParameters)
            setCrtOptions(result.crtOptions)
            setCstPisOptions(result.cstPisOptions)
            setCstCofinsOptions(result.cstCofinsOptions)
            setRegimeOptions(result.regimeOptions)
            setSelectedCrtOptions(result.crtOptions.find((item: type.typeOptions) => item.id === result.fiscalParameters.taxCrtId) ?? null)
            setSelectedCstCofinsOptions(result.cstCofinsOptions.find((item: type.typeOptions) => item.id === result.fiscalParameters.taxCstCofinsId) ?? null)
            setSelectedCstPisOptions(result.cstPisOptions.find((item: type.typeOptions) => item.id === result.fiscalParameters.taxCstPisId) ?? null)
            setSelectedRegimeOptions(result.regimeOptions.find((item: type.typeOptions) => item.id === result.fiscalParameters.taxRegimeId) ?? null)
        } catch (error: any) {
            MessageBox('error', 'Falha ao obter dados fiscais! ' + error.message)
        }
    }
    async function reqChangeFiscalParameters() {
        try {
            const result = await changeFiscalParameters({ ...fiscalParameters, storeId: idUser })
            if (!result.Success) { throw new Error(result.Erro ?? '') }
            MessageBox('success', 'Atualizado com sucesso!')
        } catch (error: any) {
            MessageBox('error', 'Falha ao atualizar os dados fiscais! ' + error.message)
        }
    }
    function handleSelectCrtOptions(newValue: type.typeOptions | null) {
        setSelectedCrtOptions(newValue)
        setFiscalParameters({ ...fiscalParameters, taxCrtId: newValue?.id ?? null, taxRegimeId: newValue?.id !== 3 ? null : newValue?.id })
        if (newValue?.id !== 3) { setSelectedRegimeOptions(null) }
    }
    function handleSelectRegimeOptions(newValue: type.typeOptions | null) {
        setSelectedRegimeOptions(newValue)
        setFiscalParameters({ ...fiscalParameters, taxRegimeId: newValue?.id ?? null })
    }
    function handleSelectCstPisOptions(newValue: type.typeOptions | null) {
        setSelectedCstPisOptions(newValue)
        if (newValue?.id && idsZeroAliquot.includes(newValue?.id)) {
            setFiscalParameters({ ...fiscalParameters, taxCstPisAliquot: 0, taxCstPisId: newValue.id })
        } else {
            setFiscalParameters({ ...fiscalParameters, taxCstPisId: newValue?.id ?? null })
        }
    }
    function handleSelectCstCofinsOptions(newValue: type.typeOptions | null) {
        setSelectedCstCofinsOptions(newValue)
        if (newValue?.id && idsZeroAliquot.includes(newValue?.id)) {
            setFiscalParameters({ ...fiscalParameters, taxCstCofinsAliquot: 0, taxCstCofinsId: newValue.id })
        } else {
            setFiscalParameters({ ...fiscalParameters, taxCstCofinsId: newValue?.id ?? null })
        }
    }

    return (
        <S.Container>
            <b>Tributação</b>
            <S.DivItemTrib>
                <Autocomplete
                    value={selectedCrtOptions}
                    onChange={(event: any, newValue: type.typeOptions | null) => {
                        handleSelectCrtOptions(newValue)
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={crtOptions}
                    getOptionLabel={(option) => (option.description)}
                    sx={{ width: '60%' }}
                    renderInput={(params) => <TextField  {...params} label="CRT" />}
                />
                <Autocomplete
                    value={selectedRegimeOptions}
                    onChange={(event: any, newValue: type.typeOptions | null) => {
                        handleSelectRegimeOptions(newValue)
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={regimeOptions}
                    getOptionLabel={(option) => (option.description)}
                    sx={{ width: '35%' }}
                    renderInput={(params) => <TextField  {...params} label="Regime Tributário" />}
                    disabled={selectedCrtOptions?.id !== 3}
                />
            </S.DivItemTrib>
            <S.DivItemTrib>
                <Autocomplete
                    value={selectedCstCofinsOptions}
                    onChange={(event: any, newValue: type.typeOptions | null) => {
                        handleSelectCstCofinsOptions(newValue)
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={cstCofinsOptions}
                    getOptionLabel={(option) => (option.description)}
                    sx={{ width: '70%' }}
                    renderInput={(params) => <TextField  {...params} label="CST COFINS" />}
                />
                <TextField
                    value={fiscalParameters?.taxCstCofinsAliquot}
                    onChange={(e) => {
                        setFiscalParameters({ ...fiscalParameters, taxCstCofinsAliquot: parseFloat(FormatPercent(e.target.value)) })
                    }}
                    id="outlined-basic"
                    label="Alíquota COFINS (%)"
                    
                    variant="outlined"
                    sx={{ width: '25%' }}
                    disabled={fiscalParameters.taxCstCofinsId ? idsZeroAliquot.includes(fiscalParameters.taxCstCofinsId) : false}
                />
            </S.DivItemTrib>
            <S.DivItemTrib>
                <Autocomplete
                    value={selectedCstPisOptions}
                    onChange={(event: any, newValue: type.typeOptions | null) => {
                        handleSelectCstPisOptions(newValue)
                    }}
                    noOptionsText="Não encontrado"
                    id="controllable-states-demo"
                    options={cstPisOptions}
                    getOptionLabel={(option) => (option.description)}
                    sx={{ width: '70%' }}
                    renderInput={(params) => <TextField  {...params} label="CST PIS" />}
                />
                <TextField
                    value={fiscalParameters?.taxCstPisAliquot}
                    onChange={(e) => {
                        setFiscalParameters({ ...fiscalParameters, taxCstPisAliquot: parseFloat(FormatPercent(e.target.value)) })
                    }}
                    id="outlined-basic"
                    label="Alíquota PIS (%)"
                    
                    variant="outlined"
                    disabled={fiscalParameters.taxCstPisId ? idsZeroAliquot.includes(fiscalParameters.taxCstPisId) : false}
                    sx={{ width: '25%' }}
                />
            </S.DivItemTrib>
            <S.ButtonSave onClick={() => reqChangeFiscalParameters()} ><b>Salvar</b></S.ButtonSave>
        </S.Container>
    )
}