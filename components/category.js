import { useState } from 'react';
import { Typography, Button } from '@material-ui/core';
import Item from './item'
import { changeItemExistence, generateUniqueId } from '../util/utilFunctions'

const Category = ({path, name, items: givenItems, renderPurchased}) => {
    const [items, setItems] = useState(givenItems);

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
            {items.map(i => <Item key={i.id} path={path.concat([i.id])} item={i} renderPurchased={renderPurchased} deleteItem={deleteItem}/>)}
            <Button variant="contained" color="secondary" onClick={addItem}>Add Item</Button>
        </>
    )
}
export default Category;
