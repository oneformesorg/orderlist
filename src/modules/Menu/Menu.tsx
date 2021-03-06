import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import LanguageDropdown from './components/LanguageDropdown/LanguageDropdown';
import style from './style.module.css';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

export function Menu() {
  const { t } = useTranslation();
  return (
    <nav className={`${style.NavMenu} container-sm px-5 py-2 d-flex justify-content-between align-items-center`}>
      <Link href="/">
        <a>
          
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            loading="lazy"
            src="/images/logo.png" 
            alt="logo"
            className={style.logo}
          />
        </a>
      </Link>
      <menu className='d-flex align-items-center gap-3'>
        <li>
          <Link href="/catalog">
            <a
              className='btn btn-light d-flex align-items-center gap-2'
            >
              <FontAwesomeIcon icon={faGear} /> 
              <span className='d-none d-sm-inline'>
                {t('SETTINGS_POPUP_TITLE')}
              </span>
            </a>
          </Link>
        </li> 
        <li>
          <LanguageDropdown />
        </li>
      </menu>
    </nav>
  );
}
