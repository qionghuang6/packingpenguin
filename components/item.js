import { Checkbox, FormControlLabel, FormHelperText, TextField} from '@material-ui/core';
import useMongoState from '../util/useMongoState'

const Item = ({item, renderPurchased}) => {
    const [name, setName] = useMongoState(item.name)
    const [purchased, setPurchased] = useMongoState(item.isPurchased)
    const [packed, setPacked] = useMongoState(item.isPacked)
    const [quantity, setQuantity] = useMongoState(item.quantity)
    const [notes, setNotes] = useMongoState(item.notes);

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

