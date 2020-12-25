import Category from './category'

const Checklist = ({name, categories, renderPurchased}) => {
    return (
        <>
            <h1>{name}</h1>
            {categories.map(c => <Category category={c} renderPurchased={renderPurchased}/>)}
        </>
    )
}
export default Checklist;
