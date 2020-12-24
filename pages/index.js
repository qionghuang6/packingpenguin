import Head from 'next/head'
import Checklist from '../components/checklist';

export default function Home() {
  return (
    <>
      <Head>
        <title>Packing Penguin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Packing Penguin</h1>
        <h1>Yeet by Coby</h1>
        <Checklist/>
      </main>
    </>
  )
}
