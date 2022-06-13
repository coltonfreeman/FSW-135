import React, { useState, useContext } from 'react'
import AuthForm from './AuthForm.js'
import { UserContext } from '../context/UserProvider.js'
import { useNavigate } from 'react-router-dom';

const initInputs = { username: "", password: "" }

export default function Signup(){
  const [inputs, setInputs] = useState(initInputs)
  
    let navigate = useNavigate();

  const { signup } = useContext(UserContext)

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSignup(e){
    e.preventDefault()
    let navigation = () => {navigationLogin()};
    signup(inputs, navigation);

  }

  function navigationLogin(){
    navigate("/login");
  }

  

  return (
    <div className="auth-container">
      <h1>Todo App</h1>
        <>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleSignup}
            inputs={inputs}
            btnText="Sign up"
          />
          <p onClick={navigationLogin}>Already a member?</p>
        </>
    </div>
  )
}