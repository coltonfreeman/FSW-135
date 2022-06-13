import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserProvider.js'
import IssueList from '../components/IssueList'
import Navbar from '../components/Navbar'

export default function Public(){

  const { getAllIssues, allIssues } = useContext(UserContext)
  const [getIssues, setIssues] = useState(allIssues);
  
   useEffect(() => {
    getAllIssues()
   },[]);
  

  return (
    <div className="public">
        <Navbar />
        <IssueList issues={allIssues}/> 
    </div>
  )
}