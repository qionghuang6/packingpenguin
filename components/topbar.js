import Head from 'next/head';
import { AppBar, Typography, Link, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    headBar: {
      // Some CSS
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      color: 'white',
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
  });
  

const TopBar = () => {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:600px)');
    const typoVariants = matches ? ["h2", "h5"]: ["h4", "body2"];
    return (
        <>
            <Head>
                <title>Packing Penguin</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AppBar position="static" className={classes.headBar}>
                <Typography variant={typoVariants[0]}>Packing Penguin</Typography>
                <Typography variant={typoVariants[1]}>
                    A project by <Link href="http://qiongzhouh.com" color="inherit">Qiong Huang</Link> and <Link href="http://cobysontag.com" color="inherit">Coby Sontag</Link>
                 </Typography>
            </AppBar>
        </>
    )
}
export default TopBar;