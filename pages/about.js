import TopBar from '../components/topbar';
import { Typography, Grid, Box } from '@material-ui/core';

const About = () => {
    return (
        <>
            <TopBar />
            <Grid container justify="center">
                <Grid item xs={12} sm={4}>
                    <Box m={3}>
                    <Typography variant="h5">
                    “<b>Packing Penguin</b> <i>LITERALLY changed my life!</i> It helped me pack not just the things I need for college but everything that I need in life! <b>Packing Penguin</b> helped me get cuffed! <b>Packing Penguin</b> helped me find a job!”
                    </Typography>
                    <Typography variant="h5" align="right"><b>- Beric Ben, Cornell '24</b></Typography>
                    <br/>
                    <Typography variant="h5">
                    “It’s like moving-in day on a college campus, except a large percentage of the people involved are middle-aged, in suits, and, along with you, charged with running the most powerful nation on earth. [ ... I highly recommend <b>Packing Penguin!</b> ]”
                    </Typography>
                    <Typography variant="h5" align="right" >- Excerpt From <i>A Promised Land</i>, <b>Barack Obama</b></Typography>
                    <br/>
                    <Typography variant="h5">
                    If I'd known how much packing I'd have to do, I'd have run again.
                    [ ... but then I found <b>Packing Penguin!</b> ... and it saved my Presidency! ]
                    </Typography>
                    <Typography variant="h5" align="right"><b>- President Harry Truman, 1953</b></Typography>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default About;