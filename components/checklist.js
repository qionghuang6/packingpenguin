import { useState } from 'react';
import Category from './category'
import defaultList from '../public/defaultList.json'

const Checklist = ({name, categories, renderPurchased}) => {
    // checklistToLoad = defaultList;
    const [checklistName, setChecklistName] = useState(defaultList.name)
    const [renderPurchased, setRenderPurchased] = useState(defaultList.renderPurchased)
    const [categories, setCategories] = useState([])

    return (
        <>
            <h1>{name}</h1>
            {categories.map(c => <Category category={c} renderPurchased={renderPurchased}/>)}
            <h1>This is a Checklist Component</h1>
            <Category/>
            <p>Checklist Name: {checklistName}</p>
            <p>Render Purchased: {renderPurchased.toString()}</p>
        </>
    )
}
export default Checklist;
