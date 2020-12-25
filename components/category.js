import Item from './item'

const Category = ({name, items, renderPurchased}) => {
    return (
        <>
            <h2>{name}</h2>
            {items.map(i => <Item key={i.name} item={i} renderPurchased={renderPurchased}/>)}
        </>
    )
}
export default Category;
