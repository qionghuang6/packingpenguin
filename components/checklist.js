import { useState } from 'react'
import { Checkbox, FormControlLabel, Typography, Box, Button, TextField, Grid } from '@material-ui/core';
import { changeCategoryExistence, generateUniqueId } from '../util/utilFunctions'
import Category from './category'
import Sharelink from './sharelink'
import { useStickyMongoState } from '../util/customHooks';

const Checklist = ({source}) => {
    if (!source){
        return <h1>Loading</h1> 
    }
    const {
        name,
        categories: givenCategories,
        id: checklistId,
        renderPurchased,
    } = source;
    //we use sticky states but update the server anyway for checklist wide changes
    const [checklistName, setChecklistName, setServerChecklistName] = useStickyMongoState([checklistId], "name", name);
    const [renderPurchasedCheck, setRenderPurchased, setServerRenderPurchased] = useStickyMongoState([checklistId], "renderPurchased", renderPurchased);
    const [categories, setCategories] = useState(givenCategories);

    const addCategory = async () => {
        const categoryPath = [checklistId, generateUniqueId()];
        const newItem = await changeCategoryExistence(categoryPath, true);
        setCategories(categories.concat([newItem]))
    }
    
    const delCategory = async (path) => {
        await changeCategoryExistence(path, false);
        setCategories(categories.filter((element) => element.id != path[1]));
    }
    // console.log(source);
    return (
        <Box m={1}>
            <Grid container justify="space-between">
                <Grid item>
                    <TextField 
                                title={"ChecklistId: "+ checklistId}
                                multiline
                                rowsMax={4}
                                value={checklistName}
                                inputProps={{style: {fontSize: 36, lineHeight: "100%"}}} 
                                onChange={e => setServerChecklistName(e.target.value)}
                    />
                </Grid>
                <Grid item><Sharelink checklistId={checklistId}/></Grid>
            </Grid>
            <FormControlLabel
                control={<Checkbox
                    checked={renderPurchasedCheck}
                    onChange={(e) => setServerRenderPurchased(e.target.checked)}/>}
                label='Show "purchased" column'
            />
            <Grid container justify="flex-start" spacing={3}>
            {categories.map(c =>
                <Category key = {c.id}
                    path = {[checklistId, c.id]}
                    name={c.name} 
                    items={c.items}
                    color={c.color} 
                    renderPurchased={renderPurchasedCheck}
                    delCategory={delCategory}
                    />)}
            </Grid>
            <br/>
            <Button
                variant="contained"
                color="secondary"
                onClick={addCategory}>Add New Category
            </Button>
        </Box>
    )
}
export default Checklist;
