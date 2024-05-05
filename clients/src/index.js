import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Home,HomeContextProvider} from './components/Home.js';
import {BrowserRouter} from 'react-router-dom';
import { UserContextProvider } from './components/GetDetails.js';
ReactDOM.hydrate(

  <BrowserRouter>
  <UserContextProvider>
  <HomeContextProvider>
    <App />
    </HomeContextProvider>
    </UserContextProvider>
  </BrowserRouter>
  
,document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vital
