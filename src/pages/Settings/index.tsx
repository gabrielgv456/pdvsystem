import { useDarkMode } from '../../contexts/DarkMode/DarkModeProvider'
import * as S from './style'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useContext, useState } from 'react';
import { TabMyProfile } from './tabs/MyProfile';
import { TabFiscalParameters } from './tabs/FiscalParameters';
import { TabSystem } from './tabs/System';
import { CgProfile } from 'react-icons/cg';
import { MdAssignment } from 'react-icons/md';
import { useMediaQuery } from '@mui/material';
import { useLayout } from '../../contexts/Layout/layoutContext';
import { AuthContext } from 'src/contexts/Auth/AuthContext';
import { TabPanel } from 'src/components/tabPanel/tabPanel';

export const Settings = () => {

    const { setActualPage } = useLayout();
    setActualPage('Ajustes')
    const Theme = useDarkMode()
    const user = useContext(AuthContext)
    const isLess900 = useMediaQuery('(max-width:900px)')

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

    const hasFiscalAccess = (user.user?.plans?.fiscalAccess ?? false);

    return (
        <S.Container isDarkMode={Theme.DarkMode}>
            <S.Content isDarkMode={Theme.DarkMode}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} >
                            <Tab label={isLess900 ? '' : 'Meu Perfil'} title='Meu Perfil' sx={{ borderRadius: '10px 0px 0px 0px' }} {...a11yProps(0)} icon={<CgProfile size={20} />} iconPosition='start' />
                            {hasFiscalAccess && <Tab label={isLess900 ? '' : "Parâmetros Fiscais"} title='Parâmetros Fiscais' {...a11yProps(1)} icon={<MdAssignment size={20} />} iconPosition='start' />}
                            {/* <Tab label={isLess900 ? '' : "Configurações do sistema"} title='Configurações do sistema' {...a11yProps(2)} icon={<MdSettingsInputComponent size={20} />} iconPosition='start' /> */}
                        </Tabs>
                    </Box>
                    <div style={{ padding: '0 25px 25px 25px' }}>
                        <TabPanel value={value} index={0}>
                            <TabMyProfile />
                        </TabPanel>
                        {hasFiscalAccess &&
                            <TabPanel value={value} index={1}>
                                <TabFiscalParameters />
                            </TabPanel>
                        }
                        <TabPanel value={value} index={hasFiscalAccess ? 2 : 1}>
                            <TabSystem />
                        </TabPanel>
                    </div>
                </Box>
            </S.Content>
        </S.Container>

    )
}
