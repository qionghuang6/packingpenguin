import Head from 'next/head'
import { AppBar } from '@material-ui/core';
import Checklist from '../components/checklist';
// import list from '../public/defaultList.json'
import { generateListId } from '../util/generateIds'
import { makeStyles } from '@material-ui/core/styles';
import { useChecklist } from '../util/customHooks'

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


export default function Home() {
  const list = useChecklist()
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>Packing Penguin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <AppBar position="static" className={classes.headBar}>
          <h1>Packing Penguin</h1>
          <h4>A Yeet by Qiong Huang and Coby Sontag</h4>
        </AppBar>
        {/* <h2>Checklist Id: {checklistId}</h2> */}
        <Checklist name={list.name} categories={list.categories} renderPurchased={list.renderPurchased} />
      </main>
    </>
  )
}
