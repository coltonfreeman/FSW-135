import React, { useState, useContext } from 'react'
import AuthForm from './AuthForm.js'
import { UserContext } from '../context/UserProvider.js'
import { useNavigate } from 'react-router-dom';

const initInputs = { username: "", password: "" }

export default function Login(){
  const [inputs, setInputs] = useState(initInputs)
  let navigate = useNavigate();

  const { login, errMsg, resetAuthErr } = useContext(UserContext)

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleLogin(e){
    e.preventDefault()
    login(inputs)
  }

 

  function navigationSignup(){
    navigate("/signup");
    resetAuthErr()
  }
 

  return (
    <div className="auth-container">
      <h1>Todo App</h1>
        <>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleLogin}
            inputs={inputs}
            btnText="Login"
          />
          <p style={{backgroundColor: "#c00000", color: "#ffffff", textAlign: "center"}}>{ errMsg } </p>
          <p onClick={navigationSignup}>Not a member?</p>
          
        </>
    </div>
  )
}