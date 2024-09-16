import * as React from 'react';
import { useNavigate, Outlet } from 'react-router-dom'
import { AuthContext } from "../../contexts/Auth/AuthContext";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
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
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import SettingsIcon from '@mui/icons-material/Settings';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import { DrawerStyle } from '../Layout/stylemui';
import * as S from '../Layout/style'
import { useDarkMode } from '../../contexts/DarkMode/DarkModeProvider';
import { BsFillPeopleFill } from 'react-icons/bs';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';
import logo from '../../images/logo.png'
import { descriptionPages, typeActualPage, useLayout } from '../../contexts/Layout/layoutContext';
import { BiMoon, BiSun } from 'react-icons/bi';
import { FaTruck } from 'react-icons/fa';
import { IoDocumentText } from 'react-icons/io5';

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

  const openPage = (page: string, description: typeActualPage) => {
    navigate(page)
    //setActualPage(description)
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
        {descriptionPages.filter(item => item === 'Fiscal' ? (auth.user?.plans?.fiscalAccess ?? false) : true).map((text, index) => (
          <ListItem button key={text}
            onClick={() =>
              text === 'Página Inicial' ? openPage('/home', text) :
                text === 'Realizar Vendas' ? openPage('/sell', text) :
                  text === 'Controle de Vendas' ? openPage('/salesControl', text) :
                    text === 'Entregas' ? openPage('/deliveries', text) :
                      text === 'Balanço Financeiro' ? openPage('/transactions', text) :
                        text === 'Pessoas' ? openPage('/peopleRegistration', text) :
                          text === 'Gestão de Estoque' ? openPage('/inventoryManagement', text) :
                            text === 'Ajustes' ? openPage('/settings', text) :
                              text === 'Fiscal' ? openPage('/fiscal', text) : handleVoid
            } className={actualPage === text ? 'SelectedItem' : 'ListItem'} >
            <ListItemIcon className="ListIcon" sx={{ color: "inherit", minWidth: 0, paddingRight: 2 }}>
              {text === 'Página Inicial' && <HomeIcon color="inherit" className="Icons" />}
              {text === 'Realizar Vendas' && <StorefrontIcon className="Icons" />}
              {text === 'Controle de Vendas' && <ReceiptLongIcon className="Icons" />}
              {text === 'Entregas' && <FaTruck style={{ fontSize: '22px' }} className="Icons" />}
              {text === 'Balanço Financeiro' && <PaidIcon className="Icons" />}
              {text === 'Pessoas' && <BsFillPeopleFill size="22" className="Icons" />}
              {text === 'Gestão de Estoque' && <PieChartIcon className="Icons" />}
              {text === 'Ajustes' && <SettingsIcon style={{ fontSize: '23px' }} className="Icons" />}
              {text === 'Fiscal' && <IoDocumentText size="22" className="Icons" />}
            </ListItemIcon>
            <span style={{ fontSize: 12 }}>{text}</span>
          </ListItem>
        ))}
      </List>

      {
        drawerWidth === 260 ?
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
          <div>{auth.user?.name}</div>}

      </div>



      {/* <Divider sx={{ borderColor: Theme.DarkMode ? 'var(--backgroundDarkMode2)' : '', width: '60%', margin: '0 auto' }} /> */}


      <S.DivSwitch isDarkMode={Theme.DarkMode}>
        <BiSun color="#727272" />
        <Switch checked={Theme.DarkMode} onChange={e => Theme.setDarkMode(e.target.checked)} sx={{ display: 'flex' }} />
        <BiMoon color="#727272" />
      </S.DivSwitch>

    </S.Div >
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
            sx={{ mr: 1, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { sm: 'none' } }}>
            <img src={logo} style={{ width: 'auto', maxHeight: 45 }} />
          </Box>
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
