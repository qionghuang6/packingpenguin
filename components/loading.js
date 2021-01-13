import { Box, Grid } from '@material-ui/core'
import Skeleton from 'react-loading-skeleton'

const Loading = () => {
    const skeletonGrid = [];
    for (let index = 0; index < 6; index++) {
        skeletonGrid.push(<Grid item xs={12} md={6} lg={4} xl={3} key={index}>
            <Skeleton height={25} count={10}/>
        </Grid> )
    }
    return (
        <Box m={2}>
            <Skeleton height={75}/>
            <br/><br/>
            <Grid container spacing={6}>
                {skeletonGrid}
            </Grid> 
        </Box>
    )
}

export default Loading;
