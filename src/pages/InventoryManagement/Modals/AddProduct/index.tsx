
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkModeProvider';
import { useContext, useState } from 'react';
import { useApi } from '../../../../hooks/useApi';
import * as S from './style'
import { useMessageBoxContext } from '../../../../contexts/MessageBox/MessageBoxContext';
import { AuthContext } from '../../../../contexts/Auth/AuthContext';
import { AiOutlineClose } from 'react-icons/ai';
import {FiPackage} from 'react-icons/fi'
import { TabInfoProduct } from './tabs/infoProduct';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { CgProfile } from 'react-icons/cg';
import { MdAssignment, MdSettingsInputComponent } from 'react-icons/md';
import { useMediaQuery } from '@mui/material';
import { TabFiscal } from './tabs/infoFiscalNfe';


interface PropsModalAddProduct {
    isModalAddProductOpen: boolean;
    setisModalAddProductOpen: (value: boolean) => void;
    setisModalSucessOpen: (value: boolean) => void
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export const ModalAddProduct = (props: PropsModalAddProduct) => {

    const Theme = useDarkMode()
    const isLess900 = useMediaQuery('(max-width:100px)')
    const [value, setValue] = useState(0);

    function handleCloseModalAddProduct() {
        props.setisModalAddProductOpen(false)
    }

    function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
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

        <Modal open={props.isModalAddProductOpen} onClose={handleCloseModalAddProduct}>
            <Box sx={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: {
                    xs: '80%', // phone
                    sm: '80%', // tablets
                    md: 500, // small laptop
                    lg: 500, // desktop
                    xl: 500 // large screens
                },
                //width: '80%',
                bgcolor: Theme.DarkMode ? 'var(--backgroundDarkMode2)' : 'background.paper',
                color: Theme.DarkMode ? '#ffffff' : '#000',
                border: Theme.DarkMode ? '1px solid silver' : '',
                boxShadow: 24, p: 4,
                padding: '15px 10px 0px 10px'
            }}
            >
                    <h3 style={{ width: 'max-content',margin:'0 auto' }}>Cadastro de produto</h3>
                    
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange}  >
                            <Tab label={isLess900 ? '' : 'Principal'} title='Meu Perfil' sx={{ borderRadius: '10px 0px 0px 0px' }} {...a11yProps(0)} icon={<FiPackage size={20} />} iconPosition='start' />
                            <Tab label={isLess900 ? '' : "Fiscal"} title='Parâmetros Fiscais' {...a11yProps(1)} icon={<MdAssignment size={20} />} iconPosition='start' />
                        </Tabs>
                    </Box>
                    <div>
                        <TabPanel value={value} index={0}>
                            <TabInfoProduct setisModalSucessOpen={props.setisModalSucessOpen}
                                setisModalAddProductOpen={props.setisModalAddProductOpen} />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <TabFiscal/>
                        </TabPanel>
                    </div>
                <S.ButtonCloseModal isDarkMode={Theme.DarkMode} onClick={handleCloseModalAddProduct}><AiOutlineClose style={{ position: "absolute", right: 10, top: 10 }} /></S.ButtonCloseModal>
            </Box>
        </Modal>
    )
}














