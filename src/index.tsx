import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/Auth/AuthProvider';
import {createServer } from 'miragejs'

interface apireceivepostType {
    id: number;
    name: string;
    email: string;
    password?: string;
}

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





ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
