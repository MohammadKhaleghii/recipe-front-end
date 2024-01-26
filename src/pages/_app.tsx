import "@/styles/globals.css";
import "../../public/assets/fonts/awesome/css/all.css";
import "react-loading-skeleton/dist/skeleton.css";

import type {AppProps} from "next/app";
import {NextPage} from "next";
import {ReactElement, ReactNode} from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export default function App({Component, pageProps}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />);
}
