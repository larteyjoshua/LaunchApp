import React from 'react';
import './App.css';
import RequireAuth from './components/sharedComponents/authRequires/RequireAuth';
import {Route, Routes, Navigate } from "react-router-dom";
import Home from './components/home/Home';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';

import About from './components/about/About';
import Contact from './components/contact/Contact';
import PasswordReset from './components/passwordReset/PasswordReset';
import Layout from './components/layout/Layout';
import Container from './components/container/Container';
import Cart from './components/cart/Cart';
import Profile from './components/profile/Profile';
import History from './components/history/History';
import { SnackbarProvider } from 'notistack'
import PasswordRecover from './components/passwordRecover/PasswordRecover';



function App() {
  return (
    <div className="App">
         <SnackbarProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path='about' element = {<About />} />
          <Route path='contact' element = {<Contact />} />
          <Route path='passwordReset' element ={<PasswordReset />} />
          <Route path='passwordRecover' element ={<PasswordRecover />} />
          </Route>

          <Route element={<RequireAuth />}>
          <Route path="/container"element={<Container />} >
          <Route path="/container" element={<Navigate to="/container/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cart" element={<Cart />} />
          <Route path="profile" element={<Profile />} />
          <Route path="history" element={<History />} />
         </Route>
          </Route>
        </Routes>
        </SnackbarProvider>
    </div>
  );
}

export default App;
