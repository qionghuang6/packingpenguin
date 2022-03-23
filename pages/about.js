import TopBar from '../components/topbar';
import { Typography, Grid, Box, Link } from '@material-ui/core';

const About = () => {
    return (
        <>
            <TopBar />
            <Box m={2}>
                <Grid container justify="space-evenly">
                    <Grid item xs={12} md={6} xl={4}>
                        <Typography variant="h3" align="center">About Us</Typography>
                        <Box m={3}>
                            <Typography variant="h5">Packing Penguin was built by <Link href="https://github.com/qionghuang6">Qiong Zhou Huang</Link> and <Link href="http://cobysontag.com">Coby Sontag</Link> with help from Endar Li, Sam Belliveau, and Michelle Zhang.</Typography>
                            <br/>
                            <Typography variant="h5">Started as a tool to help us pack for moving on campus next semester, we hope that Packing Penguin can make your packing experience easier and more organized.</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} xl={4}>
                        <Typography variant="h3" align="center">Praise for Packing Penguin</Typography>
                        <Box m={3}>
                            <Typography variant="h5">
                                “<b>Packing Penguin</b> <i>LITERALLY changed my life!</i> It helped me pack not just the things I need for college but everything that I need in life! <b>Packing Penguin</b> helped me get cuffed! <b>Packing Penguin</b> helped me find a job!”
                    </Typography>
                            <Typography variant="h5" align="right"><b>- <Link color="inherit" href="https://honeyco.info/">Beric Ben</Link>, Cornell '24</b></Typography>
                            <br />
                            <Typography variant="h5">
                                “It’s like moving-in day on a college campus, except a large percentage of the people involved are middle-aged, in suits, and, along with you, charged with running the most powerful nation on earth. [ ... I highly recommend <b>Packing Penguin!</b> ]”
                    </Typography>
                            <Typography variant="h5" align="right" >- Excerpt From <i>A Promised Land</i>, <b>Barack Obama</b></Typography>
                            <br />
                            <Typography variant="h5">
                                If I'd known how much packing I'd have to do, I'd have run again.
                    [ ... but then I found <b>Packing Penguin!</b> ... and it saved my Presidency! ]
                    </Typography>
                            <Typography variant="h5" align="right"><b>- President Harry Truman, 1953</b></Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default About;
