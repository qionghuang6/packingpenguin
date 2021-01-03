import { useState } from 'react'
import { Checkbox, FormControlLabel, Typography, Box, Button } from '@material-ui/core';
import { changeCategoryExistence } from '../util/utilFunctions'
import Category from './category'

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

    const [checklistName, setChecklistName] = useState(name)
    const [renderPurchasedCheck, setRenderPurchased] = useState(renderPurchased)
    const [categories, setCategories] = useState(givenCategories);

    const addCategory = async () => {
        const categoryPath = path.concat([generateUniqueId()])
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
            <Typography variant='h3'>Checklist: {checklistName}</Typography>
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
