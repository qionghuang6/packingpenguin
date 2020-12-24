import { Checkbox, FormControlLabel } from '@material-ui/core';

const Item = (item) => {
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
      };

    return (
        <FormControlLabel
            control ={<Checkbox
                checked={checked}
                onChange={handleChange}/>}
            label={item.name}
        />
    )
}
export default Item;
  
