import React, { useState, useContext } from 'react'
import AuthForm from './AuthForm.js'
import { UserContext } from '../context/UserProvider.js'
import { useNavigate } from 'react-router-dom';

const initInputs = { username: "", password: "" }

export default function Signup(){
  const [inputs, setInputs] = useState(initInputs)
  
    let navigate = useNavigate();

  const { signup, errMsg, resetAuthErr } = useContext(UserContext)

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
    resetAuthErr()
  }

  

  return (
    <div className="auth-container">
      <h1>Climate App</h1>
        <>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleSignup}
            inputs={inputs}
            btnText="Sign up"
          />
          <p style={{backgroundColor: "#c00000", color: "#ffffff", textAlign: "center"}}>{ errMsg } </p>
          <p onClick={navigationLogin}>Already a member?</p>
        </>
    </div>
  )
}