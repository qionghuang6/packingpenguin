import { Checkbox, FormControlLabel, FormHelperText, TextField} from '@material-ui/core';
import { useState } from 'react'

const Item = ({item, renderPurchased}) => {
    const [name, setName] = useState(item.name)
    const [purchased, setPurchased] = useState(item.isPurchased)
    const [packed, setPacked] = useState(item.isPacked)
    const [quantity, setQuantity] = useState(item.quantity)
    const [notes, setNotes] = useState(item.notes);

    return (
        <div>
            {(renderPurchased) ? <Checkbox 
                disabled={!renderPurchased} 
                checked={purchased} 
                onChange={(e) => setPurchased(e.target.checked)}/> : ""}
            <FormControlLabel
                control={<Checkbox
                    checked={packed}
                    onChange={(e) => setPacked(e.target.checked)}/>}
                label={name + (quantity==1 ? "" : " x"+quantity)}
            />
            <FormHelperText>{notes}</FormHelperText>
        </div>
    )
} //<TextField value={notes} onChange={(e) => setNotes(e.target.value)}/>
export default Item;

