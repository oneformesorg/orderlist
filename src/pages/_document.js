import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render(){
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="favicon-16x16.png" type="image/x-icon" />
        </Head>
        <Main />
        <NextScript />
      </Html>
    );
  }
}