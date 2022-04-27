import { useTranslation } from 'next-i18next';
import { clotheSwitch } from '../utils/clotheSwitch';

const clotheTranslated = {
  'pants': 'CSVID_PANTS', 
  'shorts': 'CSVID_SHORTS', 
  'tanktop': 'CSVID_TANKTOP', 
  'tshirt': 'CSVID_TSHIRT', 
  'tshirtLong': 'CSVID_TSHIRTLONG', 
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