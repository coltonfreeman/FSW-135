import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserProvider.js'
import axios from 'axios'


export default function Issue(props){
  const userAxios = axios.create();

  userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
  })

  const { title, description, imgUrl, _id,   } = props

  const [upvote, setUpVote] = useState(null);



  function upVote(id){
    userAxios.put(`/api/issue/${id}`)
    .then(res => {
      setUpVote(res.data)
    })
    .catch(err => console.log(err.response.data.errMsg))
  }
    
  function getUpVote(id){
    userAxios.get(`/api/issue/${id}`)
    .then(res => {
      setUpVote(res.data)
    })
    .catch(err => console.log(err.response.data.errMsg))
  }

  const getUpvoteHandler = async () => {

    const id = _id.trim();
    getUpVote(id)

    console.log(!upvote);
  }

  const upvoteHandler = async () => {

    const id = _id.trim();
    upVote(id)

    console.log(!upvote);
  }

  useEffect(() => {
    getUpvoteHandler()
   }, []);

  return (
    <div className="issue">
      <h1>{ title }</h1>
      <h3>{ description }</h3>
      <img src={imgUrl} alt={imgUrl} width={300}/>
      { upvote ? 
      <button style={{backgroundColor: "blue", borderColor: "transparent", fontSize:"30px"}} 
              onClick={upvoteHandler}>&#128077;
      </button>
      :
      <button style={{backgroundColor: "transparent", borderColor: "transparent", fontSize:"30px"}} 
              onClick={upvoteHandler}>&#128077;
      </button>
      }
    </div>
  )
}