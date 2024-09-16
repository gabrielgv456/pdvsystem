
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
import { sharedProdutcsType } from '@shared/api/inventoryManagement/productsResponse';
import { sharedAddEditProductRequest } from '@shared/api/inventoryManagement/productsRequest';



interface PropsModalAddProduct {
    isModalAddEditProductOpen: boolean;
    setisModalAddEditProductOpen: (value: boolean) => void;
    setisModalSucessOpen: (value: boolean) => void;
    type: 'Add' | 'Edit';
    itemData?: sharedProdutcsType;
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

    const defaultDataEditProduct: sharedAddEditProductRequest = {
        principal: {
            id: props.itemData?.id ?? null,
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
            unitMeasurement: props.itemData?.unitMeasurement ?? 'UN',
            imageId: props.itemData?.imageId ?? null,
            urlImage: props.itemData?.urlImage ?? null
        },
        icms: {
            TaxIcms: {
                taxIcmsOriginId: (props.itemData?.taxGroup?.taxIcms?.taxIcmsOriginId) ?? null,
                fcpAliquot: (props.itemData?.taxGroup?.taxIcms?.fcpAliquot) ?? null,
            },
            TaxIcmsNfce: {
                taxCstIcmsId: (props.itemData?.taxGroup?.taxIcms?.taxIcmsNfce?.taxCstIcmsId) ?? null,
                taxAliquotIcms: (props.itemData?.taxGroup?.taxIcms?.taxIcmsNfce?.taxAliquotIcms) ?? null,
                taxCfopDevolutionId: (props.itemData?.taxGroup?.taxIcms?.taxIcmsNfce?.taxCfopDevolutionId) ?? null,
                taxCfopId: (props.itemData?.taxGroup?.taxIcms?.taxIcmsNfce?.taxCfopId) ?? null,
                taxRedBCICMS: (props.itemData?.taxGroup?.taxIcms?.taxIcmsNfce?.taxRedBCICMS) ?? null
            },
            TaxIcmsNfe: {
                taxCfopInterstateId: (props.itemData?.taxGroup?.taxIcms?.taxIcmsNfe?.taxCfopInterstateId) ?? null,
                taxCstIcmsId: (props.itemData?.taxGroup?.taxIcms?.taxIcmsNfe?.taxCstIcmsId) ?? null,
                taxAliquotIcms: (props.itemData?.taxGroup?.taxIcms?.taxIcmsNfe?.taxAliquotIcms) ?? null,
                taxCfopStateId: (props.itemData?.taxGroup?.taxIcms?.taxIcmsNfe?.taxCfopStateId) ?? null,
                taxModalityBCId: (props.itemData?.taxGroup?.taxIcms?.taxIcmsNfe?.taxModalityBCId) ?? null,
                taxReasonExemptionId: (props.itemData?.taxGroup?.taxIcms?.taxIcmsNfe?.taxReasonExemptionId) ?? null,
                taxRedBCICMS: (props.itemData?.taxGroup?.taxIcms?.taxIcmsNfe?.taxRedBCICMS) ?? null,
            },
            TaxIcmsNoPayer: {
                taxAliquotIcms: (props.itemData?.taxGroup?.taxIcms?.taxIcmsNoPayer?.taxAliquotIcms) ?? null,
                taxCstIcmsId: (props.itemData?.taxGroup?.taxIcms?.taxIcmsNoPayer?.taxCstIcmsId) ?? null,
                taxRedBCICMS: (props.itemData?.taxGroup?.taxIcms?.taxIcmsNoPayer?.taxRedBCICMS) ?? null,
            },
            TaxIcmsST: {
                taxAliquotIcmsInner: (props.itemData?.taxGroup?.taxIcms?.taxIcmsSt?.taxAliquotIcmsInner) ?? null,
                taxCfopInterstateIdSt: (props.itemData?.taxGroup?.taxIcms?.taxIcmsSt?.taxCfopInterstateIdSt) ?? null,
                taxCfopStateIdSt: (props.itemData?.taxGroup?.taxIcms?.taxIcmsSt?.taxCfopStateIdSt) ?? null,
                taxCstIcmsStId: (props.itemData?.taxGroup?.taxIcms?.taxIcmsSt?.taxCstIcmsStId) ?? null,
                taxMvaPauta: (props.itemData?.taxGroup?.taxIcms?.taxIcmsSt?.taxMvaPauta) ?? null,
                taxModalityBCIdSt: (props.itemData?.taxGroup?.taxIcms?.taxIcmsSt?.taxModalityBCIdSt) ?? null,
                taxRedBCICMSInner: (props.itemData?.taxGroup?.taxIcms?.taxIcmsSt?.taxRedBCICMSInner) ?? null,
                taxRedBCICMSSt: (props.itemData?.taxGroup?.taxIcms?.taxIcmsSt?.taxRedBCICMSSt) ?? null
            }
        },
        cofins: {
            taxAliquotCofinsEntrance: (props.itemData?.taxGroup?.taxCofins?.taxAliquotCofinsEntrance) ?? null,
            taxAliquotCofinsExit: (props.itemData?.taxGroup?.taxCofins?.taxAliquotCofinsExit) ?? null,
            taxCstCofinsEntranceId: (props.itemData?.taxGroup?.taxCofins?.taxCstCofinsEntranceId) ?? null,
            taxCstCofinsExitId: (props.itemData?.taxGroup?.taxCofins?.taxCstCofinsExitId) ?? null
        },
        ipi: {
            taxAliquotIpi: (props.itemData?.taxGroup?.taxIpi?.taxAliquotIpi) ?? null,
            taxClassificationClassIpi: (props.itemData?.taxGroup?.taxIpi?.taxClassificationClassIpi) ?? null,
            taxCnpjProd: (props.itemData?.taxGroup?.taxIpi?.taxCnpjProd) ?? null,
            taxCodEnquadLegalIpi: (props.itemData?.taxGroup?.taxIpi?.taxCodEnquadLegalIpi) ?? null,
            taxCstIpiEntranceId: (props.itemData?.taxGroup?.taxIpi?.taxCstIpiEntranceId) ?? null,
            taxCstIpiExitId: (props.itemData?.taxGroup?.taxIpi?.taxCstIpiExitId) ?? null,
            taxQtdStampControlIpi: (props.itemData?.taxGroup?.taxIpi?.taxQtdStampControlIpi) ?? null,
            taxStampIpi: (props.itemData?.taxGroup?.taxIpi?.taxStampIpi) ?? null,
        },
        pis: {
            taxAliquotPisEntrance: (props.itemData?.taxGroup?.taxPis?.taxAliquotPisEntrance) ?? null,
            taxAliquotPisExit: (props.itemData?.taxGroup?.taxPis?.taxAliquotPisExit) ?? null,
            taxCstPisEntranceId: (props.itemData?.taxGroup?.taxPis?.taxCstPisEntranceId) ?? null,
            taxCstPisExitId: (props.itemData?.taxGroup?.taxPis?.taxCstPisExitId) ?? null,
        }
    }

    const [dataAddEditProduct, setDataAddEditProduct] = useState<sharedAddEditProductRequest>(defaultDataEditProduct)

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












