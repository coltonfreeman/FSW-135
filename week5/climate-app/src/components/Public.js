import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserProvider.js'
import IssueList from '../components/IssueList'
import Issue from '../components/Issue'


export default function Public(){

  const { getAllIssues } = useContext(UserContext)
  const [issues, setIssues] = useState([]);

  const renderIssues = async() => {
    const issueList = await getAllIssues();
    console.log(issueList)
    setIssues(issueList);
  }

renderIssues()

  
  

  
  
  // useEffect(() => {
  //   getAllIssues()
  // },[issues]);

  

  return (
    <div className="public">
       <IssueList issues={issues}/> 
    </div>
  )
}