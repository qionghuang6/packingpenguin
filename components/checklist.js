import { useState } from 'react';
import Category from './category'
import defaultList from '../public/defaultList.json'

const Checklist = () => {

    const [checklistName, setChecklistName] = useState(defaultList.name)
    const [renderPurchased, setRenderPurchased] = useState(true)
    const [categories, setCategories] = useState([])

    return (
        <>
            <h1>{checklistName}</h1>
            {categories.map(c => <Category category={c} renderPurchased={renderPurchased}/>)}
            <h1>This is a Checklist Component</h1>
            <Category/>
            <p>Checklist Name: {checklistName}</p>
            <p>Render Purchased: {renderPurchased.toString()}</p>
        </>
    )
}
export default Checklist;
