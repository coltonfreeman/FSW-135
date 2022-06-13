import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Auth from './components/Auth.js'
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';

import { UserContext } from './context/UserProvider.js'

export default function App(){
  const { token, logout } = useContext(UserContext)
  return (
    <div className="app">
      <Routes>
        {/* <Route path="/profile" element={token ? <Profile /> : <Navigate to="/"/> }/> */}
        <Route exact path="/" element={token ? <Profile /> : <Navigate to="/signup"/>} /> 
        <Route exact path="/signup" element={ <Signup /> } /> 
        <Route exact path="/login" element={ token ? <Profile/> : <Login /> } /> 
      </Routes>
    </div>
  )
}