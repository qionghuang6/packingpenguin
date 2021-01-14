import { useState } from 'react'
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { setPrimaryChecklist, getChecklistName } from '../../util/utilFunctions'

const MoreChecklistsButton = ({ currentChecklistId, setChecklistId }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [checklists, setChecklists] = useState([]);

    const open = Boolean(anchorEl);
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

    return (
        <div>
            <IconButton onClick={e => setAnchorEl(e.currentTarget)}>
                <MoreVert />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={() => setAnchorEl(null)}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {checklists.map((checklist) => {
                    return (
                        <MenuItem key={checklist.id} id={checklist.id} selected={checklist.id === currentChecklistId} onClick={handleClose}>
                            {checklist.name}
                        </MenuItem>
                    )
                })}
            </Menu>
        </div>
    )
}
export default MoreChecklistsButton
