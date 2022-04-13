import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import LanguageDropdown from './components/LanguageDropdown/LanguageDropdown';
import style from './style.module.css';

export function Menu() {
  return (
    <nav className='container-sm px-5 py-2 d-flex justify-content-between align-items-center'>
      <img src="/images/logo.png" alt="logo" className={style.logo}/>
      <menu className='d-flex align-items-center gap-3'>
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
