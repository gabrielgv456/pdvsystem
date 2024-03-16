import * as React from 'react';
import { useNavigate, Outlet } from 'react-router-dom'
import { AuthContext } from "../../contexts/Auth/AuthContext";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PieChartIcon from '@mui/icons-material/PieChart';
import HomeIcon from '@mui/icons-material/Home';
import PaidIcon from '@mui/icons-material/Paid';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import { DrawerStyle } from '../Layout/stylemui';
import * as S from '../Layout/style'
import { useDarkMode } from '../../contexts/DarkMode/DarkModeProvider';
import { BsFillPeopleFill } from 'react-icons/bs';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';
import logo from '../../images/logo.png'
import { useLayout } from '../../contexts/Layout/layoutContext';
import { BiMoon, BiSun } from 'react-icons/bi';
import { FaTruck } from 'react-icons/fa';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function LayoutDefault(props: Props) {
  const [drawerWidth, setdrawerWidth] = React.useState(260);
  //const [PeopleMode, setPeopleMode] = React.useState('Clients')
  const classes = DrawerStyle();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const auth = React.useContext(AuthContext);
  const navigate = useNavigate();
  const Theme = useDarkMode();
  const { actualPage, setActualPage } = useLayout();
  // const test = useDarkModeLocalStorage();

  const handleLogout = async () => {
    await auth.signout();
    //window.location.href = window.location.href;
    navigate('/');
  }

  const handleVoid = () => {
  }

  const openPage = (page: string, description: string) => {
    navigate(page)
    setActualPage(description)
    setMobileOpen(!mobileOpen)
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const drawer = (
    <S.Div isDarkMode={Theme.DarkMode}   >
      <Toolbar >
        <Typography sx={{ margin: '0 auto' }} variant="h6" noWrap component="div">

          <img src={logo} style={{ width: 'auto', maxHeight: 75 }} />

        </Typography>
      </Toolbar>
      {/* <Divider sx={{ borderColor: Theme.DarkMode ? 'var(--AppBar)' : '' }} /> */}
      <List sx={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {['Página Inicial', 'Realizar Vendas', 'Controle de Vendas', 'Entregas', 'Movimentações', 'Pessoas', 'Gestão de Estoque', 'Ajustes'].map((text, index) => (
          <ListItem button key={text}
            onClick={() =>
              index === 0 ? openPage('/home', text) :
                index === 1 ? openPage('/sell', text) :
                  index === 2 ? openPage('/salesControl', text) :
                    index === 3 ? openPage('/deliveries', text) :
                      index === 4 ? openPage('/transactions', text) :
                        index === 5 ? openPage('/peopleRegistration', text) :
                          index === 6 ? openPage('/inventoryManagement', text) :
                            index === 7 ? openPage('/settings', text) : handleVoid
            } className={actualPage === text ? 'SelectedItem' : 'ListItem'} >
            <ListItemIcon className="ListIcon" sx={{ color: "inherit", minWidth: 0, paddingRight: 2 }}>
              {index === 0 && <HomeIcon color="inherit" className="Icons" />}
              {index === 1 && <StorefrontIcon className="Icons" />}
              {index === 2 && <ReceiptLongIcon className="Icons" />}
              {index === 3 && <FaTruck style={{ fontSize: '22px' }} className="Icons" />}
              {index === 4 && <PaidIcon className="Icons" />}
              {index === 5 && <BsFillPeopleFill size="22" className="Icons" />}
              {index === 6 && <PieChartIcon className="Icons" />}
              {index === 7 && <SettingsIcon style={{ fontSize: '23px' }} className="Icons" />}
            </ListItemIcon>
            <span style={{ fontSize: 12 }}>{text}</span>
          </ListItem>
        ))}
      </List>

      {drawerWidth === 260 ?
        <S.ButtonRetract
          onClick={() => setdrawerWidth(0)}
          style={{
            position: 'fixed',
            left: '259px',
            top: '50%',
          }}
          isDarkMode={Theme.DarkMode}
        >
          <IoMdArrowRoundBack size="14" color="var(--AppBar)" />
        </S.ButtonRetract>
        :
        <S.ButtonRetract
          onClick={() => setdrawerWidth(260)}
          style={{
            position: 'fixed',
            left: '0',
            top: '50%',
          }}
          isDarkMode={Theme.DarkMode}
        >
          <IoMdArrowRoundForward color="var(--AppBar)" size="14" />
        </S.ButtonRetract>
      }
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        A serviço de:
        {auth.user?.urlLogo ?
          <img style={{ maxHeight: 50, maxWidth: 170 }} src={auth.user.urlLogo} /> :
          auth.user?.name}

      </div>



      {/* <Divider sx={{ borderColor: Theme.DarkMode ? 'var(--backgroundDarkMode2)' : '', width: '60%', margin: '0 auto' }} /> */}


      <S.DivSwitch isDarkMode={Theme.DarkMode}>
        <BiSun color="#727272" />
        <Switch checked={Theme.DarkMode} onChange={e => Theme.setDarkMode(e.target.checked)} sx={{ display: 'flex' }} />
        <BiMoon color="#727272" />
      </S.DivSwitch>

    </S.Div>
  );


  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: Theme.DarkMode ? 'var(--backgroundDarkMode)' : '#fff',
          boxShadow: 'none',
          transition: 'width 0.7s ease',
          //borderBottom: '1px solid var(--AppBar)',
          color: '#000'
        }}
      >
        <Toolbar style={{ borderRadius: '20px 20px 20px 20px ' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* <Typography style={{color:'#fff'}}variant="h6" noWrap component="div" display="flex" >
            {actualPage}
          </Typography> */}
          {/* <S.DivCashierStatus>
            Caixa aberto
          </S.DivCashierStatus> */}
          {auth.user &&
            <PowerSettingsNewIcon
              onClick={handleLogout}
              sx={{ position: 'absolute', right: 20, cursor: 'pointer', color: Theme.DarkMode ? '#fff' : 'var(--Gray)', '&:hover': { color: 'firebrick' } }} />}


        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ transition: 'width 0.7s ease', width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          classes={{ paper: Theme.DarkMode ? classes.drawerPaperDarkMode : classes.drawerPaper }}
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}

        </Drawer>

        <Drawer
          classes={{ paper: Theme.DarkMode ? classes.drawerPaperDarkMode : classes.drawerPaper }}

          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none' },
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <div
        style={{ transition: 'width 0.7s ease', flexGrow: 1, width: `calc(100% - ${drawerWidth}px)` }}
      >
        <Toolbar />
        <Outlet />
      </div>
    </Box>
  );
}
