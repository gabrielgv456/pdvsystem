import { useContext, useEffect, useState } from 'react'
import * as S from './style'
import * as type from './interfaces'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { FormatPercent } from '../../../../utils/utils'
import { useApi } from '../../../../hooks/useApi'
import { AuthContext } from '../../../../contexts/Auth/AuthContext'
import { useMessageBoxContext } from '../../../../contexts/MessageBox/MessageBoxContext'
import { UploadImage } from 'src/components/uploadImage/uploadImage'
import { SharedFiscalParametersResponse } from '@shared/api/settings/fiscalParameters'
import { DatePicker, LocalizationProvider, ptBR } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { CircularProgressSpinner } from 'src/spinners/progress/CircularProgressSpinner'

export const TabFiscalParameters = () => {

    useEffect(() => {
        loadFiscalParameters()
    }, [])

    const { getFiscalParameters, changeFiscalParameters } = useApi()
    const [isLoading, setIsloading] = useState(true)
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
    const [fiscalParameters, setFiscalParameters] = useState<SharedFiscalParametersResponse['fiscalParameters']>({
        taxCrtId: null,
        taxRegimeId: null,
        taxCstPisId: null,
        taxCstPisAliquot: null,
        taxCstCofinsId: null,
        taxCstCofinsAliquot: null,
        lastNumberNF: null,
        lastNumberNFCE: null,
        passCert: null,
        validityCert: null,
        fileCert: null,
        fileCertId: null,
        urlFileCert: null,
        codCSC: null
    })

    async function loadFiscalParameters() {
        try {
            const result = await getFiscalParameters(idUser)
            setIsloading(false)
            if (!result.Success) { throw new Error(result.erro ?? '') }
            setFiscalParameters(result.fiscalParameters)
            setCrtOptions(result.crtOptions)
            setCstPisOptions(result.cstPisOptions)
            setCstCofinsOptions(result.cstCofinsOptions)
            setRegimeOptions(result.regimeOptions)
            setSelectedCrtOptions(result.crtOptions.find((item: type.typeOptions) => item.id === result.fiscalParameters.taxCrtId) ?? null)
            setSelectedCstCofinsOptions(result.cstCofinsOptions.find((item: type.typeOptions) => item.id === result.fiscalParameters.taxCstCofinsId) ?? null)
            setSelectedCstPisOptions(result.cstPisOptions.find((item: type.typeOptions) => item.id === result.fiscalParameters.taxCstPisId) ?? null)
            setSelectedRegimeOptions(result.regimeOptions.find((item: type.typeOptions) => item.id === result.fiscalParameters.taxRegimeId) ?? null)
        } catch (error) {
            MessageBox('error', 'Falha ao obter dados fiscais! ' + (error as Error).message)
        }
    }
    async function reqChangeFiscalParameters() {
        try {
            const result = await changeFiscalParameters({ ...fiscalParameters, storeId: idUser })
            if (!result.Success) { throw new Error(result.Erro ?? '') }
            MessageBox('success', 'Atualizado com sucesso!')
        } catch (error) {
            MessageBox('error', 'Falha ao atualizar os dados fiscais! ' + (error as Error).message)
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

    function handleSelectImage(newValue: number | null) {
        setFiscalParameters({ ...fiscalParameters, fileCertId: newValue })
    }

    return (
        isLoading ? <CircularProgressSpinner /> :
            <S.Container>

                <b>Parametrização</b>
                Certificado Digital
                <UploadImage
                    type='cert'
                    maxSize={1}
                    url={fiscalParameters.urlFileCert}
                    idImage={fiscalParameters.fileCertId}
                    setIdImage={(newValue: number | null) => handleSelectImage(newValue)}
                />

                <S.DivParams>
                    <TextField
                        value={fiscalParameters?.passCert}
                        onChange={(e) => {
                            setFiscalParameters({ ...fiscalParameters, passCert: e.target.value })
                        }}
                        id="outlined-basic"
                        label="Senha Certificado"
                        InputLabelProps={{ shrink: !!fiscalParameters?.passCert }}
                        type='password'
                        variant="outlined"
                        sx={{}}
                        disabled={fiscalParameters.taxCstCofinsId ? idsZeroAliquot.includes(fiscalParameters.taxCstCofinsId) : false}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ptBR}>
                        <DatePicker
                            disableFuture
                            label={"Validade Certificado"}
                            openTo="year"
                            views={['year', 'month', 'day']}
                            value={fiscalParameters?.validityCert}
                            onChange={(newValue) => {
                                setFiscalParameters({ ...fiscalParameters, validityCert: newValue });
                            }}
                            renderInput={(params) => <TextField sx={{}} {...params} variant="outlined" />}
                        />

                    </LocalizationProvider>

                    <TextField
                        value={fiscalParameters?.lastNumberNF}
                        onChange={(e) => {
                            setFiscalParameters({ ...fiscalParameters, lastNumberNF: Number(e.target.value) })
                        }}
                        id="outlined-basic"
                        label="Ultimo nº NFe Emitida"
                        InputLabelProps={{ shrink: !!fiscalParameters?.lastNumberNF }}
                        variant="outlined"
                        sx={{}}
                        disabled={fiscalParameters.taxCstCofinsId ? idsZeroAliquot.includes(fiscalParameters.taxCstCofinsId) : false}
                    />
                    <TextField
                        value={fiscalParameters?.lastNumberNFCE}
                        onChange={(e) => {
                            setFiscalParameters({ ...fiscalParameters, lastNumberNFCE: Number(e.target.value) })
                        }}
                        id="outlined-basic"
                        InputLabelProps={{ shrink: !!fiscalParameters?.lastNumberNFCE }}
                        label="Ultimo nº NFCe Emitida"
                        variant="outlined"
                        sx={{}}
                        disabled={fiscalParameters.taxCstCofinsId ? idsZeroAliquot.includes(fiscalParameters.taxCstCofinsId) : false}
                    />
                    <TextField
                        value={fiscalParameters?.codCSC}
                        onChange={(e) => {
                            setFiscalParameters({ ...fiscalParameters, codCSC: e.target.value })
                        }}
                        id="outlined-basic"
                        InputLabelProps={{ shrink: !!fiscalParameters?.codCSC }}
                        title='Token para geração do QRCode NFCe'
                        label="Código CSC"
                        variant="outlined"
                        sx={{}}
                        disabled={fiscalParameters.taxCstCofinsId ? idsZeroAliquot.includes(fiscalParameters.taxCstCofinsId) : false}
                    />
                </S.DivParams>
                <b>Tributação</b>
                <S.DivItem>
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
                        renderInput={(params) => <TextField title='Código de Regime Tributário'  {...params} label="CRT" />}
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
                        sx={{ width: '38%' }}
                        renderInput={(params) => <TextField  {...params} label="Regime Tributário" />}
                        disabled={selectedCrtOptions?.id !== 3}
                    />
                </S.DivItem>
                <S.DivItem>
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
                        type="number"
                        InputLabelProps={{ shrink: !!fiscalParameters?.taxCstCofinsAliquot }}
                        variant="outlined"
                        sx={{ width: '28%' }}
                        disabled={fiscalParameters.taxCstCofinsId ? idsZeroAliquot.includes(fiscalParameters.taxCstCofinsId) : false}
                    />
                </S.DivItem>
                <S.DivItem>
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
                        type="number"
                        InputLabelProps={{ shrink: !!fiscalParameters?.taxCstPisAliquot }}
                        variant="outlined"
                        disabled={fiscalParameters.taxCstPisId ? idsZeroAliquot.includes(fiscalParameters.taxCstPisId) : false}
                        sx={{ width: '28%' }}
                    />
                </S.DivItem>
                <S.ButtonSave onClick={() => reqChangeFiscalParameters()} ><b>Salvar</b></S.ButtonSave>

            </S.Container>

    )
}