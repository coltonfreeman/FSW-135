import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserProvider.js'
import Navbar from '../components/Navbar';
import IssueForm from '../components/IssueForm';
import IssueList from '../components/IssueList';



export default function Profile(){
  const { user: {username}, addIssue, issues, getUserIssues } = useContext(UserContext)
  
  const [getIssues, setIssues] = useState(issues);

  useEffect(() => {
    getUserIssues()
  },[getIssues]);

  return (
    <div className="profile">
      <Navbar />
      <h1>Welcome @{username}!</h1>
      <h3>Add an Issue</h3>
      <IssueForm addIssue={addIssue}/>
      <h3>Your Issues</h3>
      <IssueList issues={issues}/>

    </div>
  )
}