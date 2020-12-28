import { useState } from 'react'
import { Checkbox, FormControlLabel } from '@material-ui/core';
import Category from './category'

const Checklist = ({source}) => {
    const {
        name,
        categories,
        id: checklistId,
        renderPurchased,
    } = source;
    const [checklistName, setChecklistName] = useState(name)
    const [renderPurchasedCheck, setRenderPurchased] = useState(renderPurchased)

    return (
        <>
            <h1>Checklist: {checklistName}</h1>
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
