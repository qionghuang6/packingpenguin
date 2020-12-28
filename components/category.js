import Item from './item'

const Category = ({path, name, items, renderPurchased}) => {
    return (
        <>
            <h2>{name}</h2>
            {items.map(i => <Item key={i.name} path={path.concat([i.id])} item={i} renderPurchased={renderPurchased}/>)}
        </>
    )
}
export default Category;
