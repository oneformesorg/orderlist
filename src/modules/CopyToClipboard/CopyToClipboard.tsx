import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'next-i18next';
import React from 'react';

type Props = {
  text: string
}

export function CopyToClipboard({ text }: Props) {
  const { t } = useTranslation();
  return (
    <div className="input-group mb-3 mt-4">
      <input 
        type="text"
        className="form-control text-center"
        placeholder="Catalog link" aria-label="link for personal catalog"
        defaultValue={text}
      />
      <div className="input-group-prepend">
        <button 
          onClick={() => {
            if(navigator.clipboard){
              navigator.clipboard.writeText(text);
            }
          }}
          autoFocus
          className="btn btn-primary d-flex gap-2 align-items-center" 
          type="button">
          <FontAwesomeIcon icon={faLink} />
          {t('COPY_LINK')}
        </button>
      </div>
    </div>
  );
}
