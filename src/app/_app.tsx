import type { AppProps } from 'next/app';
import Head from 'next/head';
import './globals.css'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
        
            <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
                    <title>hello</title>
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;