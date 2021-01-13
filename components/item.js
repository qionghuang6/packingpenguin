import {
    Checkbox,
    FormControlLabel,
    TextField,
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
        padding: '4px 1px 4px 10px',
    },
    checkboxRight: {
        padding: '4px 6px 4px 2px',
    },
    normalCheckbox: {
        padding: '4px 6px 4px 10px',
    },
    notes: {
        padding: '3px 0px'
    }
}));


const Item = ({ item, path, renderPurchased, deleteItem, addIndexed, index }) => {
    const classes = useStyles();
    const [name, setName, setServerName] = useStickyMongoState(path, "name", item.name)
    const [purchased, setPurchased, setServerPurchased] = useStickyMongoState(path, "isPurchased", item.isPurchased)
    const [packed, setPacked, setServerPacked] = useStickyMongoState(path, "isPacked", item.isPacked)
    const [quantity, setQuantity, setServerQuantity] = useStickyMongoState(path, "quantity", item.quantity)
    const [notes, setNotes, setServerNotes] = useStickyMongoState(path, "notes", item.notes);
    const [showNotes, setShowNotes] = useState(false);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') addIndexed(index+1)
    }
    const handleKeyDown = (e) => {
        console.log(e.key)
        if (e.key === 'Backspace' && name.trim() == "") deleteItem(path)
    }


    const checkboxes = (
        <>
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
        </>
    )

    const itemTextField = (
        <TextField
            InputProps={{
                endAdornment: <InputAdornment position="end">{quantity == 1 ? "" : " x" + quantity}</InputAdornment>,
            }}
            placeholder="New Item"
            style={{ maxLength: 32, 
                width: Math.max(10, name.length + 2 + (quantity == 1 ? 0 : 2)) + "ch"}}
            value={name}
            onChange={e => setName(e.target.value)}
            onBlur={e => setServerName(e.target.value)}
            onKeyPress={handleKeyPress}
            onKeyDown={handleKeyDown}
        />
    )
    return (
        <Box 
            onMouseOver={() => setShowNotes(true)}
            onMouseLeave={() => setShowNotes(false)}
        >
            <Box display="flex" maxWidth="100%">
                <Box width="92%">
                    <FormControlLabel
                        control={checkboxes}
                        label={itemTextField}
                    />
                </Box>
                <IconButton size="small" onClick={() => deleteItem(path)}><DeleteTwoTone /></IconButton>
            </Box>
            {showNotes || notes ? <Input 
                size="small" 
                className={classes.notes}
                inputProps={{style: {fontSize: 12}}} 
                value={notes}
                fullWidth
                multiline
                placeholder="Write some notes here!"
                onChange={e => setNotes(e.target.value)}
                onBlur={e => setServerNotes(e.target.value)}
            /> : ""}
        </Box>
    )
} 
export default Item;

