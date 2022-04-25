import { useTranslation } from 'next-i18next';
import { clotheSwitch } from '../utils/clotheSwitch';

const clotheTranslated = {
  'pants': 'CSVID_TSHIRT', 
  'shorts': 'CSVID_TSHIRTLONG', 
  'tanktop': 'CSVID_SHORTS', 
  'tshirt': 'CSVID_PANTS', 
  'tshirtLong': 'CSVID_TANKTOP', 
  'vest': 'CSVID_VEST', 
  'socks': 'CSVID_SOCKS'
};

type TheadBoilerplateProps = {
  isCycling: boolean
}
export function TheadBoilerplate({ isCycling }: TheadBoilerplateProps){
  const { t } = useTranslation();
  return (
    <thead>
      <td className='text-center'>
        {t('GENDER')}
      </td>
      <td className='text-center'>{t('NAME')}</td>
      <td className='text-center'>{t('NUMBER')}</td>
      { clotheSwitch(isCycling).map((clotheName, i) => (
        <td 
          key={`${clotheName}_${i}`}
          className='text-center'
        >
          {t(clotheTranslated[clotheName])}
        </td>
      )) }
    </thead>
  );
}