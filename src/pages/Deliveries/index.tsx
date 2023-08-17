import { useDarkMode } from '../../contexts/DarkMode/DarkModeProvider'
import { useContext, useEffect, useState } from "react";
import * as S from './style'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FaTruckFast } from 'react-icons/fa6'
import { MdAssignment } from 'react-icons/md';
import { useMediaQuery } from '@mui/material';
import { TabPendingDeliveries } from './tabs/pendingDelivery';
import { FaSearch } from 'react-icons/fa';
import { useApi } from '../../hooks/useApi';
import { useMessageBoxContext } from '../../contexts/MessageBox/MessageBoxContext';
import { ReturnData } from '../../utils/utils';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { LuCheckCircle } from 'react-icons/lu'
import { TabShippingDeliveries } from './tabs/shippingDelivery';
import { TabDoneDeliveries } from './tabs/doneDelivery';
import { typesPayment } from '../Sell/Modals/CheckOut';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
export interface DeliveriesReturnApiProps {
    client: {
        name: string
    } | null,
    scheduledDate: string,
    status: 'Pending' | 'Shipping' | 'Done',
    onDeliveryPayValue: number,
    address: {
        addressStreet: string,
        addressNumber: string,
        addressNeighborhood: string,
        addressComplement: string,
        addressCity: string,
        addressState: string,
        addressCep: string,
    }
    itemSell: {
        id: number,
        descriptionProduct: string,
        totalValue: number,
        sell: {
            codRef: number,
            sellValue: number,
            paymentsells: [{
                typepayment: typesPayment,
                value: number,
            }]
        },
        quantity: number
    }
}

export interface TypeDeliveriesRequest {
    finalDate: string,
    initialDate: string,
    userID: number
}
export const Deliveries = () => {

    const Theme = useDarkMode()
    const isLess900 = useMediaQuery('(max-width:500px)')
    const auth = useContext(AuthContext);
    const { findDeliveries } = useApi()
    const atualdata = ReturnData()
    const [DeliveriesReturnApi, setDeliveriesReturnApi] = useState<DeliveriesReturnApiProps[]>([])
    const [initialDate, setinitialDate] = useState(atualdata)
    const [finalDate, SetfinalDate] = useState(atualdata)
    const { MessageBox } = useMessageBoxContext()



    useEffect(() => {
        searchDeliveries()
    }, [])

    const searchDeliveries = async () => {
        try {
            if (initialDate > finalDate) {
                throw new Error('Data inicial maior do que a final!')
            }
            const datafindDeliveries = { finalDate, initialDate, userID: auth.idUser }
            const data = await findDeliveries(datafindDeliveries)
            if (!data.Success) {
                throw new Error('Falha ao consultar entregas! ' + (data.Erro ?? ''))
            }
            setDeliveriesReturnApi(data.resultDeliveries)
        } catch (error: any) {
            MessageBox('warning', error.message)
        }
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

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };



    return (
        <>
            <S.Header isDarkMode={Theme.DarkMode}>
                <S.Box isDarkMode={Theme.DarkMode}><label>Data Inicial</label><S.Input value={initialDate} onChange={(e) => setinitialDate(e.target.value)} isDarkMode={Theme.DarkMode} type="date"></S.Input ></S.Box>
                <S.Box isDarkMode={Theme.DarkMode}><label>Data Final</label><S.Input value={finalDate} onChange={(e) => SetfinalDate(e.target.value)} isDarkMode={Theme.DarkMode} type="date"></S.Input></S.Box>
                <S.Button onClick={searchDeliveries}><FaSearch size="13" /></S.Button>
            </S.Header>
            <S.Container isDarkMode={Theme.DarkMode}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} >
                            <Tab label={isLess900 ? '' : 'Pendentes'} title='Meu Perfil' sx={{ minWidth: '33.33%', borderRadius: '10px 0px 0px 0px' }} {...a11yProps(0)} icon={<AiOutlineClockCircle size={20} />} iconPosition='start' />
                            <Tab label={isLess900 ? '' : "Em entrega"} title='Parâmetros Fiscais' sx={{ minWidth: '33.33%' }} {...a11yProps(1)} icon={<FaTruckFast size={20} />} iconPosition='start' />
                            <Tab label={isLess900 ? '' : "Entregues"} title='Parâmetros Fiscais' sx={{ minWidth: '33.33%' }}  {...a11yProps(1)} icon={<LuCheckCircle size={20} />} iconPosition='start' />
                        </Tabs>
                    </Box>
                    {/* <div style={{ padding: '0 25px 25px 25px' }}> */}
                    <TabPanel value={value} index={0}>
                        <TabPendingDeliveries Deliveries={DeliveriesReturnApi.filter(item => item.status === 'Pending')} searchDeliveries={searchDeliveries} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <TabShippingDeliveries Deliveries={DeliveriesReturnApi.filter(item => item.status === 'Shipping')} searchDeliveries={searchDeliveries} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <TabDoneDeliveries Deliveries={DeliveriesReturnApi.filter(item => item.status === 'Done')} searchDeliveries={searchDeliveries} />
                    </TabPanel>
                    {/* </div> */}
                </Box>
            </S.Container>
        </>
    )
}
