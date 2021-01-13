import { useState } from 'react';
import { Box, IconButton, Button, TextField, Grid } from '@material-ui/core';
import Item from './item'
import { changeItemExistence, generateUniqueId, addIndexedItem, getPastelColor } from '../util/utilFunctions'
import { useStickyMongoState } from '../util/customHooks'
import { Delete, ColorLens } from '@material-ui/icons';

const Category = ({ path, name: givenName, items: givenItems, renderPurchased, delCategory, color }) => {
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

    const addByEnter = async (index) => {
        console.log("category is adding an item")
        const itemPath = path.concat([generateUniqueId()])
        const newItem = await addIndexedItem(itemPath, index);
        items.splice(index, 0, newItem)
        setItems(items.concat())
    }

    //console.log(items)
    return (
        <Grid item xs={12} md={6} lg={4} xl={3} key={path[1]}>
            <Box m={0} p={2} bgcolor={bgColor} boxShadow={5}>
            <Grid container wrap="nowrap">
                <Grid item xs={10}><TextField
                    inputProps={{ maxLength: 32, style: {fontSize: 24, maxWidth:"100%"}}}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onBlur={e => setServerName(e.target.value)} /></Grid>

                <Grid item><IconButton onClick={() => setServerBgColor(getPastelColor())}>
                    <ColorLens />
                </IconButton></Grid>
                <Grid item><IconButton onClick={() => delCategory(path)}><Delete /></IconButton></Grid>
            </Grid>
                {items.map((i, index) => <Item key={i.id} path={path.concat([i.id])} item={i} renderPurchased={renderPurchased} deleteItem={deleteItem} addIndexed={addByEnter} index={index}/>)}
                <Button variant="outlined" fullWidth={true} onClick={addItem}>Add Item</Button>
            </Box>
        </Grid>
    )
}
export default Category;
