import * as S from './style'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { optionsType, searchOptions, taxTabsType } from '../icmsProduct/interfaces';
import { ipiPisCofinsProps, taxCofinsType } from './interfaces';
import { cpfCnpjFormat } from '../../../../../../utils/utils';
import { sharedAddEditProductRequest } from '@shared/api/inventoryManagement/productsRequest';

export const TabIpiPisCofinsProduct = (props: taxTabsType) => {

    const data = props.dataAddEditProduct ?? props.dataAddEditTaxGroup

    function findOption<T extends keyof Omit<sharedAddEditProductRequest, "principal">, S extends keyof searchOptions, K extends keyof Omit<sharedAddEditProductRequest, "principal">[T]>(
        property: T,
        key: K,
        option: S
    ): optionsType | null {
        if (!props.taxOptions || !data) return null
        const taxId = data[property][key]
        const array: optionsType[] = props.taxOptions[option]
        return array.find(
            item => item.id === Number(taxId))
            ?? null
    }

    function handleChangeTax<T extends keyof sharedAddEditProductRequest, K extends keyof sharedAddEditProductRequest[T]>(
        property: T,
        key: K,
        value: sharedAddEditProductRequest[T][K]
    ) {

        const updateState = (prevState: any) => ({
            ...prevState,
            [property]: {
                ...prevState[property],
                [key]: value,
            },
         })

         if (props.setDataAddEditProduct) {
            props.setDataAddEditProduct(prevState => updateState(prevState));
        }

        if (props.setDataAddEditTaxGroup) {
            props.setDataAddEditTaxGroup(prevState => updateState(prevState));
        }

    }

    if (data) {
        return (
            <S.Container>
                <S.SectionContainer style={{ marginTop: 0 }}>
                    <b style={{ display: 'flex', alignSelf: 'flex-start', flex: '1 1 100%' }}>IPI</b>
                    <Autocomplete
                        value={findOption('ipi', 'taxCstIpiExitId', 'cstIpiExitOptions')}
                        onChange={(_event: any, newValue: optionsType | null) => {
                            handleChangeTax('ipi', 'taxCstIpiExitId', newValue?.id ?? null)
                        }}
                        noOptionsText="Não encontrado"
                        id="controllable-states-demo"
                        options={props.taxOptions?.cstIpiExitOptions ?? []}
                        size='small'
                        getOptionLabel={(option) => (option.description)}
                        sx={{ flex: '1 1 200px' }}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="CST IPI Saída"
                            />
                        } />
                    <TextField
                        value={data.ipi.taxAliquotIpi}
                        onChange={(e) => handleChangeTax('ipi', 'taxAliquotIpi', Number(e.target.value))}
                        disabled={!findOption('ipi', 'taxCstIpiExitId', 'cstIpiExitOptions')}
                        type="number"
                        id="outlined-basic"
                        label="Alíquota IPI(%)"
                        size='small'
                        variant="outlined"
                        sx={{ flex: '1 1 150px' }} />
                    <TextField
                        value={data.ipi.taxClassificationClassIpi}
                        onChange={(e) => handleChangeTax('ipi', 'taxClassificationClassIpi', e.target.value)}
                        size='small'
                        id="outlined-basic"
                        label="Classe Enquadramento IPI"
                        variant="outlined"
                        sx={{ flex: '1 1 250px' }}
                    />
                    <TextField
                        value={data.ipi.taxStampIpi}
                        onChange={(e) => handleChangeTax('ipi', 'taxStampIpi', e.target.value)}
                        id="outlined-basic"
                        size='small'
                        label="Selo IPI"
                        variant="outlined"
                        sx={{ flex: '1 1 120px' }}
                    />
                    <TextField
                        value={data.ipi.taxQtdStampControlIpi}
                        onChange={(e) => handleChangeTax('ipi', 'taxQtdStampControlIpi', Number(e.target.value))}
                        type="number"
                        size='small'
                        id="outlined-basic"
                        label="Qtde de Selo Controle"
                        variant="outlined"
                        sx={{ flex: '1 1 190px' }}
                    />
                    <TextField
                        value={data.ipi.taxCodEnquadLegalIpi}
                        onChange={(e) => handleChangeTax('ipi', 'taxCodEnquadLegalIpi', e.target.value)}
                        type="number"
                        size='small'
                        id="outlined-basic"
                        label="Cód. Enquadramento Legal"
                        variant="outlined"
                        sx={{ flex: '1 1 240px' }}
                    />
                    <TextField
                        value={data.ipi.taxCnpjProd}
                        onChange={(e) => handleChangeTax('ipi', 'taxCnpjProd', cpfCnpjFormat(e.target.value))}
                        size='small'
                        id="outlined-basic"
                        label="CNPJ Produtor Mercadoria"
                        variant="outlined"
                        sx={{ flex: '1 1 240px' }}
                    />
                    <Autocomplete
                        value={findOption('ipi', 'taxCstIpiEntranceId', 'cstIpiEntranceOptions')}
                        onChange={(_event: any, newValue: optionsType | null) => {
                            handleChangeTax('ipi', 'taxCstIpiEntranceId', newValue?.id ?? null)
                        }}
                        noOptionsText="Não encontrado"
                        id="controllable-states-demo"
                        options={props.taxOptions?.cstIpiEntranceOptions ?? []}
                        getOptionLabel={(option) => (option.description)}
                        size='small'
                        sx={{ flex: '1 1 200px' }}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="CST IPI Entrada"
                            />
                        } />

                </S.SectionContainer>

                <S.SectionContainer>

                    <b style={{ display: 'flex', alignSelf: 'flex-start', flex: '1 1 100%' }}>PIS</b>
                    <Autocomplete
                        value={findOption('pis', 'taxCstPisExitId', 'cstPisExitOptions')}
                        onChange={(_event: any, newValue: optionsType | null) => {
                            handleChangeTax('pis', 'taxCstPisExitId', newValue?.id ?? null)
                        }}
                        noOptionsText="Não encontrado"
                        id="controllable-states-demo"
                        options={props.taxOptions?.cstPisExitOptions ?? []}
                        getOptionLabel={(option) => (option.description)}
                        size='small'
                        sx={{ flex: '1 1 180px' }}

                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="CST PIS Saída*"
                            />
                        } />
                    <TextField
                        value={data.pis.taxAliquotPisExit}
                        onChange={(e) => handleChangeTax('pis', 'taxAliquotPisExit', Number(e.target.value))}
                        disabled={!findOption('pis', 'taxCstPisExitId', 'cstPisExitOptions')}
                        type="number"
                        id="outlined-basic"
                        size='small'
                        label="Alíquota PIS Saída(%)"
                        variant="outlined"
                        sx={{ flex: '1 1 180px' }} />
                    <Autocomplete
                        value={findOption('pis', 'taxCstPisEntranceId', 'cstPisExitOptions')}
                        onChange={(_event: any, newValue: optionsType | null) => {
                            handleChangeTax('pis', 'taxCstPisEntranceId', newValue?.id ?? null)
                        }}
                        noOptionsText="Não encontrado"
                        getOptionLabel={(option) => (option.description)}
                        id="controllable-states-demo"
                        options={props.taxOptions?.cstPisEntranceOptions ?? []}
                        size='small'
                        sx={{ flex: '1 1 180px' }}

                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="CST PIS Entrada"
                            />
                        } />
                    <TextField
                        value={data.pis.taxAliquotPisEntrance}
                        onChange={(e) => handleChangeTax('pis', 'taxAliquotPisEntrance', Number(e.target.value))}
                        disabled={!findOption('pis', 'taxCstPisEntranceId', 'cstPisExitOptions')}
                        type="number"
                        size='small'
                        id="outlined-basic"
                        label="Alíquota PIS Entrada(%)"
                        variant="outlined"
                        sx={{ flex: '1 1 180px' }}
                    />
                </S.SectionContainer>
                <S.SectionContainer>
                    <b style={{ display: 'flex', alignSelf: 'flex-start', width: '100%' }}>COFINS</b>
                    <Autocomplete
                        value={findOption('cofins', 'taxCstCofinsExitId', 'cstCofinsExitOptions')}
                        onChange={(_event: any, newValue: optionsType | null) => {
                            handleChangeTax('cofins', 'taxCstCofinsExitId', newValue?.id ?? null)
                        }}
                        noOptionsText="Não encontrado"
                        id="controllable-states-demo"
                        getOptionLabel={(option) => (option.description)}
                        options={props.taxOptions?.cstCofinsExitOptions ?? []}
                        size='small'
                        sx={{ flex: '1 1 180px' }}

                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="CST COFINS Saída*"
                            />
                        } />
                    <TextField
                        value={data.cofins.taxAliquotCofinsExit}
                        onChange={(e) => handleChangeTax('cofins', 'taxAliquotCofinsExit', Number(e.target.value))}
                        disabled={!findOption('cofins', 'taxCstCofinsExitId', 'cstCofinsExitOptions')}
                        type="number"
                        id="outlined-basic"
                        size='small'
                        label="Alíquota COFINS Saída(%)"
                        variant="outlined"
                        sx={{ flex: '1 1 230px' }} />
                    <Autocomplete
                        value={findOption('cofins', 'taxCstCofinsEntranceId', 'cstCofinsEntranceOptions')}
                        onChange={(_event: any, newValue: optionsType | null) => {
                            handleChangeTax('cofins', 'taxCstCofinsEntranceId', newValue?.id ?? null)
                        }}
                        noOptionsText="Não encontrado"
                        getOptionLabel={(option) => (option.description)}
                        id="controllable-states-demo"
                        options={props.taxOptions?.cstCofinsEntranceOptions ?? []}
                        size='small'
                        sx={{ flex: '1 1 200px' }}

                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="CST COFINS Entrada"
                            />
                        } />
                    <TextField
                        value={data.cofins.taxAliquotCofinsEntrance}
                        onChange={(e) => handleChangeTax('cofins', 'taxAliquotCofinsEntrance', Number(e.target.value))}
                        disabled={!findOption('cofins', 'taxCstCofinsEntranceId', 'cstCofinsEntranceOptions')}
                        type="number"
                        size='small'
                        id="outlined-basic"
                        label="Alíquota COFINS Entrada(%)"
                        variant="outlined"
                        sx={{ flex: '1 1 2000px' }}
                    />
                </S.SectionContainer>
            </S.Container>


        )
    } else
        return <></>
}