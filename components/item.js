import { Checkbox, FormControlLabel, FormHelperText, TextField, Button, InputAdornment, InputBase} from '@material-ui/core';
import { useItemState } from '../util/customHooks'


const Item = ({item, path, renderPurchased, deleteItem }) => {
    const [name, setName] = useItemState(path, "name", item.name)
    const [purchased, setPurchased] = useItemState(path, "isPurchased", item.isPurchased)
    const [packed, setPacked] = useItemState(path, "isPacked", item.isPacked)
    const [quantity, setQuantity] = useItemState(path, "quantity", item.quantity)
    const [notes, setNotes] = useItemState(path, "notes", item.notes);
    // console.log([name, purchased, packed])
    return (
        <div>
            <p>{JSON.stringify(path)}</p>
            {(renderPurchased) ? <Checkbox 
                disabled={!renderPurchased} 
                checked={purchased} 
                onChange={(e) => setPurchased(e.target.checked)}/> : ""}
            <FormControlLabel
                control={<Checkbox
                    checked={packed}
                    onChange={(e) => setPacked(e.target.checked)}/>}
                    label={<TextField 
                        InputProps={{ 
                            disableUnderline: true,
                            endAdornment: <InputAdornment position="end">{quantity==1 ? "" : " x"+quantity}</InputAdornment>,
                        }}
                        style = {{width: "150px"}}
                        value={name}
                        onChange={e => setName(e.target.value)}/>}
            />
            <FormHelperText>{notes}</FormHelperText>
            <Button variant="contained" color="primary" onClick={() => deleteItem(path)}>Delete Item</Button>
        </div>
    )
} //<TextField value={notes} onChange={(e) => setNotes(e.target.value)}/>
//name + (quantity==1 ? "" : " x"+quantity)
export default Item;

