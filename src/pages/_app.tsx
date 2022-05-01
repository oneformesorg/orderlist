import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@styles/global.css';
import { appWithTranslation } from 'next-i18next';
import { SSRProvider } from 'react-bootstrap';
import { CatalogActionProvider } from '@shared/Catalog/context/catalog';
import Head from 'next/head';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

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
      <CatalogActionProvider>
        <Component {...pageProps} />
      </CatalogActionProvider>
    </SSRProvider>
  );
}

export default appWithTranslation(MyApp);
