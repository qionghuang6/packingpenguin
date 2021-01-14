import { useState } from 'react'
import { Menu, MenuItem, Icon } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

const moreChecklistsButton = ({checklists, currentChecklistID, loadChecklist}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const ITEM_HEIGHT = 48;

    const handleClose = (event) => {
        if (event.target.selected) return
        else {
            //set primary checklist
            loadChecklist(event.target.id)
        }
    }

    return (
        <div>
            <IconButton onClick={e => setAnchorEl(e.currentTarget)}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={setAnchorEl(null)}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {checklists.map((checklist) => (
                    const { id, name } = checklist;
                    <MenuItem key={id} id={id} selected={id === 'currentChecklistID'} onClick={handleClose}>
                        {name}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
}
  