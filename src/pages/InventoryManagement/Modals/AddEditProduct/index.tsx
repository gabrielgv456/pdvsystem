
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useContext, useEffect, useState } from 'react';
import * as type from './interfaces'
import { FiPackage } from 'react-icons/fi'
import { TabInfoProduct } from './tabs/infoProduct';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { MdAssignment } from 'react-icons/md';
import { useMediaQuery } from '@mui/material';
import { TabIcmsProduct } from './tabs/icmsProduct/icmsProduct';
import { MuiBox } from '../../../../components/box/muiBox';
import { DefaultButtonCloseModal, DefaultIconCloseModal } from '../../../../components/buttons/closeButtonModal';
import { TabIpiPisCofinsProduct } from './tabs/ipiPisCofinsProduct/ipiPisCofinsProduct';
import { TabIcmsSTProduct } from './tabs/icmsSTProduct/icmsSTProduct';
import { SaveProduct } from './saveProduct/saveProduct';
import { AuthContext } from '../../../../contexts/Auth/AuthContext'
import { TabPanel } from '../../../../components/tabPanel/tabPanel';
import { ProductsReturnApiProps } from '../..';



interface PropsModalAddProduct {
    isModalAddEditProductOpen: boolean;
    setisModalAddEditProductOpen: (value: boolean) => void;
    setisModalSucessOpen: (value: boolean) => void;
    type: 'Add' | 'Edit';
    itemData?: ProductsReturnApiProps;
}

export const ModalAddEditProduct = (props: PropsModalAddProduct) => {

    useEffect(()=>{
        setDataAddEditProduct(defaultDataEditProduct)
    },[props.itemData])


    const auth = useContext(AuthContext)
    const isLess900 = useMediaQuery('(max-width:100px)')
    const [value, setValue] = useState(0);

    const defaultDataEditProduct = {
        principal: {
            id: props.itemData?.id,
            userId: auth.idUser,
            codRef: props.itemData?.codRef ?? null,
            brand: props.itemData?.brand ?? null,
            exTipi: props.itemData?.exTipi ?? null,
            name: props.itemData?.name ?? '',
            value: props.itemData?.value ?? null,
            quantity: props.itemData?.quantity ?? 0,
            active: props.itemData?.active ?? true,
            cost: props.itemData?.cost ?? null,
            profitMargin: props.itemData?.profitMargin ?? null,
            barCode: props.itemData?.barCode ?? null,
            ncmCode: props.itemData?.ncmCode ?? null,
            itemTypeId: (props.itemData ? props.itemData.itemTypeId : null),
            cfopId: props.itemData?.cfopId ?? null,
            unitMeasurement: props.itemData?.unitMeasurement ?? 'UN'
        }
    }
    
    const [dataAddEditProduct, setDataAddEditProduct] = useState<type.addEditProductDataSend>(defaultDataEditProduct)
    console.log(dataAddEditProduct.principal.itemTypeId)

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
                        <Tab label={isLess900 ? '' : "ICMS"} title='Parâmetros Fiscais' {...a11yProps(1)} icon={<MdAssignment size={20} />} iconPosition='start' />
                        <Tab label={isLess900 ? '' : "ICMS ST"} title='Parâmetros Fiscais' {...a11yProps(2)} icon={<MdAssignment size={20} />} iconPosition='start' />
                        <Tab label={isLess900 ? '' : "IPI/PIS/COFINS"} title='Parâmetros Fiscais' {...a11yProps(3)} icon={<MdAssignment size={20} />} iconPosition='start' />
                    </Tabs>
                </Box>
                <div>
                    <TabPanel value={value} index={0}>
                        <TabInfoProduct
                            type={props.type}
                            dataAddEditProduct={dataAddEditProduct}
                            setDataAddEditProduct={setDataAddEditProduct}
                            itemData={props.itemData}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <TabIcmsProduct />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <TabIcmsSTProduct />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <TabIpiPisCofinsProduct />
                    </TabPanel>

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












