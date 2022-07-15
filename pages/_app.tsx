import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";

if (process.env.NODE_ENV === "development") {
  if (typeof window === "undefined") {
    const { server } = require("../mocks/server");
    server.listen();
  } else {
    const { worker } = require("../mocks/browser");
    worker.start();
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
