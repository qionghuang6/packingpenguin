import { Typography } from '@material-ui/core';
import Item from './item'

const Category = ({path, name, items, renderPurchased}) => {
    return (
        <>
            <Typography variant='h5'>{name}</Typography>
            {items.map(i => <Item key={i.name} path={path.concat([i.id])} item={i} renderPurchased={renderPurchased}/>)}
        </>
    )
}
export default Category;
