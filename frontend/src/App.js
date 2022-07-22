import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import { useState, useEffect } from 'react';
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import { authenticate, authenticateStaff } from './features/auth/authSlice.js';
import { useDispatch, useSelector } from 'react-redux';

import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Appointment from './pages/Appointment';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';
import EmailResetPassword from './pages/EmailResetPassword';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Schedule from './pages/Schedule';
import Appointments from './pages/Appointments';
import Page403 from './pages/Page403';
import Page404 from './pages/Page404';


function App() {

  if (process.env.REACT_APP_RTL === 'true') {
    document.body.classList.add('rtl');
  }

  const [authenticated, setAuthenticated] = useState(false);

  const [authenticatedStaff, setAuthenticatedStaff] = useState(false);

  const auth = useSelector(state => state.auth);

  useEffect(() => {
    authenticate(auth.user).then(response => {
      if (response.authenticated) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });
    authenticateStaff(auth.user).then(response => {
      if (response.authenticated) {
          setAuthenticatedStaff(true);
      } else {
          setAuthenticatedStaff(false);
      }
    });
  }, []);

  
  return (
    <div className="App">
      <ToastContainer theme="colored"/>
    <Router>
      <Header />
      <div className='page'>
        <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/appointment" element={authenticated ? <Appointment /> : <Page403/>} />
      <Route path="/profile" element={authenticated ? <Profile /> : <Page403/>} />
      <Route path="/resetPassword" element={<ResetPassword/>} />
      <Route path="/forgot" element={<EmailResetPassword/>} />
      <Route path="/users" element={authenticatedStaff ? <Users /> : <Page403 />}/>
      <Route path="/settings" element={authenticatedStaff ? <Settings /> : <Page403/>} />
      <Route path="/schedule" element={authenticatedStaff ? <Schedule /> : <Page403/>} />
      <Route path="/appointments" element={authenticatedStaff ? <Appointments /> : <Page403/>} />
      <Route path="*" element={<Page404/>} />
      </Routes>
      </div>
      <Footer />
      </Router>
    </div>
  );
}

export default App;
