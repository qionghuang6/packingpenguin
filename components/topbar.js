import { AppBar, Typography, Link, useMediaQuery, Grid, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    headBar: {
      // Some CSS
      background: 'linear-gradient(45deg, #4facfe 30%, #00f2fe 80%, #ffbd53 80%)',//FE6B8B, FF8E53
      border: 0,
      color: 'white',
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    title: {
        fontFamily: ['Balsamiq Sans', 'Roboto', 'cursive'].join(','),
    }
  });

const TopBar = () => {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:760px)');
    const typoVariants = matches ? ["h2", "h5"]: ["h4", "body2"];
    return (
        <>
            <AppBar position="static" className={classes.headBar}>
                <Grid container justify="space-between">
                    <Grid item>
                <Link href="/" color="inherit" underline="none">
                    <Typography variant={typoVariants[0]} className={classes.title}>Packing Penguin</Typography>
                </Link>
                <Typography variant={typoVariants[1]}>
                    A project by <Link href="/about" color="inherit">Qiong Zhou Huang</Link> and <Link href="/about" color="inherit">Coby Sontag</Link>
                </Typography>
                </Grid>
                <Grid item hidden={!matches}>
                    <Box m={2}>
                        <Link href='/about' underline="none"><Button size="large" variant="outlined">About Us</Button></Link>
                    </Box>
                </Grid>
                </Grid>
            </AppBar>
        </>
    )
}
export default TopBar;