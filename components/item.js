import {
    Checkbox,
    FormControl,
    FormControlLabel,
    TextField,
    Grid,
    IconButton,
    InputAdornment,
    makeStyles,
    Box,
    Input,
} from '@material-ui/core';
import { useStickyMongoState } from '../util/customHooks'
import { DeleteTwoTone } from '@material-ui/icons'
import { useState } from 'react'

const useStyles = makeStyles(() => ({
    checkboxLeft: {
        padding: '2px 1px 4px 0px',
    },
    checkboxRight: {
        padding: '2px 1px 4px 2px',
    },
    normalCheckbox: {
        padding: '2px 1px 4px 0px',
    },
    notes: {
        padding: '2px 0px 4px 0px',
    }
}));


const Item = ({ item, path, renderPurchased, deleteItem, addIndexed, index }) => {
    const classes = useStyles();
    const [name, setName, setServerName] = useStickyMongoState(path, "name", item.name)
    const [purchased, setPurchased, setServerPurchased] = useStickyMongoState(path, "isPurchased", item.isPurchased)
    const [packed, setPacked, setServerPacked] = useStickyMongoState(path, "isPacked", item.isPacked)
    // const [quantity, setQuantity, setServerQuantity] = useStickyMongoState(path, "quantity", item.quantity)
    const [notes, setNotes, setServerNotes] = useStickyMongoState(path, "notes", item.notes);
    const [showNotes, setShowNotes] = useState(false);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') addIndexed(index + 1)
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Backspace' && name.trim() == "") deleteItem(path)
    }


    const checkboxes = (
        <InputAdornment position="start">
            {(renderPurchased) ? <Checkbox
                className={classes.checkboxLeft}
                checked={purchased}
                onChange={(e) => setServerPurchased(e.target.checked)}
            /> : ""}
            <Checkbox
                checked={packed}
                className={renderPurchased ? classes.checkboxRight : classes.normalCheckbox}
                onChange={(e) => setServerPacked(e.target.checked)}
            />
            </InputAdornment>
    )

    const deleteButton = (
        <InputAdornment position="end">
            <IconButton size="small" onClick={() => deleteItem(path)}>
                <DeleteTwoTone />
            </IconButton>
        </InputAdornment>
    )

    const itemTextField = (
        <TextField
            InputProps={{ 
                startAdornment: checkboxes,
                endAdornment: deleteButton }}
            placeholder="New Item"
            fullWidth={true}
            value={name}
            onChange={e => setName(e.target.value)}
            onBlur={e => setServerName(e.target.value)}
            onKeyPress={handleKeyPress}
            onKeyDown={handleKeyDown}
        />
    )

    const notesBox = (
        <>
            {showNotes || notes ? <Input
                size="small"
                className={classes.notes}
                inputProps={{ style: { fontSize: 13.5 } }}
                value={notes}
                fullWidth
                multiline
                placeholder="Write some notes here!"
                onChange={e => setNotes(e.target.value)}
                onBlur={e => setServerNotes(e.target.value)}
            /> : ""}
        </>
    )

    return (
        <Box
            onMouseOver={() => setShowNotes(true)}
            onMouseLeave={() => setShowNotes(false)}
        >
            {itemTextField}
            {notesBox}
        </Box>
    )
}
export default Item;

