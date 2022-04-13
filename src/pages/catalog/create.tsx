import { Menu } from '@/modules/Menu/Menu';
import { FormInputs } from '@/modules/Catalog/FormInputs';
import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const Catalog: NextPage = () => {
  return(
    <>
      <Menu />
      <main className='container-sm px-5 py-2 justify-content-stretch'>
        <Link href="/">
          <a
            className="btn btn-primary d-inline-flex gap-2 align-items-center mb-4"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Voltar
          </a>
        </Link>
        <FormInputs />
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...await serverSideTranslations(locale)
    } 
  };
};

export default Catalog;