import { useState } from 'react'
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import { ViewListRounded, Add } from '@material-ui/icons';
import { setPrimaryChecklist, getChecklistName, addNewChecklist } from '../../util/utilFunctions'

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
            <IconButton style={{ padding: 6 }} onClick={e => setAnchorEl(e.currentTarget)}>
                <ViewListRounded style={{ fontSize: 36 }} />
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
                        width: '32ch',
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
                <MenuItem key={"addNew"} onClick={() => {
                        addNewChecklist().then(res => {
                            setChecklists(checklists.concat(res));
                    })
                }}>
                            <Add/> New Checklist
                </MenuItem>
            </Menu>
        </div>
    )
}
export default MoreChecklistsButton
