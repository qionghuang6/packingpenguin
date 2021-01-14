import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Box,
} from '@material-ui/core';
import { useState } from 'react';
import { clearChecklist } from '../util/utilFunctions'

//https://material-ui.com/components/dialogs/
const ClearChecklistButton = ({ checklistId, setCategories }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Box m={1.5}>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Clear Checklist
        </Button>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Clear Checklist?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        All contents will be lost if you clear the checklist. Are you sure you want to clear your checklist?
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        No
                    </Button>
                    <Button onClick={() => {
                        clearChecklist(checklistId);
                        setCategories([]);
                        handleClose();
                    }}
                        color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ClearChecklistButton;