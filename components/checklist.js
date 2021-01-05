import { useState } from 'react'
import { Checkbox, FormControlLabel, Typography, Box, Button, TextField } from '@material-ui/core';
import { changeCategoryExistence, generateUniqueId } from '../util/utilFunctions'
import Category from './category'
import { usePropertyState } from '../util/customHooks';

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

    const [checklistName, setChecklistName] = usePropertyState([checklistId], "name", name);
    const [renderPurchasedCheck, setRenderPurchased] = usePropertyState([checklistId], "renderPurchased", renderPurchased);
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
        <Box>
            <TextField 
                        style = {{width: "600px"}}
                        value={checklistName}
                        inputProps={{style: {fontSize: 40}}} 
                        onChange={e => setChecklistName(e.target.value)}/>
            <Typography variant='h5'>ChecklistId: {checklistId}</Typography>
            <FormControlLabel
                control={<Checkbox
                    checked={renderPurchasedCheck}
                    onChange={(e) => setRenderPurchased(e.target.checked)}/>}
                label='Show "purchased" column'
            />
            {categories.map(c =>
                <Category key = {c.id}
                    path = {[checklistId, c.id]}
                    name={c.name} 
                    items={c.items} 
                    renderPurchased={renderPurchasedCheck}
                    delCategory={delCategory}
                    />)}
            <br/>
            <Button variant="contained" color="secondary" onClick={addCategory}>Add New Category</Button>
        </Box>
    )
}
export default Checklist;
