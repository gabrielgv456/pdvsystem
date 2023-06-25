import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/Auth/AuthProvider';
import { DarkModeProvider } from './contexts/DarkMode/DarkModeProvider';
import { TestProvider } from './contexts/VariableTest';
import { LayoutProvider } from './contexts/Layout/layoutContext';
import { MessageBoxProvider } from './contexts/MessageBox/MessageBoxContext';


ReactDOM.render(

  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <DarkModeProvider>
          <TestProvider>
            <LayoutProvider>
              <MessageBoxProvider>
                <App />
              </MessageBoxProvider>
            </LayoutProvider>
          </TestProvider>
        </DarkModeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
