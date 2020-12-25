import Head from 'next/head'
import Checklist from '../components/checklist';
import Item from '../components/item';
import list from '../public/defaultList.json'

export default function Home() {
  return (
    <>
      <Head>
        <title>Packing Penguin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Packing Penguin</h1>
        <h1>A Yeet by Qiong Huang and Coby Sontag</h1>
        <Checklist name={list.name} categories={list.categories} renderPurchased={list.renderPurchased}/>
      </main>
    </>
  )
}
