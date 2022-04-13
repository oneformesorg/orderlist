import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faDollar } from '@fortawesome/free-solid-svg-icons';
import LanguageDropdown from './components/LanguageDropdown/LanguageDropdown';
import style from './style.module.css';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

export function Menu() {
  const { t } = useTranslation();
  return (
    <nav className='container-sm px-5 py-2 d-flex justify-content-between align-items-center'>
      <Link href="/">
        <a>
          <img src="/images/logo.png" alt="logo" className={style.logo}/>
        </a>
      </Link>
      <menu className='d-flex align-items-center gap-3'>
        <li>
          <Link href="/catalog/create">
            <a
              className='btn btn-light'
            >
              <FontAwesomeIcon icon={faDollar} /> {t('PRICES')}
            </a>
          </Link>
        </li> 
        <li>
          <a
            className='btn btn-light'
            href='https://oneformes.com/'
            target={'_blank'}
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faEye} />
          </a>
        </li> 
        <li>
          <LanguageDropdown />
        </li>
      </menu>
    </nav>
  );
}
