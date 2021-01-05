import { useState } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import Item from './item'
import { changeItemExistence, generateUniqueId } from '../util/utilFunctions'
import { usePropertyState } from '../util/customHooks'
import { Delete } from '@material-ui/icons';

const PASTELS = ['#CCD4BF', '#E7CBA9', '#EEBAB2', '#A1CDCE', '#FFCCF9', 
                '#e8d6cf', '#F6ecf5', '#f6f6EB', '#C7CEEA', '#C4FAF8'];

const Category = ({path, name: givenName, items: givenItems, renderPurchased, delCategory}) => {
    const [items, setItems] = useState(givenItems);
    const [name, setName] = usePropertyState(path, "name", givenName)

    const addItem = async () => {
        const itemPath = path.concat([generateUniqueId()])
        const newItem = await changeItemExistence(itemPath, true);
        setItems(items.concat([newItem]))
    }
    
    const deleteItem = async (path) => {
        await changeItemExistence(path, false);
        setItems(items.filter((element) => element.id != path[2]));
    }

    return (
        <Box m={1} p={1} bgcolor={PASTELS[Math.floor(Math.random()*PASTELS.length)]}>
            <TextField 
                        inputProps={{style: {fontSize: 24}}} 
                        style = {{width: name.length+4+"ch" }}
                        value={name}
                        onChange={e => setName(e.target.value)}/>
            <Button onClick={() => delCategory(path)}><Delete/></Button>
            {items.map(i => <Item key={i.id} path={path.concat([i.id])} item={i} renderPurchased={renderPurchased} deleteItem={deleteItem}/>)}
            <Button variant="contained" color="secondary" onClick={addItem}>Add Item</Button>
        </Box>
    )
}
export default Category;
