import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@styles/global.css';
import { appWithTranslation } from 'next-i18next';


function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
