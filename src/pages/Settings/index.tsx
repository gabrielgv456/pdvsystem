import { useDarkMode } from '../../contexts/DarkMode/DarkModeProvider'
import * as S from './style'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { TabMyProfile } from './tabs/MyProfile';
import { TabFiscalParameters } from './tabs/FiscalParameters';
import { TabSystem } from './tabs/System';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export const Settings = () => {

    const Theme = useDarkMode()

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

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };



    return (
        <S.Container isDarkMode={Theme.DarkMode}>

            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} >
                        <Tab label="Meu Perfil" {...a11yProps(0)} />
                        <Tab label="Parâmetros Fiscais" {...a11yProps(1)} />
                        <Tab label="Configurações do sistema" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <TabMyProfile/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TabFiscalParameters/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <TabSystem/>
                </TabPanel>
            </Box>
        </S.Container>

    )
}
