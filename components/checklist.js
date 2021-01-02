import { useState } from 'react'
import { Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import Category from './category'

const Checklist = ({source}) => {
    if (!source){
        return <h1>Loading</h1>
    }
    const {
        name,
        categories,
        id: checklistId,
        renderPurchased,
    } = source;
    const [checklistName, setChecklistName] = useState(name)
    const [renderPurchasedCheck, setRenderPurchased] = useState(renderPurchased)
    console.log(source);
    return (
        <>
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
                    renderPurchased={renderPurchasedCheck}/>)}
        </>
    )
}
export default Checklist;
