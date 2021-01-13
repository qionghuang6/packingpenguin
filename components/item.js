import {
    Checkbox,
    FormControlLabel,
    FormHelperText,
    TextField,
    IconButton,
    InputAdornment,
    InputBase,
    makeStyles,
    Box
} from '@material-ui/core';
import { useStickyMongoState } from '../util/customHooks'
import { DeleteTwoTone } from '@material-ui/icons'

const useStyles = makeStyles(() => ({
    checkboxLeft: {
        padding: '4px 1px 4px 10px',
    },
    checkboxRight: {
        padding: '4px 6px 4px 2px',
    },
    normalCheckbox: {
        padding: '4px 6px 4px 10px',
    }
}));


const Item = ({ item, path, renderPurchased, deleteItem, addIndexed, index }) => {
    const classes = useStyles();
    const [name, setName, setServerName] = useStickyMongoState(path, "name", item.name)
    const [purchased, setPurchased, setServerPurchased] = useStickyMongoState(path, "isPurchased", item.isPurchased)
    const [packed, setPacked, setServerPacked] = useStickyMongoState(path, "isPacked", item.isPacked)
    const [quantity, setQuantity, setServerQuantity] = useStickyMongoState(path, "quantity", item.quantity)
    const [notes, setNotes, setServerNotes] = useStickyMongoState(path, "notes", item.notes);

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
            onKeyPress={e => { if (e.key === 'Enter') addIndexed(index + 1) }}
        />
    )
    return (
        <div>
            <Box display="flex" maxWidth="100%">
                <Box width="92%">
                    <FormControlLabel
                        control={checkboxes}
                        label={itemTextField}
                    />
                </Box>
                <IconButton size="small" onClick={() => deleteItem(path)}><DeleteTwoTone /></IconButton>
            </Box>
            <FormHelperText>{notes}</FormHelperText>
        </div>
    )
} 
export default Item;

