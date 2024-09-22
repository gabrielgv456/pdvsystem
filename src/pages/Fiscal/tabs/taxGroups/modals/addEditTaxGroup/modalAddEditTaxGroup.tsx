import { Divider, Modal, Tab, Tabs, useMediaQuery } from '@mui/material'
import * as S from './style'
import { MuiBox } from 'src/components/box/muiBox'
import { DefaultButtonCloseModal, DefaultIconCloseModal } from 'src/components/buttons/closeButtonModal'
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { MdAssignment } from 'react-icons/md'
import { TabPanel } from 'src/components/tabPanel/tabPanel'
import { TabIcmsProduct } from 'src/pages/InventoryManagement/Modals/AddEditProduct/tabs/icmsProduct/icmsProduct'
import { TabIcmsSTProduct } from 'src/pages/InventoryManagement/Modals/AddEditProduct/tabs/icmsSTProduct/icmsSTProduct'
import { TabIpiPisCofinsProduct } from 'src/pages/InventoryManagement/Modals/AddEditProduct/tabs/ipiPisCofinsProduct/ipiPisCofinsProduct'
import { searchOptions } from 'src/pages/InventoryManagement/Modals/AddEditProduct/tabs/icmsProduct/interfaces'
import { useMessageBoxContext } from 'src/contexts/MessageBox/MessageBoxContext'
import { useApi } from 'src/hooks/useApi'
import { sharedAddEditProductRequest } from '@shared/api/inventoryManagement/productsRequest'
import { taxGroups } from '@shared/api/fiscal/getTaxGroups'
import { DefaultButton } from 'src/components/buttons/defaultButton'
import { TabPrincipalTaxGroup } from '../tabs/tabPrincipalTaxGroup'
import { sharedTaxGroupReqType } from '@shared/api/fiscal/CreatePutTaxGroup'
import { AuthContext } from 'src/contexts/Auth/AuthContext'



export const ModalAddEditTaxGroup = (props: ModalAddEditTaxGroupType) => {


    useEffect(() => {
        async function searchOptions() {
            try {
                const response = await findTaxOptions(idUser)
                if (!response.Success) { throw new Error(response.erro) }
                settaxOptions(response)
            } catch (error) {
                MessageBox('error', 'Falha ao buscar opções ICMS!' + ((error as Error).message ?? ''))
            }
        }
        searchOptions()
    }, [])

    const [taxOptions, settaxOptions] = useState<searchOptions | null>(null)
    const { idUser } = useContext(AuthContext)
    const { MessageBox } = useMessageBoxContext()
    const { findTaxOptions, postTaxGroups, putTaxGroups } = useApi()
    const isLess900 = useMediaQuery('(max-width:100px)')
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const defaultData: sharedTaxGroupReqType =
    {
        idUser,
        taxGroup: {
            description: props.selectedTaxGroup?.description ?? null,
            id: props.selectedTaxGroup?.id ?? null
        },
        icms: {
            TaxIcms: {
                taxIcmsOriginId: (props.selectedTaxGroup?.taxIcms?.taxIcmsOriginId) ?? null,
                fcpAliquot: (props.selectedTaxGroup?.taxIcms?.fcpAliquot) ?? null,
            },
            TaxIcmsNfce: {
                taxCstIcmsId: (props.selectedTaxGroup?.taxIcms?.taxIcmsNfce?.taxCstIcmsId) ?? null,
                taxAliquotIcms: (props.selectedTaxGroup?.taxIcms?.taxIcmsNfce?.taxAliquotIcms) ?? null,
                taxCfopDevolutionId: (props.selectedTaxGroup?.taxIcms?.taxIcmsNfce?.taxCfopDevolutionId) ?? null,
                taxCfopId: (props.selectedTaxGroup?.taxIcms?.taxIcmsNfce?.taxCfopId) ?? null,
                taxRedBCICMS: (props.selectedTaxGroup?.taxIcms?.taxIcmsNfce?.taxRedBCICMS) ?? null
            },
            TaxIcmsNfe: {
                taxCfopInterstateId: (props.selectedTaxGroup?.taxIcms?.taxIcmsNfe?.taxCfopInterstateId) ?? null,
                taxCstIcmsId: (props.selectedTaxGroup?.taxIcms?.taxIcmsNfe?.taxCstIcmsId) ?? null,
                taxAliquotIcms: (props.selectedTaxGroup?.taxIcms?.taxIcmsNfe?.taxAliquotIcms) ?? null,
                taxCfopStateId: (props.selectedTaxGroup?.taxIcms?.taxIcmsNfe?.taxCfopStateId) ?? null,
                taxModalityBCId: (props.selectedTaxGroup?.taxIcms?.taxIcmsNfe?.taxModalityBCId) ?? null,
                taxReasonExemptionId: (props.selectedTaxGroup?.taxIcms?.taxIcmsNfe?.taxReasonExemptionId) ?? null,
                taxRedBCICMS: (props.selectedTaxGroup?.taxIcms?.taxIcmsNfe?.taxRedBCICMS) ?? null,
            },
            TaxIcmsNoPayer: {
                taxAliquotIcms: (props.selectedTaxGroup?.taxIcms?.taxIcmsNoPayer?.taxAliquotIcms) ?? null,
                taxCstIcmsId: (props.selectedTaxGroup?.taxIcms?.taxIcmsNoPayer?.taxCstIcmsId) ?? null,
                taxRedBCICMS: (props.selectedTaxGroup?.taxIcms?.taxIcmsNoPayer?.taxRedBCICMS) ?? null,
            },
            TaxIcmsST: {
                taxAliquotIcmsInner: (props.selectedTaxGroup?.taxIcms?.taxIcmsSt?.taxAliquotIcmsInner) ?? null,
                taxCfopInterstateIdSt: (props.selectedTaxGroup?.taxIcms?.taxIcmsSt?.taxCfopInterstateIdSt) ?? null,
                taxCfopStateIdSt: (props.selectedTaxGroup?.taxIcms?.taxIcmsSt?.taxCfopStateIdSt) ?? null,
                taxCstIcmsStId: (props.selectedTaxGroup?.taxIcms?.taxIcmsSt?.taxCstIcmsStId) ?? null,
                taxMvaPauta: (props.selectedTaxGroup?.taxIcms?.taxIcmsSt?.taxMvaPauta) ?? null,
                taxModalityBCIdSt: (props.selectedTaxGroup?.taxIcms?.taxIcmsSt?.taxModalityBCIdSt) ?? null,
                taxRedBCICMSInner: (props.selectedTaxGroup?.taxIcms?.taxIcmsSt?.taxRedBCICMSInner) ?? null,
                taxRedBCICMSSt: (props.selectedTaxGroup?.taxIcms?.taxIcmsSt?.taxRedBCICMSSt) ?? null
            }
        },
        cofins: {
            taxAliquotCofinsEntrance: (props.selectedTaxGroup?.taxCofins?.taxAliquotCofinsEntrance) ?? null,
            taxAliquotCofinsExit: (props.selectedTaxGroup?.taxCofins?.taxAliquotCofinsExit) ?? null,
            taxCstCofinsEntranceId: (props.selectedTaxGroup?.taxCofins?.taxCstCofinsEntranceId) ?? null,
            taxCstCofinsExitId: (props.selectedTaxGroup?.taxCofins?.taxCstCofinsExitId) ?? null
        },
        ipi: {
            taxAliquotIpi: (props.selectedTaxGroup?.taxIpi?.taxAliquotIpi) ?? null,
            taxClassificationClassIpi: (props.selectedTaxGroup?.taxIpi?.taxClassificationClassIpi) ?? null,
            taxCnpjProd: (props.selectedTaxGroup?.taxIpi?.taxCnpjProd) ?? null,
            taxCodEnquadLegalIpi: (props.selectedTaxGroup?.taxIpi?.taxCodEnquadLegalIpi) ?? null,
            taxCstIpiEntranceId: (props.selectedTaxGroup?.taxIpi?.taxCstIpiEntranceId) ?? null,
            taxCstIpiExitId: (props.selectedTaxGroup?.taxIpi?.taxCstIpiExitId) ?? null,
            taxQtdStampControlIpi: (props.selectedTaxGroup?.taxIpi?.taxQtdStampControlIpi) ?? null,
            taxStampIpi: (props.selectedTaxGroup?.taxIpi?.taxStampIpi) ?? null,
        },
        pis: {
            taxAliquotPisEntrance: (props.selectedTaxGroup?.taxPis?.taxAliquotPisEntrance) ?? null,
            taxAliquotPisExit: (props.selectedTaxGroup?.taxPis?.taxAliquotPisExit) ?? null,
            taxCstPisEntranceId: (props.selectedTaxGroup?.taxPis?.taxCstPisEntranceId) ?? null,
            taxCstPisExitId: (props.selectedTaxGroup?.taxPis?.taxCstPisExitId) ?? null,
        }

    }

    const [taxData, setTaxData] = useState<sharedTaxGroupReqType>(defaultData)

    useEffect(() => { setTaxData(defaultData) }, [props.selectedTaxGroup])

    async function handleSave(data: sharedTaxGroupReqType) {
        try {
            if (props.type === 'Add') {
                const result = await postTaxGroups(data)
                if (!result.Success) throw new Error(result.erro ?? 'Erro desconhecido')
                MessageBox('success', 'Registro criado com sucesso')

            } else if (props.type === 'Edit') {
                const result = await putTaxGroups(data)
                if (!result.Success) throw new Error(result.erro ?? 'Erro desconhecido')
                MessageBox('success', 'Registro editado com sucesso')
            }
            props.setIsModalOpen(false)
            props.searchTaxGroups()
        } catch (error) {
            MessageBox('error', "Falha ao salvar grupo de tributação! " + (error as Error).message)
        }

    }

    if (taxData)
        return (
            <Modal open={props.isModalOpen} onClose={() => props.setIsModalOpen(false)}>
                <MuiBox desktopWidth={1200} mobileWidthPercent='80%' padding='40px'>

                    <h3 style={{ width: 'max-content', margin: '0 auto', marginBottom: 15 }}>
                        {` ${props.type === 'Add' ? 'Adicionar' : 'Editar'} Grupo de Tributação`}
                    </h3>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label={isLess900 ? '' : "Principal"} title='Principal' {...a11yProps(1)} icon={<MdAssignment size={20} />} iconPosition='start' />
                        <Tab label={isLess900 ? '' : "ICMS"} title='Parâmetros Fiscais' {...a11yProps(1)} icon={<MdAssignment size={20} />} iconPosition='start' />
                        <Tab label={isLess900 ? '' : "ICMS ST"} title='Parâmetros Fiscais' {...a11yProps(2)} icon={<MdAssignment size={20} />} iconPosition='start' />
                        <Tab label={isLess900 ? '' : "IPI/PIS/COFINS"} title='Parâmetros Fiscais' {...a11yProps(3)} icon={<MdAssignment size={20} />} iconPosition='start' />
                    </Tabs>


                    <TabPanel value={value} index={0}>
                        <TabPrincipalTaxGroup
                            dataAddEditTaxGroup={taxData}
                            setDataAddEditTaxGroup={setTaxData}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <TabIcmsProduct
                            dataAddEditTaxGroup={taxData}
                            setDataAddEditTaxGroup={setTaxData}
                            taxOptions={taxOptions}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <TabIcmsSTProduct
                            dataAddEditTaxGroup={taxData}
                            setDataAddEditTaxGroup={setTaxData}
                            taxOptions={taxOptions}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <TabIpiPisCofinsProduct
                            dataAddEditTaxGroup={taxData}
                            setDataAddEditTaxGroup={setTaxData}
                            taxOptions={taxOptions}
                        />
                    </TabPanel>
                    <Divider />

                    <div style={{ display: 'flex', marginTop: 20, width: '100%', justifyContent: 'center' }}>
                        <DefaultButton onClick={() => handleSave(taxData)} selectedColor='--Green' padding='0.7rem 1.3rem 0.7rem 1.3rem'>Salvar</DefaultButton>
                    </div>
                    <DefaultButtonCloseModal onClick={() => props.setIsModalOpen(false)}>
                        <DefaultIconCloseModal />
                    </DefaultButtonCloseModal>

                </MuiBox>

            </Modal >
        )
    else return (<></>)
}

type ModalAddEditTaxGroupType = {
    type: 'Add' | 'Edit'
    searchTaxGroups: () => void
    isModalOpen: boolean,
    selectedTaxGroup?: taxGroups,
    setIsModalOpen: Dispatch<SetStateAction<any>>
}

