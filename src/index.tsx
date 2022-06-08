import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/Auth/AuthProvider';
//import {createServer } from 'miragejs'
import { DarkModeProvider } from './contexts/DarkMode/DarkModeProvider';
import { TestProvider } from './contexts/VariableTest';

interface apireceivepostType {
    id: number;
    name: string;
    email: string;
    password?: string;
}
{/* dasdasdas
//Criação do banco de dados fake
createServer({
	routes (){
		this.post('/validate', () => {
		return {
			user: {id: 3, name: 'José', email: 'jose@gmail.com' }
		}})
    this.post('/signin', (schema, request) => {
      //let apireceivepost = JSON.parse(request.requestBody)
     // if (apireceivepost.email === 'gabriel@gabriel.com'){
      return {
          user: { id: 3, name: 'José', email: 'jose@gmail.com'},
          token: '123456789'
        }
      //}
      })
  }})

*/}



ReactDOM.render(
 
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <DarkModeProvider>
        <TestProvider>
            <App />
        </TestProvider>
        </DarkModeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
