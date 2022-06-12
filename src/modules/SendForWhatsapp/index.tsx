import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCatalog } from '@shared/Catalog/context/catalog';
import { useList } from '@shared/List';
import React, { useState } from 'react';

export function openWhatsappLink(url: string, telPhone: string){
  const wppLink = `https://api.whatsapp.com/send/?phone=55${telPhone}&text=link: ${url}`;
  window.open(wppLink, '__blank').focus();
}

export function SendForWhatsapp() {
  const { state } = useList();
  const { state: { whatsappContact } } = useCatalog();
  const [contact] = useState(whatsappContact.replaceAll(/\(|\)| |-/gm, ''));

  return (
    <button 
      onClick={() => {
        const items = Buffer.from(JSON.stringify(state.items));
        fetch('/api/list/create', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ items: items.toString('base64') })
        })
          .then(r => r.json())
          .then(r => {
            const listUrl = `${window.location.origin}?list=${r.fileName}`;
            openWhatsappLink(listUrl, contact);
          });
      }}
      className="btn btn-success d-flex align-items-center gap-2"
    >
      <FontAwesomeIcon icon={faMessage} />
      Enviar por whatsapp
    </button>
  );
}
