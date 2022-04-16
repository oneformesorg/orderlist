import axios from 'axios';
import type { CatalogContent } from '@shared/Catalog';

axios.defaults.baseURL = 'https://list.oneformes.com/api/';

type AxiosProps = {
  path: 'generate',
  body: CatalogContent
} | {
  path: 'load',
  query: string
}
export const OneformesAPI = async<T = unknown>(config: AxiosProps):Promise<T> => {
  if(config.path === 'load'){
    const { data } = await axios.get('/loadLink.php', { 
      params: {
        query: config.query
      } 
    });
    return JSON.parse(data?.conteudo)?.data;
  }
  if(config.path === 'generate'){
    const { data } = await axios.post<T>('/generateLink.php', {
      data: config.body
    });
    return data;
  }
};
