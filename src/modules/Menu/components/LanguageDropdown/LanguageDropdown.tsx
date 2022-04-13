import React, { useId } from 'react';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'next-i18next';
import { Brasil, English, Spanol } from '../Flags/Flags';
import style from './style.module.css';

const listItem = [
  {
    textContent: 'Português',
    Flag: () => <Brasil />,
    value: 'pt-BR'
  },
  {
    textContent: 'English',
    Flag: () => <English />,
    value: 'en'
  },
  {
    textContent: 'Spañol',
    Flag: () => <Spanol />,
    value: 'es'
  }
];

export default function LanguageDropdown() {
  const { t } = useTranslation();
  const id = useId();
  return (
    <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        <FontAwesomeIcon icon={faEarthAmericas} /> {t('LANGUAGE')}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {listItem.map(({ Flag, textContent }) => (
          <Dropdown.Item 
            href="#/action-1"
            key={id}
            className={style.menuItem}
          >
            <Flag/> {textContent}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
