import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Chart from '../pages/Chart';
import EmailVerification from '../pages/EmailVerification';
// import ForgotPassword from '../pages/ForgotPassword';
// routes
const Router = () => {
  return (
   <Routes basename="/">
    {/* <Route path='/' element={<Navigate to='/home' /> } /> */}
    <Route path='/' element={<Home/>} />
    <Route path='/home' element={<Chart/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/verify-email' element={<EmailVerification/>} />

    {/* <Route path='/forgot-password' element={<ForgotPassword/>} /> */}

   </Routes>
  )
}

export default Router;
