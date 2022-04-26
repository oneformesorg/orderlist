import { ListItem } from '@shared/List';
import { useTranslation } from 'next-i18next';
import { clotheSwitch } from '../utils/clotheSwitch';

type TbodyBoilerPlateProps = {
  list: ListItem[]
  isCycling: boolean
}
export function TbodyBoilerPlate({ list, isCycling }: TbodyBoilerPlateProps){
  const { t } = useTranslation();
  return(
    <tbody>
      {list.map(({ gender, name, number, clothes, id }) => (
        <tr key={id}>
          <td className='text-center px-2'>
            {t(gender)}
          </td>
          <td className='text-center px-2'>
            {name}
          </td>
          <td className='text-center px-2'>
            {number}
          </td>
          {clotheSwitch(isCycling).map((clotheName, i) => (
            <td 
              className='text-center px-2'
              key={`${i}_${clotheName}`}
            >
              {
                clotheName === 'socks' 
                  ? (
                    clothes[clotheName].quantity || '-'
                  ) 
                  : `${clothes[clotheName].quantity || ''}-${t(clothes[clotheName].size)}`
              }
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}