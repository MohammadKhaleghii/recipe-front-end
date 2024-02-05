import {Html, Head, Main, NextScript} from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Recipe By Mohammad Khaleghi </title>
        <link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
        <meta name="theme-color" content="#F17228" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Recipe" />
        <meta name="apple-mobile-web-app-title" content="Recipe" />
        <link rel="manifest" href="manifest.json" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
