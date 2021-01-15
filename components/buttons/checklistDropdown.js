import React from 'react';
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { setPrimaryChecklist, getChecklistName } from '../../util/utilFunctions';

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

// DEPRACATED


const ChecklistDropdown = ({ checklistName, currentChecklistId}) => {
    const [checklists, setChecklists] = useState([]);
    const ITEM_HEIGHT = 48;

    const localIds = JSON.parse(localStorage.getItem('checklistId'));
    const names = localIds.map(id => getChecklistName(id));
    if(checklists.length === 0){
        const b = Promise.all(names).then(vals => setChecklists(vals.map((val, i) => {
            return {id: localIds[i], name:val}
        })));
    }

    const handleClose = (event) => {
        if (event.target.selected) return
        else {
            const id = event.target.id
            setPrimaryChecklist(id)
            setChecklistId(id)
        }
    }
  console.log(checklists)
  return (
    <form noValidate autoComplete="off">
      <div>
        <TextField
          multiline
          rowsMax={4}
          id="select-checklist"
          inputProps={{ maxLength: 36, style: { fontSize: 36, lineHeight: "100%" } }}
          value={checklists[1].name} 
          //onChange={e => setServerChecklistName(e.target.value)}
          select
        >
            {checklists.map((checklist) => {
                return (
                    <MenuItem 
                        key={checklist.id} id={checklist.id} 
                        selected={checklist.id === currentChecklistId} onClick={handleClose}
                        value={checklist.name}
                    >
                        {checklist.name}
                    </MenuItem>
                )
            })}
        </TextField>
      </div>
    </form>
  );
}

export default ChecklistDropdown;