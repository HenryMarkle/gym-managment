import "@/src/app/global.css";
import Layout from "./layout";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["italic"] });

function App({ Component, pageProps }) {
  return (
    <Layout className={inter.className}>
      <Component {...pageProps} />
    </Layout>
  );
}
export default App;
