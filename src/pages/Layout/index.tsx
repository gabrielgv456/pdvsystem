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
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import { DrawerStyle } from '../Layout/stylemui';
import * as S from '../Layout/style'
import { useDarkMode, useDarkModeLocalStorage } from '../../contexts/DarkMode/DarkModeProvider';
import { BsFillPeopleFill } from 'react-icons/bs';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';
import logo from '../../images/logo.png'
import { useLayout } from '../../contexts/Layout/layoutContext';
import { BiMoon, BiSun } from 'react-icons/bi';



const drawerWidth = 240;


interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function LayoutDefault(props: Props) {
  const [drawerWidth, setdrawerWidth] = React.useState(240);
  const [PeopleMode, setPeopleMode] = React.useState('Clients')
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
  const handleHome = () => {
    navigate('/home');
    setActualPage('Página Inicial')
  }
  const handleSell = () => {
    navigate('/sell');
    setActualPage('Realizar Vendas')
  }
  const handleSalesControl = () => {
    navigate('/salescontrol');
    setActualPage('Controle de Vendas')
  }
  const handleTansactions = () => {
    navigate('/transactions');
    setActualPage('Movimentações')
  }
  const handleInventoryManagement = () => {
    navigate('/inventorymanagement');
    setActualPage('Gestão de Estoque')
  }
  const handlePeopleRegistration = () => {
    navigate('/peopleregistration');
    setActualPage('Pessoas')
  }
  const handleVoid = () => {
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };



  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const drawer = (
    <S.Div isDarkMode={Theme.DarkMode}  >
      <Toolbar><Typography variant="h6" noWrap component="div">{auth.user?.name}</Typography></Toolbar>
      <Divider sx={{ borderColor: Theme.DarkMode ? 'var(--AppBar)' : '' }} />
      <List sx={{ marginBottom: '10%' }}>
        {['Página Inicial', 'Realizar Vendas', 'Controle de Vendas', 'Movimentações', 'Pessoas', 'Gestão de Estoque'].map((text, index) => (
          <ListItem button key={text}
            onClick={
              index === 0 ? handleHome :
                index === 1 ? handleSell :
                  index === 2 ? handleSalesControl :
                    index === 3 ? handleTansactions :
                      index === 4 ? handlePeopleRegistration :
                        index === 5 ? handleInventoryManagement : handleVoid
            } className="ListItem">
            <ListItemIcon>
              {index === 0 && <HomeIcon className="Icons" />}
              {index === 1 && <StorefrontIcon className="Icons" />}
              {index === 2 && <ReceiptLongIcon className="Icons" />}
              {index === 3 && <PaidIcon className="Icons" />}
              {index === 4 && <BsFillPeopleFill size="22" className="Icons" />}
              {index === 5 && <PieChartIcon className="Icons" />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>

      {drawerWidth === 240 ?
        <S.ButtonRetract
          onClick={() => setdrawerWidth(0)}
          style={{
            position: 'fixed',
            left: '239px',
            top: '50%',
          }}
          isDarkMode={Theme.DarkMode}
        >
          <IoMdArrowRoundBack size="14" color="var(--AppBar)" />
        </S.ButtonRetract>
        :
        <S.ButtonRetract
          onClick={() => setdrawerWidth(240)}
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



      <Divider sx={{ borderColor: Theme.DarkMode ? 'var(--backgroundDarkMode2)' : '', width: '60%', margin: '0 auto' }} />
      <div style={{ display: 'flex', width: "100%", justifyContent: 'center', flexDirection: 'column', alignItems: 'center', position: 'absolute', bottom: 130 }}>

        <S.BNameLogo isDarkMode={Theme.DarkMode}>Smart Store®</S.BNameLogo>
        <img src={logo} style={{ width: 150, height: 94 }} />

      </div>
      <S.DivSwitch isDarkMode={Theme.DarkMode}>
        <BiSun color="#727272"/>
        <Switch checked={Theme.DarkMode} onChange={e => Theme.setDarkMode(e.target.checked)} sx={{ display: 'flex' }} />
        <BiMoon color="#727272"/>
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
          backgroundColor: Theme.DarkMode ? 'var(--backgroundDarkMode)' : 'var(--AppBar)',
          boxShadow: 'none',
          borderBottom: '1px solid var(--AppBar)',
        }}
      >
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" display="flex">
            {actualPage}
          </Typography>
          <S.DivCashierStatus>
            Caixa aberto
          </S.DivCashierStatus>
          {auth.user &&
            <PowerSettingsNewIcon
              onClick={handleLogout}
              sx={{ position: 'absolute', right: 20, cursor: 'pointer', '&:hover': { color: 'firebrick' } }} />}


        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
