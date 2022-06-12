import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@styles/global.css';
import { appWithTranslation } from 'next-i18next';
import { SSRProvider } from 'react-bootstrap';
import { CatalogProvider } from '@shared/Catalog/context/catalog';
import Head from 'next/head';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { ListActionProvider } from '@shared/List';
config.autoAddCss = false;

// const date = new Date();
// const hours = `${date.getHours()}:${date.getMinutes()}`;
// console.log(hours);
// if(date.getMinutes() >= 24){
//   throw new Error('expired');
// }

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <Head>
        <meta 
          name="viewport"
          content="width=device-width, initial-scale=1"
          id="viewportMeta"
        />
      </Head>
      <CatalogProvider>
        <ListActionProvider>
          <Component {...pageProps} />
        </ListActionProvider>
      </CatalogProvider>
    </SSRProvider>
  );
}

export default appWithTranslation(MyApp);
