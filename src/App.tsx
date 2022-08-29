import { useContext } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Private } from './pages/Private';
import { RequireAuth } from './contexts/Auth/RequireAuth';
import { AuthContext } from './contexts/Auth/AuthContext';
import { userInfo } from 'os';
import { NotFound } from './pages/NotFound';
import HomeSideBar from './pages/Home/Sidebar';
import { Login } from './pages/Login'
import { Sell } from '@mui/icons-material';
import { SalesControl } from './pages/SalesControl';
import { Transactions } from './pages/transactions';
import { InventoryManagement } from './pages/InventoryManagement';
import SalesControlsideBar from './pages/SalesControl/Sidebar';
import SellSideBar from './pages/Sell/Sidebar';
import TransactionsSideBar from './pages/transactions/Sidebar';
import InventoryManagementSideBar from './pages/InventoryManagement/Sidebar';
import { GlobalStyle } from './styles/GlobalStyle';
import { useDarkMode } from './contexts/DarkMode/DarkModeProvider';
import { ThemeConsumer } from 'styled-components';
import { ThemeProvider, createTheme } from '@mui/material/styles'

import { AuthRedirect } from './pages/Login/AuthRedirect';
import { fontSize } from '@mui/system';
import { borderRadius } from 'polished';
import PeopleRegistrationSideBar from './pages/PeopleRegistration/Sidebar';

function App() {
  const Theme = useDarkMode();

const ThemeMui = createTheme({

  breakpoints: {
    values: {
      xs: 300, // phone
      sm: 600, // tablets
      md: 900, // small laptop
      lg: 1200, // desktop
      xl: 1536 // large screens
    }
  },

  typography: {
    allVariants: {
      fontFamily: ['Poppins','Nunito','sans-serif'].join(','),
      fontSize: 14.9,
    },
  },
    // palette:{
    // info:{
    //   main:'#888',
    // dark:'#fff',
    //}
    //},
  components:{
    MuiOutlinedInput:{styleOverrides:{
      notchedOutline:{borderColor:Theme.DarkMode?'#757575':''}, // ALTERAR BORDA DOS TEXTFIELDS
      //root:{":hover $notchedOutline": {borderColor:'red'}},
    }},


}

  
});
 

  return (
    <div className="App">
      <GlobalStyle isDarkMode={Theme.DarkMode}/>
      <ThemeProvider theme={ThemeMui}>
      <Routes>
        <Route path="/" element={<AuthRedirect><Login/></AuthRedirect>} />
        <Route path="/home" element={<RequireAuth><HomeSideBar/></RequireAuth>} />
        <Route path="/sell" element={<RequireAuth><SellSideBar/></RequireAuth>} />
        <Route path="/salescontrol" element={<RequireAuth><SalesControlsideBar/></RequireAuth>} />
        <Route path="/transactions" element={<RequireAuth><TransactionsSideBar/></RequireAuth>} />
        <Route path="/inventorymanagement" element={<RequireAuth><InventoryManagementSideBar/></RequireAuth>} />
        <Route path="/peopleregistration" element={<RequireAuth><PeopleRegistrationSideBar/></RequireAuth>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
