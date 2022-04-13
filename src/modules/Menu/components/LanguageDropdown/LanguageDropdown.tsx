import React from 'react';
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
  const { t, i18n } = useTranslation();
  return (
    <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        <FontAwesomeIcon icon={faEarthAmericas} /> {t('LANGUAGE')}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {listItem.map(({ Flag, textContent, value }, i) => (
          <Dropdown.Item
            as={'button'}
            key={`${i}_${value}`}
            className={style.menuItem}
            onClick={() => {
              i18n.changeLanguage(value);
            }}
          >
            <Flag/> {textContent}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
