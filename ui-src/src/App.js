
import './App.css';
import  Login  from "./components/Login.js";
import MetadataPage from "./components/MetadataPage.js";
import AdminPage from "./components/AdminPage";
import UserPage from "./components/UserPage";
import { BrowserRouter, Route } from "react-router-dom";
import React from 'react';
import { useState, createContext } from "react";

export const GlobalContext = createContext({});


function App() {
 
  /* localStorage.removeItem('user');
  localStorage.removeItem('company'); */
  
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')));
  
  
  return (
    <GlobalContext.Provider value={{userData, setUserData}}>
      <BrowserRouter>
        <Route path="/" exact component={Login} />
        <Route path="/Metadata/:id" component={MetadataPage} />
        <Route path="/Admin/:id" component={AdminPage} />
        <Route path="/User/:id" component={UserPage} />
      </BrowserRouter>
    </GlobalContext.Provider>
  
  );
}

export default App;