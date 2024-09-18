import { Modal, Tab, Tabs, useMediaQuery } from '@mui/material'
import * as S from './style'
import { MuiBox } from 'src/components/box/muiBox'
import { DefaultButtonCloseModal, DefaultIconCloseModal } from 'src/components/buttons/closeButtonModal'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { MdAssignment } from 'react-icons/md'
import { TabPanel } from 'src/components/tabPanel/tabPanel'
import { TabIcmsProduct } from 'src/pages/InventoryManagement/Modals/AddEditProduct/tabs/icmsProduct/icmsProduct'
import { TabIcmsSTProduct } from 'src/pages/InventoryManagement/Modals/AddEditProduct/tabs/icmsSTProduct/icmsSTProduct'
import { TabIpiPisCofinsProduct } from 'src/pages/InventoryManagement/Modals/AddEditProduct/tabs/ipiPisCofinsProduct/ipiPisCofinsProduct'
import { searchOptions } from 'src/pages/InventoryManagement/Modals/AddEditProduct/tabs/icmsProduct/interfaces'
import { useMessageBoxContext } from 'src/contexts/MessageBox/MessageBoxContext'
import { useApi } from 'src/hooks/useApi'
import { sharedAddEditProductRequest } from '@shared/api/inventoryManagement/productsRequest'



export const ModalAddEditTaxGroup = (props: ModalAddEditTaxGroupType) => {


    useEffect(() => {
        async function searchOptions() {
            try {
                const response = await findIcmsOptions()
                if (!response.Success) { throw new Error(response.erro) }
                settaxOptions(response)
            } catch (error) {
                MessageBox('error', 'Falha ao buscar opções ICMS!' + ((error as Error).message ?? ''))
            }
        }
        searchOptions()
    }, [])

    const [taxOptions, settaxOptions] = useState<searchOptions | null>(null)
    const { MessageBox } = useMessageBoxContext()
    const { findIcmsOptions } = useApi()
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

    const defaultData: Omit<sharedAddEditProductRequest, 'principal'> =
    {
        icms: {
            TaxIcms: {
                taxIcmsOriginId: null,
                fcpAliquot: null,
            },
            TaxIcmsNfce: {
                taxCstIcmsId: null,
                taxAliquotIcms: null,
                taxCfopDevolutionId: null,
                taxCfopId: null,
                taxRedBCICMS: null
            },
            TaxIcmsNfe: {
                taxCfopInterstateId: null,
                taxCstIcmsId: null,
                taxAliquotIcms: null,
                taxCfopStateId: null,
                taxModalityBCId: null,
                taxReasonExemptionId: null,
                taxRedBCICMS: null,
            },
            TaxIcmsNoPayer: {
                taxAliquotIcms: null,
                taxCstIcmsId: null,
                taxRedBCICMS: null,
            },
            TaxIcmsST: {
                taxAliquotIcmsInner: null,
                taxCfopInterstateIdSt: null,
                taxCfopStateIdSt: null,
                taxCstIcmsStId: null,
                taxMvaPauta: null,
                taxModalityBCIdSt: null,
                taxRedBCICMSInner: null,
                taxRedBCICMSSt: null
            }
        },
        cofins: {
            taxAliquotCofinsEntrance: null,
            taxAliquotCofinsExit: null,
            taxCstCofinsEntranceId: null,
            taxCstCofinsExitId: null
        },
        ipi: {
            taxAliquotIpi: null,
            taxClassificationClassIpi: null,
            taxCnpjProd: null,
            taxCodEnquadLegalIpi: null,
            taxCstIpiEntranceId: null,
            taxCstIpiExitId: null,
            taxQtdStampControlIpi: null,
            taxStampIpi: null,
        },
        pis: {
            taxAliquotPisEntrance: null,
            taxAliquotPisExit: null,
            taxCstPisEntranceId: null,
            taxCstPisExitId: null,
        }

    }

    const [taxData, setTaxData] = useState<Omit<sharedAddEditProductRequest, 'principal'>>(defaultData)

    if (taxData)
        return (
            <Modal open={props.isModalOpen} onClose={() => props.setIsModalOpen(false)}>

                <MuiBox desktopWidth={700} mobileWidthPercent='80%' padding='40px'>


                    <h3 style={{ width: 'max-content', margin: '0 auto', marginBottom: 15 }}>
                        {` ${props.type === 'Add' ? 'Adicionar' : 'Editar'} Grupo de Tributação`}
                    </h3>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label={isLess900 ? '' : "ICMS"} title='Parâmetros Fiscais' {...a11yProps(1)} icon={<MdAssignment size={20} />} iconPosition='start' />
                        <Tab label={isLess900 ? '' : "ICMS ST"} title='Parâmetros Fiscais' {...a11yProps(2)} icon={<MdAssignment size={20} />} iconPosition='start' />
                        <Tab label={isLess900 ? '' : "IPI/PIS/COFINS"} title='Parâmetros Fiscais' {...a11yProps(3)} icon={<MdAssignment size={20} />} iconPosition='start' />
                    </Tabs>

                    <TabPanel value={value} index={0}>
                        <TabIcmsProduct
                            dataAddEditTaxGroup={taxData}
                            setDataAddEditTaxGroup={setTaxData}
                            taxOptions={taxOptions}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <TabIcmsSTProduct
                            dataAddEditTaxGroup={taxData}
                            setDataAddEditTaxGroup={setTaxData}
                            taxOptions={taxOptions}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <TabIpiPisCofinsProduct
                            dataAddEditTaxGroup={taxData}
                            setDataAddEditTaxGroup={setTaxData}
                            taxOptions={taxOptions}
                        />
                    </TabPanel>

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
    isModalOpen: boolean,
    setIsModalOpen: Dispatch<SetStateAction<any>>
}