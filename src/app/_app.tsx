// pages/_app.tsx

import type { AppProps } from "next/app";
import "./globals.css";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

function MyApp({ Component, pageProps}: AppProps) {
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



