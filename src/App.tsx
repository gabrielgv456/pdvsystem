import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from './contexts/Auth/RequireAuth';
import { NotFound } from './pages/NotFound';
import { Home } from './pages/Home/';
import LayoutDefault from './pages/Layout'
import { SalesControl } from './pages/SalesControl';
import { Sell } from './pages/Sell';
import { Transactions } from './pages/transactions';
import { InventoryManagement } from './pages/InventoryManagement';
import { GlobalStyle } from './styles/GlobalStyle';
import { useDarkMode } from './contexts/DarkMode/DarkModeProvider';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { AuthRedirect } from './pages/Login/AuthRedirect';
// import {PeopleRegistration} from './pages/PeopleRegistration';
import { ClientsRegistration } from './pages/PeopleRegistration/Clients';
import { SellersRegistration } from './pages/PeopleRegistration/Sellers';
import { useState } from 'react';

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
        fontFamily: ['Poppins', 'Nunito', 'sans-serif'].join(','),
        fontSize: 14.9,
      },
    },
    // palette:{
    // info:{
    //   main:'#888',
    // dark:'#fff',
    //}
    //},
    components: {
      MuiCssBaseline: {
        styleOverrides: { body: { overflow: 'auto !important' } }
      },
      MuiInputLabel: {
        styleOverrides: { root: { color: Theme.DarkMode ? "#fff" : '#000' } }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: { borderColor: Theme.DarkMode ? '#757575' : '' }, // ALTERAR BORDA DOS TEXTFIELDS
          //root:{":hover $notchedOutline": {borderColor:'red'}},
        }
      },


    }


  });
  const [PeopleMode, setPeopleMode] = useState('Clients')


  return (
    <div className="App">
      <GlobalStyle isDarkMode={Theme.DarkMode} />
      <ThemeProvider theme={ThemeMui}>
        <Routes>
          <Route path="/" element={<AuthRedirect><LayoutDefault /></AuthRedirect>} >
            <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
            <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
            <Route path="/sell" element={<RequireAuth><Sell /></RequireAuth>} />
            <Route path="/salescontrol" element={<RequireAuth><SalesControl /></RequireAuth>} />
            <Route path="/transactions" element={<RequireAuth><Transactions /></RequireAuth>} />
            <Route path="/inventorymanagement" element={<RequireAuth><InventoryManagement /></RequireAuth>} />
            <Route path="/peopleregistration" element={<RequireAuth>{PeopleMode === 'Clients' ? <ClientsRegistration PeopleMode={PeopleMode} setPeopleMode={setPeopleMode} /> : <SellersRegistration PeopleMode={PeopleMode} setPeopleMode={setPeopleMode} />}</RequireAuth>} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
