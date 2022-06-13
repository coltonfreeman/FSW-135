import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Auth from './components/Auth.js'
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import NotFoundPage from './components/NotFoundPage.js';
import Public from './components/Public.js';
import { UserContext } from './context/UserProvider.js'

export default function App(){
  const { token, logout } = useContext(UserContext)
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={token ? <Navigate to="/profile" /> : <Navigate to="/signup"/>} /> 
        <Route exact path="/profile" element={token ? <Profile /> : <Navigate to="/signup"/>} /> 
        <Route exact path="/signup" element={token ? <Navigate to="/profile" /> : <Signup/>} /> 
        <Route exact path="/login" element={ token ? <Navigate to="/profile"/> : <Login /> } />
        <Route exact path="/public" element={<Public/>}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}