<<<<<<< Updated upstream
import { useState } from "react"
import { Checkbox, FormControlLabel, FormHelperText} from '@material-ui/core';
=======
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { useState } from 'react'

const Item = (item) => {
    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
      };
>>>>>>> Stashed changes

const Item = ({item, renderPurchased}) => {
    const [name, setName] = useState(item.name)
    const [purchased, setPurchased] = useState(item.isPurchased)
    const [packed, setPacked] = useState(item.isPacked)
    const [quantity, setQuantity] = useState(item.quantity)
    const [notes, setNotes] = useState(item.notes);
    
    return (
        <div>
            <Checkbox 
                disabled={!renderPurchased} 
                checked={purchased} 
                onChange={(e) => setPurchased(e.target.checked)}/>
            <FormControlLabel
                control={<Checkbox
                    checked={packed}
                    onChange={(e) => setPacked(e.target.checked)}/>}
                label={name + (quantity==1 ? "" : " x"+quantity)}
            />
            <FormHelperText>{notes}</FormHelperText>
        </div>
    )
}
export default Item;

