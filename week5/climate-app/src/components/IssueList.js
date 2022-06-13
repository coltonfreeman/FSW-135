import React, { useState, useEffect } from 'react'
import Issue from '../components/Issue'

export default function IssueList(props){
  const { issues } = props
  const reverseMap = issues.map(issue => <Issue {...issue} key={issue._id}/>).reverse();
  
  return (
    <div className="issue-list">
      { reverseMap }
    </div>
  )
}