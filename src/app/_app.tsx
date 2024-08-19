// pages/_app.tsx

import type { AppProps } from "next/app";
import "./globals.css";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps}: AppProps) {
  const client = new QueryClient();
  // const [client] = useState(new QueryClient());

  return (
    <>
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
        <ToastContainer />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;



