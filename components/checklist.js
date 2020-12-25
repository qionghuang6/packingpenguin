import { useState } from 'react';
import Category from './category'

const Checklist = ({name, categories, renderPurchased}) => {
    const [checklistName, setChecklistName] = useState(name)
    const [renderPurchasedCheck, setRenderPurchased] = useState(renderPurchased)

    return (
        <>
            <h1>Checklist: {checklistName}</h1>
            <p>Render Purchased: {renderPurchased.toString()}</p>

            {categories.map(c =>
                <Category key = {c.id}
                    name={c.name} 
                    items={c.items} 
                    renderPurchased={renderPurchasedCheck}/>)}
        </>
    )
}
export default Checklist;
