import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../util/theme';

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const description = "Packing Penguin is the perfect assistant to help you stay organized while packing to move on campus. Organize your items into different categories and checklists and share them across your devices and with your roommates!";
  return (
    <>
      <Head>
        <title>Packing Penguin</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="description" content={description}/>
        <meta property="og:description" content={description}/>
        <meta property="og:title" content="Packing Penguin" />
        <meta property="og:url" content="https://packingpenguin.com/" />
        <meta property="og:image" content="https://packingpenguin.com/ogImg.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Balsamiq+Sans&display=swap" rel="stylesheet"/>
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
