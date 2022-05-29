import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useList } from '@shared/List';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

type LoadingStatus = 'LOADING' | 'SUCCESS' | 'OFF' | 'ERROR'
type POST = 'post'
type GET = 'get'

export function openWhatsappLink(url: string){
  const wppLink = `https://api.whatsapp.com/send/?phone=5521965025150&text=link: ${url}`;
  const anchorELement = document?.createElement('a');
  anchorELement.href = wppLink;
  anchorELement.referrerPolicy = 'no-referrer';
  anchorELement.target = '__blank';
  anchorELement.click();
  anchorELement.remove();
}

export function useApi<
  T, 
  P extends POST | GET
>(
  endpoint: string, 
  method: P, 
  ...body: P extends POST ? [unknown] : [undefined?]
){
  const [isLoading, setIsLoading] = useState<LoadingStatus>('OFF');
  const [response, setResponse] = useState<T>();
  axios[method]<T>(endpoint, { body })
    .then(r => {
      setIsLoading('LOADING');
      setResponse(r.data);
    })
    .catch(() => setIsLoading('ERROR'))
    .finally(() => setIsLoading('SUCCESS'));
  return { isLoading, response };
}

export function SendForWhatsapp() {
  const { state } = useList();
  const [url, setUrl] = useState('');
  useEffect(() => {
    if(url){
      const listUrl = `${window.location.origin}?list=${url}`;
      openWhatsappLink(listUrl);
    }
  }, [url]);
  return (
    <button 
      onClick={() => {
        const items = Buffer.from(JSON.stringify(state.items));
        axios
          .post<{fileName: string}>(
            'list/create', 
            {
              items: items.toString('base64')
            },
            {
              baseURL: 'api'
            }
          ).then(r => setUrl(r.data.fileName));
      }}
      className="btn btn-success d-flex align-items-center gap-2"
    >
      <FontAwesomeIcon icon={faMessage} />
      Enviar por whatsapp
    </button>
  );
}
