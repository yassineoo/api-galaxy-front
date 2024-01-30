// pages/_app.tsx

import type { AppProps } from "next/app";
import Head from "next/head";
import "./globals.css";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const client = new QueryClient();
  // const [client] = useState(new QueryClient());

  return (
    <>
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
