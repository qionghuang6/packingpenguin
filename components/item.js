import { Checkbox, FormControlLabel, FormHelperText} from '@material-ui/core';

const Item = (item, renderPurchased) => {
    const [name, setName] = React.useState(item.name)
    const [purchased, setPurchased] = React.useState(item.isPurchased)
    const [packed, setPacked] = React.useState(item.isPacked)
    const [quantity, setQuantity] = React.useState(item.quantity)
    const [notes, setNotes] = React.useState(item.notes);

    const handleChange = (event) => {
        setChecked({...state, [event.target.name]: event.target.checked});
    };

    return (
        <div>
            <Checkbox 
                disabled={!renderPurchased} 
                checked={purchased} 
                onChange={(e) => setChecked(e.target.checked)}/>
            <FormControlLabel
                control={<Checkbox
                    checked={packed}
                    onChange={(e) => setPacked(e.target.checked)}/>}
                label={name} //add name changing
            />
            <FormHelperText>{notes}</FormHelperText> //add updating
        </div>
    )
}
export default Item;

