import { Checkbox, FormControlLabel, FormHelperText, TextField, Button, InputAdornment, InputBase} from '@material-ui/core';
import { useStickyMongoState } from '../util/customHooks'
import { DeleteTwoTone } from '@material-ui/icons'


const Item = ({item, path, renderPurchased, deleteItem }) => {
    const [name, setName, setServerName] = useStickyMongoState(path, "name", item.name)
    const [purchased, setPurchased, setServerPurchased] = useStickyMongoState(path, "isPurchased", item.isPurchased)
    const [packed, setPacked, setServerPacked] = useStickyMongoState(path, "isPacked", item.isPacked)
    const [quantity, setQuantity, setServerQuantity] = useStickyMongoState(path, "quantity", item.quantity)
    const [notes, setNotes, setServerNotes] = useStickyMongoState(path, "notes", item.notes);
    // console.log([name, purchased, packed])
    //console.log(name)
    return (
        <div>
            {/* <p>{JSON.stringify(path)}</p> */}
            {(renderPurchased) ? <Checkbox 
                disabled={!renderPurchased} 
                checked={purchased} 
                onChange={(e) => setPurchased(e.target.checked)}
                onBlur={e => setServerPurchased(e.target.checked)}
            /> : ""}
            <FormControlLabel
                control={<Checkbox
                    checked={packed}
                    onChange={(e) => setPacked(e.target.checked)}
                    onBlur={e => setServerPacked(e.target.checked)}
                    />}
                    label={<TextField 
                        InputProps={{
                            endAdornment: <InputAdornment position="end">{quantity==1 ? "" : " x"+quantity}</InputAdornment>,
                        }}
                        style = {{width: name.length+2+(quantity==1? 0:2)+"ch" }}
                        value = {name}
                        onChange={e => setName(e.target.value)}
                        onBlur={e => setServerName(e.target.value)}
                        />}
            />
            <Button onClick={() => deleteItem(path)}><DeleteTwoTone/></Button>
            <FormHelperText>{notes}</FormHelperText>
        </div>
    )
} //<TextField value={notes} onChange={(e) => setNotes(e.target.value)}/>
//name + (quantity==1 ? "" : " x"+quantity)
export default Item;

