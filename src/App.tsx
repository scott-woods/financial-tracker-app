import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Dashboard';
import Layout from './pages/Layout';
import NotFound from './pages/NotFound';
import AuthRequired from './auth/AuthRequired';
import Login from './pages/Login';
import { useAuth0 } from '@auth0/auth0-react';
import LoggedOut from './pages/LoggedOut';
import MainRoutes from './auth/MainRoutes';

function App() {

  const { isLoading, error } = useAuth0();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/loggedout" element={<LoggedOut />} />
      <Route path="/*" element={<MainRoutes />} />
    </Routes>
  )
}

export default App;
