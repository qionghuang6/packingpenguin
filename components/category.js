import { useState } from 'react';
import { Box, Button, TextField, Grid } from '@material-ui/core';
import Item from './item'
import { changeItemExistence, generateUniqueId } from '../util/utilFunctions'
import { useStickyMongoState } from '../util/customHooks'
import { Delete } from '@material-ui/icons';

const PASTELS = ['#CCD4BF', '#E7CBA9', '#EEBAB2', '#A1CDCE', '#FFCCF9', 
                '#e8d6cf', '#F6ecf5', '#f6f6EB', '#C7CEEA', '#C4FAF8'];

const Category = ({path, name: givenName, items: givenItems, renderPurchased, delCategory, color}) => {
    const [items, setItems] = useState(givenItems);
    const [name, setName, setServerName] = useStickyMongoState(path, "name", givenName);

    const givenColor = color ? color: PASTELS[Math.floor(Math.random()*PASTELS.length)];
    const [bgColor, setBgColor, setServerBgColor] = useStickyMongoState(path, "color", givenColor);

    const addItem = async () => {
        const itemPath = path.concat([generateUniqueId()])
        const newItem = await changeItemExistence(itemPath, true);
        setItems(items.concat([newItem]))
    }
    
    const deleteItem = async (path) => {
        await changeItemExistence(path, false);
        setItems(items.filter((element) => element.id != path[2]));
    }
    //console.log(items)
    return (
        <Grid item xs={12} sm={6} lg={4} xl={3} key={path[1]}>
            <Box m={1} p={1} bgcolor={bgColor}>
                <TextField 
                            inputProps={{style: {fontSize: 24, width: name.length+ 2+"ch"}}} 
                            value={name}
                            onChange={e => setName(e.target.value)}
                            onBlur={e => setServerName(e.target.value)}/>
                <Button onClick={() => delCategory(path)}><Delete/></Button>
                {items.map(i => <Item key={i.id} path={path.concat([i.id])} item={i} renderPurchased={renderPurchased} deleteItem={deleteItem}/>)}
                <Button variant="contained" color="secondary" onClick={addItem}>Add Item</Button>
                <Button variant ="contained"
                        onClick={() => setServerBgColor(PASTELS[Math.floor(Math.random()*PASTELS.length)])}>
                    reload color
                </Button>
            </Box>
        </Grid>
    )
}
export default Category;
