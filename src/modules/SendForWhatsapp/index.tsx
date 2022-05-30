import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCatalogState } from '@shared/Catalog/context/catalog';
import { useList } from '@shared/List';
import React, { useEffect, useState } from 'react';

export function openWhatsappLink(url: string, telPhone: string){
  alert(telPhone);
  const wppLink = `https://api.whatsapp.com/send/?phone=55${telPhone}&text=link: ${url}`;
  window.open(wppLink, '__blank').focus();
}

export function SendForWhatsapp() {
  const { state } = useList();
  const { whatsappContact } = useCatalogState();
  const [url, setUrl] = useState('');
  const [contact] = useState(whatsappContact.replaceAll(/\(|\)| |-/gm, ''));

  useEffect(() => {
    if(url){
      const listUrl = `${window.location.origin}?list=${url}`;
      openWhatsappLink(listUrl, contact);
    }
  }, [url, contact]);
  return (
    <button 
      onClick={() => {
        const items = Buffer.from(JSON.stringify(state.items));
        // axios
        //   .post<{fileName: string}>(
        //     'list/create', 
        //     {
        //       items: items.toString('base64')
        //     },
        //     {
        //       baseURL: 'api'
        //     }
        //   ).then(r => setUrl(r.data.fileName));
        fetch('/api/list/create', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ items: items.toString('base64') })
        })
          .then(r => r.json())
          .then(r => setUrl(r.fileName));
      }}
      className="btn btn-success d-flex align-items-center gap-2"
    >
      <FontAwesomeIcon icon={faMessage} />
      Enviar por whatsapp
    </button>
  );
}
