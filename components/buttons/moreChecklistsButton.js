import { useState } from 'react'
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { setPrimaryChecklist } from '../../util/utilFunctions'

const MoreChecklistsButton = ({checklists, currentChecklistId, loadChecklist }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const ITEM_HEIGHT = 48;

    const handleClose = (event) => {
        if (event.target.selected) return
        else {
            id = event.target.id
            setPrimaryChecklist(id)
            loadChecklist(id)
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
                            {"checklist.name"}
                        </MenuItem>
                    )
                })}
            </Menu>
        </div>
    )
}
export default MoreChecklistsButton
