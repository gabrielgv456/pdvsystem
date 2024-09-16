import { useDarkMode } from '../../contexts/DarkMode/DarkModeProvider'
import * as S from './style'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { useLayout } from '../../contexts/Layout/layoutContext';
import { TabPanel } from 'src/components/tabPanel/tabPanel';
import { HiDocumentDuplicate } from 'react-icons/hi';
import { TbReceiptTax } from 'react-icons/tb';
import { TabFiscalNotes } from './tabs/fiscalNotes/fiscalNotes';
import { TabTaxGroups } from './tabs/taxGroups/taxGroups';


export const Fiscal = () => {

    const { setActualPage } = useLayout();
    setActualPage('Fiscal')
    const Theme = useDarkMode()
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

    return (
        <S.Container isDarkMode={Theme.DarkMode}>
            <S.Content isDarkMode={Theme.DarkMode}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} >
                            <Tab label={isLess900 ? '' : 'Grupos de Tributação'} title='Grupos de Tributação' sx={{ borderRadius: '10px 0px 0px 0px' }} {...a11yProps(0)} icon={<TbReceiptTax size={22} />} iconPosition='start' />
                            <Tab label={isLess900 ? '' : 'Notas Fiscais'} title='Notas Fiscais' sx={{ borderRadius: '10px 0px 0px 0px' }} {...a11yProps(0)} icon={<HiDocumentDuplicate size={22} />} iconPosition='start' />

                        </Tabs>
                    </Box>
                    <div style={{ padding: '0 25px 25px 25px' }}>
                        <TabPanel value={value} index={0}>
                            <TabTaxGroups />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <TabFiscalNotes />
                        </TabPanel>

                    </div>
                </Box>
            </S.Content>
        </S.Container>

    )
}
