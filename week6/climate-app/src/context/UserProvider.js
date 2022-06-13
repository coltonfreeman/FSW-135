import React, { useState } from 'react'
import axios from 'axios'


export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export default function UserProvider(props){
  const initState = { 
    user: JSON.parse(localStorage.getItem("user")) || {}, 
    token: localStorage.getItem("token") || "",
    issues: [], 
    errMsg: ''
  }

  const [userState, setUserState] = useState(initState)
  
  function handleAuthErr(errMsg){
    setUserState(prevState => ({
      ...prevState,
      errMsg
    }))
  }

  function resetAuthErr(){
    setUserState(prevUserState => ({
      ...prevUserState, 
      errMsg: ''
    }))
  }

  function signup(credentials, navigation){
   
    
    axios.post("/auth/signup", credentials)
      .then(res => {
        const { user } = res.data
        localStorage.setItem("user", JSON.stringify(user))
        setUserState(prevUserState => ({
          ...prevUserState,
          user
        }))
      })
      .then(navigation)
      .catch(err => handleAuthErr(err.response.data.errMsg))
      
      
  }

  function login(credentials){
    axios.post("/auth/login", credentials)
      .then(res => {
        const { user, token } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        getUserIssues()
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }))
      })
      .catch(err => handleAuthErr(err.response.data.errMsg))
  }

  function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUserState({
      user: {},
      token: "",
      issues: []
    })
  }

  function getUserIssues(){
    userAxios.get("/api/issue/user")
      .then(res => {
        setUserState(prevState => ({
          ...prevState,
          issues: res.data
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  function addIssue(newIssue){
    userAxios.post("/api/issue", newIssue)
      .then(res => {
        setUserState(prevState => ({
          ...prevState,
          issues: [res.data, ...prevState.issues]
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  async function getAllIssues(){
    return await userAxios.get("/api/issue").then(res => res.data);
  }
  

  return (
    <UserContext.Provider
      value={{
        ...userState,
        signup,
        login,
        logout,
        addIssue,
        resetAuthErr,
        getUserIssues,
        getAllIssues
      }}>
      { props.children }
    </UserContext.Provider>
  )
}