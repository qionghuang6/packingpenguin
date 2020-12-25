import Head from 'next/head'
import Checklist from '../components/checklist';
import Item from '../components/item';

export default function Home() {
  return (
    <>
      <Head>
        <title>Packing Penguin</title>
        <link rel="icon" href="../icon.png" />
      </Head>
      <main>
        <h1>Packing Penguin</h1>
        <h1>Yeet by Coby</h1>
        <Checklist/>
        <Item item={{
                name: "Shampoo",
                isPurchased: false,
                isPacked: true,
                quantity: 1,
                notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation u"
        }} renderPurchased={false}
        />
      </main>
    </>
  )
}
