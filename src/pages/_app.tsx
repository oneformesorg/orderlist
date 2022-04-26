import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@styles/global.css';
import { appWithTranslation } from 'next-i18next';
import { SSRProvider } from 'react-bootstrap';
import { CatalogActionProvider } from '@shared/Catalog/context/catalog';
import { ListActionProvider } from '@shared/List';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <CatalogActionProvider>
        <ListActionProvider>
          <Component {...pageProps} />
        </ListActionProvider>
      </CatalogActionProvider>
    </SSRProvider>
  );
}

export default appWithTranslation(MyApp);
