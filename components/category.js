import { useState } from 'react';
import { Typography, Button, TextField } from '@material-ui/core';
import Item from './item'
import { changeItemExistence, generateUniqueId } from '../util/utilFunctions'
import { usePropertyState } from '../util/customHooks'
import { Delete } from '@material-ui/icons';

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
        <>
            <Typography variant='h5'>{name}</Typography>
            <TextField 
                        style = {{width: "200px"}}
                        value={name}
                        onChange={e => setName(e.target.value)}/>
            <Button onClick={() => delCategory(path)}><Delete/></Button>
            {items.map(i => <Item key={i.id} path={path.concat([i.id])} item={i} renderPurchased={renderPurchased} deleteItem={deleteItem}/>)}
            <Button variant="contained" color="secondary" onClick={addItem}>Add Item</Button>
        </>
    )
}
export default Category;
