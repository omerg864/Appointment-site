import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';

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

function App() {

  if (process.env.REACT_APP_RTL === 'true') {
    document.body.classList.add('rtl');
  }
  
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
      <Route path="/appointment" element={<Appointment/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/resetPassword" element={<ResetPassword/>} />
      <Route path="/forgot" element={<EmailResetPassword/>} />
      <Route path="/users" element={<Users/>} />
      <Route path="/settings" element={<Settings/>} />
      <Route path="/schedule" element={<Schedule/>} />
      <Route path="/appointments" element={<Appointments/>} />
      </Routes>
      </div>
      <Footer />
      </Router>
    </div>
  );
}

export default App;
