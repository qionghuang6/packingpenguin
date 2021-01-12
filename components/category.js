import { useState } from 'react';
import { Box, Button, TextField, Grid } from '@material-ui/core';
import Item from './item'
import { changeItemExistence, generateUniqueId, getPastelColor } from '../util/utilFunctions'
import { useStickyMongoState } from '../util/customHooks'
import { Delete } from '@material-ui/icons';

const Category = ({path, name: givenName, items: givenItems, renderPurchased, delCategory, color}) => {
    const [items, setItems] = useState(givenItems);
    const [name, setName, setServerName] = useStickyMongoState(path, "name", givenName);

    const [bgColor, setBgColor, setServerBgColor] = useStickyMongoState(path, "color", color);
    if (!bgColor) setServerBgColor(getPastelColor());

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
        <Grid item xs={12} md={6} lg={4} xl={3} key={path[1]}>
            <Box m={0} p={2} bgcolor={bgColor} boxShadow={5}>
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
