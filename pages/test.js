import { generateListId, generateUserId } from '../util/generateIds'
import { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { addUser } from '../util/serverMethods'

export default function TestDb() {
    const [userId, setUserId] = useState(generateUserId());
    const [checklistId, setChecklistId] = useState(generateListId())

    useEffect(() => {
        addUser(userId)
    }, [userId])

    return (
      <>
        <h2>userId: {userId} </h2>
        <h2>checkListId: {checklistId} </h2>
        <Button variant="contained" color="primary" onClick = {() => setUserId(generateUserId())}>
            Generate New userId
        </Button>
        <Button variant="contained" color="primary" onClick = {() => setChecklistId(generateListId())}>
            Generate New Checklist Id
        </Button>
        <br/>

      </>
    )
  }
