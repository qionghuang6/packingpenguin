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
            <TextField 
                        title={"ChecklistId: "+ checklistId}
                        style = {{width: "600px"}}
                        value={checklistName}
                        inputProps={{style: {fontSize: 40}}} 
                        onChange={e => setServerChecklistName(e.target.value)}
            />
            <Sharelink checklistId={checklistId}/>
            <br></br>
            <FormControlLabel
                control={<Checkbox
                    checked={renderPurchasedCheck}
                    onChange={(e) => setServerRenderPurchased(e.target.checked)}/>}
                label='Show "purchased" column'
            />
            <Grid container spacing={3}>
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
