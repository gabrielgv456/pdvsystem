
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useContext, useEffect, useState } from 'react';
import * as type from './interfaces'
import { FiPackage } from 'react-icons/fi'
import { TabInfoProduct } from './tabs/infoProduct';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { MdAssignment } from 'react-icons/md';
import { Divider, useMediaQuery } from '@mui/material';
import { TabIcmsProduct } from './tabs/icmsProduct/icmsProduct';
import { MuiBox } from '../../../../components/box/muiBox';
import { DefaultButtonCloseModal, DefaultIconCloseModal } from '../../../../components/buttons/closeButtonModal';
import { TabIpiPisCofinsProduct } from './tabs/ipiPisCofinsProduct/ipiPisCofinsProduct';
import { TabIcmsSTProduct } from './tabs/icmsSTProduct/icmsSTProduct';
import { SaveProduct } from './saveProduct/saveProduct';
import { AuthContext } from '../../../../contexts/Auth/AuthContext'
import { TabPanel } from '../../../../components/tabPanel/tabPanel';
import { ProductsReturnApiProps } from '../../interfaces';
import { searchOptions } from './tabs/icmsProduct/interfaces';
import { useMessageBoxContext } from '../../../../contexts/MessageBox/MessageBoxContext';
import { useApi } from '../../../../hooks/useApi';



interface PropsModalAddProduct {
    isModalAddEditProductOpen: boolean;
    setisModalAddEditProductOpen: (value: boolean) => void;
    setisModalSucessOpen: (value: boolean) => void;
    type: 'Add' | 'Edit';
    itemData?: ProductsReturnApiProps;
}

export const ModalAddEditProduct = (props: PropsModalAddProduct) => {

    useEffect(() => {
        setDataAddEditProduct(defaultDataEditProduct)
    }, [props.itemData])

    useEffect(() => {
        async function searchOptions() {
            try {
                const response = await findIcmsOptions()
                if (!response.Success) { throw new Error(response.erro) }
                setIcmsOptions(response)
            } catch (error) {
                MessageBox('error', 'Falha ao buscar opções ICMS!' + ((error as Error).message ?? ''))
            }
        }
        searchOptions()
    }, [])

    const [icmsOptions, setIcmsOptions] = useState<searchOptions | null>(null)
    const auth = useContext(AuthContext)
    const { findIcmsOptions } = useApi()
    const { MessageBox } = useMessageBoxContext()
    const isLess900 = useMediaQuery('(max-width:100px)')
    const [value, setValue] = useState(0);

    const defaultDataEditProduct: type.addEditProductDataSend = {
        principal: {
            id: props.itemData?.id,
            userId: auth.idUser,
            codRef: props.itemData?.codRef ?? null,
            brand: props.itemData?.brand ?? null,
            exTipi: props.itemData?.exTipi ?? null,
            name: props.itemData?.name ?? '',
            value: props.itemData?.value ?? 0,
            quantity: props.itemData?.quantity ?? 0,
            active: props.itemData?.active ?? true,
            cost: props.itemData?.cost ?? null,
            profitMargin: props.itemData?.profitMargin ?? null,
            barCode: props.itemData?.barCode ?? null,
            ncmCode: props.itemData?.ncmCode ?? null,
            itemTypeId: (props.itemData ? props.itemData.itemTypeId : null),
            cfopId: props.itemData?.cfopId ?? null,
            unitMeasurement: props.itemData?.unitMeasurement ?? 'UN',
            imageId: props.itemData?.imageId ?? null,
            urlImage: props.itemData?.urlImage ?? null
        },
        icms: {
            TaxIcms: {
                taxIcmsOriginId: (props.itemData?.taxIcms[0]?.taxIcmsOriginId) ?? null,
                fcpAliquot: (props.itemData?.taxIcms[0]?.fcpAliquot) ?? null,
            },
            TaxIcmsNfce: {
                taxCstIcmsId: (props.itemData?.taxIcms[0]?.taxIcmsNfce[0]?.taxCstIcmsId) ?? null,
                taxAliquotIcms: (props.itemData?.taxIcms[0]?.taxIcmsNfce[0]?.taxAliquotIcms) ?? null,
                taxCfopDevolutionId: (props.itemData?.taxIcms[0]?.taxIcmsNfce[0]?.taxCfopDevolutionId) ?? null,
                taxCfopId: (props.itemData?.taxIcms[0]?.taxIcmsNfce[0]?.taxCfopId) ?? null,
                taxRedBCICMS: (props.itemData?.taxIcms[0]?.taxIcmsNfce[0]?.taxRedBCICMS) ?? null
            },
            TaxIcmsNfe: {
                taxCfopInterstateId: (props.itemData?.taxIcms[0]?.taxIcmsNfe[0]?.taxCfopInterstateId) ?? null,
                taxCstIcmsId: (props.itemData?.taxIcms[0]?.taxIcmsNfe[0]?.taxCstIcmsId) ?? null,
                taxAliquotIcms: (props.itemData?.taxIcms[0]?.taxIcmsNfe[0]?.taxAliquotIcms) ?? null,
                taxCfopStateId: (props.itemData?.taxIcms[0]?.taxIcmsNfe[0]?.taxCfopStateId) ?? null,
                taxModalityBCId: (props.itemData?.taxIcms[0]?.taxIcmsNfe[0]?.taxModalityBCId) ?? null,
                taxReasonExemptionId: (props.itemData?.taxIcms[0]?.taxIcmsNfe[0]?.taxReasonExemptionId) ?? null,
                taxRedBCICMS: (props.itemData?.taxIcms[0]?.taxIcmsNfe[0]?.taxRedBCICMS) ?? null,
            },
            TaxIcmsNoPayer: {
                taxAliquotIcms: (props.itemData?.taxIcms[0]?.taxIcmsNoPayer[0]?.taxAliquotIcms) ?? null,
                taxCstIcmsId: (props.itemData?.taxIcms[0]?.taxIcmsNoPayer[0]?.taxCstIcmsId) ?? null,
                taxRedBCICMS: (props.itemData?.taxIcms[0]?.taxIcmsNoPayer[0]?.taxRedBCICMS) ?? null,
            },
            TaxIcmsST: {
                taxAliquotIcmsInner: (props.itemData?.taxIcms[0]?.taxIcmsSt[0]?.taxAliquotIcmsInner) ?? null,
                taxCfopInterstateIdSt: (props.itemData?.taxIcms[0]?.taxIcmsSt[0]?.taxCfopInterstateIdSt) ?? null,
                taxCfopStateIdSt: (props.itemData?.taxIcms[0]?.taxIcmsSt[0]?.taxCfopStateIdSt) ?? null,
                taxCstIcmsStId: (props.itemData?.taxIcms[0]?.taxIcmsSt[0]?.taxCstIcmsStId) ?? null,
                taxMvaPauta: (props.itemData?.taxIcms[0]?.taxIcmsSt[0]?.taxMvaPauta) ?? null,
                taxModalityBCIdSt: (props.itemData?.taxIcms[0]?.taxIcmsSt[0]?.taxModalityBCIdSt) ?? null,
                taxRedBCICMSInner: (props.itemData?.taxIcms[0]?.taxIcmsSt[0]?.taxRedBCICMSInner) ?? null,
                taxRedBCICMSSt: (props.itemData?.taxIcms[0]?.taxIcmsSt[0]?.taxRedBCICMSSt) ?? null
            }
        },
        cofins: {
            taxAliquotCofinsEntrance: (props.itemData?.taxCofins[0]?.taxAliquotCofinsEntrance) ?? null,
            taxAliquotCofinsExit: (props.itemData?.taxCofins[0]?.taxAliquotCofinsExit) ?? null,
            taxCstCofinsEntranceId: (props.itemData?.taxCofins[0]?.taxCstCofinsEntranceId) ?? null,
            taxCstCofinsExitId: (props.itemData?.taxCofins[0]?.taxCstCofinsExitId) ?? null
        },
        ipi: {
            taxAliquotIpi: (props.itemData?.taxIpi[0]?.taxAliquotIpi) ?? null,
            taxClassificationClassIpi: (props.itemData?.taxIpi[0]?.taxClassificationClassIpi) ?? null,
            taxCnpjProd: (props.itemData?.taxIpi[0]?.taxCnpjProd) ?? null,
            taxCodEnquadLegalIpi: (props.itemData?.taxIpi[0]?.taxCodEnquadLegalIpi) ?? null,
            taxCstIpiEntranceId: (props.itemData?.taxIpi[0]?.taxCstIpiEntranceId) ?? null,
            taxCstIpiExitId: (props.itemData?.taxIpi[0]?.taxCstIpiExitId) ?? null,
            taxQtdStampControlIpi: (props.itemData?.taxIpi[0]?.taxQtdStampControlIpi) ?? null,
            taxStampIpi: (props.itemData?.taxIpi[0]?.taxStampIpi) ?? null,
        },
        pis: {
            taxAliquotPisEntrance: (props.itemData?.taxPis[0]?.taxAliquotPisEntrance) ?? null,
            taxAliquotPisExit: (props.itemData?.taxPis[0]?.taxAliquotPisExit) ?? null,
            taxCstPisEntranceId: (props.itemData?.taxPis[0]?.taxCstPisEntranceId) ?? null,
            taxCstPisExitId: (props.itemData?.taxPis[0]?.taxCstPisExitId) ?? null,
        }
    }

    const [dataAddEditProduct, setDataAddEditProduct] = useState<type.addEditProductDataSend>(defaultDataEditProduct)

    function handleCloseModalAddProduct() {
        props.setisModalAddEditProductOpen(false)
    }

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    return (

        <Modal open={props.isModalAddEditProductOpen} onClose={handleCloseModalAddProduct}>
            <MuiBox desktopWidth='80%' mobileWidthPercent='80%' padding='15px 7px 0px 7px' >

                <h3 style={{ width: 'max-content', margin: '0 auto' }}>{props.type === 'Add' ? 'Cadastro de produto' : 'Edição de produto'}</h3>

                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange}  >
                        <Tab label={isLess900 ? '' : 'Principal'} title='Principal' sx={{ borderRadius: '10px 0px 0px 0px' }} {...a11yProps(0)} icon={<FiPackage size={20} />} iconPosition='start' />
                        {(auth.user?.plans?.fiscalAccess ?? false) &&
                            <Tab label={isLess900 ? '' : "ICMS"} title='Parâmetros Fiscais' {...a11yProps(1)} icon={<MdAssignment size={20} />} iconPosition='start' />
                        }
                        {(auth.user?.plans?.fiscalAccess ?? false) &&
                            <Tab label={isLess900 ? '' : "ICMS ST"} title='Parâmetros Fiscais' {...a11yProps(2)} icon={<MdAssignment size={20} />} iconPosition='start' />
                        }
                        {(auth.user?.plans?.fiscalAccess ?? false) &&
                            <Tab label={isLess900 ? '' : "IPI/PIS/COFINS"} title='Parâmetros Fiscais' {...a11yProps(3)} icon={<MdAssignment size={20} />} iconPosition='start' />
                        }

                    </Tabs>
                </Box>
                <div>
                    <TabPanel value={value} index={0}>
                        <TabInfoProduct
                            dataAddEditProduct={dataAddEditProduct}
                            setDataAddEditProduct={setDataAddEditProduct}
                            itemData={props.itemData}
                        />
                    </TabPanel>
                    {(auth.user?.plans?.fiscalAccess ?? false) &&
                        <>
                            <TabPanel value={value} index={1}>
                                <TabIcmsProduct
                                    dataAddEditProduct={dataAddEditProduct}
                                    setDataAddEditProduct={setDataAddEditProduct}
                                    icmsOptions={icmsOptions}
                                />
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <TabIcmsSTProduct
                                    dataAddEditProduct={dataAddEditProduct}
                                    setDataAddEditProduct={setDataAddEditProduct}
                                    icmsOptions={icmsOptions}
                                />
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                <TabIpiPisCofinsProduct
                                    dataAddEditProduct={dataAddEditProduct}
                                    setDataAddEditProduct={setDataAddEditProduct}
                                    taxOptions={icmsOptions}
                                />
                            </TabPanel>
                        </>}
                </div>

                <SaveProduct
                    type={props.type}
                    dataToSend={dataAddEditProduct}
                    setisModalAddEditProductOpen={props.setisModalAddEditProductOpen}
                    setisModalSucessOpen={props.setisModalSucessOpen}
                    defaultDataEditProduct={defaultDataEditProduct}
                    setDataAddEditProduct={setDataAddEditProduct}
                ></SaveProduct>
                <DefaultButtonCloseModal onClick={handleCloseModalAddProduct}>
                    <DefaultIconCloseModal />
                </DefaultButtonCloseModal>
            </MuiBox>
        </Modal>
    )
}












